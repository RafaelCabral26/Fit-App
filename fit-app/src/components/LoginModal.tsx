"use client"
import myHTTP from "@/services/axiosconfig";
import { ShowPassSvg, HidePassSvg } from "@/svgs/show-hide-eyes";
import React, { SetStateAction, useContext, useState } from "react"
import { GlobalContext } from "@/services/GlobalContext";
import { useRouter } from "next/navigation";
import { ProfileSvg } from "@/svgs/profilecircle";

 type TUserEmailAndPass = {
    email:string
    password:string,
}
const LoginModal = ({ showLoginModal }: { showLoginModal: React.Dispatch<SetStateAction<boolean>> }) => {
    const [loginInput, setLoginInput] = useState<TUserEmailAndPass>({ email: "", password: "" });
    const globalState = useContext(GlobalContext)
    const [passwordViewState, setPasswordViewState] = useState<boolean>(false)
    const router = useRouter();
    const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginInput((prev: TUserEmailAndPass) => {
            return { ...prev, [name]: value };
        })
    }
    const tryLogin = (e:React.SyntheticEvent) => {
        e.preventDefault();
        myHTTP.post("/login", loginInput)
            .then((res) => {
                globalState?.setToast({type:"success", message:res.data.msg});
                showLoginModal(false);
                router.replace("/");
            })
            .catch((err) => {
                if (err.response) globalState?.setToast({type:"warning", message:err.response.data.msg});
            })
    };

    const handlePasswordView = () => {
       if (passwordViewState) {
            return setPasswordViewState(false);
        } 
        setPasswordViewState(true);
    };
    return (
        <div className="fixed  top-0 backdrop-blur-lg bg-white/20  h-screen w-full z-50">
            <div className="relative w-full p-4 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={tryLogin} className="my-form-modal">
                    <div className="absolute flex items-center justify-center left-0 top-0 bg-secondary w-full h-14 ">
                        <div className="w-12 h-12 p-2 border-2 rounded-sm">
                                <ProfileSvg></ProfileSvg>

                        </div>
                    </div>
                    <div className="flex justify-between mt-14">
                        <h1 className="font-sans text-secondary">LOGIN</h1>
                        <button type="button" onClick={() => { showLoginModal(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
                    </div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name="email" onChange={handleLoginInput}  type="text" className="my-input" autoFocus />
                    <label className="label relative">
                        <span className="label-text">Senha</span>
                    </label>
                    <div className="relative">
                        <input type={passwordViewState ? "text" : "password"} name="password" onChange={handleLoginInput} className="my-input" />
                        <button type="button" onClick={handlePasswordView} className="absolute right-2 top-[50%] -translate-y-[50%] ">
                            {passwordViewState  ? <ShowPassSvg></ShowPassSvg> : <HidePassSvg></HidePassSvg>}
                        </button>
                    </div>

                    <button onClick={tryLogin} onKeyDown={e => {if (e.key === "Enter") tryLogin}} className="my-btn w-full" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}
export default LoginModal
