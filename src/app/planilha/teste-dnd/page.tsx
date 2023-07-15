'use client'
import TrashSvg from "@/svgs/trashsvg"
import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export type TExercise = {
    name: string,
    sets: number,
    quantity: number,
    muscleGroup?: "Peitoral" | "Costas" | "Bíceps" | "Tríceps" | "Ombros" | "Pernas" | "",
}
export type TDays = {
    day: string,
    exerciseArray: TExercise[]
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

const ExerciseSpreadsheet: React.FC = () => {
    const [daysArray, setNewDayArray] = useState<any>([[{ name: "supino" }], [{ name: "remada" }, { name: "leg" }]]);
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
            newDayArray[sourceId] = items;
            setNewDayArray(newDayArray)
        } else {
            const result = move(daysArray[sourceId], daysArray[destinationId], source, destination);
            const newDayArray = [...daysArray];
            newDayArray[sourceId] = result[sourceId];
            newDayArray[destinationId] = result[destinationId];

            setNewDayArray(newDayArray)
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
                                <ExerciseDay day={e} index={index}></ExerciseDay>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

const ExerciseDay = ({ index, day }: { index: any, day: any }) => {

    return (
        <Droppable key={index} droppableId={`${index}`}>
            {(provided, snapshot) => {
                return <div className={` bg-white rounded-lg basis-[90%] md:basis-1/5 shrink-0 shadow-lg m-2 border-2 border-secondary
                        ${snapshot.isDraggingOver ? "bg-sky-500 bg-opacity-30" : "bg-white"}`} {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="flex justify-between p-2 bg-sky-500 rounded-t-sm  border-secondary">
                        <h2>{"Dia " + (index + 1)}</h2>
                        <button className="hover:scale-110">
                            <TrashSvg />
                        </button>

                    </div>
                    {day.map((e: any, index: any) => {
                        return <ExerciseComponent key={index} item={e} index={index}></ExerciseComponent>
                    })}
                    {provided.placeholder}
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
export default ExerciseSpreadsheet

