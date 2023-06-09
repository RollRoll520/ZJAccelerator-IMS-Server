const fs = require("fs");

const Router = require("koa-router");
const router = new Router();
//自动加载该文件夹里的路由
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    let r = require("./" + file);
    router.use(r.routes());
  }
});

module.exports = router;
