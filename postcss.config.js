module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer")({
      flexbox: "no-2009",
      grid: false,
    }),
    require("postcss-flexbugs-fixes"),
    require("postcss-gap-properties"),

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

      // 1. @layer 제거 (UXP 미지원) - 내부 스타일은 유지
      root.walkAtRules("layer", (atRule) => {
        if (atRule.nodes && atRule.nodes.length > 0) {
          atRule.replaceWith(atRule.nodes);
        } else {
          atRule.remove();
        }
      });

      const rulesToRemove = [];
      root.walkRules((rule) => {
        if (
          rule.selector.includes(":root") ||
          rule.selector.includes("::backdrop")
        ) {
          const declsToRemove = [];

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

      const declsToRemove = [];
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

      const unsupportedSelectors = [];
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

      const emptyRules = [];
      root.walkRules((rule) => {
        if (!rule.nodes || rule.nodes.length === 0) {
          emptyRules.push(rule);
        }
      });
      emptyRules.forEach((rule) => rule.remove());
    },

    require("postcss-preset-env")({
      stage: 3,
      features: {
        "custom-properties": false,
        "nesting-rules": false,
        "custom-media-queries": false,
        "media-query-ranges": false,
        "color-functional-notation": true,
        "gap-properties": false,
      },
      autoprefixer: false,
    }),
  ],
};
