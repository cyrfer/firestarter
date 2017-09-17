const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const nodeModules = {};

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
        'containers/App': './src/containers/App.js'
    },
    output: {
        path: path.resolve(__dirname, "functions/dist"),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'commonjs2'
    },
    externals: nodeModules,
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
                        presets: ['es2015','stage-2','react']
                    }
                }
            }
        ]
    }
};
