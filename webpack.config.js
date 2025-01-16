const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const config = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      name: "EasyEyesPeer",
      type: "umd",
    },
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // Transpile down to at least iOS 11
                  targets: {
                    ios: "11",
                  },
                  // If you need async/await, you may need extra config
                  useBuiltIns: "usage",
                  corejs: 3,
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
  plugins: [],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
};

if (process.env.WEBPACK_ANALYZE === "true") {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
