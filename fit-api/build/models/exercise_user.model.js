"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = require("./createSequelize");
const Exercise = sequelize.define("exercises", {
    exercise_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    muscle_group: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subgroup: {
        type: sequelize_1.DataTypes.STRING,
    },
    obs: {
        type: sequelize_1.DataTypes.STRING,
    }
});
