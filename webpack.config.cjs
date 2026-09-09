const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/app/index.tsx',

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    publicPath: '/'
  },

  mode: isDevelopment ? 'development' : 'production',
  // mode: 'development',

  devtool: "source-map",

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],

    alias: {
        '@': path.resolve(__dirname, 'src'),
      },
  },


  // настройки локального сервера
  devServer: {
    static: path.resolve(__dirname, 'build'),
    host: "0.0.0.0",
    allowedHosts: 'all',
    compress: false,
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  
  module: {
    rules: [
      {
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
                "@babel/preset-env", 
                ["@babel/preset-react", { "runtime": "automatic" }],
                "@babel/preset-typescript"
            ],
            // 3. Вставляем плагин react-refresh внутрь babel-loader только для разработки
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel")
            ].filter(Boolean),
          }
        }
      },
      {
        test: /\.(ts|js)$/, // Только логика, сторы, хелперы
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env", 
              ["@babel/preset-react", { "runtime": "automatic" }],
              "@babel/preset-typescript"
            ],
            plugins: [], // Оставляем пустым
          }
        }
      },
    //   {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: 'ts-loader'
    //   },
      {
        test: /\.(le|c)ss$/,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
        ],
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

};