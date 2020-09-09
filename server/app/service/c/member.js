const Service = require("egg/index").Service
const { cryptoMd5 } = require("../../extend/helper")
const modelName = 'Member';
class SalesmanUserService extends Service {

    async seaveOrUp(options) {
        const { ctx } = this
        const { account, password } = options
        const keys = this.config.keys
        let results = ""
        let res = await ctx.model[modelName].findOne({
            where: {
                account, // 查询条件
            },
        })
        if (!res) {
            options.password = await cryptoMd5(password, keys)
            options.mobile = account
            let user = await ctx.model[modelName].create(options)
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
    // 登录查询账号
    async findAccount(account) {
        const user = await this.ctx.model[modelName].findOne({
            where: { account },
        })
        return user
    }
    // 查询用户信息
    async getUserInfoId(uid) {
        return await this.app.model[modelName].findById(uid)
    }

    // 生成 token 保存数据库
    async saveToken(data) {
        await this.app.model.SystemToken.upsert(data)
    }
}
module.exports = SalesmanUserService
