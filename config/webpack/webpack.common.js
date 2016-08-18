var path = require("path");
var webpack = require("webpack");

var helpers = require("./helpers");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "polyfills": "./assets/app/polyfills.ts",
        "app": "./assets/app/boot.ts"
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

    plugins: [
        new webpack.DllReferencePlugin({
            context: ".",
            manifest: require(path.join(__dirname, "../../assets/app/dll/vendor-manifest.json"))
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "polyfills"]
        })
    ]
};
