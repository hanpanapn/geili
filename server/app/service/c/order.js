
const Service = require("egg").Service
const moment = require('moment')
const await = require("await-stream-ready/lib/await")
class orderService extends Service {
  // 新增订单
  async seaveOrUp(data) {
    //下单人
    let orderUser=await this.ctx.model.member.findById(data.order_userid)
    let lev1User=await this.getUserByKey(orderUser.fromkey)
    let orderModel = {
      order_no: moment().format("YYYYMMDDHHmmssSSS") + data.order_userid,
      order_userid: data.order_userid,
      order_addr: data.order_addr,
      order_price: data.order_price,
      pay_status: 0,
      level1_id: data.order_userid,//当前人的提成 
      level1_name: data.order_userid,
      level1_price: data.order_userid,
      level2_id: data.order_userid,
      level2_name: ddd,
      level2_price: ddd,
      level3_id: ddd,
      level3_name: ddd,
      level3_price: ddd,


    }
    let result = await this.ctx.model.Order.upsert(orderModel)
    return result
  }

  // 查询列表
  async getPageList(getListData) {
    const { currentPage = 1, pageSize = 10, sort } = getListData
    let res = await this.ctx.model.Good.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
      include: [{ // include关键字表示关联查询
        model: this.ctx.model.GoodCategory, // 指定关联的model
        // as: 'category', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: [['name', 'category_name']], // 这里的attributes属性表示查询GoodCategory表的name字段，其中对name字段起了别名category_name
      }],
      raw: true // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强

    })
    return res
  }

  // 回显
  async getModel(aId) {
    let result
    await this.ctx.model.Good.findById(aId).then(res => {
      console.log(res)
      result = res
    }).catch(error => {
      console.log(error)
    })

    return result
  }

  // 删除
  async delModel(aId) {
    let results
    await this.ctx.model.Good.destroy({
      where: {
        id: aId,
      },
    }).then(res => {

      if (res > 0) {
        results = {
          code: 200,
          message: "删除成功",
        }
      } else {
        results = {
          code: 10000,
          message: "删除失败",
        }
      }
    }).catch(error => {

      results = {
        code: 10000,
        message: error,
      }
    })
    return results
  }
  //更具推荐码查出某个人
  async getUserByKey(key) {
    let res = await this.ctx.model.salesmanuser.findAll({
      where: {
        key: key
      }
    });
    if (res && res.length > 0) {
      return res[0]
    }
    return null;
  }
}

module.exports = orderService
