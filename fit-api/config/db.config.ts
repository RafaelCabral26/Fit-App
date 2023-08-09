import 'dotenv/config'
module.exports = {
    HOST: process.env.MYSQL_DB_HOST,
    USER: process.env.MYSQL_DB_USER,
    PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    DB: process.env.MYSQL_DB_NAME,
    PORT: process.env.MYSQL_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
