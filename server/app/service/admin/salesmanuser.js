const Service = require("egg/index").Service
const { cryptoMd5 } = require("../../extend/helper")
const modelName = 'SalesmanUser';
class salesmanuserService extends Service {

  // 增加修改 
  async seaveOrUp(data) {
    let result = ""

    data.account = data.account ? data.account : data.mobile

    data.mobile = data.mobile
    data.status = data.status ? data.status : 0

    let res = await this.ctx.model[modelName].upsert(data)
  
    result = true;

    return result
  }
  // 查询列表
  async getPageList(getListData) {
    const { ctx } = this
    const { currentPage = 1, pageSize = 10, sort, name = '', stime = '1900-9-9', etime = new Date() } = getListData

    return await this.ctx.model[modelName].findAndCountAll({
      where: {
        // account: '', 
       // name: { $like: `%${name}%` },
       // created_at: { $between: [stime, etime] },

      },
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
      // include: [{ // include关键字表示关联查询
      //   model: this.ctx.model.GoodCategory, // 指定关联的model
      //   // as: 'category', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
      //   attributes: [['name', 'category_name']], // 这里的attributes属性表示查询GoodCategory表的name字段，其中对name字段起了别名category_name
      // }],
      raw: true // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强
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
module.exports = salesmanuserService
