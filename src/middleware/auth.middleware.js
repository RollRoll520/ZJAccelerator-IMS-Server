const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/config.default")
const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require("../const/err.type")

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer", "");
  try {
    //user中包含了payload的id、user_name信息
    const user = jwt.verify(token, JWT_SECRET);

    console.log(user);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效的token", err);
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }
  await next();
}

const hadAdminPermission = async (ctx,next) =>{
  //ToDo: 添加权限
  let is_admin =true

  if(!is_admin){
    console.error("没有操作权限",ctx.state.user)
    return ctx.app.emit('error',hasNotAdminPermission,ctx)
  }

  await next()
}

module.exports = {
  auth,
  hadAdminPermission,
};
