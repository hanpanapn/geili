/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description: 文件描述
 */
const Controller = require("../../core/base_controller")
const { cryptoMd5 } = require("../../extend/helper")


class LoginController extends Controller {


  // 登录查询个人信息
  async getUserInfo () {
    const token = await this.ctx.helper.getAccessToken()
    const result = {}
    await this.ctx.app.jwt.verify(token, this.ctx.app.config.jwt.secret, function (err, decoded) {
      if (err) {
        result.verify = false
        result.message = err.message
      } else {
        result.verify = true
        result.message = decoded
      }
    })

    const userInfo = await this.ctx.service.admin.login.getUserInfo(result)
    this.ctx.session.user = userInfo

    if (userInfo) {
      this.ctx.body = {
        name: userInfo.name,
        role: userInfo.getDataValue("roleName"),
        authorityRouter: userInfo.getDataValue("authorityRouter"),
        permissionButton: userInfo.getDataValue("permissionButton"),
        avatar: userInfo.avatar,
        id: userInfo.id,
      }
    } else {
      await this.ctx.helper.error(401, 10000, "该账号不存在")
    }
  }

  // 获取用户信息
  async getUserInfoId () {
    const { id } = this.ctx.request.body
    this.ctx.body = await this.ctx.service.admin.login.getUserInfoId(id)
  }

  async wxLogin () {
    const { code, appID, secret } = this.ctx.request.body
    console.log(code, appID, secret)
    const result = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, {
      dataType: "json",
    })
    console.log(result.data.session_key)
    await this.ctx.service.login.saveWXdata(result.data)
    // console.log(reqdata);
    this.ctx.body = result.data.openid
  }
}

module.exports = LoginController
