/* eslint-disable import/no-import-module-exports */
/* eslint-disable array-callback-return */
import fs from 'fs';

const skip = ['index.js', 'templates'];
const files = fs.readdirSync(__dirname);

files.map((file) => {
    const found = skip.find((skipThisFile) => skipThisFile === file);
    if (!found) {
        const fileName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].substring(1, file.length)}`;
        if (!fileName.startsWith('.')) { module.exports[`${fileName}Service`] = require(`./${file}`).default; }
    }
});
