"use client"
import {  useContext, useEffect, useState } from "react"
import { GlobalContext  } from "./GlobalContext";

export type TToast = {
    type: "success" | "warning" | "error" | null,
    message: string | null,
}

export const MyToast = () => {
    const globalState = useContext(GlobalContext);
    const [toastClass, setToastClass] = useState("translate-y-[-420%]");

    useEffect(() => {
        if (globalState?.toast.type === null) return
        let color: string;
        if (globalState?.toast.type === "success") {
            color = "bg-success"
        } else if (globalState?.toast.type === "warning") {
            color = "bg-warning"
        } else {
            color = "bg-error"
        }
        setToastClass(("translate-y-0 " + color));
        setTimeout(() => {
            setToastClass("translate-y-[-420%]")
            globalState?.setToast({ type: null, message: "" })
        }, 2000)
    }, [globalState]);

    return (
        <div className={`fixed flex w-72 justify-center items-center  transition duration-700 ease-in-out ${toastClass} right-4 top-[15vh] sm:w-[25%] h-16 z-50 rounded-lg  `}>
            <span className="text-md text-white font-sans">
                {globalState?.toast.message}
            </span>
        </div>
    )
}
