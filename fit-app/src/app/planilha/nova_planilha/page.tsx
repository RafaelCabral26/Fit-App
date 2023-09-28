'use client'

import React, { useContext, useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import DayComponent from "./DayComponent"
import myHTTP from "@/services/axiosconfig"
import { TDays } from "./nova_planilha_Types"
import { formatExercisesStorage } from "./nova_planilha_Utilities"
import { GlobalContext } from "@/services/MyToast"
import { useRouter, useSearchParams } from "next/navigation"
import OpenedLockSvg from "@/svgs/openedLock"
import ClosedLockSvg from "@/svgs/closedLock"

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result
}

const SpreadsheetBuilder: React.FC = () => {
    const globalState = useContext(GlobalContext);
    const searchParams = useSearchParams();
    const [editingSpreadsheet, setEditingSpreadsheet] = useState<boolean>(false)
    const router = useRouter();
    const [daysArray, setNewDayArray] = useState<TDays[]>([]);

    useEffect(() => {
        const listOfExercises = localStorage.getItem("Exercises_list");
        const cachedSpreadsheet = localStorage.getItem("Ongoing_Spreadsheet");
        if (listOfExercises === null) {
            myHTTP.get("/list_exercises")
                .then(res => {
                    formatExercisesStorage(res.data.exercises);
                })
                .catch(err => {
                    console.log(err);
                })
        };
        const previousUrlCheck = searchParams.get("spreadsheet_id");
        if (previousUrlCheck) {
            myHTTP.get(`/search_spreadsheet/${searchParams.get("spreadsheet_id")}`)
                .then(res => {
                    const parsedSpreadsheet = JSON.parse(res.data.spreadsheet.spreadsheet_days);
                    setEditingSpreadsheet(true);
                    return setNewDayArray(parsedSpreadsheet);
                })
                .catch(err => {
                    console.log(err);
                })
            return;
            ;
        }
        if (cachedSpreadsheet) setNewDayArray((JSON.parse(cachedSpreadsheet)));
    }, [])

    useEffect(() => {
        if (editingSpreadsheet) return;
        const cachedSpreadsheet = localStorage.getItem("Ongoing_Spreadsheet");
        if (!cachedSpreadsheet) localStorage.setItem("Ongoing_Spreadsheet", JSON.stringify(daysArray));
    }, [daysArray])

    const addNewDay = () => {
        if (daysArray.length < 7) {
            const newDay: TDays = { dayUID: crypto.randomUUID(), exercises: [], };
            return setNewDayArray([...daysArray, newDay]);
        }
        globalState?.setToast({ type: "warning", message: "Máximo de 7 dias" });
    }

    const onDragEnd = (result: DropResult) => {
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
            const newDayOrder = reorder(daysArray, source.index, destination.index) as TDays[]
            setNewDayArray(newDayOrder)
        }
        if (!editingSpreadsheet) {
            localStorage.setItem("Ongoing_Spreadsheet", JSON.stringify(daysArray))
        }
    }
    const handleSaveSpreadsheet = () => {
        if (globalState?.userType === null) return globalState?.setToast({ type: "warning", message: "Faça login para salvar." });
        if (daysArray.length === 0) return globalState?.setToast({ type: "warning", message: "Adicione dias." });
        let emptyDay = false
        daysArray.forEach((ele: any) => {
            if (ele.exercises.length === 0) emptyDay = true
        })
        if (emptyDay) return globalState?.setToast({ type: "warning", message: "Preencha todos os dias." });

        if (editingSpreadsheet) {
            myHTTP.patch("/update_spreadsheet",{spreadsheet_id:searchParams.get("spreadsheet_id"), spreadsheet_days:daysArray} )
                .then(res => {
                    globalState?.setToast({type:"success", message:res.data.msg})
                })
                .catch(err => {
                    console.log(err);
                    globalState?.setToast({type:"warning",message:err.response.data.msg})
                })
            return;
        }

        myHTTP.post("/new_spreadsheet", daysArray)
            .then(res => {
                if (res.status === 202) {
                    return globalState?.setToast({ type: "warning", message: res.data.msg });
                }
                globalState?.setToast({ type: "success", message: res.data.msg });
                setNewDayArray([])
                localStorage.removeItem("Ongoing_Spreadsheet");
                router.replace("/")
            })
            .catch(err => {
                globalState?.setToast({ type: "error", message: err.response.data.msg })
                console.log(err);
            })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <div className="flex h-screen w-screen">
                <button onClick={() => { globalState?.isDragDisabledSwitch(!globalState.isDragDisabledState) }} type="button" className={`${window.innerWidth < 560 ? "fixed" : "hidden"} bottom-[10%] right-5 bg-primary p-2 rounded-full flex justify-center items-center`}>
                    {globalState?.isDragDisabledState ?
                        <ClosedLockSvg></ClosedLockSvg>
                        :
                        <OpenedLockSvg></OpenedLockSvg>
                    }
                </button>
                <div className="flex flex-col w-full h-auto items-center gap-4 m-4 ">
                    <div className="flex gap-4 justify-center rounded-xl">
                        <button onClick={addNewDay} type="button" className="my-btn">+</button>
                        <button onClick={handleSaveSpreadsheet} className="my-btn" type="button">Salvar</button>
                        {
                            globalState?.userType === "trainer" &&
                            <button className="my-btn" type="button">Enviar</button>
                        }
                    </div>
                    <Droppable direction={window.innerWidth > 560 ? "horizontal" : "vertical"} type="droppableDay" droppableId="droppableContainer">
                        {(provided) => {
                            return (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col md:flex-row w-full justify-center">
                                    {daysArray.map((e: TDays, index: number) => {
                                        return (
                                            <Draggable isDragDisabled={globalState?.isDragDisabledState} key={e.dayUID} draggableId={e.dayUID} index={index}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div className="flex justify-center lg:basis-[15%] min-h-[300px]"
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <DayComponent setNewDayArray={setNewDayArray} daysArray={daysArray} day={e} index={index} />
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

