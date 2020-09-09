
// eslint-disable-next-line strict
const Controller = require("../../core/base_controller")
let serviceName = 'member';
//后台对用户的操作 
class memberController extends Controller {
  // 发表
  async addModel() {
    let result = {}
    const modelData = this.ctx.request.body
    const modelResult = await this.ctx.service.b[serviceName].seaveOrUp(modelData)
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
  async getList() {
    const getListData = this.ctx.request.body
    let list = await this.ctx.service.b[serviceName].getList()

    return this.success({
      data: list
    })
  }

  // 回显
  async getModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.b[serviceName].getModel(id)
    return this.success({
      data: result
    })
  }

  // 删除
  async delModel() {
    const id = this.ctx.request.body.id
    const result = await this.ctx.service.b[serviceName].delModel(id)

    return this.success({
      data: result
    })
  }
  // 用户登录
  async login() {

    const { account, password } = this.ctx.request.body
    const keys = this.config.keys
    let results = ""

    const user = await this.ctx.service.b[serviceName].findAccount(account)
    if (!user) {
      results = {
        code: 10000,
        message: "用户名不存在",
      }
    } else {
      const newPass = await cryptoMd5(password, keys)

      if (user.password !== newPass) {
        results = {
          code: 10000,
          message: "密码错误",
        }
      } else {
        const refresh_token = await this.ctx.helper.createToken({ id: user.id }, "7", "days")
        const access_token = await this.ctx.helper.createToken({ id: user.id }, "7", "hours")
        // console.log("token::"+access_token);
        const uid = user.id
        await this.ctx.service.b[serviceName].saveToken({ uid, access_token, refresh_token })
        results = {
          code: 200,
          data: {
            access_token: access_token,
            account: user.account,
            mobile: user.mobile

          },
        }
      }

    }
    this.ctx.body = results
  }
}

module.exports = memberController
