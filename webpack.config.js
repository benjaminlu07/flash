const path = require('path');

module.exports = {
  entry: './openai-test.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
