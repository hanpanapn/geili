'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const Orders = app.model.define('order', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    order_no: { type: STRING(50), allowNull: false },//订单编号
    order_userid: { type: STRING(50), allowNull: false },//用户ID
    order_addr: { type: STRING(50), allowNull: false },//收货地址ID
    order_price: { type: DECIMAL(7, 2), allowNull: false },//支付金额
    pay_status: { type: STRING(255), defaultValue: '0', allowNull: false },//支付状态

    level1_id: { type: INTEGER(11), defaultValue: '0', allowNull: false },//一级销售员id
    level1_name: { type: STRING(50), allowNull: false },//一级销售员名称
    level1_price: { type: INTEGER(11), defaultValue: '0', allowNull: false },//一级销售员提成

    level2_id: { type: INTEGER(11), defaultValue: '0', allowNull: false },//2级销售员
    level2_name: { type: STRING(50), allowNull: false },//2级销售员
    level2_price: { type: INTEGER(11), defaultValue: '0', allowNull: false },//2级销售员

    level3_id: { type: INTEGER(11), defaultValue: '0', allowNull: false },//销售总监ID
    level3_name: { type: STRING(50), allowNull: false },//销售总监名称
    level3_price: { type: INTEGER(11), defaultValue: '0', allowNull: false },//销售总监提成


    extension: { type: STRING(255) },
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Orders;
};
