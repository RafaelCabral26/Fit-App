import { TExercise } from "./page";

export const validateAddExercise = (exercise:TExercise)  => {
   if (!exercise.name || !exercise.quantity || !exercise.sets) {
     alert("Preencha todos os campos")
        return false
    } 
    return true
}
