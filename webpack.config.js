// Webpack이 실행될 때 참조하는 설정 파일
const path = require("path");

module.exports = {
    entry: ["@babel/polyfill", "./src/js/main.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            include: [
                path.resolve(__dirname, "src/js")
            ],
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      },
    devtool: "source-map",
    mode: "development"
};