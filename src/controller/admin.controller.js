const { createAdmin, getAdminInfo } = require("../service/admin.service");
const jwt = require("jsonwebtoken");
const { adminLoginError, adminRegisterError } = require("../const/err.type");
const { JWT_SECRET } = require("../config/config.default");

class AdminController {
  async register(ctx, next) {
    //1.获取数据
    const { a_username, a_password,a_privilege } = ctx.request.body;

    //2.操作数据库
    try {
      const res = await createAdmin(a_username, a_password,a_privilege);
      console.log(res);
      //3返回结果
      ctx.body = {
        code: 0,
        message: "注册成功",
        result: {
          id: res.a_id,
          a_username: res.a_username,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit("error", adminRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    const { a_username } = ctx.request.body;
    //1.获取用户信息，在token的payload中记录id、user_name
    try {
      //从返回结果中剔除password
      const { a_password, ...res } = await getAdminInfo({ a_username });

      ctx.body = {
        code: 0,
        message: "登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new AdminController();

