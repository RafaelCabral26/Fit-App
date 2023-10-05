import { TDays } from "../planilha/construtor_planilha/Spreadsheet_Types";

const EditClientSpreadsheetModal = ({spreadsheets}:{spreadsheets:any[]}) => {
    
    
    return (
        <div className="fixed top-20 h-screen w-screen z-10">
                <form className="my-form-modal">
                <select className="my-input bg-base-300">
                    <option hidden>Escolher Planilha...</option>
                    {spreadsheets?.map((ele:any,index:number) => {
                        return (
                        <option>{ele.updatedAt(0,9)}</option>
                        )
                    })}
                </select>
                </form>
        </div>
    )
} 

export default EditClientSpreadsheetModal;
