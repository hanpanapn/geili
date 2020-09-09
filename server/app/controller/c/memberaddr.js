
// eslint-disable-next-line strict
const Controller = require("../../core/base_controller")
let serviceName='memberaddr';
//收货地址
class memberaddrController extends Controller {
  // 发表
  async addModel() {
    let result = {}
    const modelData = this.ctx.request.body
    const modelResult = await this.ctx.service[serviceName].seaveOrUp(modelData)
    if (modelResult) {
      result = {
        code: 200,
        message: "操作成功",
      }
    } else {
      result = {
        code: 10000,
        message: "操作失败,请重试",
      }
    }
    this.ctx.body = result
  }

  // 查询列表
  async getList() {
    let list = await this.ctx.service[serviceName].getList()
    this.ctx.body = list
  }

  // 回显
  async getModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service[serviceName].getModel(id)
    this.ctx.body = result
  }

  // 删除
  async delModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service[serviceName].delModel(id)
    this.ctx.body = result
  }

}

module.exports = memberaddrController
