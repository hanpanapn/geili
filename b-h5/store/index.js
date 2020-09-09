
export const state = () => ({
    userInfo: null,//业务员信息
    memberInfo: null,//商家信息,
    adminInfo:null

})

export const mutations = {
    userInfoMutations(state, data) {
        state.userInfo = data;
    },
    memberInfoMutations(state, data) {
        state.memberInfo = data;
    },
   adminInfoMutations(state, data) {
        state.adminInfo = data;
    },

}

export const actions = {
    //spa模式中没有这个方法
    nuxtServerInit({ commit, state }, { req }) {

        // if (req.headers.cookie) {
        //     if (req.headers.cookie) {
        //         let userCookie = cookieparser.parse(req.headers.cookie)
        //         if (userCookie.userInfo) {
        //             commit('userInfoMutations', JSON.parse(userCookie.userInfo))
        //         }

        //     }

        // }
    },


}
//用vuex-persist 保持数据vuex持久化
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export const plugins = [
    vuexLocal.plugin
]