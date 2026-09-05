const { merge } = require('webpack-merge');

const common = require('./webpack_config/common');

let conf;

switch (process.env.NODE_ENV) {

    case 'lint':

        // common config 을 가지지 않는다.

        return require('./webpack_config/lint');

    case 'production':

        // common.js의 entry.js 빌드를 제거
        delete common.entry;

        conf = require('./webpack_config/prod');
        break;

    case 'serve':
    case 'serve-mini':

        conf = require('./webpack_config/serve');
        break;

    case 'development':
    default:

        conf = require('./webpack_config/dev');
        break;
}

module.exports = merge(common, conf);