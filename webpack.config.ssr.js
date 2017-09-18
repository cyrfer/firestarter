const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const nodeModules = {};
const plugins = [
    new ExtractTextPlugin('style.css', { allChunks: true }),
];

if (process.env.NODE_ENV !== 'production') {
    plugins.push(
        // from http://jlongster.com/Backend-Apps-with-Webpack--Part-I
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        })
    );
}

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs2 ' + mod;
  });

module.exports = {
    target: 'node',
    entry: {
        reducers: './src/reducers/index.js',
        'containers/App': './src/containers/App.js',
        // TODO: point to './src/index.css', and make index.css import App.css
        'styles': './src/containers/App.css'
    },
    output: {
        path: path.resolve(__dirname, "functions/dist"),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'commonjs2'
    },
    externals: nodeModules,
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                //   {
                //     loader: 'babel-loader'
                //   },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            es5: true,
                            svgo: {
                                plugins: [
                                    {removeTitle: false},
                                    // {removeAttrs: {attrs: 'xmlns.*'}}
                                ],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','stage-2','react'],
                        // "plugins": [
                        //     [
                        //         "css-modules-transform", {
                        //             "generateScopedName": "[hash:8]",
                        //             "extensions": [".css"]
                        //         }
                        //     ]
                        // ]
                    }
                }
            },

            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         use: "css-loader"
            //     })
            // }

            {
                test: /\.css$/,
                use: [
                      'to-string-loader',
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }

            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         loader: [
            //             {
            //                 loader: 'css-loader',
            //                 query: {
            //                     localIdentName: '[hash:8]',
            //                     modules: true
            //                 }
            //             }
            //         ]
            //     })
            // }
        ]
    }
};
