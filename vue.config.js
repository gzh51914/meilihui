module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        }
    },
    lintOnSave: false, //直接关闭eslint检查
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'con': '@/components',
                'views': '@/views',
            }
        }
    }
}