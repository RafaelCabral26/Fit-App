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

export type TDays = [TExercise] | []

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
    const  EmptyDay:TDays[] = [];
    const [daysArray, setNewDayArray] = useState<TDays[]>([[{ name: "supino", sets: 0, quantity: 0 }]]);
    const addNewDay = () => {
        if (daysArray.length < 7) {

            setNewDayArray([...daysArray, []])
        }
    }
    const onDragEnd = (result: any) => {
        const { source, destination } = result
        if (!destination) {
            return;
        }
        const sourceId = +source.droppableId
        const destinationId = +destination.droppableId
        if (sourceId === destinationId) {
            const items = reorder(daysArray[sourceId], source.index, destination.index);
            const newDayArray = [...daysArray];
            newDayArray[sourceId] = items as TDays;
            setNewDayArray(newDayArray);
        } else {
            const result = move(daysArray[sourceId], daysArray[destinationId], source, destination);
            const newDayArray = [...daysArray];
            newDayArray[sourceId] = result[sourceId];
            newDayArray[destinationId] = result[destinationId];
            setNewDayArray(newDayArray);
        }

    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-screen">
                <div className="container flex m-auto h-[80%]">
                    <div className="flex bg-sky-500 h-10">
                        <button onClick={addNewDay} className="text-4xl leading-none ">+</button>
                    </div>
                    <div className="container  bg-stone-200 flex flex-wrap justify-start gap-4 ">
                        {daysArray.map((e: any, index: any) => {
                            return (
                                <ExerciseDay setNewDayArray={setNewDayArray} daysArray={daysArray} day={e} index={index}></ExerciseDay>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

const ExerciseDay = ({ index, day, daysArray, setNewDayArray }: { index: any, day: any, daysArray: any, setNewDayArray: any }) => {
    const [newExerciseModal, showNewExerciseModal] = React.useState(false)
    const handleDeleteDay = (e: any) => {
        e.currentTarget.blur()
        daysArray.splice(index, 1)
        setNewDayArray([...daysArray])

    }
    return (
        <Droppable key={index} droppableId={`${index}`}>
            {(provided, snapshot) => {
                return <div className={` bg-white rounded-lg basis-[50%] max-h-[50%]   md:basis-1/5 shrink-0 shadow-lg m-2
                        border-2 border-secondary ${snapshot.isDraggingOver ? "bg-sky-500 bg-opacity-30" : "bg-white"}`} {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="flex justify-between p-2 bg-sky-500 rounded-t-sm  border-secondary">
                        <h2>{"Dia " + (index + 1)}</h2>
                        <div className="dropdown dropdown-end">
                            <label  tabIndex={0} className="text-2xl cursor-pointer">...</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={() => { showNewExerciseModal(true) }}><a>Adicionar</a></li>
                                <li><a>Item 2</a></li>
                                <li onClick={handleDeleteDay} className="text-red-500 hover:text-red-400"><a>Deletar</a></li>
                            </ul>
                        </div>

                    </div>
                    {day.map((e: any, index: any) => {
                        return <ExerciseComponent key={index} item={e} index={index}></ExerciseComponent>
                    })}
                    {provided.placeholder}
                    {newExerciseModal &&
                        <AddExerciseFormModal showNewExerciseModal={showNewExerciseModal} dayObject={day} daysArray={daysArray} setNewDayArray={setNewDayArray} ></AddExerciseFormModal>
                    }

                </div>
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

