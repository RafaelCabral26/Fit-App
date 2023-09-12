
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
export type TSubgroups = TArmSub | TBackSub | TChestSub | TLegsSub | TShoulderSub;
export type TArm = {
    muscle_group?: "Braços" | "",
    subgroup?:TArmSub
}
export type TArmSub = "Biceps" | "Triceps" | "Antebraço" | "";

export type TBack = {
    muscle_group?: "Costas" | "",
    subgroup?: TBackSub
}
export type TBackSub = "Superior" | "Dorsal" | "Inferior" | "";

export type TChest = {
    muscle_group?: "Peitoral" | "",
    subgroup?: TChestSub
}
export type TChestSub = "Superior" | "Medial" | "Inferior" | ""

export type TLegs = {
    muscle_group?: "Pernas" | "",
    subgroup?: TLegsSub
}
export type TLegsSub = "Posterior" | "Gluteos" | "Quadriceps" | "Panturrilha" | ""

export type TShoulder = {
    muscle_group?: "Ombros" | "",
    subgroup?: TShoulderSub
}
export type TShoulderSub = "Anterior" | "Posterior" | "Lateral" | "";
