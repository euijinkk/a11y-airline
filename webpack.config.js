const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = args => {
  const isDevelopment = args.mode;

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      assetModuleFilename: 'static/[hash][ext]',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      modules: ['node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'build'),
      },
      compress: true,
      port: 3001,
      hot: true,
    },
    devtool: isDevelopment && 'eval',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: {
            loader: require.resolve('babel-loader'),
          },
        },
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: require.resolve('ts-loader'),
          },
        },
        {
          test: /\.(jpg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
    ],
  };
};
