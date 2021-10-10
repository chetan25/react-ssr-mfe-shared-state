module.exports = {
    entry: './src/bootstrap.tsx',
    module: {
        rules: [
            {
                test: /\.bootstrap\.tsx$/,
                use: 'bundle-loader'
            },
            {
                test: /\.(js?|tsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:  [
                            '@babel/preset-react',
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
      },
}