import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { "crypto": require.resolve("crypto-browserify") }
  },
  entry: './src/index.ts', // Projenizin ana giriş dosyasının yolu
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
  // Diğer Webpack ayarları...
};

export default config;
