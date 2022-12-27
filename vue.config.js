const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      'hk': {
        target: 'http://10.34.135.193',
      }
    }
  },
})
