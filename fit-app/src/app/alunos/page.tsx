"use client"

import { GlobalContext } from "@/services/MyToast"
import myHTTP from "@/services/axiosconfig"
import { warn } from "console"
import { useRouter } from "next/navigation"
import { SetStateAction, useContext, useEffect, useState } from "react"

const ManageClients = () => {
    const [addClientModal, showAddClientModal] = useState<boolean>(false);
    const [clientList, setClientList] = useState<[] | null>();
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    useEffect(() => {
        myHTTP.get("/client_list")
            .then(res => {

                setClientList(res.data.client_list)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    useEffect(() => {
        if (selectedClient === null) return
        myHTTP.post("/get_client_spreadsheet", {client_email:selectedClient})
        .then(res => {
                console.log(res);
            })
        .catch(err => {
                console.log(err);
            })
    }, [selectedClient])
    return (
        <>
            <div className="container flex flex-col  m-auto  ">
                <div className="flex gap-2 justify-center items-center">
                    <div>
                        <button onClick={() => { showAddClientModal(true) }} className="my-btn">Adicionar Cliente</button>
                    </div>
                    <select className="my-input">
                        <option hidden>Selecionar cliente...</option>
                        {
                            clientList?.map((ele: any) => {
                                return (
                                    <option key={ele} onClick={e => setSelectedClient(ele)}>
                                        {ele}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="container">
                </div>
            </div>
            {
                addClientModal &&
                <ClientModal showAddClientModal={showAddClientModal}></ClientModal>
            }

        </>
    )
}
const ClientModal = ({ showAddClientModal }: { showAddClientModal: React.Dispatch<SetStateAction<boolean>> }) => {

    const globalState = useContext(GlobalContext);
    const [userEmail, setUserEmail] = useState<string>("");

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        myHTTP.patch("/add_client", { email: userEmail })
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg });
                showAddClientModal(false)
            })
            .catch(err => {
                globalState?.setToast({ type: "warning", message: err.response.data.msg })
            })

    }
    return (
        <div onSubmit={handleSubmit} className="fixed top-20 h-screen w-screen z-10">
            <div className="relative w-80 p-4 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <form className="my-form-modal">
                    <label className="label">
                        <span className="label-text">Email do Cliente</span>
                        <button type="button" onClick={() => showAddClientModal(false)} className="text-2xl">X</button>
                    </label>
                    <input value={userEmail} onChange={e => setUserEmail(e.target.value)} type="text" className="my-input" autoFocus />
                    <div className="flex justify-between">
                        <button className="my-btn" type="submit">
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManageClients
