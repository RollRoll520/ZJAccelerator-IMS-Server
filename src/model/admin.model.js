const { DataTypes } = require("sequelize");

const seq = require("../database/seq.mysql");

const Admin = seq.define(
  "Admin",
  {
    a_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    a_username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "管理员用户名",
    },
    a_password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "管理员密码",
    },
    a_privilege: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "管理员权限",
    },
  },
  {
    timestamps: false,
    tableName: "Admin",
  }
);

// Admin.sync({ force: true }); // 创建表格

module.exports = Admin;
