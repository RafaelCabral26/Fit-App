"use client"

import myHTTP from "@/services/axiosconfig";
import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";

const ProfilePage = () => {
    const [userData, setUserData] = useState<{ name: string, email: string }>();
    useEffect(() => {
        myHTTP.get("/user_profile")
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => {
                console.log(err);
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
                        <button className="my-btn">Editar</button>
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
            <EditProfileModal></EditProfileModal>
        </div>
    )
}

export default ProfilePage;
