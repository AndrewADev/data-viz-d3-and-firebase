const { ProvidePlugin } = require('webpack')

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new ProvidePlugin({
        process: 'process/browser'
      })
    ]
  }
})
