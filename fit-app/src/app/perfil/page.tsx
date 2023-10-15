"use client"

import myHTTP from "@/services/axiosconfig";
import { useContext, useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { GlobalContext } from "@/services/GlobalContext";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const globalState = useContext(GlobalContext);
    const router = useRouter();
    const [userData, setUserData] = useState<{ name: string, email: string }>();
    const [ modalEditProfile, showModalEditProfile ] = useState<boolean>(false);
    useEffect(() => {
        myHTTP.get("/user_profile")
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => {
                globalState?.setToast({type:"warning", message:err.response.data.msg});
                router.replace("/");
                
            })

    }, []);
    return (
        <div className=" container m-auto my-10">
            <div className="flex flex-col md:flex-row  justify-center w-[90%] md:w-[40%] gap-10 m-auto border-2 border-primary rounded-xl">
                <div className="card-body">
                    <span className="card-title">Nome</span>
                    <hr />
                    {userData?.name &&
                        <span>{userData?.name}</span>
                    }
                    <span className="card-title">Email</span>
                    <hr />
                    {userData?.name &&
                        <span>{userData?.email}</span>
                    }
                    <div className="flex  gap-2">
                        <button onClick={() => showModalEditProfile(true)} type="button" className="my-btn">Editar</button>
                        <button className="my-btn-red">Deletar</button>
                    </div>
                </div>
                <div className="card-body">
                    <span className="card-title">Medidas e Dados</span>
                    <div className="basis-10/12 flex justify-center items-center border-2 border-slate-400">
                       <span className="text-slate-500">Em breve...</span> 
                    </div>

                </div>
            </div>
            {
                modalEditProfile &&
                    <EditProfileModal showModalEditProfile={showModalEditProfile} userData={userData}></EditProfileModal>
            }
        </div>
    )
}

export default ProfilePage;
