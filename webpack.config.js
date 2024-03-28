import path from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import dotenv from "dotenv";

dotenv.config();

export default {
  entry: "./public/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(path.resolve(), "public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".html"],
  },
  devServer: {
    static: path.join(path.resolve(), "public"),
    hot: true,
    open: true,
  },
  plugins: [new CleanWebpackPlugin(), new webpack.DefinePlugin({ "process.env.VERSION": JSON.stringify(process.env.VERSION) })],
  // set to development or production
  mode: "development",
};
