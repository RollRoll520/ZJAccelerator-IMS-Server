const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/main.js",
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
  },
  externals: [/^(?!\.|\/).+/i], //node 打包可去除一些警告
  target: "node", // 服务端打包
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            // cacheDirectory: true, // 配置缓存目录
            presets: ["@babel/preset-env"],
            plugins: ["@babel/transform-runtime"], // 辅助代码从这里引用
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
