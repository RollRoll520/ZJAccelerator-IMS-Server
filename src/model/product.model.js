const { DataTypes } = require("sequelize");

const seq = require("../database/seq.mysql");

const Usage = require("./usage.model"); // 导入 Usage 模型

const Product = seq.define(
  "Product",
  {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    p_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "产品类型",
    },
    p_state: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "产品状态",
    },
    p_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "上架时间",
    },
    p_img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "产品图片URL",
    },
  },
  {
    timestamps: false,
    tableName: "Product",
  }
);

// 设置关联关系
// Product.hasMany(Usage, { foreignKey: "u_p_id", sourceKey: "p_id" });
// Usage.belongsTo(Product, { foreignKey: "u_p_id", targetKey: "p_id" });

// Product.sync({ force: true }); // 创建表格

module.exports = Product;
