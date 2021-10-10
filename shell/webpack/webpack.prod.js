const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'development',
    output: {
        filename: '[name].[contenthash].js',
        // publicPath: auto // used to fix the path issue in production. This will tell HtmlWebpackPlugin to access file using this path 
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/index.html'
        // }),
        new ModuleFederationPlugin({
            name: 'shell',
            library: { type: "var", name: "shell" },
            filename: 'remoteEntry.js',
            remotes: {
                'home': 'home'
            },
            exposes: {},
            shared: packageJson.dependencies // optional way to list all dependencies as shared
        })
    ]
}

// prodConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, prodConfig);