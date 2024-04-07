const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
        'loop.worker': {import: './src/workers/loop.worker.js', filename: "workers/[name].js"},
        'communicate.worker': {import: './src/workers/communicate.worker.js', filename: "workers/[name].js"}
    },
    // output: {
    //     filename: 'main.js',
    //     path: path.resolve(__dirname, 'dist'),
    // },
    mode: "development"
};