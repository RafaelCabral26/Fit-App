"use client"
import { ProfileSvg } from "@/svgs/profilecircle"
import { useContext, useEffect, useState } from "react"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import myHTTP from "@/services/axiosconfig"
import { GlobalContext } from "@/services/GlobalContext"
import { useRouter } from "next/navigation"
import FitAndAppLogo from "@/svgs/fitAndApp-logo"

export const Navbar = () => {
    const globalState = useContext(GlobalContext);
    const router = useRouter();
    const [loginModal, showLoginModal] = useState<boolean>(false)
    const [registerModal, showRegisterModal] = useState<boolean>(false)

    const handleLogout = () => {
        myHTTP.get("/logout")
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg });
                globalState?.setUserType(null);
            })
            .then(() => {
                showLoginModal(false);
                router.replace("/");
            })
            .catch(err => {
                globalState?.setToast({ type: "error", message: err.response.data.msg });
            })
    };

    useEffect(() => {
        myHTTP.post("/check_user")
            .then(res => {
                if (res.data.logged) {
                    return globalState?.setUserType(res.data.profile);
                }
                globalState?.setUserType(null);

            })
            .catch(err => {
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
            })
    }, [handleLogout]);

    return (
        <>
            <div className='navbar fixed z-30  justify-between px-[25vh]  p-4'>
                <div className='lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <a href="/" className='text-2xl text-primary font-bold'>
                    <FitAndAppLogo></FitAndAppLogo>
                </a>

                <div className='flex items-center font-bold gap-4'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="font-sans font-normal text-xl m-1 cursor-pointer hover:text-primary">Planilha</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className=""><a className="my-list-item" href="/planilha/construtor_planilha">Criar Planilha</a></li>
                            <li className=""><a className="my-list-item" href="/planilha/minhas_planilhas">Minhas Planilhas</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="cursor-pointer"><ProfileSvg /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            {globalState?.userType === null &&
                                <>
                                    <li><button className="my-list-item" onClick={() => { showLoginModal(true) }}>Login</button></li>
                                    <li><button className="my-list-item" onClick={() => showRegisterModal(true)} >Cadastrar</button></li>
                                </>
                            }
                            {globalState?.userType === "user" &&
                                (<>
                                    <li><a href="/perfil" className="my-list-item" >Perfil</a></li>
                                    <li><button className="my-list-item" onClick={handleLogout}>Sair</button></li>
                                </>)
                            }
                            {globalState?.userType === "trainer" &&
                                (<>
                                    <li><a href="/perfil" className="my-list-item" >Perfil</a></li>
                                    <li><a href={"/alunos"} className="my-list-item" >Alunos</a></li>
                                    <li><button className="my-list-item" onClick={handleLogout}>Sair</button></li>
                                </>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {loginModal && <LoginModal showLoginModal={showLoginModal}></LoginModal>}
            {registerModal && <RegisterModal showRegisterModal={showRegisterModal}></RegisterModal>}
        </>
    )
}
