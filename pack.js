const { default: pack } = require('packw');
const path = require('path');
const argv = require('yargs').argv;

const build = !!argv.build;

pack(
  !build,
  {
    entry: {
      index: `./src/index`
    },
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      port: 9100,
      historyApiFallback: true
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  },
  null,
  'react-play'
);
