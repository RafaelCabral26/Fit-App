"use client"
import { GlobalContext } from "@/services/GlobalContext"
import myHTTP from "@/services/axiosconfig"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { TDays, TExercise } from "../construtor_planilha/Spreadsheet_Types"
import TrashSvg from "@/svgs/trashsvg"
import Link from "next/link"
import createQueryString from "@/services/createQueryString"
import { formatDate } from "../construtor_planilha/Spreadsheet_Utilities"
type TParsedSpreadsheets = {
    spreadsheet_id: string,
    spreadsheet_days: [],
    updatedAt: string,
}
type TDbSpreadsheet = {
    spreadsheet_id: string,
    spreadsheet_days: string,
    updatedAt: string,
}
const MinhasPlanilhas = () => {

    const globalState = useContext(GlobalContext);
    const [allSpreadsheets, setAllSpreadSheets] = useState<TParsedSpreadsheets[]>();
    const [selectedSpreadsheet, setSelectedSpreadSheet] = useState<TParsedSpreadsheets>();
    const [confirmDeleteModal, showConfirmDeleteModal] = useState<boolean>(false);
    useEffect(() => {
        myHTTP.get("/list_user_spreadsheets")
            .then(res => {
                if (!res.data.spreadsheet) return globalState?.setToast({ type: "warning", message: res.data.msg });
                const receivedSpreadsheets = res.data.spreadsheet;
                let placeholderDaysArray = [] as TParsedSpreadsheets[];
                receivedSpreadsheets.forEach((ele: TDbSpreadsheet) => {
                    placeholderDaysArray.push({ spreadsheet_id: ele.spreadsheet_id, spreadsheet_days: JSON.parse(ele.spreadsheet_days), updatedAt: ele.updatedAt });
                });
                setAllSpreadSheets(placeholderDaysArray);
            })
            .catch(err => {
                if (err.response.status === 405) return
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
            });
    }, []);

    const handleSelectSpreadsheet = (index: number) => {
        if (allSpreadsheets !== undefined) setSelectedSpreadSheet(allSpreadsheets[index]);
    }

    const deleteSpreadsheet = () => {
        myHTTP.delete(`/delete_spreadsheet/${selectedSpreadsheet?.spreadsheet_id}`)
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg });
                setSelectedSpreadSheet(undefined);
                window.location.reload();
            })
            .catch(err => {
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
            });
    };

    return (
        <div className="flex flex-col w-full h-auto items-center gap-4 m-4  ">
            <div className="flex justify-center items-center gap-4 my-5">
                <select className="my-select px-14">
                    <option hidden>
                        {!globalState?.userType ? "Faça login para ver planilhas" : "Planilhas..."
                        }                     </option>
                    {allSpreadsheets?.map((ele: TParsedSpreadsheets, index: number) => {
                        return <option onClick={() => handleSelectSpreadsheet(index)} key={index} value={index}>Planilha - {formatDate(ele.updatedAt)}</option>
                    })};
                </select>
                {
                    selectedSpreadsheet &&
                    <>
                        <button onClick={() => showConfirmDeleteModal(true)} className="my-btn w-14">
                            <TrashSvg color="#ffffff"></TrashSvg>
                        </button>
                        <Link href={`/planilha/construtor_planilha/?${createQueryString("spreadsheet_id", selectedSpreadsheet?.spreadsheet_id)}&${createQueryString("previous_url", "planilha/minhas_planilhas")}`} className="my-btn">
                            Editar</Link>
                    </>
                }
            </div>
            <div className=" flex flex-col w-full sm:items-start m-auto  border-2  ">
                {
                    selectedSpreadsheet?.spreadsheet_days.map((ele: TDays, index: number) => {
                        return (
                            <div className="flex justify-center w-auto h-auto  ">

                                <div key={crypto.randomUUID()} className="sm:flex my-4 border-2 border-secondary bg-base-200 rounded-sm shadow-md  min-w-[320px]  h-auto  ">
                                    <div className="sm:h-auto flex sm:flex-col  items-center justify-center gap-4 w-[20px] h-[156px]  p-4 py-8  bg-neutral text-white rounded-t-sm ">
                                        <span className="font-mono row-start-2 leading-none sm:vertical-text tracking-tighter  ">{("Dia " + String(index + 1))}</span>
                                    </div>
                                    {ele.exercises.map((item: TExercise) => {
                                        return (
                                            <div key={crypto.randomUUID()} className={"flex flex-col leading-none text-sm min-w-[200px] font-serif  p-2 m-2 shadow-sm  bg-base-100 border-[1px] border-primary "}>
                                                <span className="font-sans text-base overflow-clip  hover:overflow-visible">
                                                    <span>{item.exercise_name}</span>
                                                </span>
                                                <span className="flex gap-2 items-center  ">
                                                    <span className="font-sans ">Séries</span>
                                                    <span className="text-base  ">{item.sets}</span>
                                                </span>
                                                <span className="flex gap-2 items-center">
                                                    <span className="font-sans">Repetições</span>
                                                    <span className="text-base">{item.quantity}</span>
                                                </span>
                                                <span className="flex flex-col break-words ">
                                                    <span className="font-sans ">Obs</span>
                                                    <span className="text-xs">{item.obs}</span>
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
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

        </div>
    )
}
export default MinhasPlanilhas;
