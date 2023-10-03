import { DataTypes } from "sequelize";
const sequelize = require("./index.ts")
import { TExerciseSample } from "./exercise_sample.model";

const Spreadsheet = sequelize.define("spreadsheets", {
    spreadsheet_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        unique:true,
        primaryKey:true,
    },
    fk_trainer_id: {
        type:DataTypes.UUID,
        defaultValue:null, 
    },
    fk_user_id: {
        type:DataTypes.UUID
    },
    spreadsheet_days: {
        type:DataTypes.JSON,
        allowNull:false,
    }
})
Spreadsheet.sync();
export default Spreadsheet;
