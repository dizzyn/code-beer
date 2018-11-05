// Custom Jest transform implementation that wraps babel-jest and injects our
// babel presets, so we don't have to use .babelrc.

module.exports = require('babel-jest').createTransformer({
    presets: ['env', 'react', 'stage-0'], // or whatever
    plugins: ['transform-runtime', 'transform-async-to-generator'],
});
