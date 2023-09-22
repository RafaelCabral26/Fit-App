"use client"
import { GlobalContext } from "@/services/MyToast"
import myHTTP from "@/services/axiosconfig"
import { useContext, useEffect, useState } from "react"
import { TDays, TExercise } from "../nova_planilha/nova_planilha_Types"


const MinhasPlanilhas = () => {
    const globalState = useContext(GlobalContext)
    const [allSpreadsheets, setAllSpreadSheets] = useState<TDays[][]>()
    const [selectedSpreadsheet, setSelectedSpreadSheet] = useState<TDays[]>()
    useEffect(() => {
        myHTTP.get("/list_user_spreadsheets")
            .then(res => {
                if (!res.data.spreadsheet) return globalState?.setToast({ type: "warning", message: res.data.msg });
                const receivedSpreadsheets = res.data.spreadsheet;
                let placeholderDaysArray = [] as TDays[][];
                receivedSpreadsheets.forEach((ele: any) => {
                    placeholderDaysArray.push(JSON.parse(ele.spreadsheet_days));
                });

                setAllSpreadSheets(placeholderDaysArray);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const handleSelectSpreadsheet = (index: number) => {
        if (allSpreadsheets !== undefined) setSelectedSpreadSheet(allSpreadsheets[index])
        console.log("testttt", selectedSpreadsheet);

    }
    return (
        <>
            <select className="flex my-input select m-auto my-10">
                <option hidden>Planilhas...</option>
                {allSpreadsheets?.map((ele: any, index: any) => {
                    return <option onClick={() => handleSelectSpreadsheet(index)} key={index} value={index}>Planilha - {index + 1}</option>
                })}
            </select>
            <div className="container m-auto flex flex-col md:flex-row justify-center">
                {
                    selectedSpreadsheet?.map((ele: TDays, index: number) => {
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

        </>
    )
}
export default MinhasPlanilhas;
