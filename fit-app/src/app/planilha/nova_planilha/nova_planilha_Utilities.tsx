import { TExercise } from "./nova_planilha_Types"

export const ValidateAddExercise = (exercise:TExercise)  => {
   if (!exercise.name || !exercise.quantity || !exercise.sets) {
     alert("Preencha todos os campos")
        return false
    } 
    return true
}

