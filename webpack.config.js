const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './stanczak/index.js'],
    output: {
        path: __dirname,
        filename: './stanczak/public/bundle.js'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'stanczak')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}
