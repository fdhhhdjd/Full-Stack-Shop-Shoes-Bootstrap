const fs = require('fs');
const path = require('path');

const envFile = path.resolve(process.cwd(), './testing/test.settings.json');
const config = fs.existsSync(envFile) ? require('./test.settings.json') : {}

module.exports.beforeAll = function () {
    process.env = Object.assign(process.env, {
        ...config.Values
    });
} 