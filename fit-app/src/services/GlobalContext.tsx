"use client"
import { SetStateAction, useState, createContext } from "react";
import { TToast } from "./MyToast";

export type TPropsGlobalContext = {
    toast: TToast,
    setToast: React.Dispatch<SetStateAction<TToast>>,
    isDragDisabledState: boolean
    isDragDisabledSwitch: React.Dispatch<SetStateAction<boolean>>
    userType: "user" | "trainer" | null,
    setUserType: React.Dispatch<SetStateAction<"user" | "trainer" | null>>

}

export const GlobalContext = createContext<TPropsGlobalContext | null>(null)

export const GlobalProvider = ({ children }: { children: JSX.Element[] }) => {
    const [toast, setToast] = useState<TToast>({ type: null, message: null })
    const [isDragDisabledState, isDragDisabledSwitch] = useState<boolean>(false);
    const [userType, setUserType] = useState<"user" | "trainer" | null>(null)
    return (
        <GlobalContext.Provider value={{ toast, setToast, isDragDisabledState, isDragDisabledSwitch, userType, setUserType }}>
            {children}
        </GlobalContext.Provider>
    )
}
