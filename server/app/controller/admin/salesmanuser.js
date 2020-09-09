
// eslint-disable-next-line strict
const Controller = require("../../core/base_controller")
const { cryptoMd5 } = require("../../extend/helper")
let serviceName = 'salesmanuser';
//后台对业务员的操作 
class salesmanuserController extends Controller {
  // 发表
  async addModel() {


    const modelData = this.ctx.request.body
    const modelResult = await this.ctx.service.admin[serviceName].seaveOrUp(modelData)
    if (modelResult) {
      this.success({
        code: 200,
        message: "操作成功",
      })
    } else {
      this.error({
        code: 10000,
        message: "操作失败,请重试",
      })
    }

  }

  // 查询列表
  async getPageList() {
    const getListData = this.ctx.request.body
    let list = await this.ctx.service.admin[serviceName].getPageList(getListData)
    console.log(list);
    this.success({
      code: 200,
      message: "操作成功",
      data: list
    })
  }

  // 回显
  async getModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.admin[serviceName].getModel(id)

    this.success({
      code: 200,
      message: "操作成功",
      data: result
    })
  }

  // 删除
  async delModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.admin[serviceName].delModel(id)

    this.success({
      code: 200,
      message: "操作成功",
      data: result
    })
  }


}

module.exports = salesmanuserController
