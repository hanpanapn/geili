'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const OrderDetails = app.model.define('order_details', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    order_no: { type: STRING(50), allowNull: false },//订单ID

    good_id: { type: INTEGER(11), allowNull: false },
    good_name: { type: STRING(50), allowNull: false },
    good_pic: { type: STRING(255), allowNull: false },
    good_num: { type: INTEGER(11), allowNull: false },
    good_price: { type: INTEGER(11), allowNull: false },

    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return OrderDetails;
};
