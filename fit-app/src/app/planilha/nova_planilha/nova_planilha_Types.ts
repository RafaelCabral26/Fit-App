
export type TExercise = {
    exercise_name: string,
    sets: number,
    quantity: number,
    uId: string,
    createdAt?: string,
} & (TMuscleGroupsObj) 

export type TPossibleDays = "day1" | "day2" | "day3" | "day4" | "day5" | "day6" | "day7"
export type TDays = {
    day: TPossibleDays,
    exercises: TExercise[] | []
}
export type TMuscleGroupsObj = TArm | TBack | TChest | TLegs | TShoulder;
export type TMuscleGroups = "Braços" | "Costas" | "Peitoral" | "Pernas" | "Ombros";
export type TArm = {
    muscle_group?:"Braços" | "",
    subgroup?:"Biceps" | "Triceps" | "Antebraço" | "",
}
export type TBack ={
    muscle_group?:"Costas" | "",
    subgroup?: "Superior" | "Dorsal" | "Inferior" | "";}
export type TChest ={
    muscle_group?:"Peitoral" | "" ,
    subgroup?:  "Superior" | "Medial" | "Inferior" | ""
}
export type TLegs ={
    muscle_group?:"Pernas" | "",
    subgroup?: "Posterior" | "Gluteos" | "Quadriceps" | "Panturrilha" | ""
}
export type TShoulder = {
    muscle_group?:"Ombros" | "",
    subgroup?: "Anterior" | "Posterior" | "Lateral" | "",
}
