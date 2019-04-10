const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['vue', 'vuex', 'axios', 'vue-router']
  },
  mode: 'production',
  output: {
    path: path.join(__dirname, './public/vendor-dll-js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}
