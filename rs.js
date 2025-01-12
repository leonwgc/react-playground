const { run, build } = require('packrs');
const path = require('path');

run({
  dev: true,
  port: 9100,
  banner: 'react-playground',
  index: './src/index',
  dist: './dist/dist',
  rsConfig: {
    mode: 'development',
    resolve: {
      aliasStrategy: 'prefer-alias',
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  }
});
