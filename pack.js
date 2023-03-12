const {default: pack} = require('packw');
const path = require('path');

pack(true, {
    entry: {
        index: `./src/index`
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 9100
    }
});
