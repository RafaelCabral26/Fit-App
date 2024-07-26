"use client"

import { GlobalContext } from "@/services/GlobalContext";
import Burguer from "@/svgs/Burguer";
import CaretDown from "@/svgs/caretDown";
import FitAndAppLogo from "@/svgs/fitAndApp-logo";
import { SetStateAction, useContext } from "react";

const NavbarMobile = ({ showLoginModal, showRegisterModal, handleLogout }: {
  showLoginModal: React.Dispatch<SetStateAction<boolean>>,
  showRegisterModal: React.Dispatch<SetStateAction<boolean>>,
  handleLogout: () => void;
}) => {
  const globalState = useContext(GlobalContext);

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="w-10">
          <Burguer />
        </div>
        <ul tabIndex={0} className="my-dropdown w-[90vw]">
          <details className="ease-out open:-rotate-90" >
            <summary className='fill-secondary flex items-center ' >
              <div className="w-12 h-12">
                <CaretDown />
              </div>
                Planilhas
            </summary>
            <ul>
              <li >
                <a href="/planilha/construtor_planilha">
                  <div className="divider m-0 divider-horizontal"></div>
                  Criar Planilha
                </a>
              </li>
              <li >
                <a className="" href="/planilha/minhas_planilhas">
                  <div className="divider m-0 divider-horizontal"></div>
                  Minhas Planilhas
                </a>
              </li>
            </ul>
          </details>
          <details className="ease-out open:-rotate-90" >
            <summary className='flex items-center ' >
              <div className="w-12 h-12">
                <CaretDown />
              </div>
              Ferramentas
            </summary>
            <ul>
              <li >
                <a href="/ferramentas/calc_suplementos/">
                  <div className="divider m-0 divider-horizontal"></div>
                  Criar Planilha
                </a>
              </li>
              <li >
                <a href="/ferramentas/composicao_corporal">
                  <div className="divider m-0 divider-horizontal"></div>
                  Planilhas
                </a>
              </li>
            </ul>
          </details>
          {globalState?.userType === null &&
            <div className="flex flex-col  my-4">
              <button className="my-btn " onClick={() => { showLoginModal(true) }}>Login</button>
              <button className="my-btn" onClick={() => showRegisterModal(true)} >Cadastrar</button>
            </div>
          }
          {globalState?.userType === "user" &&
            (<>
              <li><a href="/perfil" className="my-list-item" >Perfil</a></li>
              <li><button className="my-list-item" onClick={handleLogout}>Sair</button></li>
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
      </div >
    </>
  )
}

export default NavbarMobile;
