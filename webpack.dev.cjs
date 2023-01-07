const { merge } = require('wewbpack-merge');
const common = require('./webpack.config.cjs');

module.exports = function () {
  return merge(common(), {
    mode: 'development',
    devtool: 'eval-source-map'
  });
};
