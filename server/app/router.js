/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  const isLogin = middleware.verifyToken()

  const business_is_login = middleware.verifyTokenBusinessUser()//验证业务员是否登录

  /** ************* admin接口请求路由 ***************/
  require("./router/system_API")(app, isLogin)

  /** ************* 页面请求路由 ***************/
  router.get("/index", controller.home.index)

  /** ************* 接口请求路由 ***************/
  // 发表文章
  router.post("/article/addArticle", isLogin, controller.article.addArticle)
  // 文章列表
  router.post("/article/articleList", isLogin, controller.article.articleList)
  // 文章修改回显
  router.post("/article/getArticle", isLogin, controller.article.getArticle)
  // 删除文章
  router.post("/article/delArticle", isLogin, controller.article.delArticle)
  // 图片上传
  router.post("/editor/uploadImg", isLogin, controller.editor.uploadImg)
  // 发表评论
  router.post("/comment/addComment", isLogin, controller.comment.addComment)
  // 回复评论
  router.post("/comment/replyComment", isLogin, controller.comment.replyComment)
  // 评论列表
  router.post("/comment/commentList", isLogin, controller.comment.commentList)
  // 删除评论
  router.post("/comment/delComment", isLogin, controller.comment.delComment)




  //用户端接口 ----start------

  //收货地址

  router.post("/c/memberaddr/getlist", isLogin, controller.c.memberaddr.getList)
  router.post("/c/memberaddr/addmodel", isLogin, controller.c.memberaddr.addModel)
  router.post("/c/memberaddr/getmodel", isLogin, controller.c.memberaddr.getModel)
  router.post("/c/memberaddr/delmodel", isLogin, controller.c.memberaddr.delModel)

  //用户
  router.post("/c/member/getlist", isLogin, controller.c.member.getList)
  router.post("/c/member/addmodel", isLogin, controller.c.member.addModel)
  router.post("/c/member/getmodel", isLogin, controller.c.member.getModel)
  router.post("/c/member/delmodel", isLogin, controller.c.member.delModel)
  router.post('/c/member/login', controller.c.member.login)

  //商品
  router.post("/c/good/getlist", isLogin, controller.c.good.getList)
  router.post("/c/goodcategory/getlist", isLogin, controller.c.goodcategory.getList)
  router.post("/c/good/getmodel", isLogin, controller.c.good.getModel)


  //用户端接口 ----end------


  //业务员----start---------

  router.post("/b/salesmanuser/addmodel", controller.b.salesmanuser.addModel)
  //logo
  router.post('/b/salesmanuser/login', controller.b.salesmanuser.login)
  //商家
  router.post("/b/member/addmodel", isLogin, controller.b.member.addModel)
  router.post("/b/member/getlist", isLogin, controller.b.member.getList)


  //业务员------end----------

  router.post("/wxLogin", controller.admin.login.wxLogin)
  router.post("/decryptData", controller.getShareInfo.decryptData)

}
