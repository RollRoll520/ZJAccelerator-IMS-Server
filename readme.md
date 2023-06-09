# koa服务器搭建

---

## 文件解析

```bash
- path
    - database.sqlite #嵌入式数据库文件
- src
    - app #服务器业务（为了与入口文件分离）
        - errHandler.js
        - index.js 
    -config #用于dotenv配置
        - config.default.js
    -const #定义错误类型常量
        - err.type.js
    - controller #控制器处理业务
    - database #用于数据库连接
    - middleware #中间件
        - auth.middleware.js
        - 
    - model #基于sequelize的数据库对象
        persons.model.js
        user.model.js
    - router #路由
        - index.js
        - person.router.js
        - user.router.js
    - service #数据库处理服务
        - person.service.js
        - user.service.js
    - upload #保存上传的头像
        - ... #所有头像图片文件
    - main.js #服务器入口文件，npm start打开该文件
- test #测试文件
    -test.html
- .env
```
