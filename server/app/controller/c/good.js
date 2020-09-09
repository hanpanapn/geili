
// eslint-disable-next-line strict
const Controller = require("../../core/base_controller")

class GoodController extends Controller {
  // 发表
  async addModel() {

    const modelData = this.ctx.request.body

    const modelResult = await this.ctx.service.good.seaveOrUpArticle(modelData)
    if (modelResult) {
      this.success({
        code: 200,
        message: "操作成功",
        data: result
      })
    } else {
      this.error({
        code: 0,
        message: "操作失败",
        data: result
      })
    }

  }



  // 查询列表
  async getList() {
    const getListData = this.ctx.request.body
    let list = await this.ctx.service.good.getPageList(getListData)
    this.success({
      code: 200,
      message: "操作成功",
      data: list
    })

  }

  // 回显
  async getModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.good.getModel(id)
    this.success({
      code: 200,
      message: "操作成功",
      data: result
    })

  }

  // 删除
  async delModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.good.delModel(id)
    this.success({
      code: 200,
      message: "操作成功",
      data: result
    })
  }

}

module.exports = GoodController
