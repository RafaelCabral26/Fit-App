import { GlobalContext } from "@/services/MyToast";
import myHTTP from "@/services/axiosconfig";
import { SetStateAction, useContext, useState } from "react";

const AddClientModal = ({ showAddClientModal, triggerRequest, setTriggerRequest }: { showAddClientModal: React.Dispatch<SetStateAction<boolean>>, triggerRequest: boolean, setTriggerRequest: React.Dispatch<SetStateAction<boolean>> }) => {

    const globalState = useContext(GlobalContext);
    const [userEmail, setUserEmail] = useState<string>("");

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        myHTTP.patch("/add_client", { email: userEmail })
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg });
                showAddClientModal(false);
                setTriggerRequest(!triggerRequest);
            })
            .catch(err => {
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
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
export default AddClientModal;
