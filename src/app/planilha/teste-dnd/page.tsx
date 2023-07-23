'use client'
import TrashSvg from "@/svgs/trashsvg"
import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { AddExerciseFormModal } from "./modalAddNewExercise"

export type TExercise = {
    name: string,
    sets: number,
    quantity: number,
    muscleGroup?: "Peitoral" | "Costas" | "Bíceps" | "Tríceps" | "Ombros" | "Pernas" | "",
}
export type TPossibleDays = "day1" | "day2" | "day3" | "day4" | "day5" | "day6" | "day7"
export type TDays = {
    day: TPossibleDays,
    exercises: TExercise[] | []
}

const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result
}

const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result
}

const SpreadsheetBuilder: React.FC = () => {
    const [daysArray, setNewDayArray] = useState<TDays[]>([{ day: "day1", exercises: [{ name: "supino", sets: 0, quantity: 0 }, { name: "remada", sets: 0, quantity: 0 }] },]);
    const addNewDay = () => {
        if (daysArray.length < 7) {
            const dayNumber = "day" + daysArray.length + 1 as TPossibleDays
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
                const newExerciseOrder = reorder(tempExercises, source.index, destination.index);
                const newDayOrder = daysArray.map((e: any) =>
                    e.day !== sourceId
                        ? e
                        : { ...e, exercises: newExerciseOrder }
                )
                setNewDayArray(newDayOrder);
            } else {
                const sourceOrder = daysArray.find((e: any) => e.day === sourceId)?.exercises;
                const destinationOrder = daysArray.find((e: any) => e.day === destinationId)?.exercises;
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
            <div className="flex h-screen w-screen border-2 border-black">
                <div className="flex flex-col w-full h-full ">
                    <div className="flex  w-10 h-10 basis-[3%] justify-center rounded-xl">
                        <button onClick={addNewDay} className="text-4xl leading-none ">+</button>
                    </div>
                    <div>
                        <Droppable direction="horizontal" type="droppableDay" droppableId="droppableContainer">
                            {(provided) => {
                                return (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex">
                                        {daysArray.map((e: any, index: any) => {
                                            return (
                                                <Draggable key={e.day} draggableId={e.day} index={index}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div className="bg-red-300 flex  basis-[15%] min-h-[300px] " ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <ExerciseDay setNewDayArray={setNewDayArray} daysArray={daysArray} day={e} index={index}></ExerciseDay>
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
            </div>
        </DragDropContext>
    )
}

const ExerciseDay = ({ index, day, daysArray, setNewDayArray }: { index: any, day: any, daysArray: any, setNewDayArray: any }) => {
    const [optionsDropdown, showOptions] = useState(false);
    const [newExerciseModal, showNewExerciseModal] = React.useState(false);
    const handleDeleteDay = (e: any) => {
        e.currentTarget.blur();
        daysArray.splice(index, 1);
        setNewDayArray([...daysArray]);

    }
    return (
        <Droppable type="droppableExercise" key={index} droppableId={`${day.day}`}>
            {(provided, snapshot) => {
                return (
                    <div className={`bg-white rounded-lg w-full shadow-lg m-2
                        border-2 border-secondary ${snapshot.isDraggingOver ? "bg-sky-500 bg-opacity-30" : "bg-white"}`} {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="flex justify-between p-2 bg-sky-500 rounded-t-sm border-secondary ">
                            <h2>{"Dia " + (index + 1)}</h2>
                            <button onClick={() => showOptions(!optionsDropdown)} className="relative text-2xl cursor-pointer">...
                                {optionsDropdown &&
                                    <div className="absolute right-0">
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li onClick={() => { showNewExerciseModal(true) }}><a>Adicionar</a></li>
                                            <li><a>Item 2</a></li>
                                            <li onClick={handleDeleteDay} className="text-red-500 hover:text-red-400"><a>Deletar</a></li>
                                        </ul>
                                    </div>
                                }
                            </button>
                        </div>
                        {day.exercises.map((e: any, index: any) => {
                            return <ExerciseComponent key={index} item={e} index={index}></ExerciseComponent>
                        })}
                        {provided.placeholder}
                        {newExerciseModal &&
                            <AddExerciseFormModal showNewExerciseModal={showNewExerciseModal} dayObject={day.exercises} daysArray={daysArray} setNewDayArray={setNewDayArray} ></AddExerciseFormModal>
                        }
                    </div>
                )
            }}
        </Droppable>
    )
}
const ExerciseComponent = ({ item, index }: { item: any, index: any }) => {
    return (
        <Draggable draggableId={item.name} key={item.name} index={index}>
            {(provided, snapshot) => {
                return (
                    <div className={`p-2 m-2 shadow-sm bg-white border-2 border-stone-300 ${snapshot.isDragging ? "opacity-50" : "opacity-100"}`} ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                        {item.name}
                    </div>
                )
            }}
        </Draggable>
    )
}
export default SpreadsheetBuilder

