import { TExercise } from "./nova_planilha_Types"

export const ValidateAddExercise = (exercise: TExercise) => {
    if (!exercise.exercise_name || !exercise.quantity || !exercise.sets) {
        alert("Preencha todos os campos")
        return false
    }
    return true
}

export const formatExercisesStorage = (responseExerciseList: TExercise[]) => {
    const ObjectifiedExerciseList: {
        Braços: TExercise[],
        Pernas: TExercise[],
        Ombros: TExercise[],
        Costas: TExercise[],
        Peitoral: TExercise[],
    } = {
        Braços: [],
        Pernas: [],
        Ombros: [],
        Costas: [],
        Peitoral: [],
    }

    responseExerciseList.forEach((ele: TExercise) => {
        switch (ele.muscle_group) {
            case "Braços":
                ObjectifiedExerciseList.Braços.push(ele)
                break;

            case "Pernas":
                ObjectifiedExerciseList.Pernas.push(ele)
                break;

            case "Costas":
                ObjectifiedExerciseList.Costas.push(ele)
                break;

            case "Peitoral":
                ObjectifiedExerciseList.Peitoral.push(ele)
                break;

            case "Ombros":
                ObjectifiedExerciseList.Ombros.push(ele)
                break;
        }
    }
    )
    localStorage.setItem("Exercises_list", JSON.stringify(ObjectifiedExerciseList))
}

