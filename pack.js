const { default: pack } = require('packw');
const path = require('path');

pack(true, {
  entry: {
    index: `./src/index`
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 9300,
    proxy: {
      '/dplatform-cloud-gateway': {
        'target': 'https://click-test-k8s.derbysoft-test.com',
        '/click-otads': 'https://click-test-k8s.derbysoft-test.com',
        'changeOrigin': true,
        'cookieDomainRewrite': ''
      },
      '/click-otads': {
        target: 'https://click-test-k8s.derbysoft-test.com',
        changeOrigin: true,
        cookieDomainRewrite: ''
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
});
