const Usage = require("../model/usage.model");

class UsageService {
  async createUsage(usage) {
    const res = await Usage.create(usage);
    return res.dataValues;
  }

  async findUsagesByPId(u_p_id) {
    const res = await Usage.findAll({ where: { u_p_id:u_p_id } });
    return res;
  }

  async deleteUsageById(id) {
    const res = await Usage.destroy({ where: { u_id:id } });
    return res > 0 ? true : false;
  }

  async updateUsageById(id, usage) {
    const res = await Usage.update(usage, { where: { u_id:id } });
    return res[0] > 0 ? true : false;
  }

  async findOne(id) {
    const res = await Usage.findOne({ where: { u_id:id } });
    return res;
  }

  async findUsageByName(name) {
    const res = await Usage.findAll({ where: { u_name:name } });
    return res;
  }
}

module.exports = new UsageService();
