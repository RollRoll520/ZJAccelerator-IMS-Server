const path = require("path");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const KoaStatic = require("koa-static");
const cors = require("koa2-cors");
const parameter = require("koa-parameter");
//统一错误处理
const errHandler = require("./errHandler");
//自动加载路由
const router = require("../router");
const {REQUEST_IP} = require("../config/config.default")

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      //图片上传至的路径
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
  })
);

//通过koa2-cors实现对跨域请求的应答
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      if (ctx.url === "/test") {
        return "*"; // 允许来自所有域名请求
      }
      // return "https://roll0814.cn"; //只允许http://localhost:3000这个域名的请求
      return "http://localhost:3000";
    },
    maxAge: 10, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization",], //设置获取其他自定义字段
  })
);

app.use(KoaStatic(path.join(__dirname, "../upload")));
app.use(parameter(app));

app.use(router.routes()).use(router.allowedMethods());

//统一的错误处理
app.on("error", errHandler);

module.exports = app;
