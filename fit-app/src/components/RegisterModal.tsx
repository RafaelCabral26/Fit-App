import { GlobalContext } from "@/services/GlobalContext";
import { HidePassSvg, ShowPassSvg } from "@/svgs/show-hide-eyes";
import myHTTP from "@/services/axiosconfig";
import { SetStateAction, useContext, useEffect, useState } from "react"
import { ValidateRegisterInput } from "./ValidationUserInput";
export type TRegisterInput = {
    name: string,
    email: string,
    password: string,
    password_confirm: string,
    profile: "user" | "trainer",
}
const RegisterModal = ({ showRegisterModal }: { showRegisterModal: React.Dispatch<SetStateAction<boolean>> }) => {
    const globalState = useContext(GlobalContext);
    const [passwordViewState, setPasswordViewState] = useState<boolean>(false)
    const [userProfile, setUserProfile] = useState<"user" | "trainer">("user");
    const [registerInput, setRegisterInput] = useState<TRegisterInput>({
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        profile: userProfile,
    });

    useEffect(() => {
        setRegisterInput((prev) => {return {...prev, profile:userProfile}});
    },[userProfile])

    const handleRegisterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterInput((prev: any) => {
            return { ...prev, [name]: value  };
        })
    }
    const tryRegister = (e:React.SyntheticEvent) => {
        e.preventDefault();
        const validation = ValidateRegisterInput(registerInput);
        if (validation.valid === false) {
            return globalState?.setToast({ type: "warning", message: validation.message })
        }
        myHTTP.post("/register", registerInput)
            .then(res => {
                globalState?.setToast({ type: "success", message: "Cadastro realizado com sucesso." })
                showRegisterModal(false);
            })
            .catch(err => {
                return globalState?.setToast({type:"error", message:err.response.data.msg})
            })
    }
    const handlePasswordView = () => {
        if (passwordViewState) {
            return setPasswordViewState(false)
        }
        setPasswordViewState(true);
    }
    return (
        <div className="fixed top-20 h-screen w-screen z-10">
            <div className="relative w-80 p-4 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <form onSubmit={tryRegister} className="my-form-modal z-30">
                    <div className="flex justify-between">
                        <h1 className="">Cadastro</h1>
                        <button type="button" onClick={() => { showRegisterModal(false); globalState?.isDragDisabledSwitch(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
                    </div>
                    <label className="label">
                        <span className="label-text text-xs">Nome</span>
                    </label>
                    <input name="name" onChange={handleRegisterInput} type="text" className="my-input" autoFocus />

                    <label className="label">
                        <span className="label-text text-xs">Email</span>
                    </label>
                    <input name="email" onChange={handleRegisterInput} type="email" className="my-input" />

                    <label className="label">
                        <span className="label-text text-xs">Senha</span>
                    </label>
                    <div className="relative">
                        <input name="password" onChange={handleRegisterInput} type={passwordViewState ? "text" : "password"} className="my-input" />
                        <button type="button" onClick={handlePasswordView} className="absolute right-2 top-[50%] -translate-y-[50%] ">
                            {passwordViewState ? <ShowPassSvg></ShowPassSvg> : <HidePassSvg></HidePassSvg>}
                        </button>
                    </div>

                    <label className="label">
                        <span className="label-text text-xs">Confirmar Senha</span>
                    </label>
                    <input name="password_confirm" onChange={handleRegisterInput}
                        type="password" className="my-input" />

                    <div className="">
                        <div className="flex flex-col justify-evenly">
                            <span className="text-xs leading-4 text-secondary">Selecione o tipo de conta.(Treinador pode enviar planilhas.)</span>
                            <div className="flex">
                                <label className="label ">
                                    <input type="checkbox" checked={userProfile === "user"} onChange={() => setUserProfile("user")} onClick={() => setUserProfile("user")} />
                                    <span className="label-text text-xs">Praticante</span>
                                </label>
                                <label className="label">
                                    <input type="checkbox" checked={userProfile === "trainer"} onChange={() => setUserProfile("trainer")} onClick={() => setUserProfile("trainer")} />
                                    <span className="label-text text-xs">Treinador</span>
                                </label>
                            </div>
                            <button type="submit" className="my-btn">Registrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default RegisterModal
