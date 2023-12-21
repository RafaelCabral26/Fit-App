"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = require("./createSequelize");
const ExerciseSample = sequelize.define("exercises_sample", {
    exercise_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
    },
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
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
ExerciseSample.sync();
exports.default = ExerciseSample;
