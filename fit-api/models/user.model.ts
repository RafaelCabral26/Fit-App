"use strict"

import { Sequelize, DataTypes } from "sequelize"
const mySequelize = require("./index.ts")
// mySequelize.sync({force:true})
const User = mySequelize.define("user", {
    id : {
    type:DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        isEmail:true,
        min:8,
    }
})
module.exports = User
