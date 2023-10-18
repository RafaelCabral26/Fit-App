
export type TClients = {
    name:string,
    email:string,
};

export type TExercise = {
    exercise_name: string,
    sets: number,
    quantity: number,
    uId: string,
    obs?:string
} & (TMuscleGroupsObj)

export type TPossibleDays = "day1" | "day2" | "day3" | "day4" | "day5" | "day6" | "day7"

export type TDays = {
    dayUID:string,
    exercises: TExercise[] | [],
}
export type TDbSpreadsheet = {
    spreadsheet_id:string,
    spreadsheet_days:string,
    fk_trainer_id:string | null,
    fk_user_id:string | null,
    createdAt:string,
    updatedAt:string,
}

export type TDbExerciseSample = {
    exercise_id:string,
    exercise_name:string,
    muscle_group:string,
    subgroup:string,
}
export type TDbExerciseObjSample = {
    [key:string]:TDbExerciseSample[]
}
export type TMuscleGroupsObj = TArm | TBack | TChest | TLegs | TShoulder;

export type TMuscleGroups = "Braços" | "Costas" | "Peitoral" | "Pernas" | "Ombros";

export type TSubgroups = TArmSub | TBackSub | TChestSub | TLegsSub | TShoulderSub;

export type TArm = {
    muscle_group?: "Braços" | "",
    subgroup?:TArmSub
}

export type TArmSub = "Bíceps" | "Tríceps" | "Antebraço" | "";

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

