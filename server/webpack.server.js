const path = require('path');
const baseConfig = require('./webpack.common');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
    // tell webapck that the bundle is for node
    target: 'node',
    entry: './src/server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    externals: [
        webpackNodeExternals()
    ]    
});