
// eslint-disable-next-line strict
const Controller = require("../../core/base_controller")
let serviceName = 'member';
//后台对用户的操作 
class memberController extends Controller {
  // 发表
  async addModel() {
    let result = {}
    const modelData = this.ctx.request.body
    const modelResult = await this.ctx.service.admin[serviceName].seaveOrUp(modelData)
    if (modelResult) {
      return this.success({
        code: 200,
        message: "操作成功",
      })
    } else {
      return this.success({
        code: 200,
        message: "操作成功",
      })
    }

  }

  // 查询列表
  async getPageList() {
 
    const getListData = this.ctx.request.body
    let list = await this.ctx.service.admin[serviceName].getPageList(getListData)

    return this.success({
      data: list
    }) 
  }

  // 回显
  async getModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.admin[serviceName].getModel(id)
    return this.success({
      data: result
    })
  }

  // 删除
  async delModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.admin[serviceName].delModel(id)

    return this.success({
      data: result
    })
  }

}

module.exports = memberController
