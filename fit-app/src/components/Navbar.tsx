"use client"
import { ProfileSvg } from "@/svgs/profilecircle"
import { useContext, useEffect, useState } from "react"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import myHTTP from "@/services/axiosconfig"
import { GlobalContext } from "@/services/MyToast"
export const Navbar = () => {
    const globalState = useContext(GlobalContext);
    const [loginModal, showLoginModal] = useState<boolean>(false)
    const [registerModal, showRegisterModal] = useState<boolean>(false)
    const [userState, setUserState] = useState<"user" | "trainer" | null>(null)
    useEffect(() => {
        myHTTP.post("/check_user")
            .then(res => {
                if (res.data.logged) {
                    return setUserState(res.data.profile)
                }
                setUserState(null)
            })
            .catch(err => {
                console.log(err);
            })
    })
    const handleLogout = () => {
        myHTTP.get("/logout")
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg })
            })
            .then(() => {
                showLoginModal(false)
            })
            .catch(err => {
                globalState?.setToast({ type: "error", message: err.response.data.msg })
            })
    }
    return (

        <div className='navbar border-b-2  p-4 drop-shadow-lg'>
            <div className='container flex justify-between m-auto'>
                <div className='lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <a href="/" className='text-primary font-bold'>FitApp</a>
                <div className='flex items-center font-bold gap-4'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className=" m-1 cursor-pointer hover:text-secondary">Planilha</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/planilha/nova_planilha">Criar Planilha</a></li>
                            <li><a>Minhas Planilhas</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="cursor-pointer"><ProfileSvg /></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            {userState === null &&
                                <>
                                    <li><button onClick={() => { showLoginModal(true) }}>Login</button></li>
                                    <li><button onClick={() => showRegisterModal(true)} >Cadastrar</button></li>
                                </>
                            }
                            {userState === "user" &&
                                (<>
                                    <li><button>Perfil</button></li>
                                    <li><button onClick={handleLogout}>Sair</button></li>
                                </>)
                            }
                            {userState === "trainer" &&
                                (<>
                                    <li><button>Perfil</button></li>
                                    <li><button>Alunos</button></li>
                                    <li><button onClick={handleLogout}>Sair</button></li>
                                </>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {loginModal && <LoginModal showLoginModal={showLoginModal}></LoginModal>}
            {registerModal && <RegisterModal showRegisterModal={showRegisterModal}></RegisterModal>}
        </div>
    )
}
