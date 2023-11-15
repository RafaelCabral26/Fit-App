import createQueryString from "@/services/createQueryString";
import { useRouter } from "next/navigation";
import { useContext, SetStateAction, useState } from "react";
import { formatDate } from "../planilha/construtor_planilha/Spreadsheet_Utilities";
import myHTTP from "@/services/axiosconfig";
import { GlobalContext } from "@/services/GlobalContext"
import { TDbSpreadsheet } from "../planilha/construtor_planilha/Spreadsheet_Types";
import EditSpreadsheetSvg from "@/svgs/editSpreadsheet";

const EditClientSpreadsheetModal = ({ selectedClient, showEditModal }: { selectedClient: TDbSpreadsheet[] | null, showEditModal: React.Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter();
    const globalState = useContext(GlobalContext);
    const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<string>("");

    const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpreadsheet(event.target.value);
    };

    const redirectToEditSpreadsheet = () => {
        router.replace(`/planilha/construtor_planilha?${createQueryString("spreadsheet_id", selectedSpreadsheet)}&${createQueryString("previous_url", "alunos")}`);
    };

    const handleDeleteClientSpreadsheet = (clientSpreadsheetId: string | null) => {
        if (clientSpreadsheetId === null) return;
        myHTTP.delete(`delete_client_spreadsheet/${clientSpreadsheetId}`)
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg });
                showEditModal(false);
            })
            .catch(err => {
                globalState?.setToast({ type: "warning", message: err.response.data.msg });
            });
    };

    return (
        <div className="fixed top-20 h-screen w-screen z-10">
            <form className="my-form-modal">
                <div className="absolute  flex items-center justify-between left-0 top-0 bg-secondary w-full h-14 p-4  ">
                    <div className="flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ">
                        <div className="w-10 text-white p-2  rounded-sm">
                            <EditSpreadsheetSvg></EditSpreadsheetSvg>
                        </div>
                        EDITAR PLANILHAS
                    </div>
                    <button onClick={() => showEditModal(false)} type="button" className="my-close-btn">X</button>
                </div>
                <label className="label mt-14">
                    <span className="text-xs leading-4 text-secondary ">(Mais recentes primeiro)</span>
                </label>
                <select onChange={handleSelected} className="my-select w-full ">
                    <option hidden>Escolher Planilha...</option>
                    {selectedClient?.map((ele: TDbSpreadsheet, index: number) => {
                        return (
                            <option value={ele.spreadsheet_id} key={ele.spreadsheet_id}>Planilha {String(index + 1)} - {formatDate(ele.updatedAt)} </option>
                        )
                    })}
                </select>
                <div className="flex justify-evenly gap-2">
                    <button onClick={redirectToEditSpreadsheet} type="button" className="my-btn w-full">Editar</button>
                    <button onClick={() => handleDeleteClientSpreadsheet(selectedSpreadsheet)} type="button" className="my-btn-red w-full">Deletar</button>
                </div>
            </form>
        </div>
    )
}

export default EditClientSpreadsheetModal;
