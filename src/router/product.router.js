const Router = require("koa-router");
const {
  upload,
  create,
  update,
  remove,
  findAll,
  unlink,
  findOne,
} = require("../controller/product.controller");
const { hadAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/product.middleware");
const { findProductById } = require("../service/product.service");

const router = new Router({ prefix: "/product" });

// 上传图片接口
router.post("/upload", upload);

// 删除图片接口
router.post("/unlink/:id", hadAdminPermission, unlink);

// 创建产品信息接口
router.post("/new", validator, create);

// 修改产品信息接口
router.put("/update/:id", validator, update);

// 硬删除接口
router.delete("/delete/:id", remove);

// 获取产品列表
router.get("/list/:page", findAll);

//查询产品
router.get("/find/:id",findOne);

module.exports = router;
