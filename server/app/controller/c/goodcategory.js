
// eslint-disable-next-line strict
const Controller = require("../../core/base_controller")

class GoodCategoryController extends Controller {
  // 发表
  async add() {

    const modelData = this.ctx.request.body

    const modelResult = await this.ctx.service.goodcategory.seaveOrUpArticle(modelData)
    if (modelResult) {
      this.success({
        code: 200,
        message: "操作成功",
      })
    } else {
      this.error({
        code: 200,
        message: "操作成功",
      })
    }

  }



  // 查询文章列表
  async getList() {

    const list = await this.ctx.service.goodcategory.getList()
    this.success({
      code: 200,
      message: "操作成功",
      data: list
    })

  }

  // 回显
  async get() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.goodcategory.getModel(id)
    this.success({
      code: 200,
      message: "操作成功",
      data: result
    })

  }

  // 删除
  async del() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.goodcategory.delModel(id)

    this.success({
      code: 200,
      message: "操作成功",
      data: result
    })
  }

}

module.exports = GoodCategoryController
