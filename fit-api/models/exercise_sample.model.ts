import { DataTypes } from "sequelize";
const sequelize = require("./createSequelize")
export type TExerciseSample = {
    id?: string,
    exercise_name: string,
} & (TArm | TBack | TChest | TLegs | TShoulder)
type TArm = {
    muscle_group: "arm",
    subgroup?: "biceps" | "triceps" | "forearms",
}
type TBack = {
    muscle_group: "back",
    subgroup?: "upperback" | "lats" | "lowerback";
}
type TChest = {
    muscle_group: "chest",
    subgroup?: "upperchest" | "middlechest" | "lowerchest"
}
type TLegs = {
    muscle_group: "leg",
    subgroup?: "hamstring" | "glutes" | "quadriceps" | "calf"
}
type TShoulder = {
    muscle_group: "shoulder",
    subgroup?: "anterior" | "posterior" | "lateral",
}
const ExerciseSample = sequelize.define("exercises_sample", {
    exercise_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
    },
    exercise_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    muscle_group: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    subgroup: {
        type: DataTypes.STRING,

    },
},
    {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
ExerciseSample.sync()
export default ExerciseSample
