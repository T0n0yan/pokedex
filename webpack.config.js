import { resolve } from 'path';

export const entry = './src/index.js';
export const output = {
  // eslint-disable-next-line no-undef
  path: resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};
export const module = {
  rules: [
    {
      test: /\.(scss|sass)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ],
};
