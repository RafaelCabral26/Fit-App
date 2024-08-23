"use client"
import { ProfileSvg } from "@/svgs/profilecircle"
import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import myHTTP from "@/services/axiosconfig"
import { GlobalContext } from "@/services/GlobalContext"
import { redirect, usePathname, useRouter } from "next/navigation"
import FitAndAppLogo from "@/svgs/fitAndApp-logo"
import CaretDown from "@/svgs/caretDown"
import NavbarMobile from "./NavbarMobile"

export const Navbar = () => {
  const globalState = useContext(GlobalContext);
  const router = useRouter();
  const [loginModal, showLoginModal] = useState<boolean>(false);
  const [registerModal, showRegisterModal] = useState<boolean>(false);
  const myUrl = usePathname();

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

  const checkUser = useMemo(() => async () => {
    myHTTP.post("/check_user")
      .then(res => {
        if (res.data.logged) {
          return globalState?.setUserType(res.data.profile);
        }
        globalState?.setUserType(null);
      })
      .catch(err => {
        if (err.response) return globalState?.setToast({ type: "warning", message: err.response.data.msg });
      })
  }, [handleLogout])

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleMySpreadsheetsRedirect = () => {
    if (globalState?.userType === null) {
      showLoginModal(true);
      return globalState.setToast({ type: "warning", message: "Faça login para acessar planilhas." })
    }
    redirect("/planilha/minhas_planilhas");
  }


  return (
    <>
      <div className={`navbar justify-between gap-4 relative z-30 px-4 lg:px-[8vw] p-0 bg-white/90 shadow-sm mb-14 `}>
        <div className="flex ">
          <a href="/" className=" w-44 lg:w-64">
            <FitAndAppLogo></FitAndAppLogo>
          </a>
        </div>
        <div aria-label="Teste" className='hidden  md:flex basis-full justify-between md:gap-4 text-xs md:text-sm lg:text-lg'>
          <div>
            <div className="dropdown dropdown-end dropdown-hover">
              <label tabIndex={0} className={` m-1 cursor-pointer hover:text-secondary my-list-item flex items-center`}>Ferramentas
                <CaretDown />
              </label>
              <ul tabIndex={0} className="my-dropdown peer-hover:bg-none">
                <li className="">
                  <a className="my-list-item" href="/ferramentas/calc_suplementos/">Calculadora Suplementos</a>
                </li>
                <li className="">
                  <a className="my-list-item " href="/ferramentas/composicao_corporal">Composição Corporal</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-end dropdown-hover ">
              <label tabIndex={0} className={`flex items-center  m-1 cursor-pointer hover:text-secondary my-list-item  `}>Planilhas <CaretDown /></label>
              <ul tabIndex={0} className="my-dropdown">
                <li className=""><a className="my-list-item" href="/planilha/construtor_planilha">Criar Planilha</a></li>
                <li onClick={handleMySpreadsheetsRedirect} className=""><a className="my-list-item" >Minhas Planilhas</a></li>
              </ul>
            </div>
          </div>
          <ul className="flex items-center gap-4">
            {globalState?.userType === null &&
              <div className="flex gap-4">
                <button className="my-btn  " onClick={() => { showLoginModal(true) }}>Login</button>
                <button className="btn btn-outline btn-primary my-2 font-sans " onClick={() => showRegisterModal(true)} >CADASTRAR</button>
              </div>
            }
            {globalState?.userType === "user" &&
              (<>
                <li><a href="/perfil" className="my-btn" >Perfil</a></li>
                <li><button className="btn btn-secondary btn-outline btn-sm " onClick={handleLogout}>Sair</button></li>
              </>)
            }
            {globalState?.userType === "trainer" &&
              (<>
                <li><a href="/perfil" className="my-btn" >Perfil</a></li>
                <li><a href={"/alunos"} className="my-btn" >Alunos</a></li>
                <li><button className="my-list-item" onClick={handleLogout}>Sair</button></li>
              </>)
            }
          </ul>
        </div>
        <div className="md:hidden">
          <NavbarMobile showRegisterModal={showRegisterModal} showLoginModal={showLoginModal} handleLogout={handleLogout}></NavbarMobile>
        </div>
      </div>
      {loginModal && <LoginModal showLoginModal={showLoginModal}></LoginModal>
      }
      {registerModal && <RegisterModal showRegisterModal={showRegisterModal}></RegisterModal>}
    </>
  )
}
