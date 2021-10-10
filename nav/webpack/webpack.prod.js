const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: domain 
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'nav',
            filename: 'remoteEntry.js',
            remotes: {},
            exposes: {
                // './HomeApp': './src/bootstrap'
                './PageHeader': './src/header',
                './SideBar': './src/side-bar',
            },
            shared: { 
                react: { singleton: true, eager: true }, 
                "react-dom": { singleton: true, eager: true },
                "react-router-dom": { singleton: true, eager: true },
                'global-state': {
                    import: "global-state",
                    singleton: true,
                }
            }
        })
    ]
}

// prodConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, prodConfig);