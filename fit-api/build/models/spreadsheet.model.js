"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDate = void 0;
const sequelize_1 = require("sequelize");
const sequelize = require("./createSequelize");
class MyDate extends sequelize_1.DataTypes.NOW {
    toSql() {
        return 'DATE_FORMAT(NOW(),%d/%m/%Y/%H/%i)';
    }
}
exports.MyDate = MyDate;
const Spreadsheet = sequelize.define("spreadsheets", {
    spreadsheet_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    fk_trainer_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: null,
    },
    fk_user_id: {
        type: sequelize_1.DataTypes.UUID
    },
    spreadsheet_days: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    },
});
Spreadsheet.sync();
exports.default = Spreadsheet;
