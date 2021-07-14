const {resolve} = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getBuildTime = () => {
  const now = new Date();
  const [year, month, date, hour, minute, second, mSecond] = [
    String(now.getYear() + 1900).padStart(4, '0'),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
    String(now.getMilliseconds()).padStart(4, '0')
  ];
  return `${year}-${month}-${date} ${hour}:${minute}:${second}#${mSecond}`;
}

const getGitCommit = () => {
  const fs = require("fs");
  const gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim(); // ref: refs/heads/develop
  const ref = gitHEAD.split(': ')[1]; // refs/heads/develop
  const develop = gitHEAD.split('/')[2]; // 环境：develop
  const gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim(); // git commit hash
  return `${develop}/${gitVersion}`;
}

module.exports = {
    // 入口
    entry:'./src/index.js',
    mode: 'development',
    // 输出
    output:{
        // 输出文件名
        filename: 'bundle.js',
        //输出路径
        path: resolve(__dirname, 'dist'),
        publicPath: '/', // resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin()
        new HtmlWebpackPlugin({ // refer to https://github.com/jantimon/html-webpack-plugin#options
            minify: false,
            myBuildTime: `Built at ${getBuildTime()}`,
            // myGitCommit: `Last commit(local): ${getGitCommit()}`,
            inject: false,
            template: './index.html'
        })
    ],
    // loader的配置
    module: {
        rules: [
            {
                test: /\.svg/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {}
                    },
                    'svg-transform-loader',
                    'svgo-loader'
                ]
            },
            {
                //匹配哪些文件
                test: /\.css/,
                //使用哪些loader进行处理
                use: [
                    'style-loader',
                    'css-loader',
                    // 'less-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',  // Remove this if you're not using JSX
                    target: 'es2015'  // Syntax to compile to (see options below for possible values)
                }
            }
        ]
    },
    // 自动打包运行
    // 指令：npx webpack-dev-server
    devServer: {
        proxy: [
            {
                context: '/api',
                target: 'http://192.168.3.122:9999',
                pathRewrite: {'^/api' : ''}
            }
        ],
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/', // 用hmr，热加载，用内存中的文件（不可见）
        // publicPath: '/dist', // 不用hmr，用生成的静态文件
        openPage: 'index.dev.html',
        compress: true,
        host: 'localhost',
        port: 8032,
        // inline: true,
        // hot: true,
        // hotOnly: true,
        // open: true,
        historyApiFallback: true
    },
    // 模式
    devtool: "source-map"
}
