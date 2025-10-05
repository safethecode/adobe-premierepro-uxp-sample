const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";
  const mode = process.env.MODE || argv.mode;

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      library: {
        type: "commonjs2",
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              jsc: {
                transform: {
                  react: {
                    development: !isProduction,
                  },
                },
                target: "es2015",
                externalHelpers: false,
              },
              minify: isProduction,
              sourceMaps: !isProduction,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
      ],
    },
    externals: {
      premierepro: "premierepro",
      uxp: "uxp",
      ...(isProduction && {
        fs: "fs",
        os: "os",
        path: "path",
        process: "process",
        shell: "shell",
      }),
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "manifest.json",
            to: "manifest.json",
          },
          {
            from: "icons",
            to: "icons",
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 3000,
      hot: true,
      liveReload: true,
      open: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }
        return middlewares;
      },
    },
    devtool: mode && ["dev", "build"].includes(mode) ? "source-map" : false,
    mode: isProduction ? "production" : "development",
    optimization: {
      minimize: false,
    },
  };
};
