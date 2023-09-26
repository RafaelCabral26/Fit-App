"use client"

import myHTTP from "@/services/axiosconfig";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TDays } from "../nova_planilha/nova_planilha_Types";

const EditSpreadsheet = () => {
    const searchParams = useSearchParams();
    const [ spreadsheet, setSpreadsheet ] = useState();
    const [ days, setDays ] = useState();
    useEffect(() => {
    myHTTP.get(`/search_spreadsheet/${searchParams.get("spreadsheet_id")}`)
        .then(res => {
                const parsedSpreadsheet = JSON.parse(res.data.spreadsheet.spreadsheet_days);
                setDays(parsedSpreadsheet)
            })
        .catch(err => {
                console.log(err);
            })
    }, [])
    const teste = () => {
        console.log(days);
    }
    return (
        <div className="container m-auto">
            <button onClick={teste} className="my-btn">
                Editar PLanilha
            </button>
            <div className="flex">
                {}
            </div>
        </div>
    )
}

export default EditSpreadsheet;
