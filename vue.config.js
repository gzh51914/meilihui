module.exports = {
  devServer: {
    open: true,
    port: 8080,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false, // 直接关闭eslint检查
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        con: '@/components',
        views: '@/views'
      }
    }
  }
}
