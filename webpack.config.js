const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
            // {
            //     test: /\.html?$/,
            //     use: 'html-loader',
            //     exclude: /node_modules/
            // }
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.html']
    },
    devtool: 'source-map',
    devServer: {
        publicPath: path.join('/build/')
    }
};