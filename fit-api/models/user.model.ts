const {Sequelize, DataTypes} = require("sequelize")
const mySequelize = require("./index.ts")
await mySequelize.sync({force:true})
const User = mySequelize.define("user", {
    id_user= {
    type:DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
    },
    name:DataTypes.STRING
})
module.exports = User
