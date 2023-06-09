const Router = require("koa-router");
const { usageValidator } = require("../middleware/usage.middleware");
const {
  create,
  findUsagesByPId,
  deleteUsageById,
  updateUsageById,
  findOne,
  findUsageByName,
} = require("../controller/usage.controller");

const router = new Router({ prefix: "/usage" });

// 创建使用情况信息接口
router.post("/new", usageValidator,create);

// 根据u_p_id查找使用情况信息
router.get("/findUsages/:u_p_id", findUsagesByPId);

// 根据id查找使用情况信息
router.get("/findOne/:id", findOne);

// 根据id删除使用情况信息
router.delete("/delete/:id", deleteUsageById);

// 根据id更新使用情况信息
router.put("/update/:id", updateUsageById);

// 根据姓名查找使用情况信息
router.get("/findByName/:name", findUsageByName);

module.exports = router;
