"use client"

import { GlobalContext } from "@/services/MyToast"
import myHTTP from "@/services/axiosconfig"
import { SetStateAction, useContext, useEffect, useState } from "react"
import AddClientModal from "./AddClientModal"

const ManageClients = () => {
    const [addClientModal, showAddClientModal] = useState<boolean>(false);
    const [clientList, setClientList] = useState<[] | null>();
    const [selectedClient, setSelectedClient] = useState<string[] | null>(null);
    const [triggerRequest, setTriggerRequest] = useState<boolean>(false);
    const [ spreadsheets, setSpreadsheets ] = useState<string[]>();
    useEffect(() => {
        myHTTP.get("/client_list")
            .then(res => {
                setClientList(res.data.client_table)
            })
            .catch(err => {
                console.log(err);
            })
    }, [triggerRequest]);

    useEffect(() => {
        if (selectedClient === null) return;
        myHTTP.post("/get_client_spreadsheet", { client_email: selectedClient })
            .then(res => {
                console.log("user user_spreadsheets",res.data.user_spreadsheets);
                setSpreadsheets(res.data.user_spreadsheets)
            })
            .catch(err => {
                console.log(err);
            })
    }, [selectedClient]);

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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientList?.map((ele: any, index: number) => {
                                    return (
                                        <tr key={ele.name}>
                                            <th>{String(index)}</th>
                                            <td onClick={() => setSelectedClient(ele)}>
                                                {ele.name}
                                            </td>
                                            <td>{ele.email}</td>
                                            <td><button onClick={() => setSelectedClient(ele.email)} className="my-btn m-0">Ver</button></td>
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
        </>
    )
}

export default ManageClients
