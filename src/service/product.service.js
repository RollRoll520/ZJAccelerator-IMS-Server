const Product = require("../model/product.model");

class ProductService {
  async createProduct(product) {
    const res = await Product.create(product);
    return res.dataValues;
  }

  async updateProduct(id, product) {
    const res = await Product.update(product, { where: { p_id: id } });
    return res[0] > 0 ? true : false;
  }

  async removeProduct(id) {
    const res = await Product.destroy({ where: { p_id: id } });
    return res > 0 ? true : false;
  }

  async findProductById(id) {
    const res = await Product.findOne({ where: { p_id: id } });
    return res;
  }

  async findProducts(pageNum) {
    const offset = (pageNum - 1) * 5;
    const { count, rows } = await Product.findAndCountAll({
      offset: offset,
      limit: 5,
    });
    return {
      pageNum,
      total: count,
      list: rows,
    };
  }
}

module.exports = new ProductService();
