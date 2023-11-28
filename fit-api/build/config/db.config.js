"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
module.exports = {
    SECRET: process.env.SECRET,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    ORIGIN: process.env.CORS_ORIGIN,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
