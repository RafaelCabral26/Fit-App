'use client'
import TrashSvg from "@/svgs/trashsvg"
import React, { Dispatch, createContext, useContext, useEffect, useRef, useState, } from "react"
import { AddExerciseFormModal } from "./addExerciseFormModal"

export type TExercise = {
    name: string,
    sets: number,
    quantity: number,
    muscleGroup?: "Peitoral" | "Costas" | "Bíceps" | "Tríceps" | "Ombros" | "Pernas" | "",
    createdAt: Date
}
export type TDays = {
    day: number,
    exerciseArray: TExercise[]
}


export type SpreadsheetContextType = {
    daysArray: TDays[],
    setNewDay: Dispatch<React.SetStateAction<TDays[]>>
}

const SpreadsheetContext = createContext<SpreadsheetContextType>({} as SpreadsheetContextType)

const NovaPlanilha = () => {
    const [daysArray, setNewDay] = useState<TDays[]>([{ day: 1, exerciseArray: [] }])
    const parentDragRef = useRef(null)
    const handleAddDay = () => {
        if (daysArray.length + 1 > 7) return alert("Número máximo de dias atingido.")
        daysArray.push({ day: daysArray.length + 1, exerciseArray: [] })
        localStorage.setItem("days", JSON.stringify([...daysArray]))
        setNewDay([...daysArray]);
    }

    return (
        <SpreadsheetContext.Provider value={{ daysArray, setNewDay }}>
            <div className="grid grid-cols-4 grid-rows-6 h-[80vh] my-20">
                <div className="col-span-3 row-span-6 bg-teal-400 grid grid-cols-4 grid-rows-6 gap-4 " >
                    {daysArray.map((e: any) => {
                        return (
                            <div key={e.day} className="tableday">
                                <ExerciseDay key={e.day} dayObject={e} parentDragRef={parentDragRef}></ExerciseDay>
                            </div>);
                    })}
                    <button className="btn" onClick={handleAddDay}>
                        Botão
                    </button>
                </div>
            </div>
        </SpreadsheetContext.Provider>
    )
}

const ExerciseDay = ({ dayObject, parentDragRef }: { dayObject: TDays, parentDragRef: any }) => {
    const { daysArray, setNewDay } = useContext(SpreadsheetContext)
    const [addExerciseModal, setAddExerciseModal] = useState<boolean>(false)
    const draggedItemIndex = useRef(null);
    const draggedOverItemIndex = useRef(null);
    const draggedItem = useRef<TExercise | null>(null);
    const handleDelete = (e: any) => {
        if (daysArray.length === 0) return setNewDay([{ day: 1, exerciseArray: [], }])
        const filteredDaysArray = daysArray.filter((e: TDays) => {
            return dayObject.day !== e.day
        });

        const reorderedArray = filteredDaysArray.map((e: TDays) => {
            if (e.day > dayObject.day) {
                e.day = e.day - 1
            }
            return e
        })
        setNewDay([...reorderedArray])
    }

    const handleDragStart = (e: any, position: any) => {
        draggedItemIndex.current = position;
        draggedItem.current = dayObject.exerciseArray[position]
    }

    const handleDragEnter = (e: any, position: any) => {
        draggedOverItemIndex.current = position;
        e.target.classList.remove("opacity-50");
    }

    const handleDragOver = (e: any) => {
        parentDragRef.current = dayObject
    }
    const handleEnd = (e: any) => {
        const copyExerciseList = dayObject.exerciseArray;
        if (draggedItemIndex.current !== null && draggedOverItemIndex.current !== null) {
            const draggedItem = copyExerciseList[draggedItemIndex.current]
            copyExerciseList.splice(draggedItemIndex.current, 1);
            parentDragRef.current.exerciseArray.splice(draggedOverItemIndex.current, 0, draggedItem);
            draggedItemIndex.current = null;
            draggedOverItemIndex.current = null;
            daysArray.forEach((e: any) => {
                if (e.day === dayObject.day) {
                    e.exerciseArray = copyExerciseList
                }
                return e
            })
            setNewDay([...daysArray]);
            return     
        }
    }
    const handleDragLeave = (e:any) => {
        draggedOverItemIndex.current = null 
    }
    return (
        <div className="row-span-3 bg-slate-100" key={dayObject.day}>
            <div className="flex justify-between">
                Dia {dayObject.day}
                <button onClick={() => { setAddExerciseModal(true) }} className="btn text-2xl">
                    +
                </button>
                <button className="btn" onClick={handleDelete}>
                    <TrashSvg />
                </button>
            </div>
            <div className="day flex flex-col gap-4 p-4">
                <div className="placeholder exercise order-first h-10 border-t-2" onDragOver={(e) => { handleDragOver(e) }}  >
                </div>
                {dayObject.exerciseArray.map((e: any, index: any) => {
                    return <div onDragEnter={(e) => { handleDragEnter(e, index) }}
                        onDragOver={(e) => { handleDragOver(e) }}
                        onDragEnd={handleEnd}
                        onDragStart={(e) => { handleDragStart(e, index) }}
                        onDragLeave={(e) => {handleDragLeave(e)}}
                        key={index}
                        className="exercise border-2 border-black p-4 " draggable>{e.name}</div>
                })}
            </div>
            {addExerciseModal &&
                <AddExerciseFormModal setAddExerciseModal={setAddExerciseModal} dayObject={dayObject} daysArray={daysArray} setNewDay={setNewDay} ></AddExerciseFormModal>
            }
        </div>
    )
}
export default NovaPlanilha

