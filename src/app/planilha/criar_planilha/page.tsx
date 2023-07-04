'use client'
import TrashSvg from "@/svgs/trashsvg"
import React, { Dispatch, createContext, useContext, useRef, useState, } from "react"
import { AddExerciseFormModal } from "./addExerciseFormModal"

export type TExercise = {
    name: string,
    sets: number,
    quantity: number,
    muscleGroup?: "Peitoral" | "Costas" | "Bíceps" | "Tríceps" | "Ombros" | "Pernas" | "",
    createdAt:Date
}
export type TDays = {
    day:number,
    exerciseArray:TExercise[]
} 


export type SpreadsheetContextType = {
    daysArray:TDays[],
    setNewDay: Dispatch<React.SetStateAction<TDays[]>>
}

const SpreadsheetContext = createContext<SpreadsheetContextType>({} as SpreadsheetContextType)

const NovaPlanilha = () => {
    const [daysArray, setNewDay] = useState<TDays[]>([{day:1,exerciseArray:[]}])

    const handleAddDay = () => {
        if (daysArray.length + 1 > 7) return alert("Número máximo de dias atingido.")
        daysArray.push({day:daysArray.length+1, exerciseArray:[]})
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
                                <ExerciseDay key={e.day} dayObject={e}></ExerciseDay>
                            </div>);
                    })}
                    <button className="btn" onClick={handleAddDay}>
                        Botão
                    </button>
                </div>
                <div className="btn">
                    Opa2
                </div>
            </div>
        </SpreadsheetContext.Provider>
    )
}

const ExerciseDay = ({ dayObject }: {  dayObject: TDays }) => {
    const { daysArray, setNewDay } = useContext(SpreadsheetContext)
    const [addExerciseModal, setAddExerciseModal] = useState<boolean>(false)
    const ref = useRef(null)
    const handleDelete = (e: any) => {
        if (daysArray.length === 0) return setNewDay([{day:1,exerciseArray:[],}])
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

    const handleDragStart = (e: any) => {
        e.target.classList.add("opacity-50")
    }

    const handleDragEnd = (e: any) => {
        e.target.classList.remove("opacity-50");
    }

    const getNewPosition = (column: any, posY: any) => {
        const cards = column.querySelectorAll(".exercise:not(.opacity-50)")
        let result;
        for (let referCard of cards) {
            const box = referCard.getBoundingClientRect()
            const boxCenterY = box.y + box.height / 2;
            if (posY >= boxCenterY) result = referCard
        }
        
        return result
    }

    const handleDragOver = (e: any) => {
        const dragging = document.querySelector(".opacity-50");
        const applyAfter = getNewPosition(e.target.parentNode, e.clientY)
        
        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging)
            
        } else if (!e.target) {
            e.target.insertAdjacentElement("beforebegin", dragging)
        }
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
                <div className="placeholder exercise order-first h-6 border-b-2" onDragOver={handleDragOver} >
                </div>
                {dayObject.exerciseArray.map((e: any, index: any) => {
                    return <div ref={ref} onDragEnd={(e) => { handleDragEnd(e) }}
                        onDragOver={(e) => { handleDragOver(e) }}
                        onDragStart={(e) => { handleDragStart(e) }}
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

