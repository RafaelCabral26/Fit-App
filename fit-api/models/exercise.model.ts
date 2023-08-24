import { Sequelize, DataTypes } from "sequelize";
const sequelize = require("./index.ts")

export type TExercise = {
    id?:string,
    exercise_name:string,
} & (TArm | TBack | TChest | TLegs) 
type TArm = {
    muscle_group:"arm",
    subgroup:"biceps" | "triceps" | "forearms",
}
type TBack ={
    muscle_group:"back",
    subgroup: "upperback" | "lats";}
type TChest ={
    muscle_group:"chest",
    subgroup:  "upperchest" | "middlechest" | "lowerchest"
}
type TLegs ={
    muscle_group:"leg",
    subgroup: "hamstring" | "glutes" | "quadriceps" | "calf"
}
const Exrcise = sequelize.define("exercise", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    exercise_name: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    muscle_group: {
        type:DataTypes.STRING,
        allowNull:false,

    },
    subgroup: {
        type:DataTypes.STRING,

    }

})
