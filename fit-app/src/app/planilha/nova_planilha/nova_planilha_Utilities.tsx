import { TExercise } from "./nova_planilha_Types"

export const ValidateAddExercise = (exercise: TExercise) => {
    if (!exercise.name || !exercise.quantity || !exercise.sets) {
        alert("Preencha todos os campos")
        return false
    }
    return true
}

export const formatExercisesStorage = (responseExerciseList: TExercise[]) => {
    const ObjectifiedExerciseList: {
        Bracos: TExercise[],
        Pernas: TExercise[],
        Ombros: TExercise[],
        Costas: TExercise[],
        Peito: TExercise[],
    } = {
        Bracos: [],
        Pernas: [],
        Ombros: [],
        Costas: [],
        Peito: [],
    }

    responseExerciseList.forEach((ele: TExercise) => {
        switch (ele.muscle_group) {
            case "arm":
                ObjectifiedExerciseList.Bracos.push(ele)
                break;

            case "leg":
                ObjectifiedExerciseList.Pernas.push(ele)
                break;

            case "back":
                ObjectifiedExerciseList.Costas.push(ele)
                break;

            case "chest":
                ObjectifiedExerciseList.Peito.push(ele)
                break;

            case "shoulder":
                ObjectifiedExerciseList.Ombros.push(ele)
                break;
        }
    }
    )
    localStorage.setItem("Exercises_list", JSON.stringify(ObjectifiedExerciseList))
}

