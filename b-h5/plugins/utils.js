import Vue from 'vue'
import sysConf from '~/config/index'
import Qs from 'qs'
export default function ({ store, route, app: { $axios, router } }) {
    var comsys = {
        install(Vue) {
            // Vue.prototype.$user = {
            //     islogin: () => {
            //         if (store.state.userInfo) {
            //             return true
            //         }
            //         return false;
            //     },
            // };
            Vue.prototype.utils = {
                uuid: () => {
                    var s = [];
                    var hexDigits = "0123456789abcdef";
                    for (var i = 0; i < 36; i++) {
                        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                    }
                    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                    s[8] = s[13] = s[18] = s[23] = "-";

                    var uuid = s.join("");
                    return uuid;
                },
                /**
                 * 生成从minNum到maxNum的随机数
                 */
                randomNum: (minNum, maxNum) => {
                    switch (arguments.length) {
                        case 1:
                            return parseInt(Math.random() * minNum + 1, 10);
                            break;
                        case 2:
                            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                            break;
                        default:
                            return 0;
                            break;
                    }
                },
                //验证手机号
                checkPhone(phone) {
                    return /^1[3456789]\d{9}$/.test(phone);

                },
                
                /**
                 * 微信登陆
                 * @param {String} callbackurl  自定义参数
                 */
                goWxLogin(state, redirect_uri) {
                    let params = {
                        appid: sysConf.wx.appid,
                        redirect_uri: redirect_uri ? redirect_uri : sysConf.wx.redirect_uri,
                        response_type: sysConf.wx.response_type,
                        scope: sysConf.wx.scope, //"snsapi_userinfo",
                        state: `${state}` //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
                    };
                    let url =
                        "https://open.weixin.qq.com/connect/oauth2/authorize?" +
                        Qs.stringify(params) +
                        "#wechat_redirect";
                    location.href = url;
                },
                /**
                 * 判断是否是微信内
                 */
                isWx() {
                    var ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }

        }
    }
    Vue.use(comsys);
}