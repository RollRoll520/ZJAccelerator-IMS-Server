const Router = require("koa-router");

const {
  register,
  login,
} = require("../controller/admin.controller");
const { auth } = require("../middleware/auth.middleware");
const {
  adminRegisterValidator,
  adminLoginValidator,
  confirmAdmin,
  crpyPassword,
  confirmAdminLogin,
} = require("../middleware/admin.middleware");

const router = new Router({ prefix: "/admin" });

// 注册接口
router.post("/register", adminRegisterValidator, confirmAdmin, crpyPassword, register);

// 登录接口
router.post("/login", adminLoginValidator, confirmAdminLogin, login);

// 修改密码接口
// router.patch("/", auth, changePassword);

module.exports = router;
