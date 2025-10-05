import autoprefixer from "autoprefixer";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssGapProperties from "postcss-gap-properties";
import postcssPresetEnv from "postcss-preset-env";
import tailwindcss from "tailwindcss";

const config = {
  plugins: [
    tailwindcss,
    autoprefixer({
      flexbox: "no-2009",
      grid: false,
    }),
    postcssFlexbugsFixes,
    postcssGapProperties,

    (root) => {
      const unsupportedProps = [
        "position",
        "z-index",
        "top",
        "right",
        "bottom",
        "left",
        "transform",
        "translate",
        "rotate",
        "scale",
        "skew",
        "transition",
        "animation",
        "box-shadow",
        "text-shadow",
        "filter",
        "backdrop-filter",
        "clip-path",
        "mask",
      ];

      root.walkAtRules("layer", (atRule) => {
        if (atRule.nodes && atRule.nodes.length > 0) {
          atRule.replaceWith(atRule.nodes);
        } else {
          atRule.remove();
        }
      });

      const rulesToRemove: import("postcss").Rule[] = [];
      root.walkRules((rule) => {
        if (
          rule.selector.includes(":root") ||
          rule.selector.includes("::backdrop")
        ) {
          const declsToRemove: import("postcss").Declaration[] = [];

          rule.walkDecls((decl) => {
            if (decl.prop.startsWith("--")) {
              declsToRemove.push(decl);
            }
          });

          declsToRemove.forEach((decl) => decl.remove());

          if (!rule.nodes || rule.nodes.length === 0) {
            rulesToRemove.push(rule);
          }
        }
      });

      rulesToRemove.forEach((rule) => rule.remove());

      const declsToRemove: import("postcss").Declaration[] = [];
      root.walkDecls((decl) => {
        if (decl.prop.startsWith("--")) {
          declsToRemove.push(decl);
          return;
        }

        if (unsupportedProps.includes(decl.prop)) {
          if (
            decl.value !== "none" &&
            decl.value !== "0" &&
            decl.value !== "auto"
          ) {
            declsToRemove.push(decl);
            return;
          }
        }

        if (decl.value?.includes("var(--")) {
          const newValue = decl.value.replace(
            /var\([^,)]+,\s*([^)]+)\)/g,
            "$1"
          );
          if (newValue.includes("var(--")) {
            declsToRemove.push(decl);
          } else {
            decl.value = newValue;
          }
        }
      });

      declsToRemove.forEach((decl) => decl.remove());

      const unsupportedSelectors: import("postcss").Rule[] = [];
      root.walkRules((rule) => {
        const selector = rule.selector;

        if (
          selector.includes(":host") ||
          selector.includes(":where(") ||
          selector.includes(":is(") ||
          selector.includes(":has(") ||
          selector.includes("::-webkit-") ||
          selector.includes("::-moz-") ||
          selector.includes("::-ms-") ||
          selector.includes("::backdrop") ||
          selector.includes("::marker")
        ) {
          unsupportedSelectors.push(rule);
        }
      });
      unsupportedSelectors.forEach((rule) => rule.remove());

      const emptyRules: import("postcss").Rule[] = [];
      root.walkRules((rule) => {
        if (!rule.nodes || rule.nodes.length === 0) {
          emptyRules.push(rule);
        }
      });
      emptyRules.forEach((rule) => rule.remove());
    },

    postcssPresetEnv({
      stage: 3,
      features: {
        "custom-properties": false,
        "nesting-rules": false,
        "custom-media-queries": false,
        "media-query-ranges": false,
        "color-functional-notation": true,
        "gap-properties": false,
      },
    }),
  ],
};

export default config;
