import { DropResult } from "@hello-pangea/dnd"
import { TDays, TExercise } from "./Spreadsheet_Types"
import React, { SetStateAction } from "react"
import { TToast } from "@/services/MyToast"
import { format } from "date-fns"
import { TPropsGlobalContext } from "@/services/GlobalContext"
export const ValidateAddExercise = (exercise: TExercise) => {
    if (!exercise.exercise_name || !exercise.quantity || !exercise.sets) {
        alert("Preencha todos os campos")
        return false
    }
    return true
}

export const formatDate = (dateStr: string) => {
    const parsedString = new Date(dateStr)
    return format(parsedString, 'dd-MM-yyyy HH:mm')
}

export const validateSpreadsheet = (daysArray: TDays[], globalState: TPropsGlobalContext) => {
    if (globalState?.userType === null) return { type: "warning", message: "Faça login para salvar." } as TToast;
    if (daysArray.length === 0) return { type: "warning", message: "Adicione dias." } as TToast;
    let emptyDay = false
    daysArray.forEach((ele: TDays) => {
        if (ele.exercises.length === 0) emptyDay = true;
    })
    if (emptyDay) return { type: "warning", message: "Preencha todos os dias." } as TToast;
    return null;
}

export const formatExercisesStorage = (responseExerciseList: TExercise[]) => {
    const ObjectifiedExerciseList: {
        Braços: TExercise[],
        Pernas: TExercise[],
        Ombros: TExercise[],
        Costas: TExercise[],
        Peitoral: TExercise[],
    } = {
        'Braços': [],
        Pernas: [],
        Ombros: [],
        Costas: [],
        Peitoral: [],
    }

    responseExerciseList.forEach((ele: TExercise) => {
        switch (ele.muscle_group) {
            case 'Braços':
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

const reorder = (list: TDays[], startIndex: number, endIndex: number) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result
}


export const triggerDnd = (result: DropResult, daysArray: TDays[], setNewDayArray: React.Dispatch<SetStateAction<TDays[]>>, editingSpreadsheet: boolean) => {

    const { source, destination, type } = result;
    if (!destination) {
        return;
    };
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    if (type === "droppableExercise") {
        if (sourceId === destinationId) {
            const tempExercises = daysArray.find((e: TDays) => e.dayUID === sourceId)?.exercises;
            if (tempExercises) {
                const newExerciseOrder = reorder(tempExercises, source.index, destination.index);
                const newDayOrder = daysArray.map((e: TDays) =>
                    e.dayUID !== sourceId
                        ? e
                        : { ...e, exercises: newExerciseOrder });
                setNewDayArray(newDayOrder);
            }
        } else {
            const sourceOrder = daysArray.find((e: TDays) => e.dayUID === sourceId)?.exercises;
            const destinationOrder = daysArray.find((e: TDays) => e.dayUID === destinationId)?.exercises;
            if (sourceOrder && destinationOrder) {
                const [removed] = sourceOrder.splice(source.index, 1);
                destinationOrder?.splice(destination.index, 0, removed);
            };
        };
    };

    if (type === "droppableDay") {
        const newDayOrder = reorder(daysArray, source.index, destination.index) as TDays[];
        setNewDayArray(newDayOrder);
    }
    if (!editingSpreadsheet) {
        localStorage.setItem("Ongoing_Spreadsheet", JSON.stringify(daysArray));
    }
}

