import { GlobalContext } from "@/services/GlobalContext";
import myHTTP from "@/services/axiosconfig";
import { ProfileSvg } from "@/svgs/profilecircle";
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
                    <div className="absolute  flex items-center justify-between left-0 top-0 bg-secondary w-full h-14 p-4  ">
                        <div className="flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ">
                            <div className="w-10 text-white p-2  rounded-sm">
                                <ProfileSvg></ProfileSvg>
                            </div>
                            Adicionar Cliente
                        </div>
                        <button type="button" onClick={() => { showAddClientModal(false) }} className="self-start text-3xl font-bold leading-3 text-white ">X</button>
                    </div>
                    <label htmlFor="user_email" className="label-input mt-14">
                        <input placeholder="Email do Cliente" name="user_email" value={userEmail} onChange={e => setUserEmail(e.target.value)} type="text" className="my-input peer" autoFocus />
                        <span className="span-input ">Email do Cliente</span>
                    </label>
                    <div className="flex justify-between">
                        <button className="my-btn w-full " type="submit">
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddClientModal;
