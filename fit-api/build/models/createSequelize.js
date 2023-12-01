"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig = require("../config/db.config");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, } = process.env;
const sequelize = (process.env.NODE_ENV = "development") ? new sequelize_1.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
})
    : new sequelize_1.Sequelize(`postgres://fituser${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`);
module.exports = sequelize;
