import { DataTypes } from "sequelize";
const sequelize = require("./index.ts")

const Exercise = sequelize.define("exercises", {
    exercise_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    muscle_group: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    subgroup: {
        type: DataTypes.STRING,

    },
    obs: {
        type: DataTypes.STRING,
    }
})
