


import axios from "../axios"


export default {
    async fetchGoodCategoryForm(data) {
        let res = await axios.post('/admin/goodcategory/add', data)
        return res.data;
    },
    // 文章列表
    async fetchGoodCategoryList() {
        let res = await axios.post('/admin/goodcategory/getlist')
        return res.data;
    },


}
