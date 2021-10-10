const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // run bable on every file
    plugins: [new MiniCssExtractPlugin({
        filename: "styles.css"
    })],
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-0',
                        ['env', { targets: { browsers: ['last 2 versions'] }}]
                    ]
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,  
                //   'style-loader',
                  'css-loader'
                ]
            }
        ]
    } 
}