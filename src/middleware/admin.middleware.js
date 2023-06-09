const bcrypt = require("bcryptjs");
const { getAdminInfo } = require("../service/admin.service");
const {
  adminFormatError,
  adminAlreadyExist,
  adminRegisterError,
  adminLoginError,
  invalidPassword,
  adminDoesNotExist,
  hasNotAdminPermission,
} = require("../const/err.type");

const adminRegisterValidator = async (ctx, next) => {
  const { a_username, a_password, a_privilege } = ctx.request.body;
  if (!a_username || !a_password||!a_privilege) {
    console.error("管理员信息不完整", ctx.request.body);
    ctx.app.emit("error", adminFormatError, ctx);
    return;
  }
  await next();
};

const adminLoginValidator = async (ctx, next) => {
  const { a_username, a_password } = ctx.request.body;
  if (!a_username || !a_password ) {
    console.error("登录信息不完整", ctx.request.body);
    ctx.app.emit("error", adminFormatError, ctx);
    return;
  }
  await next();
};

const confirmAdmin = async (ctx, next) => {
  const { a_username } = ctx.request.body;
  try {
    const res = await getAdminInfo({a_username});
    if (res) {
      console.error("管理员已存在", a_username);
      ctx.app.emit("error", adminAlreadyExist, ctx);
      return;
    }
  } catch (err) {
    console.error("获取管理员信息错误");
    ctx.app.emit("error", adminRegisterError, ctx);
    return;
  }
  await next();
};

const crpyPassword = async (ctx, next) => {
  const { a_password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(a_password, salt);
  ctx.request.body.a_password = hash;
  await next();
};

const confirmAdminLogin = async (ctx, next) => {
  const { a_username, a_password } = ctx.request.body;
  try {
    const res = await getAdminInfo({ a_username });
    //1.判断用户名是否存在，不存在报错
    if (!res) {
      console.error("用户名不存在", { a_username });
      ctx.app.emit("error", adminDoesNotExist, ctx);
      return;
    }
    //2.判断密码是否正确，否则报错
    if (!bcrypt.compareSync(a_password, res.a_password)) {
      console.log(a_password, res.a_password);
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
    if(res.a_privilege!="all"){
      console.log(res.a_privilege);
        ctx.app.emit("error", hasNotAdminPermission,ctx);
        return;
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit("error", adminLoginError, ctx);
  }
  await next();
};

module.exports = {
  adminRegisterValidator,
  adminLoginValidator,
  confirmAdmin,
  crpyPassword,
  confirmAdminLogin,
};
