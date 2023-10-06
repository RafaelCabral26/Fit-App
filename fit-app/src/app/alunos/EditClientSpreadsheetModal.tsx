import { SetStateAction } from "react";

const EditClientSpreadsheetModal = ({spreadsheets, showEditModal}:{spreadsheets:any[]|null, showEditModal:React.Dispatch<SetStateAction<boolean>>}) => {
   console.log(spreadsheets);
    
    
    return (
        <div className="fixed top-20 h-screen w-screen z-10">
                <form className="my-form-modal">
                <div className="flex justify-between ">
                    <h1>Planilhas - {}</h1>
                    <button onClick={() => showEditModal(false)} type="button" className="text-2xl">X</button>
                </div>
                <label className="label">
                    <span className="text-[8px] leading-4 text-secondary">(Mais recentes primeiro)</span>
                </label>
                <select className="my-input bg-base-300">
                    <option hidden>Escolher Planilha...</option>
                    {spreadsheets?.map((ele:any,index:number) => {
                        return (
                        <option key={ele.spreadsheet_id}>Planilha { String(index+1)} - {ele.updatedAt.substr(0,9)}</option>
                        )
                    })}
                </select>
                <div className="flex justify-evenly">
                    <button type="button" className="my-btn">Editar</button>
                    <button type="button" className="my-btn-red">Deletar</button>
                </div>
                </form>
        </div>
    )
} 

export default EditClientSpreadsheetModal;
