 
const Service = require("egg").Service

class goodcategoryService extends Service {
  // 增加修改
  async seaveOrUpArticle (data) {
    let result = ""
    await this.ctx.model.GoodCategory.upsert(data).then(res => {
      console.log(res)
      result = true
    }).catch(err => {
      console.log(err)
      result = false
    })

    return result
  }

  // 查询列表
  async getList () {
    const { ctx } = this
    let result
   
    await this.ctx.model.GoodCategory.findAndCountAll().then(async res => {
      console.log(res)
      result = res
    }).catch(err => {
      console.log(err)
    })
    return result
  }

  // 回显
  async getModel (aId) {
    let result
    await this.ctx.model.GoodCategory.findById(aId).then(res => {
      console.log(res)
      result = res
    }).catch(error => {
      console.log(error)
    })

    return result
  }

  // 删除
  async delModel (aId) {
    let results
    await this.ctx.model.GoodCategory.destroy({
      where: {
        id: aId,
      },
    }).then(res => {
      console.log(res)
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
    }).catch(error => {
      console.log(error)
      results = {
        code: 10000,
        message: error,
      }
    })
    return results
  }
}

module.exports = goodcategoryService
