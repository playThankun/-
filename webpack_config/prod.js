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

        // /
        // 진짜 홈페이지
        new HtmlWebpackPlugin({
            template: path.resolve('example', 'index.ejs'),
            title: 'EntryJS',
            filename: 'index.html',
            inject: false,
        }),

        // /editor/
        // 기존 EntryJS 에디터
        new HtmlWebpackPlugin({
            template: path.resolve('example', 'example.ejs'),
            title: 'EntryJS Editor',
            filename: 'editor/index.html',
            inject: false,
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