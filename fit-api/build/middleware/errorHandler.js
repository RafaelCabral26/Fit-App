"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../services/AppError");
const sequelize_1 = require("sequelize");
const errorHandler = (error, req, res, next) => {
    console.log(error);
    if (error instanceof sequelize_1.ValidationError) {
        return res.status(303).send({
            msg: error.errors[0].message,
        });
    }
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            msg: error.message,
        });
    }
    return res.status(500).send("Erro no servidor.");
};
exports.default = errorHandler;
