"use client"

import { GlobalContext } from "@/services/MyToast"
import myHTTP from "@/services/axiosconfig"
import { useRouter } from "next/navigation"
import { SetStateAction, useContext, useEffect, useState } from "react"

const ManageClients = () => {
    const globalState = useContext(GlobalContext);
    const [addClientModal, showAddClientModal] = useState<boolean>(false);


    const handleAddNewClient = () => {

    }
    return (
        <>
            <div className="container flex flex-col  m-auto  ">
                <div className="flex justify-center">
                    <div>
                        <button onClick={() => { showAddClientModal(true) }} className="my-btn">Adicionar Cliente</button>
                    </div>
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
    const [userEmail, setUserEmail] = useState<string>();
    const handleSubmit = (event:React.SyntheticEvent) => {
        event.preventDefault();
        console.log(userEmail);
    }
    return (
        <div onSubmit={handleSubmit} className="fixed top-20 h-screen w-screen z-10">
            <div className="relative w-80 p-4 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <form className="my-form-modal">
                    <label className="label">
                        <span className="label-text">Email do Cliente</span>
                        <button onClick={() => showAddClientModal(false)} className="text-2xl">X</button>
                    </label>
                    <input value={userEmail} onChange={e => setUserEmail(e.target.value)}  type="text" className="my-input" autoFocus />
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
