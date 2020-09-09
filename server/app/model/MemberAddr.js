'use strict';
const moment = require('moment');
//商家 收货地址
module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const MemberAddr = app.model.define('member_addr', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    mid: { type:INTEGER(11), allowNull: false }, //用户ID
    addr: { type: STRING(255), allowNull: false },//省市区
    detail_addr: { type: STRING(255), allowNull: false },//详细
    mobile: { type: STRING(255), allowNull: false },//
    name: { type: STRING(255), allowNull: false },//收货人姓名
    
     
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });

   

  return MemberAddr;
};
