
let wx = {}
if (process.env.NUXT_ENV_MODE == 'pro') {
  wx = {
    appid: "wxf34cd96547ca6fa1",
    redirect_uri: "https://ask.xingxiwang.com/login/wxlogin", //'https://web.must520.com/login/wx-loading'
    response_type: "code",
    scope: "snsapi_userinfo",
  }
} else {
  console.log("本地开发",process.env.NUXT_ENV_LOCALDEV);
  if (process.env.NUXT_ENV_LOCALDEV == 'localdev') {
  
    
    //本地开发
    wx = {
      appid: "wx54e8860df253508f",
      redirect_uri: "https://test.hanshuqiang.top/login/wxlogin", //'https://web.must520.com/login/wx-loading'
      response_type: "code",
      scope: "snsapi_userinfo",
    }
  } else {
    wx = {
      appid: "wx54e8860df253508f",
      redirect_uri: "https://web.must520.com/login/wx-loading", //'https://web.must520.com/login/wx-loading'
      response_type: "code",
      scope: "snsapi_userinfo",
    }
  }

}
module.exports = {
  baseWebUrl: process.env.NUXT_ENV_MODE == 'pro' ? "https://ask.xingxiwang.com" : 'http://localhost:8081/api',
  baseUrl: process.env.NUXT_ENV_MODE == 'pro' ? "https://homeapi.xingxiwang.com" : 'http://127.0.0.1:7001',
  cdn: {
    host: process.env.NUXT_ENV_MODE == 'pro' ? "https://cdn.xingxiwang.com" : 'http://localhost:8081/api/admin/user/login',
  },
  kefu: 'https://tb.53kf.com/code/client/bfd759a807220481451031b2c885666c5/1',
  wx:wx
}
