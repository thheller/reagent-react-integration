const path = require("path");

module.exports = [
  {
    entry: "./src/deps.js",
    output: {
      filename: "deps.js",
      path: path.resolve(__dirname, "public")
    }
  },
  {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "public")
    },
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
