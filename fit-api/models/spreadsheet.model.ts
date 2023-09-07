import { DataTypes } from "sequelize";
const sequelize = require("./index.ts")
import  { TExercise } from "./exercise.model"
export type TSpreadsheet = {
    spreadsheet_id:string,
    trainer_id:string,
    user_id:string,
    spreadsheet_days:TSpreadsheetDays,
}
export type TSpreadsheetDays = [
    day1:TExercise,
    day2?:TExercise,
    day3?:TExercise,
    day4?:TExercise,
    day5?:TExercise,
    day6?:TExercise,
    day7?:TExercise,
]

const Spreadsheet = sequelize.define("spreadsheets", {
    spreadsheet_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        unique:true,
        primaryKey:true,
    },
    trainer_id: {
        type:DataTypes.UUID
    },
    user_id: {
        type:DataTypes.UUID
    },
    spreadsheet_days: {
        type:DataTypes.JSON,
        allowNull:false,
    }
})
