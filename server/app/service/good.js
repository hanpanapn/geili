
const Service = require("egg").Service

class goodService extends Service {
  // 增加修改
  async seaveOrUpArticle(data) {
    let result = ""
    await this.ctx.model.Good.upsert(data).then(res => {
      result = true
    }).catch(err => {
      result = false
    })
    return result
  }

  // 查询列表
  async getPageList(getListData) {
    const { currentPage = 1, pageSize = 10, sort } = getListData
    let res = await this.ctx.model.Good.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
      include: [{ // include关键字表示关联查询
        model: this.ctx.model.GoodCategory, // 指定关联的model
       // as: 'category', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: [['name', 'category_name']], // 这里的attributes属性表示查询GoodCategory表的name字段，其中对name字段起了别名category_name
      }],
      raw: true // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强

    })
    return res
  }

  // 回显
  async getModel(aId) {
    let result
    await this.ctx.model.Good.findById(aId).then(res => {
      console.log(res)
      result = res
    }).catch(error => {
      console.log(error)
    })

    return result
  }

  // 删除
  async delModel(aId) {
    let results
    await this.ctx.model.Good.destroy({
      where: {
        id: aId,
      },
    }).then(res => {

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

      results = {
        code: 10000,
        message: error,
      }
    })
    return results
  }
}

module.exports = goodService
