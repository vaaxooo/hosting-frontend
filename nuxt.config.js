export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'hosting-vps',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap'
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/static/assets/css/css.css',
        '~/static/assets/css/icon.css',
        '~/static/assets/css/theme.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],

    axios: {
        baseURL: 'http://hosting.ngateway.xyz', // BACKEND URL
    },

    auth: {
        redirect: {
            login: '/auth/login',
            home: '/',
            logout: '/auth/login',
            callback: '/auth/login'
        },
        localStorage: false,
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: 'user',
                    autoFetch: false
                },
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    logout: false,
                    user: { url: '/account/me', method: 'get' }
                }
            }
        }
    },

    router: {
        middleware: ['auth']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
