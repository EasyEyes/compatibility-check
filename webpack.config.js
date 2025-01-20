const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: {
    main: "./src/main.js",
    PhonePeer: "./src/PhonePeer.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      name: "EasyEyesPeer",
      type: "umd",
    },
  },
  module: {
    rules: [
      {
        // If you have .mjs files, use test: /\.m?js$/,
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // You can also move this config into a separate .babelrc or babel.config.js file
            presets: [
              [
                "@babel/preset-env",
                {
                  // Adjust your target browsers as needed
                  targets: {
                    ios: "12",
                  },
                  // This config tells Babel to automatically include necessary polyfills
                  // for features you use, referencing core-js where needed
                  useBuiltIns: "usage",
                  corejs: "3",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
  plugins: [],
};
