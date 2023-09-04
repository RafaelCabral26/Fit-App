
export type TExercise = {
    exercise_name: string,
    sets: number,
    quantity: number,
    uId: string,
    createdAt?: string,
} & (TMuscleGroups) 

export type TPossibleDays = "day1" | "day2" | "day3" | "day4" | "day5" | "day6" | "day7"
export type TDays = {
    day: TPossibleDays,
    exercises: TExercise[] | []
}
export type TMuscleGroups = TArm | TBack | TChest | TLegs | TShoulder;
type TArm = {
    muscle_group?:"Bracos" | "arm" | "",
    subgroup?:"Biceps" | "Triceps" | "Antebraço" | "",
}
type TBack ={
    muscle_group?:"Costas" | "back" | "",
    subgroup?: "Superior" | "Dorsal" | "Inferior" | "";}
type TChest ={
    muscle_group?:"Peito" | "chest" | "" ,
    subgroup?:  "Superior" | "Medial" | "Inferior" | ""
}
type TLegs ={
    muscle_group?:"Pernas" | "leg"| "",
    subgroup?: "Posterior" | "Gluteos" | "Quadriceps" | "Panturrilha" | ""
}
type TShoulder = {
    muscle_group?:"Ombros" | "shoulder" | "",
    subgroup?: "Anterior" | "Posterior" | "Lateral" | "",
}
