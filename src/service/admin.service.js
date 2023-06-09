const Admin = require("../model/admin.model");

class AdminService {
  //添加管理员
  async createAdmin(a_username, a_password,a_privilege) {
    const res = await Admin.create({ a_username, a_password,a_privilege });
    return res.dataValues;
  }

  //查询用户
  async getAdminInfo({ a_id, a_username, a_password }) {
     console.log("getAdminInfo called with:", { a_id, a_username, a_password });
    const whereOpt = {};
    a_id && Object.assign(whereOpt, { a_id });
    a_username && Object.assign(whereOpt, { a_username });
    a_password && Object.assign(whereOpt, { a_password });

    const res = await Admin.findOne({
      attributes: ["a_id", "a_username", "a_password","a_privilege"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
}


module.exports = new AdminService();
