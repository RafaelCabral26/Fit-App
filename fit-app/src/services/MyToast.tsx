"use client"
import { SetStateAction, createContext, useContext, useEffect, useState } from "react"

type TToast = {
    type: "success" | "warning" | "error" | null,
    message: string | null,
}
type TPropsGlobalContext = {
    toast: TToast,
    setToast: React.Dispatch<SetStateAction<TToast>>,
    isDragDisabledState:boolean
    isDragDisabledSwitch: React.Dispatch<SetStateAction<boolean>>
}
export const GlobalContext = createContext<TPropsGlobalContext | null>(null)
export const GlobalProvider = ({ children }: { children: JSX.Element[] }) => {
    const [toast, setToast] = useState<TToast>({ type: null, message: null })
    const [isDragDisabledState, isDragDisabledSwitch] = useState<boolean>(false);
    return (
        <GlobalContext.Provider value={{ toast, setToast,isDragDisabledState, isDragDisabledSwitch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const MyToast = () => {
    const globalState = useContext(GlobalContext)
    const [toastClass, setToastClass] = useState("translate-y-[-320%]")
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

        setToastClass(("translate-y-0 " + color))
        setTimeout(() => {
            setToastClass("translate-y-[-320%]")
        }, 2000)
    }, [globalState])
    return (
        <div className={`flex justify-center items-center absolute transition duration-700 ease-in-out ${toastClass} right-4 top-[15vh] w-[25%] h-16 z-50 rounded-lg  `}>
            <span className="text-md">
                {globalState?.toast.message}
            </span>
        </div>
    )
}
