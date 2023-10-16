import { Sequelize, DataTypes } from "sequelize"
const sequelize = require("./index.ts")


const User = sequelize.define("user", {
    user_id: {
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
        unique: {
            args:true,
            msg: "Email já está em uso."
        },
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
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type:DataTypes.DATE
    },
    updatedAt: {
        type:DataTypes.DATE
    },
})
User.sync()
export default User
