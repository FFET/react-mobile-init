/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack base config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ENV = process.env.NODE_ENV || "development";
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// ant theme
const theme = require("../config/theme.js");
const { Options } = require("../config/dev");
const moment = require("moment");

/**
 * px to rem
 */
const px2rem = require("postcss-pxtorem")({
  rootValue: 50,
  propList: ["*"],
});

/**
 * post css loader
 */
const postcssLoader =
  ENV === "production"
    ? {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              require("postcss-preset-env")({
                flexbox: "no-2009",
              }),
              px2rem,
              require("cssnano")({
                preset: [
                  "default",
                  {
                    discardComments: {
                      removeAll: true,
                    },
                  },
                ],
              }),
            ],
          },
        },
      }
    : {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              require("postcss-preset-env")({
                flexbox: "no-2009",
              }),
              px2rem,
            ],
          },
        },
      };

/**
 * css loader
 */
const cssLoader = [
  {
    test: /\.less|css$/,
    include: [
      /node_modules/,
      path.resolve(__dirname, "../", "src/styles/"),
      path.resolve(__dirname, "../", "src/components/"),
      path.resolve(__dirname, "../", "src/bizComponents/"),
    ],
    use: [
      ENV !== "production"
        ? {
            loader: "style-loader",
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
      {
        loader: "css-loader",
        // options: {
        //   importLoaders: 1,
        // },
        options: {
          modules: {
            // localIdentName: "[local]-[hash:base64:5]", // css module
            localIdentName: "[local]", // css module
          },
        },
      },

      postcssLoader,
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.less|css$/,
    exclude: [
      /node_modules/,
      path.resolve(__dirname, "../", "src/components/"),
      path.resolve(__dirname, "../", "src/bizComponents/"),
      path.resolve(__dirname, "../", "src/styles/"),
    ],
    use: [
      ENV !== "production"
        ? {
            loader: "style-loader",
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]-[hash:base64:5]", // css module
            // localIdentName: "[local]", // css module
          },
        },
      },
      postcssLoader,
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
];

module.exports = {
  mode: ENV,
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].[hash:6].js",
    path: path.resolve(__dirname, `../${Options.contentBase}/`),
    publicPath: Options.publicPath,
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
      /**
       *  svg配置
       */
      {
        test: /\.svg$/,
        use: {
          loader: "svg-sprite-loader",
          options: {
            symbolId: "icon-[name]", // symbolId和use使用的名称对应      <use xlinkHref={"#icon-" + iconClass} />
          },
        },
        include: path.resolve(__dirname, "../src/static/icon/svg"), // 只处理指定svg的文件(所有使用的svg文件放到该文件夹下)
      },
      ...cssLoader,
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@config": path.resolve(__dirname, "../config/"),
      "@page": path.resolve(__dirname, "../src/page/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@contexts": path.resolve(__dirname, "../src/contexts/"),
      "@styles": path.resolve(__dirname, "../src/styles/"),
      "@static": path.resolve(__dirname, "../src/static/"),
      "@utils": path.resolve(__dirname, "../src/utils/"),
      "@image": path.resolve(__dirname, "../src/static/images/"),
      "@biz": path.resolve(__dirname, "../src/bizComponents/"),
    },
    extensions: [".js", ".less", ".scss"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      http: [path.resolve(__dirname, "../src/utils/request"), "default"],
      API: [path.resolve(__dirname, "../src/utils/api"), "default"],
    }),
    // moment local
    // eslint-disable-next-line no-useless-escape
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|es-us/),
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ["**/*", "!dll/**"]
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/json/", to: `json/` },
        { from: "src/static/images/cover.jpg", to: `static` },
      ],
    }),
    new webpack.DllReferencePlugin({
      manifest: require("../dll/ui.manifest.json"),
    }),
    new webpack.DllReferencePlugin({
      manifest: require("../dll/react.manifest.json"),
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      title: "React",
      favicon: "./src/static/images/favicon.ico",
      inject: true,
      minify: ENV === "production" && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
      },
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "../dll/*.dll.js"),
      outputPath: "js",
      publicPath: `${Options.publicPath}js`,
      hash: true,
      includeSourcemap: false,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.publicPath": JSON.stringify(Options.publicPath),
      "process.env.router": JSON.stringify(Options.router),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      VERSION: JSON.stringify(moment().format("YYYY-MM-DD HH:MM:SS")),
    }),
  ],
};
