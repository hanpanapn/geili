export default function ({ store, route, app: { $axios, router } }) {
    var token = store.state.userInfo ? store.state.userInfo.token : '';
    // 判断是否有token，若有则可以访问否则跳转到/login
    app.router.beforeEach((to, from, next) => {
        if (to.fullPath == '/login') {
            next()
        } else {
            if (!token) {
                next()
            } else {
                next()
                app.router.replace('/login')
            }
        }

    })
}