'use client'

import React, { useContext, useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import DayComponent from "./DayComponent"
import myHTTP from "@/services/axiosconfig"
import { TDays } from "./Spreadsheet_Types"
import { formatExercisesStorage, triggerDnd, validateSpreadsheet } from "./Spreadsheet_Utilities"
import { GlobalContext } from "@/services/GlobalContext"
import { useRouter, useSearchParams } from "next/navigation"
import OpenedLockSvg from "@/svgs/openedLock"
import ClosedLockSvg from "@/svgs/closedLock"
import SendSpreadsheetModal from "./modalSendSpreadsheet"
import Link from "next/link"

const SpreadsheetBuilder: React.FC = () => {
    const globalState = useContext(GlobalContext);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [editingSpreadsheet, setEditingSpreadsheet] = useState<boolean>(false);
    const [daysArray, setNewDayArray] = useState<TDays[]>([]);
    const [sendModal, showSendModal] = useState<boolean>(false);
    const [previousUrl, setPreviousUrl] = useState<string>("");

    useEffect(() => {
        const listOfExercises = localStorage.getItem("Exercises_list");
        const cachedSpreadsheet = localStorage.getItem("Ongoing_Spreadsheet");
        if (listOfExercises === null) {
            myHTTP.get("/list_exercises")
                .then(res => {
                    formatExercisesStorage(res.data.exercises);
                })
                .catch(err => {
                    globalState?.setToast({ type: "warning", message: err.response.data.msg });
                });
        };
        const previousUrlIdCheck = searchParams.get("spreadsheet_id");
        if (previousUrlIdCheck) {

            myHTTP.get(`/search_spreadsheet/${searchParams.get("spreadsheet_id")}`)
                .then(res => {
                    const parsedSpreadsheet = JSON.parse(res.data.spreadsheet.spreadsheet_days);
                    setEditingSpreadsheet(true);
                    return setNewDayArray(parsedSpreadsheet);
                })
                .catch(err => {
                    globalState?.setToast({ type: "error", message: err.response.data.msg });
                })
            const previousUrl = searchParams.get("previous_url")
            if (previousUrl) {
                setPreviousUrl(previousUrl);
            }
            return;
        }
        if (cachedSpreadsheet) setNewDayArray((JSON.parse(cachedSpreadsheet)));
    }, [])

    useEffect(() => {
        if (editingSpreadsheet) return;
        const cachedSpreadsheet = localStorage.getItem("Ongoing_Spreadsheet");
        if (!cachedSpreadsheet) localStorage.setItem("Ongoing_Spreadsheet", JSON.stringify(daysArray));
    }, [daysArray]);

    const addNewDay = () => {
        if (daysArray.length < 7) {
            const newDay: TDays = { dayUID: crypto.randomUUID(), exercises: [], };
            return setNewDayArray([...daysArray, newDay]);
        }
        globalState?.setToast({ type: "warning", message: "Máximo de 7 dias" });
    }

    const handleDnd = (result: DropResult) => {
        triggerDnd(result, daysArray, setNewDayArray, editingSpreadsheet);
    }

    const handleSaveSpreadsheet = () => {
        const spreadsheetInvalid = validateSpreadsheet(daysArray, globalState);
        if (spreadsheetInvalid) return globalState?.setToast(spreadsheetInvalid);

        myHTTP.post("/new_spreadsheet", daysArray)
            .then(res => {
                if (res.status === 202) {
                    return globalState?.setToast({ type: "warning", message: res.data.msg });
                }
                globalState?.setToast({ type: "success", message: res.data.msg });
                setNewDayArray([]);
                localStorage.removeItem("Ongoing_Spreadsheet");
                router.replace("/");

            })
            .catch(err => {
                globalState?.setToast({ type: "error", message: err.response.data.msg });
            })
    }
    const handleEditSpreadsheet = () => {
        const spreadsheetInvalid = validateSpreadsheet(daysArray, globalState);
        if (spreadsheetInvalid) return globalState?.setToast(spreadsheetInvalid);
        myHTTP.patch("/update_spreadsheet", { spreadsheet_id: searchParams.get("spreadsheet_id"), spreadsheet_days: daysArray })
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg });
            })
            .catch(err => {
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
            })
    };

    return (
        <DragDropContext onDragEnd={handleDnd} >
            <div className="flex h-screen w-auto bg-white ">
                <button onClick={() => { globalState?.isDragDisabledSwitch(!globalState.isDragDisabledState) }} type="button" className={`${window.innerWidth < 640 ? "fixed" : "hidden"} bottom-[10%] right-5 bg-primary p-2 rounded-full flex justify-center items-center`}>
                    {globalState?.isDragDisabledState ?
                        <ClosedLockSvg></ClosedLockSvg>
                        :
                        <OpenedLockSvg></OpenedLockSvg>
                    }
                </button>
                <div className="flex flex-col w-full h-auto items-center gap-4 m-4  ">
                    <div className="flex gap-4 justify-center rounded-xl">
                        <button onClick={addNewDay} type="button" className="my-btn">+</button>
                        {
                            editingSpreadsheet ?
                                <>
                                    <button onClick={handleEditSpreadsheet} className="my-btn" type="button">
                                        <span>Alterar</span>
                                    </button>
                                    <Link className="my-btn" href={"/" + previousUrl}>Voltar</Link>
                                </>
                                :
                                <button onClick={handleSaveSpreadsheet} className="my-btn" type="button">
                                    <span>Salvar</span>
                                </button>
                        }
                        {
                            (globalState?.userType === "trainer" && !editingSpreadsheet)
                            &&
                            <button onClick={() => showSendModal(true)} className="my-btn" type="button">Enviar</button>
                        }
                    </div>
                    <Droppable 
                        direction="vertical"
                        type="droppableDay" droppableId="droppableContainer">
                        {(provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef} {...provided.droppableProps}  className={`flex flex-col w-full overflow-x-auto  h-auto sm:items-start `}>
                                    {daysArray.map((e: TDays, index: number) => {
                                        return (
                                            <Draggable isDragDisabled={globalState?.isDragDisabledState} key={e.dayUID} draggableId={e.dayUID} index={index}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div className={`flex justify-center w-auto h-auto `} 
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
                {
                    sendModal &&
                    <SendSpreadsheetModal showSendModal={showSendModal} daysArray={daysArray} setNewDayArray={setNewDayArray}></SendSpreadsheetModal>
                }
            </div>
        </DragDropContext>
    )
}

export default SpreadsheetBuilder

