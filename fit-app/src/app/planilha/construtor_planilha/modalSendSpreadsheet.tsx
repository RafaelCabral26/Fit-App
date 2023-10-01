"use client"

import myHTTP from "@/services/axiosconfig";
import { useContext, useEffect, useState } from "react";
import { validateSpreadsheet } from "./Spreadsheet_Utilities";
import { GlobalContext } from "@/services/MyToast";
import { TDays } from "./Spreadsheet_Types";


const SendSpreadsheetModal = ({showSendModal, daysArray}:{daysArray:TDays[], showSendModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const globalState = useContext(GlobalContext);
    const [ clientList, setClientList ] = useState();

    useEffect(() => {
       myHTTP.get("/client_list") 
        .then(res => {
                setClientList(res.data.client_list)
            })
        .catch(err => {
                globalState?.setToast({type:"error", message:err.responde.data.msg})
            })
    },[])
    const handleSendSpreadsheet = () => {
        const spreadsheetInvalid = validateSpreadsheet(daysArray, globalState);
        if (spreadsheetInvalid) return globalState?.setToast(spreadsheetInvalid);
        myHTTP.post("/send_spreadsheet", { spreadsheet: daysArray })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="fixed top-0  h-screen w-screen z-10">
            <div className="relative flex flex-col w-80 p-4 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-300">
                <button onClick={() => showSendModal(false)} type="button" className="text-2xl self-end">X</button>
                <select className="my-input">
                    <option className="" hidden>Cliente....</option>
                    {
                        clientList &&

                    }
                </select>
            </div>
        </div>
    )
}

export default SendSpreadsheetModal;
