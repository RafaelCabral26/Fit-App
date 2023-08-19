import myHTTP from "@/services/axiosconfig";
import React, { SetStateAction, useContext, useState } from "react"
import { ToastContext } from "@/services/MyToast";

const LoginModal = ({ showLoginModal }: { showLoginModal: React.Dispatch<SetStateAction<boolean>> }) => {
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    const toastState = useContext(ToastContext)
    const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginInput((prev: any) => {
            return { ...prev, [name]: value };
        })
    }
    const tryLogin = () => {
        toastState?.setToast({type:"success", message:"mudando"});
    }
    return (
        <div className="absolute h-screen w-screen">
            <div className="absolute h-screen w-screen top-0 left-0 bg-white blur-3xl ">
            </div>
            <div className="relative w-80 p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form className="my-form-modal">
                    <div className="flex justify-between">
                        <h1 className="">Login</h1>
                        <button onClick={() => { showLoginModal(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
                    </div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name="email" onChange={handleLoginInput} type="text" className="my-input" autoFocus />
                    <label className="label">
                        <span className="label-text">Senha</span>
                    </label>
                    <input name="password" onChange={handleLoginInput} className="my-input" />

                    <button onClick={tryLogin} className="my-btn" type="button">Entrar</button>
                </form>
            </div>
        </div>
    )
}
export default LoginModal
