import { DataTypes } from "sequelize";

const sequelize = require("./index.ts");

export type TTrainer = {
    trainer_id?: string,
    name?: string,
    password?: string,
    email: string,
    active?: boolean
}
const Trainer = sequelize.define("trainer", {

    trainer_id: {
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
}) 
Trainer.sync();
export default Trainer;
