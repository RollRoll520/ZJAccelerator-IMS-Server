const {Sequelize} = require ('sequelize')

const {MYSQL_HOST,
MYSQL_USER,
MYSQL_PWD,
MYSQL_DB} = require('../config/config.default')

const seqMysql = new Sequelize(
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD,
    {
        host:MYSQL_HOST,
        dialect:'mysql'
})

//用于测试数据库连接
seqMysql.authenticate().then(()=>{
    console.log('successfully connect to database')
}).catch(err=>{
    console.log('fail to connect to database',err)
})

module.exports=seqMysql

