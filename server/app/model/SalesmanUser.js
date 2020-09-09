'use strict';
const moment = require('moment');
//业务员
module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const SalesmanUser = app.model.define('salesmanuser', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: { type: STRING(255), allowNull: true },//名称
    account: { type: STRING(255), allowNull: false },//账号
    password: { type: STRING(255), allowNull: false },//密码
    mykeyto: { type: STRING(255), allowNull: true },//推荐码   给别人注册时用
    mykeyfrom: { type: STRING(255), allowNull: true },// 邀请码   自己注册时填的是谁
    sex: { type: STRING(255), allowNull: true }, 
    
    mobile: { type: STRING(255), allowNull: true }, 
    banknumber: { type: STRING(255), allowNull: true }, //银行账号
    bankname: { type: STRING(255), allowNull: true }, //开户行
    key:{ type: STRING(255), allowNull: false },//推荐码
     
    
     
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });

   

  return SalesmanUser;
};
