import { GlobalContext } from "@/services/GlobalContext";
import { HidePassSvg, ShowPassSvg } from "@/svgs/show-hide-eyes";
import myHTTP from "@/services/axiosconfig";
import { SetStateAction, useContext, useEffect, useState } from "react"
import { ValidateRegisterInput } from "./ValidationUserInput";
import { ProfileSvg } from "@/svgs/profilecircle";
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
        setRegisterInput((prev: TRegisterInput) => {
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
        <div className="fixed  top-0 backdrop-blur-lg bg-white/20  h-screen w-full z-50">
            <div className="relative w-full p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={tryRegister} className="my-form-modal flex flex-col gap-4 z-30">
                    <div className="absolute  flex items-center justify-between left-0 top-0 bg-secondary w-full h-14 p-4 rounded-t-md">
                        <div className="flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white  ">
                            <div className="w-10 text-white p-2">
                                <ProfileSvg></ProfileSvg>
                            </div>
                            CADASTRO
                        </div>
                        <button type="button" onClick={() => { showRegisterModal(false); globalState?.isDragDisabledSwitch(false) }} className="self-start text-3xl font-bold leading-3 text-white ">X</button>
                    </div>
                    <label htmlFor="name" className="label-input mt-14">
                    <input name="name"  placeholder="Nome" onChange={handleRegisterInput} type="text" className=" my-input peer " autoFocus />
                        <span className="span-input">Nome</span>
                    </label>

                    <label htmlFor="email" className="label-input">
                        <input name="email" placeholder="Email" onChange={handleRegisterInput} type="email" className=" my-input peer" />
                        <span className="span-input">Email</span>
                    </label>

                    <label htmlFor="password" className="label-input relative">
                        <input name="password" placeholder="Senha" onChange={handleRegisterInput} type={passwordViewState ? "text" : "password"} className=" my-input peer" />
                        <span className="span-input">Senha</span>
                        <button type="button" onClick={handlePasswordView} className="absolute right-2 top-[50%] -translate-y-[50%] ">
                            {passwordViewState ? <ShowPassSvg></ShowPassSvg> : <HidePassSvg></HidePassSvg>}
                        </button>
                    </label>

                    <label htmlFor="password_confirm" className="label-input">
                        <input name="password_confirm" placeholder="Confirmar Senha" onChange={handleRegisterInput}
                            type="password" className=" my-input peer" />
                        <span className="span-input">Confirmar Senha</span>
                    </label>

                        <div className="flex flex-col justify-evenly">
                            <span className="text-xs leading-4 text-secondary-focus mt-1">Selecione o tipo de conta.(Treinador pode enviar planilhas.)</span>
                            <div className="flex">
                                <label className="label gap-2 ">
                                    <input className="checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm" type="checkbox" checked={userProfile === "user"} onChange={() => setUserProfile("user")} onClick={() => setUserProfile("user")} />
                                    <span className="label-text text-xs">Praticante</span>
                                </label>
                                <label className="label gap-2 ">
                                    <input className="checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm" type="checkbox" checked={userProfile === "trainer"} onChange={() => setUserProfile("trainer")} onClick={() => setUserProfile("trainer")} />
                                    <span className="label-text text-xs">Treinador</span>
                                </label>
                            </div>
                            <button type="submit" className="my-btn">Registrar</button>
                    </div>
                    <div>
                        <div className="card">
                            <span className="text-2xl font-sans">Contas de Demonstração:</span>
                            <span>treinador@email.com & cliente@email.com</span>
                            <span>Senhas: 123123123</span>
                        </div>
                    </div>
                </form>
                </div>
            </div>
    )
}
export default RegisterModal
