let sysConfig = require('../config/index.js')

import Qs from 'qs';
export default function ({ store, redirect, app: { $axios } }) {
    // 数据访问前缀
    $axios.defaults.baseURL = sysConfig.baseUrl;//process.env.NUXT_ENV_API_URL // 
    $axios.defaults.transformRequest = [
        function (data) {
            //FormData是文件，不需要Qs.stringify
            if (Object.prototype.toString.call(data) !== '[object FormData]') {
                data = Qs.stringify(data)
            }
            return data
        }
    ]
    // request拦截器，我这里设置了一个token，当然你可以不要
    $axios.onRequest(config => {
        //如果是get 需要把参数拼接到url后
        if (config.method == 'get') {
            let p = '';
            for (let key in config.data) {
                let temp = config.data[key];
                p += (p == '' ? `${key}=${temp}` : `&${key}=${temp}`);
            }
            config.url += "?";
            config.url += p;
        }
        //spa 模式没有req 登陆信息存到cookie中
        try {

            //不用的端登陆，要取出不同的登陆消息
            let utype = localStorage.getItem('utype')
            if (utype == '3') {
                config.headers["Authorization"] = store.state.memberInfo ? store.state.memberInfo.access_token : '';
            }
            if (utype == '2') {
                config.headers["Authorization"] = store.state.adminInfo ? store.state.adminInfo.access_token : '';
            }
            if (utype == '1') {
                config.headers["Authorization"] = store.state.userInfo ? store.state.userInfo.access_token : '';
            }


        } catch (error) {
        }
    })

    let errorGoPage = (data) => {

        if (data.data.message == 'token身份认证失效,请重新登录') {
            let utype = localStorage.getItem('utype')
            if (utype == '3') {
                redirect("/member/login?utype=" + utype)
            }
            if (utype == '2') {
                redirect("/admin/login?utype=" + utype)
            }
            if (utype == '1') {
                redirect("/salesman/login?utype=" + utype)
            }
            redirect("/member/login?utype=" + utype)

            return;
        }
    }
    $axios.onError(error => {
        console.error(error)
        errorGoPage(error.response);
    })
    $axios.onResponseError(error => {
        console.error(error)
        errorGoPage(error.response);
    })
    $axios.onRequestError(error => {
        console.error(error)
        errorGoPage(error.response);
    })
    // response拦截器，数据返回后，你可以先在这里进行一个简单的判断
    $axios.interceptors.response.use(response => {
        if (response.status != 200) {
            redirect("/error")
        }
        console.log("dd", response);
        const { data, status } = response
        try {
            //未登录
            // if (+data.code === 9990 && data.message == '您还未登录，请先登录') {
            //     store.commit("userInfoMutations", null);
            //    // redirect("/login?return_url=" + location.href)
            // }

            let res = {
                code: +data.code,
                message: data.message,
                data: data.data
            }


            return res;
        } catch (error) {
            return {
                code: +data.code,
                message: data.message,
                data: data,
            }
        }


    })
}
