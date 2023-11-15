import { GlobalContext } from "@/services/GlobalContext";
import myHTTP from "@/services/axiosconfig";
import TrashSvg from "@/svgs/trashsvg";
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
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
            })
    }

    return (

        <div className="my-form-modal relvative flex flex-col p-5 gap-4 ">
            <div className="absolute  flex items-center justify-between left-0 top-0 bg-secondary w-full h-14 p-4  ">
                <div className="flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ">
                    <div className="w-10 text-white p-2  rounded-sm">
                        <TrashSvg color="#ffffff"></TrashSvg>
                    </div>
                    Remover Cliente
                </div>
                <button type="button" onClick={() => { showConfirmDeleteModal(false) }} className="self-start text-3xl font-bold leading-3 text-white ">X</button>
            </div>
            <div className="flex flex-col mt-14 text-neutral font-serif ">
                <span>Deseja remover cliente?</span>
                <span className="font-sans text-lg">{selectedClientEmail}</span>
                <span className="text-sm text-secondary">(Obs:Todas as planilha serão deletadas)</span>
            </div>
            <div className="flex gap-4 justify-between">
                <button onClick={() => handleRemoveClient(selectedClientEmail)} className="my-btn w-full">Deletar</button>
                <button onClick={() => showConfirmDeleteModal(false)} className="my-btn-red w-full ">Cancelar</button>
            </div>
        </div>
    )
}

export default RemoveClientModal
