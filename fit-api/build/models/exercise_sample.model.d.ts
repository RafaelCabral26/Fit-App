export type TExerciseSample = {
    id?: string;
    exercise_name: string;
} & (TArm | TBack | TChest | TLegs | TShoulder);
type TArm = {
    muscle_group: "arm";
    subgroup?: "biceps" | "triceps" | "forearms";
};
type TBack = {
    muscle_group: "back";
    subgroup?: "upperback" | "lats" | "lowerback";
};
type TChest = {
    muscle_group: "chest";
    subgroup?: "upperchest" | "middlechest" | "lowerchest";
};
type TLegs = {
    muscle_group: "leg";
    subgroup?: "hamstring" | "glutes" | "quadriceps" | "calf";
};
type TShoulder = {
    muscle_group: "shoulder";
    subgroup?: "anterior" | "posterior" | "lateral";
};
declare const ExerciseSample: any;
export default ExerciseSample;
