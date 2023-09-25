"use client"
import { GlobalContext } from "@/services/MyToast"
import myHTTP from "@/services/axiosconfig"
import { useContext, useEffect, useState } from "react"
import { TDays, TExercise } from "../nova_planilha/nova_planilha_Types"
import TrashSvg from "@/svgs/trashsvg"
import { useRouter } from "next/navigation"
import Link from "next/link"

type TSpreadsheets = {
    spreadsheet_id: string,
    days: TDays[]
}
const MinhasPlanilhas = () => {
    const globalState = useContext(GlobalContext);
    const router = useRouter();
    const [allSpreadsheets, setAllSpreadSheets] = useState<TSpreadsheets[]>();
    const [selectedSpreadsheet, setSelectedSpreadSheet] = useState<TSpreadsheets>();
    const [confirmDeleteModal, showConfirmDeleteModal] = useState<boolean>(false);
    useEffect(() => {
        myHTTP.get("/list_user_spreadsheets")
            .then(res => {
                if (!res.data.spreadsheet) return globalState?.setToast({ type: "warning", message: res.data.msg });
                const receivedSpreadsheets = res.data.spreadsheet;
                let placeholderDaysArray = [] as TSpreadsheets[];
                receivedSpreadsheets.forEach((ele: any) => {
                    placeholderDaysArray.push({ spreadsheet_id: ele.spreadsheet_id, days: JSON.parse(ele.spreadsheet_days) });
                });

                setAllSpreadSheets(placeholderDaysArray);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const handleSelectSpreadsheet = (index: number) => {
        if (allSpreadsheets !== undefined) setSelectedSpreadSheet(allSpreadsheets[index]);
    }
    const deleteSpreadsheet = () => {
        myHTTP.delete(`/delete_spreadsheet/${selectedSpreadsheet?.spreadsheet_id}` )
            .then(res => {
                globalState?.setToast({type:"success", message:res.data.msg})
                setSelectedSpreadSheet(undefined)
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="flex justify-center items-center gap-4 my-5">
                <select className="my-input basis-40">
                    <option hidden>Planilhas...</option>
                    {allSpreadsheets?.map((ele: any, index: any) => {
                        return <option onClick={() => handleSelectSpreadsheet(index)} key={index} value={index}>Planilha - {index + 1}</option>
                    })};
                </select>
                <button onClick={() => showConfirmDeleteModal(true)} className="my-btn">
                    <TrashSvg color="#ffffff"></TrashSvg>
                </button>
                {
                    selectedSpreadsheet && 
                        <Link className="my-btn" href={`/planilha/editar_planilha/[slug]?slug=${selectedSpreadsheet?.spreadsheet_id}`}>Editar</Link>
                }
            </div>
            <div className="container m-auto flex flex-col md:flex-row justify-center">
                {
                    selectedSpreadsheet?.days.map((ele: TDays, index: number) => {
                        return (
                            <div key={crypto.randomUUID()} className="rounded-lg md:w-[22%] shadow-lg m-2 border-2 border-secondary bg-base-200">
                                <div className="flex justify-between p-2 bg-base-300 rounded-t-sm border-secondary ">
                                    <span className="m-2">{("Dia " + String(index + 1))}</span>
                                </div>
                                {ele.exercises.map((ele: TExercise) => {
                                    return (
                                        <div key={crypto.randomUUID()} className={"flex flex-col justify-between p-2 m-1 shadow-sm bg-base-100 border-2 border-base-300"}>
                                            <span className="flex gap-2">
                                                {ele.exercise_name}
                                            </span>
                                            <span className="flex gap-2">
                                                <span>Séries</span>
                                                {ele.sets}
                                            </span>
                                            <span className="flex gap-2">
                                                <span>Repetições</span>
                                                {ele.quantity}
                                            </span>
                                            <span className="flex flex-col  break-words ">
                                                <span>Obs</span>
                                                <span className="text-xs">
                                                    {ele.obs}
                                                </span>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
            {
                confirmDeleteModal &&
                <div className="my-form-modal flex flex-col p-5 gap-4 bg-base-200 border-2 border-base-300">
                    <span>Deseja deletar planilha?</span>
                    <div className="flex gap-4">
                        <button onClick={deleteSpreadsheet} className="my-btn">Deletar</button>
                        <button onClick={() => showConfirmDeleteModal(false)} className="my-btn-red">Cancelar</button>
                    </div>
                </div>
            }

        </>
    )
}
export default MinhasPlanilhas;
