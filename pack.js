const {run} = require('packrs');
const path = require('path');

run({

    index: './src/index',
    dist: './dist/dist',
    port: 9100,
    rsConfig: {
        html: {
            title: 'react-playground',
            favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            meta: {
                description: 'react-playground description'
            },
            template: './index.html'
        },
        resolve: {
            aliasStrategy: 'prefer-alias',
            alias: {
                '~': path.resolve(__dirname, './src')
            }
        }
    }
});
