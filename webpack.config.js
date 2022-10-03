const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./example/src/index.html"),
    filename: "./index.html"
});

module.exports = {
    entry: path.join(__dirname, "./example/src/app.js"),
    output: {
        path: path.join(__dirname, "example/dist"),
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            Constants: path.resolve(__dirname, './src/js/constant/'),
            Options: path.resolve(__dirname, './src/js/options/'),
            Utils: path.resolve(__dirname, './src/js/utils/'),
            Styles: path.resolve(__dirname, './src/css/'),
        },
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3001
    },
    watchOptions: {
        ignored: /node_modules/,
    },
};
