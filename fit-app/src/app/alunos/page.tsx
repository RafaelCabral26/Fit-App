"use client"

import myHTTP from "@/services/axiosconfig"
import { useContext, useEffect, useState } from "react"
import AddClientModal from "./AddClientModal"
import EditClientSpreadsheetModal from "./EditClientSpreadsheetModal"
import { GlobalContext } from "@/services/MyToast"
import { useRouter } from "next/navigation"

const ManageClients = () => {
    const globalState = useContext(GlobalContext);
    const [addClientModal, showAddClientModal] = useState<boolean>(false);
    const [editModal, showEditModal] = useState<boolean>(false);
    const [clientList, setClientList] = useState<[] | null>();
    const [triggerRequest, setTriggerRequest] = useState<boolean>(false);
    const [spreadsheets, setSpreadsheets] = useState<any[] | null>(null);
    const router = useRouter();
    useEffect(() => {
        myHTTP.get("/client_list")
            .then(res => {
                setClientList(res.data.client_table)
                console.log(clientList);
            })
            .catch(err => {
                console.log(err);
            })
    }, [triggerRequest]);

    const handleSelectedClient = (email: string) => {
        if (email === null) return;
        myHTTP.post("/get_client_spreadsheet", { client_email: email })
            .then(res => {
                setSpreadsheets(res.data.user_spreadsheets);
            })
            .catch(err => {
                console.log(err);
            })
        showEditModal(true)
    }
    const handleRemoveClient = (clientEmail:string) => {
        myHTTP.patch("/remove_client", {client_email:clientEmail})
            .then(res => {
                globalState?.setToast({type:"success", message:res.data.msg})
                setTriggerRequest(!triggerRequest);
            })
        .catch(err => {
                console.log(err);
                globalState?.setToast({type:"warning", message:err.response.data.msg})
            })
    }
    return (
        <>
            <div className="container flex flex-col  m-auto">
                <div className="flex gap-2 justify-center items-center">
                    <div>
                        <button onClick={() => { showAddClientModal(true) }} className="my-btn">Adicionar Cliente</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table  w-96 m-auto my-10">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Planilhas</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientList?.map((ele: any, index: number) => {
                                    return (
                                        <tr key={ele.name}>
                                            <th>{String(index)}</th>
                                            <td>{ele.name}</td>
                                            <td>{ele.email}</td>
                                            <td><button onClick={() => {handleSelectedClient(ele.email)}} className="my-btn m-0">Ver</button></td>
                                            <td><button onClick={() => {handleRemoveClient(ele.email)}} type="button" className="my-btn m-0">DEL</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                addClientModal &&
                <AddClientModal showAddClientModal={showAddClientModal} triggerRequest={triggerRequest} setTriggerRequest={setTriggerRequest}></AddClientModal>
            }
            {editModal &&
                <EditClientSpreadsheetModal spreadsheets={spreadsheets} showEditModal={showEditModal}></EditClientSpreadsheetModal>
            }
        </>
    )
}

export default ManageClients
