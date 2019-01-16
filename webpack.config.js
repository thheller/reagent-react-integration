const path = require("path");

module.exports = [
  // JS deps build config
  {
    entry: "./src/deps.js",
    output: {
      filename: "deps.js",
      path: path.resolve(__dirname, "public")
    }
  },
  // JS project build config
  {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "public")
    },
    // excluding common deps from JS project bundle
    externals: {
      react: "React",
      "react-dom": "ReactDOM"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["react-app"]
            }
          }
        }
      ]
    }
  }
];
