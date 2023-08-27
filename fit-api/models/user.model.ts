import { Sequelize, DataTypes } from "sequelize"
import Exercise from "./exercise.model"
const sequelize = require("./index.ts")
export type TUser = {
    id?: string,
    name?: string,
    password?: string,
    email: string,
    profile?: "user" | "trainer",
    active?: boolean
}


const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Fomato do email inválido."
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile: {
        type: DataTypes.STRING,
        defaultValue: "user",
        validate: {
            isIn: [["user", "trainer"]]
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
})
User.sync()
export default User
