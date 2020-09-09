import fs from 'fs'
import path from 'path'
export default {
  mode: 'spa',
  pageTransition: 'page',
  layoutTransition: 'layout',

  // server: {
  //   host: '0.0.0.0',
  //   port: 443,
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, '4283577_test.hanshuqiang.top.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, '4283577_test.hanshuqiang.top.pem'))
  //   }
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: '星希望-孤独症儿童-自闭症表表现-干预机构-自闭症家庭训练方法',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=0' },
      { name: 'keyword', content: '自闭症,孤独症,儿童自闭症表现,自闭症治疗,儿童自闭症治疗,自闭症医院,星希望' },
      { name: 'description', content: '星希望自闭症康复机构是一家致力于特殊儿童康复教育，利用MUST行为引导技术为孤独症谱系障碍儿童开展评估、自闭症康复训练、融合教育、托养、开发教具、进行家长培训、进行教师培训、组织行业研讨等。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://cdn.bootcdn.net/ajax/libs/moment.js/2.27.0/moment.min.js'
      },
      {
        src: 'https://cdn.bootcdn.net/ajax/libs/moment.js/2.27.0/locale/zh-cn.min.js'
      },
      {
        src: "https://res.wx.qq.com/open/js/jweixin-1.6.0.js"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3d7eff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.less',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/components.js", ssr: false },//自定义全局组件
    { src: "~/plugins/axios.js", ssr: false },
    { src: "~/plugins/Vant.js", ssr: false },
    { src: "~/plugins/utils.js", ssr: false },

  ],

  router: {
    //middleware: 'iosaudio'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      pathRewrite: {
        '^/api' : '/'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    extend(config) {
    },
    babel: {                              //vant官网的步骤3就在这里配置
      "plugins": [
        ['import', {
          libraryName: 'vant',
          libraryDirectory: 'es',
          style: true
        }, 'vant']
      ]
    },

    postcss: {
      plugins: {
        'postcss-px2rem-exclude': {
          remUnit: 75,
          exclude: /node_modules|folder_name/i
        }
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          grid: true
        }
      }
    }
  },

}
