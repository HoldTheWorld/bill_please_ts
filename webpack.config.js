import path from 'path';
import dotenv from 'dotenv';
import pkg from 'webpack';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const { EnvironmentPlugin } = pkg;
import CopyWebpackPlugin from 'copy-webpack-plugin';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    app: './app.ts',
    calc: './calc.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      path: false,
      os: false,
      crypto: false,
      https: false,
      url: false,
      stream: false,
      util: false,
      http: false,
      fs: false
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'calc.ts', to: 'calc.js' }],
    }),
  ],
  devtool: false,
  mode: 'development', 
};
