"use client"

import myHTTP from "@/services/axiosconfig";
import { useContext, useEffect, useState } from "react";
import { validateSpreadsheet } from "./Spreadsheet_Utilities";
import { GlobalContext } from "@/services/MyToast";
import { TDays } from "./Spreadsheet_Types";


const SendSpreadsheetModal = ({showSendModal, daysArray}:{daysArray:TDays[], showSendModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const globalState = useContext(GlobalContext);
    const [ clientList, setClientList ] = useState<[] | null>();
    const [selectedClient, setSelectedClient ] = useState<string | null>();

    useEffect(() => {
       myHTTP.get("/client_list") 
        .then(res => {
                setClientList(res.data.client_list);
            })
        .catch(err => {
                globalState?.setToast({type:"error", message:err.response.data.msg});
            });
    },[]);

    const handleSendSpreadsheet = (e:React.SyntheticEvent) => {
        e.preventDefault();
        const spreadsheetInvalid = validateSpreadsheet(daysArray, globalState);
        if (spreadsheetInvalid) return globalState?.setToast(spreadsheetInvalid);
        if (!clientList) return globalState?.setToast({type:"warning", message:"Escolha um cliente"});
        myHTTP.post("/send_spreadsheet", { daysArray: daysArray, client_email:selectedClient })
            .then(res => {
                globalState?.setToast({type:"success", message:res.data.msg});
                localStorage.removeItem("Ongoing_Spreadsheet");
            })
            .catch(err => {
                globalState?.setToast({type:"warning", message:err.response.data.msg});
            })
    };

    return (
        <div className="fixed top-0  h-screen w-screen z-10">
            <form onSubmit={handleSendSpreadsheet} className="my-form-modal flex flex-col gap-2">
                <div className="flex justify-between">
                    <h1>Enviar...</h1>
                    <button onClick={() => {showSendModal(false); setSelectedClient(null)}} type="button" className="text-2xl self-end">X</button>

                </div>
                <select className="my-input">
                    <option className="" hidden>Cliente....</option>
                    {
                            clientList?.map((ele:any) => {
                                return (
                                <option key={ele} onClick={() => setSelectedClient(ele)}>
                                        {ele}
                                    </option>
                                )
                            })

                    }
                </select>
                <button type="submit" className="my-btn">Enviar</button>
            </form>
        </div>
    )
}

export default SendSpreadsheetModal;
