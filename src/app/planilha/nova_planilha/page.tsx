'use client'
import React, {  useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import DayComponent from "./DayComponent"

export type TExercise = {
    name: string,
    sets: number,
    quantity: number,
    muscleGroup?: "Peitoral" | "Costas" | "Bíceps" | "Tríceps" | "Ombros" | "Pernas" | "",
    createdAt?:Date
    uId?:string
}
export type TPossibleDays = "day1" | "day2" | "day3" | "day4" | "day5" | "day6" | "day7"
export type TDays = {
    day: TPossibleDays,
    exercises: TExercise[] | []
}

const reorder = (list:any[], startIndex: number, endIndex: number) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result
}

const SpreadsheetBuilder: React.FC = () => {
    const [daysArray, setNewDayArray] = useState<TDays[]>([]);


    const addNewDay = () => {
        if (daysArray.length < 7) {
            const dayNumber = "day" + Number(daysArray.length + 1) as TPossibleDays
            const newDay: TDays = { day: dayNumber, exercises: [] }
            setNewDayArray([...daysArray, newDay]);
        }
    }
    const onDragEnd = (result: any) => {
        const { source, destination, type } = result;
        if (!destination) {
            return;
        }
        const sourceId = source.droppableId
        const destinationId = destination.droppableId
        if (type === "droppableExercise") {
            if (sourceId === destinationId) {
                const tempExercises = daysArray.find((e: any) => e.day === sourceId)?.exercises;
                if (tempExercises){
                    const newExerciseOrder = reorder(tempExercises, source.index, destination.index);
                const newDayOrder = daysArray.map((e: any) =>
                    e.day !== sourceId
                        ? e
                        : { ...e, exercises: newExerciseOrder })
                    setNewDayArray(newDayOrder);
                } 
            } else {
                const sourceOrder = daysArray.find((e: TDays) => e.day === sourceId)?.exercises;
                const destinationOrder = daysArray.find((e: TDays) => e.day === destinationId)?.exercises;
                if (sourceOrder && destinationOrder) {
                    const [removed] = sourceOrder.splice(source.index, 1);
                    destinationOrder?.splice(destination.index, 0, removed);
                }
            }
        }

        if (type === "droppableDay") {
            const newDayOrder = reorder(daysArray, source.index, destination.index) as TDays[]
            setNewDayArray(newDayOrder)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-screen w-screen ">
                <div className="flex flex-col w-full h-full items-center gap-4 m-4">
                    <div className="flex bg-sky-400  w-10 h-10  justify-center rounded-xl">
                        <button onClick={addNewDay} className="text-4xl leading-none ">+</button>
                    </div>
                    <Droppable direction="horizontal" type="droppableDay" droppableId="droppableContainer">
                        {(provided) => {
                            return (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full justify-center">
                                    {daysArray.map((e: any, index: any) => {
                                        return (
                                            <Draggable key={e.day} draggableId={e.day} index={index}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div className="flex basis-[90%] justify-center  md:basis-[15%] min-h-[300px]"
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <DayComponent setNewDayArray={setNewDayArray} daysArray={daysArray} day={e} index={index}/>
                                                        </div>)
                                                }}
                                            </Draggable>
                                        )
                                    })
                                    }
                                    {provided.placeholder}
                                </div>)
                        }}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    )
}

export default SpreadsheetBuilder

