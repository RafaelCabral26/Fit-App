import createQueryString from "@/services/createQueryString";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { formatDate } from "../planilha/construtor_planilha/Spreadsheet_Utilities";

const EditClientSpreadsheetModal = ({ spreadsheets, showEditModal }: { spreadsheets: any[] | null, showEditModal: React.Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter();
    const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<string | null>(null);
    const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpreadsheet(event.target.value);
        console.log(spreadsheets);
        
    }
    
    const redirectToEditSpreadsheet = () => {
        router.replace(`/planilha/construtor_planilha?${createQueryString("spreadsheet_id", selectedSpreadsheet)}&${createQueryString("previous_url","alunos")}`);
    }
    
    return (
        <div className="fixed top-20 h-screen w-screen z-10">
            <form className="my-form-modal">
                <div className="flex justify-between ">
                    <h1>Planilhas</h1>
                    <button onClick={() => showEditModal(false)} type="button" className="text-2xl">X</button>
                </div>
                <label className="label">
                    <span className="text-[8px] leading-4 text-secondary">(Mais recentes primeiro)</span>
                </label>
                <select onChange={handleSelected} className="my-input bg-base-300">
                    <option hidden>Escolher Planilha...</option>
                    {spreadsheets?.map((ele: any, index: number) => {
                        return (
                            <option value={ele.spreadsheet_id} key={ele.spreadsheet_id}>Planilha {String(index + 1)} - {formatDate(ele.updatedAt)} </option>
                        )
                    })}
                </select>
                <div className="flex justify-evenly">
                    <button onClick={redirectToEditSpreadsheet} type="button" className="my-btn">Editar</button>
                    <button type="button" className="my-btn-red">Deletar</button>
                </div>
            </form>
        </div>
    )
}

export default EditClientSpreadsheetModal;