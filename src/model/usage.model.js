const { DataTypes } = require("sequelize");

const seq = require("../database/seq.mysql");

const Product = require("./product.model"); // 导入 Product 模型

const Usage = seq.define(
  "Usage",
  {
    u_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    u_p_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "人员ID",
      references: {
        model: Product, // 指定关联的模型
        key: "p_id", // 指定关联的列
      },
    },
    u_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "姓名",
    },
    u_sex: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "性别",
    },
    u_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "年龄",
    },
    u_first: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "开始时间",
    },
    u_last: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "结束时间",
    },
    u_plan_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "计划URL",
    },
  },
  {
    timestamps: false,
    tableName: "Usage",
  }
);

// 设置关联关系
// Usage.belongsTo(Product, { foreignKey: "u_p_id", targetKey: "p_id" });
// Product.hasMany(Usage, { foreignKey: "u_p_id", sourceKey: "p_id" });

// Usage.sync({ force: true }); // 创建表格

module.exports = Usage;
