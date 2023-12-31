import { Sequelize,DataTypes } from "sequelize";
const sequelize = require("./createSequelize")
import { TExerciseSample } from "./exercise_sample.model";
export class MyDate extends DataTypes.NOW {
    toSql(): string {
        return 'DATE_FORMAT(NOW(),%d/%m/%Y/%H/%i)'
    }
}
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
    },
    createdAt: {
        type:DataTypes.DATE
    },
    updatedAt: {
        type:DataTypes.DATE
    },
    
})

Spreadsheet.sync();
export default Spreadsheet;
