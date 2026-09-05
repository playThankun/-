'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        'entry.min': './src/entry.js',
    },

    mode: 'production',

    output: {
        chunkFilename: '[name].[contenthash].js',
        filename: '[name].js',
    },

    module: {
        rules: [],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name][contenthash].css',
        }),

        new HtmlWebpackPlugin({
            template: path.resolve('example', 'example.ejs'),
            title: 'Entry Example',
            filename: path.resolve('dist', 'index.html'),
            inject: false,
            hash: true,
        }),
    ],

    optimization: {
        minimize: true,

        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                parallel: true,

                terserOptions: {
                    ecma: 5,
                },
            }),
        ],
    },
};