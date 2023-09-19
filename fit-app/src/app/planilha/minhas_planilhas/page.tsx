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
            <select className="flex select select-primary m-auto my-10">
                <option>testee</option>
                {allSpreadsheets?.map((ele: any, index: any) => {
                    return <option onClick={() => handleSelectSpreadsheet(index)} key={crypto.randomUUID()}>Planilha - {index + 1}</option>
                })}
            </select>
            <div className="container m-auto flex gap-4 justify-center">
                {
                    selectedSpreadsheet?.map((ele: TDays,index:number) => {
                        return (
                            <div key={crypto.randomUUID()} className="flex flex-col w-40 border-primary border-2 justify-start">
                                <span className="m-2">{("Dia " + String(index + 1))}</span>
                                {ele.exercises.map((ele: TExercise) => {
                                    return (
                                        <div key={crypto.randomUUID()} className="flex flex-col basis-1/5 gap-1 border-2 border-primary m-2">
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
