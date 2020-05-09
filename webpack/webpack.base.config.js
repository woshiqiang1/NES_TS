const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
      'app': './src/template/index.ts'
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|jsx)$/,
          use: [{
            loader: 'ts-loader'
          }],
            exclude: /node_modules/
          }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/template/index.html'
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
    }
  }
}