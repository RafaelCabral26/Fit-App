"use client"
import { SetStateAction, createContext, useContext, useEffect, useState } from "react"

type TToast = {
    type: "success" | "warning" | "error" | null,
    message: string | null,
}
type TPropsToast = {
    toast: TToast,
    setToast: React.Dispatch<SetStateAction<TToast>>
}
export const ToastContext = createContext<TPropsToast | null>(null)
export const ToastProvider = ({ children }: { children: JSX.Element[] }) => {
    const [toast, setToast] = useState<TToast>({ type: null, message: null })
    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export const MyToast = () => {
    const toastState = useContext(ToastContext)
    const [toastClass, setToastClass] = useState("translate-x-[120%]")
    useEffect(() => {
        if (toastState?.toast.type === null) return
        let color: string;
        if (toastState?.toast.type === "success") {
            color = "bg-success"
        } else if (toastState?.toast.type === "warning") {
            color = "bg-warning"
        } else {
            color = "bg-error"
        }

        setToastClass(("translate-x-0 " + color))
        setTimeout(() => {
            setToastClass("translate-x-[120%]")
        }, 2000)
    }, [toastState])
    return (
        <div className={`flex justify-center items-center absolute transition duration-700 ease-in-out ${toastClass} right-4 top-[15vh] w-[25%] h-16 z-50 rounded-lg  `}>
            <span className="text-md">
                {toastState?.toast.message}
            </span>
        </div>
    )
}
