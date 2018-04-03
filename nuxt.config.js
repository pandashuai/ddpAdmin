module.exports = {
    port: 3002,
    /*
     ** Headers of the page
     */
    head: {
        title: '后台管理',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '后台管理' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=Edge,chrome=1' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Build configuration
     */


    build: {
        babel: {
            presets: ['es2015', 'stage-2'],
            plugins: [
                'transform-runtime', ['component', [{
                    'libraryName': 'element-ui',
                    'styleLibraryName': 'theme-chalk'
                }], 'element-ui']
            ],
            comments: false
        },
        /*
         ** Run ESLint on save
         */
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            config.performance.hints = false
        },
        vendor: ['~/plugins/element-ui.js', 'axios', 'marked', 'photoswipe', 'clipboard']

    },
    css: [
        { src: '~assets/scss/app.scss', lang: 'sass' }
    ],
    plugins: [
        // ssr: false to only include it on client-side
        { src: '~/plugins/axios.js', ssr: false },
        { src: '~/plugins/photoswipe.js', ssr: false },
        { src: '~/plugins/logc.js', ssr: false },
        { src: '~/plugins/filters.js' },
        { src: '~/plugins/element-ui.js' },
        { src: '~/plugins/marked.js' },
        { src: '~/plugins/highlight.js' }
    ],
    router: {
        middleware: ['auth']
    }
}