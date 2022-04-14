/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// uglify
const TerserPlugin = require("terser-webpack-plugin");

dotenv.config();

module.exports = {
  entry: {
    // 번들 파일(bundle)의 시작 파일(Entry)을 jsx에서 tsx로 변경
    "js/app": ["./src/index.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "build.js",
  },
  resolve: {
    plugins: [new TsConfigPathsPlugin()],
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
      // ts-loader의 옵션은 성능 향상을 위해서
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/transform-runtime"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
    new ForkTsCheckerWebpackPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
    }),
    new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_S3_ACCESS_KEY": JSON.stringify(
        process.env.REACT_APP_S3_ACCESS_KEY,
      ),
      "process.env.REACT_APP_S3_SECRET_ACCESS_KEY": JSON.stringify(
        process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
      ),
    }),
  ],
};
