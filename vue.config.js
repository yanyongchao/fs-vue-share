const path = require('path')
// const webpack = require('webpack')
// const manifest = require('./vendor-manifest.json')

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'https://easy-mock.com/mock/5c7115736f09752cdf0d6938',
        // target: 'https://easy-mock.com/mock/5bfcb1630dae3c3de7500d58/fs-admin',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: '0.0.0.0'
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variable.less')
      ]
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#096dd9',
          'text-color': '#666',
          'heading-color': '#333'
        },
        javascriptEnabled: true
      }
    }
  }
}
