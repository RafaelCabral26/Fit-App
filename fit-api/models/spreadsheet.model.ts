import { DataTypes } from "sequelize";
const sequelize = require("./index.ts")
import { TExerciseSample } from "./exercise_sample.model";
export type TSpreadsheet = {
    spreadsheet_id:string,
    trainer_id?:string,
    user_id:string,
    spreadsheet_days:TSpreadsheetDays,
}
export type TSpreadsheetDays = [
    day1:TExerciseSample,
    day2?:TExerciseSample,
    day3?:TExerciseSample,
    day4?:TExerciseSample,
    day5?:TExerciseSample,
    day6?:TExerciseSample,
    day7?:TExerciseSample,
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
Spreadsheet.sync();
export default Spreadsheet;
