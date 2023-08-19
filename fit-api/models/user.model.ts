import { Sequelize, DataTypes } from "sequelize"
const sequelize = require("./index.ts")
const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg:"Formato de email inválido"
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})
User.sync()
export default User
