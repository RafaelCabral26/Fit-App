"use client"
import { SetStateAction, createContext, useContext, useEffect, useState } from "react"

export type TToast = {
    type: "success" | "warning" | "error" | null,
    message: string | null,
}
export type TPropsGlobalContext = {
    toast: TToast,
    setToast: React.Dispatch<SetStateAction<TToast>>,
    isDragDisabledState: boolean
    isDragDisabledSwitch: React.Dispatch<SetStateAction<boolean>>
    userType:"user" | "trainer" | null,
    setUserType:React.Dispatch<SetStateAction<"user" | "trainer" | null>>

}
export const GlobalContext = createContext<TPropsGlobalContext | null>(null)

export const GlobalProvider = ({ children }: { children: JSX.Element[] }) => {
    const [toast, setToast] = useState<TToast>({ type: null, message: null })
    const [isDragDisabledState, isDragDisabledSwitch] = useState<boolean>(false);
    const [ userType, setUserType ] = useState<"user" | "trainer" | null>(null)
    return (
        <GlobalContext.Provider value={{ toast, setToast, isDragDisabledState, isDragDisabledSwitch , userType, setUserType}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const MyToast = () => {
    const globalState = useContext(GlobalContext)
    const [toastClass, setToastClass] = useState("translate-y-[-420%]")

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
            setToastClass("translate-y-[-420%]")
            globalState?.setToast({ type: null, message: "" })
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
