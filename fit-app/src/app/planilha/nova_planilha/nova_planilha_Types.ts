
export type TExercise = {
    name: string,
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
    muscle_group?:"Braços",
    subgroup?:"Biceps" | "Triceps" | "Antebraço",
}
type TBack ={
    muscle_group?:"Costas",
    subgroup?: "Superior" | "Dorsal" | "Inferior";}
type TChest ={
    muscle_group?:"Peito" ,
    subgroup?:  "Superior" | "Medial" | "Inferior"
}
type TLegs ={
    muscle_group?:"Pernas",
    subgroup?: "Posterior" | "Gluteos" | "Quadriceps" | "Panturrilha"
}
type TShoulder = {
    muscle_group?:"Ombros",
    subgroup?: "Anterior" | "Posterior" | "Lateral",
}
