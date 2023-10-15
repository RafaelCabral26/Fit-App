import { GlobalContext } from "@/services/GlobalContext";
import myHTTP from "@/services/axiosconfig";
import { SetStateAction, useContext, useState } from "react";


const RemoveClientModal = ({ showConfirmDeleteModal, selectedClientEmail, triggerRequest, setTriggerRequest }: {
    showConfirmDeleteModal: React.Dispatch<SetStateAction<boolean>>,
    selectedClientEmail: string | null,
    triggerRequest: boolean,
    setTriggerRequest: React.Dispatch<SetStateAction<boolean>>,

}) => {
    const globalState = useContext(GlobalContext);
    const handleRemoveClient = (selectedClientEmail: string | null) => {
        if (selectedClientEmail === null) return 
        myHTTP.patch("/remove_client", { client_email: selectedClientEmail })
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg })
                setTriggerRequest(!triggerRequest);
                showConfirmDeleteModal(false);
            })
            .catch(err => {
                console.log(err);
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
            })
    }

    return (

        <div className="my-form-modal flex flex-col p-5 gap-4 bg-base-200 border-2 border-base-300">
            <div className="flex flex-col">
                <span>Deseja remover cliente?</span>
                <span>{selectedClientEmail}</span>
                <span className="text-sm text-secondary">(Obs:Todas as planilha serão deletadas)</span>
            </div>
            <div className="flex gap-4 justify-center">
                <button onClick={() => handleRemoveClient(selectedClientEmail)} className="my-btn">Deletar</button>
                <button onClick={() => showConfirmDeleteModal(false)} className="my-btn-red">Cancelar</button>
            </div>
        </div>
    )
}

export default RemoveClientModal
