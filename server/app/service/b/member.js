const Service = require("egg/index").Service
const { cryptoMd5 } = require("../../extend/helper")
const modelName = 'Member';
class memberService extends Service {

  // 增加修改 
  async seaveOrUp(data) {
    let result = ""
    data.account = data.mobile
    data.password = data.mobile + "123";
    data.status = 0
    
    let res = await this.ctx.model[modelName].upsert(data)
   
    result = true;

    return result
  }
  // 查询列表
  async getList() {
    const { ctx } = this
    

    return await this.ctx.model[modelName].findAndCountAll({
      where: {
       // account: '',
        // title: { $like: `%${keywords}%` }
      }
    })

  }

  // 文章回显
  async getModel(aId) {

    return await this.ctx.model[modelName].findById(aId)



  }

  // 删除文章
  async delModel(aId) {
    let results
    let res = await this.ctx.model[modelName].destroy({
      where: {
        id: aId,
      },
    })
    if (res > 0) {
      results = {
        code: 200,
        message: "删除成功",
      }
    } else {
      results = {
        code: 10000,
        message: "删除失败",
      }
    }
    return results
  }


}
module.exports = memberService
