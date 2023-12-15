"use client"
import { GlobalContext } from "@/services/GlobalContext"
import myHTTP from "@/services/axiosconfig"
import { ReactNode, Suspense, useContext, useEffect, useLayoutEffect, useState } from "react"
import { TDays, TExercise } from "../construtor_planilha/Spreadsheet_Types"
import TrashSvg from "@/svgs/trashsvg"
import Link from "next/link"
import createQueryString from "@/services/createQueryString"
import { formatDate } from "../construtor_planilha/Spreadsheet_Utilities"
import LoadingComponent from "@/svgs/LoadingComponent"
import Image from "next/image"
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
    function stateFunction() {
        let text:string = "Opa";
            if(!globalState?.userType){
                 text = "Faça login..."
            } else if (globalState.userType) {
                 text = "Planilhas..."

            }
        return text
    }
    const [userState, changeUserState] = useState<string>(stateFunction);
    

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
        <div className="flex flex-col w-full h-auto items-center gap-4 sm:m-4  ">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 sm:mt-0  ">
                <select className="my-select px-14">
                    <option hidden>
                            {userState}
                    </option>
                    {allSpreadsheets?.map((ele: TParsedSpreadsheets, index: number) => {
                        return <option onClick={() => handleSelectSpreadsheet(index)} key={index} value={index}>Planilha - {formatDate(ele.updatedAt)}</option>
                    })};
                </select>
                {
                    selectedSpreadsheet &&
                    <>
                        <button onClick={() => showConfirmDeleteModal(true)} className="my-btn w-14 ">
                            <TrashSvg color="#ffffff"></TrashSvg>
                        </button>
                        <Link href={`/planilha/construtor_planilha/?${createQueryString("spreadsheet_id", selectedSpreadsheet?.spreadsheet_id)}&${createQueryString("previous_url", "planilha/minhas_planilhas")}`} className="my-btn p-[10px]">
                            Editar</Link>
                    </>
                }
            </div>
            <div className=" flex flex-col w-full sm:items-start m-auto  ">
                {
                    selectedSpreadsheet?.spreadsheet_days.map((ele: TDays, index: number) => {
                        return (
                            <div key={crypto.randomUUID()} className="flex justify-center w-auto h-auto  ">

                                <div  className="sm:flex my-2  bg-base-200 rounded-sm shadow-md w-full mx-4  sm:min-w-[320px]  h-auto  ">
                                    <div className="sm:h-auto flex sm:flex-col  items-center justify-center gap-4 w-auto sm:w-[20px]   p-4 sm:py-8  bg-neutral text-white rounded-t-sm ">
                                        <span className="font-mono  leading-none sm:vertical-text tracking-tighter  ">{("Dia " + String(index + 1))}</span>
                                    </div>
                                    {ele.exercises.map((item: TExercise) => {
                                        return (
                                            <div key={crypto.randomUUID()} className={"flex flex-col gap-1 leading-none text-sm min-w-[160px] font-serif  p-2 m-2 shadow-sm  bg-base-100 border-[1px] border-primary "}>
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
                                                <span className="flex gap-1 flex-col break-words ">
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
                <div className="my-form-modal flex flex-col w-auto   items-center p-5 gap-4 ">
                    <div className="absolute  flex items-center justify-center left-0 top-0 bg-secondary w-full h-14 p-4  ">
                        <div className="flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ">
                            <div className="w-10 text-white p-1 border-2 border-white  rounded-sm">
                                <TrashSvg color="#ffffff"></TrashSvg>
                            </div>
                        </div>
                    </div>
                    <span className=" mt-14">Deseja deletar planilha?</span>
                    <div className="flex gap-4">
                        <button onClick={deleteSpreadsheet} className="my-btn-red">Deletar</button>
                        <button onClick={() => showConfirmDeleteModal(false)} className="my-btn ">Cancelar</button>
                    </div>
                </div>
            }

        </div>
    )
}
export default MinhasPlanilhas;
