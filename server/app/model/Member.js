'use strict';
const moment = require('moment');
//商家 ，也就是用户
module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM, DOUBLE, FLOAT, BLOB } = app.Sequelize;
  const Member = app.model.define('member', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: { type: STRING(255), allowNull: false },//商家名称
    account: { type: STRING(255), allowNull: false },
    password: { type: STRING(255), allowNull: false },
    mobile: { type: STRING(255), allowNull: false },
    addr: { type: STRING(255), allowNull: false },//商家地址
    status: { type: INTEGER(11), allowNull: false },//审核状态
    lianxi: { type: STRING(255), allowNull: false },//联系人
    img: { type: BLOB, allowNull: false },//门头照片
    money: { type: FLOAT(11), defaultValue: 0 },//账户余额


    salesmanuser_id: { type: INTEGER(11), allowNull: false },//这个商家是谁的客户
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });



  return Member;
};
