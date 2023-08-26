import {  DataTypes } from "sequelize";
import { defaultExercisesList } from "../config/exercises_list";
const sequelize = require("./index.ts")

export type TExercise = {
    id?:string,
    exercise_name:string,
} & (TArm | TBack | TChest | TLegs | TShoulder) 
type TArm = {
    muscle_group:"arm",
    subgroup?:"biceps" | "triceps" | "forearms",
}
type TBack ={
    muscle_group:"back",
    subgroup?: "upperback" | "lats" | "lowerback";}
type TChest ={
    muscle_group:"chest",
    subgroup?:  "upperchest" | "middlechest" | "lowerchest"
}
type TLegs ={
    muscle_group:"leg",
    subgroup?: "hamstring" | "glutes" | "quadriceps" | "calf"
}
type TShoulder = {
    muscle_group:"shoulder",
    subgroup?: "anterior" | "posterior" | "lateral",
}
const Exercise = sequelize.define("exercises", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique:true,
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
 Exercise.sync()

export const setExercisesList = async (defaultExercisesList:TExercise[]) => {
    try {
    defaultExercisesList.forEach(async (element) => {
       await Exercise.create(element) 
})        
    } catch (err) {
        
    }
}
export default Exercise
