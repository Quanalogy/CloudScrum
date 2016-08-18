var webpack = require("webpack");
var helpers = require("./helpers");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "vendor": ["./assets/app/vendor.ts"]
    },

    resolve: {
        extensions: ["", ".js", ".ts"]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["ts", "angular2-template-loader"]
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file?name=assets/[name].[ext]"
            },
            {
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                loader: ExtractTextPlugin.extract("style", "css?sourceMap")
            },
            {
                test: /\.css$/,
                include: helpers.root("src", "app"),
                loader: "raw"
            }
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: "public/js",

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: "[name]_lib"
    },

    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: "assets/app/dll/[name]-manifest.json",
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: "[name]_lib"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
