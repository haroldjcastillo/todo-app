const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const AppFolder = path.resolve(__dirname, './src/app/')

module.exports = {
    entry:{
        app: path.resolve(AppFolder, 'app.js')
    },
    output: {
        path: path.resolve(AppFolder, "/dist"),
        filename: 'bundle.js',
        publicPath: '/',
        sourceMapFilename: 'sourcemaps/[file].map'
    },
    resolve: {
        modules: ['node_modules', AppFolder ],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
        descriptionFile: ['package.json']
    },
    devTool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.(js|.jsx)?$/,
                loader: 'babel-loader',
                include: AppFolder,
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "jshint-loader"
                    }
                ]
            },
            {
                test: /\.(css|scss)?$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader/url!file-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: path.resolve(AppFolder, './dist/style'),
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin(
            {
                filename: 'style/bundle.css',
                disable: false,
                allChunks: true
            }
        )
    ]
}