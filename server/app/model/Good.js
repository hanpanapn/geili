'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const Good = app.model.define('good', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: { type: STRING(255), allowNull: false },
    thumbnail: { type: STRING(255), allowNull: true },
    categoryid: { type: INTEGER, allowNull: false },
    price_s: { type: INTEGER, allowNull: false },
    price_ns: { type: INTEGER, allowNull: false },
    sort: { type: INTEGER, allowNull: false },
    pers: { type: INTEGER, allowNull: false },
    desc: { type: STRING(255), allowNull: false },
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });

  Good.associate = function () {
    // classes与student是一对多关系，所以这里使用hasMany()
    app.model.Good.belongsTo(app.model.GoodCategory, { foreignKey: 'categoryid', targetKey: 'id' });
  }

  return Good;
};
