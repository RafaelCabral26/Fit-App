"use client"
import { ProfileSvg } from "@/svgs/profilecircle"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import myHTTP from "@/services/axiosconfig"
import { GlobalContext } from "@/services/GlobalContext"
import { usePathname, useRouter } from "next/navigation"
import FitAndAppLogo from "@/svgs/fitAndApp-logo"

export const Navbar = () => {
    const globalState = useContext(GlobalContext);
    const router = useRouter();
    const [loginModal, showLoginModal] = useState<boolean>(false);
    const [registerModal, showRegisterModal] = useState<boolean>(false);
    const myUrl = usePathname();
    const [navFontColor, setNavFontColor] = useState<string>("bg-gray-200/20");

    useLayoutEffect(() => {
        myUrl !== "/" ?
            setNavFontColor("text-primary") :
            setNavFontColor("text-white");
    }, [myUrl]);

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
                if (err.response) globalState?.setToast({ type: "error", message: err.response.data.msg });
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
                if (err.response) globalState?.setToast({ type: "warning", message: err.response.data.msg });
            })
    }, [handleLogout]);



    return (
        <>
            <div className={`navbar relative z-30 justify-center md:justify-between px-[15vw] 2xl:px-[18vw] p-4 ${myUrl !== "/" ? "bg-primary" : "bg-gray-200/20"}  `}>
                <a href="/" className='w-36 md:w-56'>
                    <FitAndAppLogo></FitAndAppLogo>
                </a>
                <div className='flex items-center font-bold gap-4'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className={`${myUrl !== "/" ? "text-secondary" : "text-white"} font-normal font-mono text-xs lg:text-xl m-1 cursor-pointer hover:text-secondary my-list-item`}>PLANILHA</label>
                        <ul tabIndex={0} className="my-dropdown">
                            <li className=""><a className="my-list-item" href="/planilha/construtor_planilha">Criar Planilha</a></li>
                            <li className=""><a className="my-list-item" href="/planilha/minhas_planilhas">Minhas Planilhas</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end w-6">
                        <label tabIndex={0} className={`cursor-pointer w-32 ${myUrl !== "/" ? "text-white" : "text-secondary"}`}><ProfileSvg /></label>
                        <ul tabIndex={0} className="my-dropdown">
                            {globalState?.userType === null &&
                                <ul>
                                    <li><button className="my-list-item " onClick={() => { showLoginModal(true) }}>Login</button></li>
                                    <li><button className="my-list-item" onClick={() => showRegisterModal(true)} >Cadastrar</button></li>
                                </ul>
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
