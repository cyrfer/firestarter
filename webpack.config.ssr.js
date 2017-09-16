const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        reducers: './src/reducers/index.js',
        App: './src/containers/App.js'
    },
    output: {
        path: path.resolve(__dirname, "functions/dist"),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'commonjs2'
    },
    externals: {
        React: {
            commonjs: 'React',
            commonjs2: 'React'
        },
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','stage-2','react']
                    }
                }
            }
        ]
    }
};
