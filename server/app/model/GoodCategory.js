'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const GoodCategory = app.model.define('goodcategory', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: { type: STRING(255), allowNull: false },
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });
  // GoodCategory.associate = function () {
  //   // classes与student是一对多关系，所以这里使用hasMany()
  //   app.model.GoodCategory.hasMany(app.model.Good, { foreignKey: 'categoryid' });
  // }
  return GoodCategory;
};
 