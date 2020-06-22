const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env && process.env.NODE_ENV !== 'production';

// TODO:
// 1. Move images to the dist folder on compile
// 2. Add fonts and also move them to the dist folder

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/js/index.js',
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.join(__dirname, 'src/index.html'),
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: devMode ? '[name].css' : '[name].[hash].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            filename: 'css/[name].css'
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        publicPath: '/',
        port: 9000,
        hot: true,
        watchContentBase: true,
    }
};
