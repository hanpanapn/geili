const Service = require("egg/index").Service
const { cryptoMd5 } = require("../../extend/helper")
const serviceName='SalesmanUser';
class RegisterService extends Service {
  async seaveOrUp(options) {
    const { ctx } = this
    const { account, password } = options
    const keys = this.config.keys
    let results = ""
    let res = await ctx.model[serviceName].findOne({
      where: {
        account, // 查询条件
      },
    })
    if (!res) {
      options.password = await cryptoMd5(password, keys)
      options.mobile=account
      let user = await ctx.model[serviceName].create(options)
      results = {
        code: 200,
        message: "注册成功",
      }
    } else {
      results = {
        code: 10000,
        message: "该账号已存在",
      }
    }

    return results
  }
}
module.exports = RegisterService
