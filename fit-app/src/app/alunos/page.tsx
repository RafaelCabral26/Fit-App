"use client"

import myHTTP from "@/services/axiosconfig"
import { useContext, useEffect, useState } from "react"
import AddClientModal from "./AddClientModal"
import EditClientSpreadsheetModal from "./EditClientSpreadsheetModal"
import { GlobalContext } from "@/services/GlobalContext"
import { useRouter } from "next/navigation"
import RemoveClientModal from "./RemoveClientModal"
import { TClients, TDbSpreadsheet } from "../planilha/construtor_planilha/Spreadsheet_Types"
import TrashSvg from "@/svgs/trashsvg"
import EditSpreadsheetSvg from "@/svgs/editSpreadsheet"

const ManageClients = () => {
  const globalState = useContext(GlobalContext);
  const [addClientModal, showAddClientModal] = useState<boolean>(false);
  const [editModal, showEditModal] = useState<boolean>(false);
  const [confirmDeleteModal, showConfirmDeleteModal] = useState<boolean>(false);
  const [clientList, setClientList] = useState<TClients[] | null>();
  const [triggerRequest, setTriggerRequest] = useState<boolean>(false);
  const [selectedClientSpreadSheet, setSelectedClientSpreadsheet] = useState<TDbSpreadsheet[] | null>(null);
  const [selectedClientEmail, setSelectedClientEmail] = useState<string | null>(null);

  useEffect(() => {
    myHTTP.get("/client_list")
      .then(res => {
        setClientList(res.data.client_table)
      })
      .catch(err => {
        globalState?.setToast({ type: "warning", message: err.response.data.msg })
      })
  }, [triggerRequest]);

  const handleSelectedClient = (email: string) => {
    if (email === null) return;
    myHTTP.post("/get_client_spreadsheet", { client_email: email })
      .then(res => {
        setSelectedClientSpreadsheet(res.data.user_spreadsheets);
      })
      .catch(err => {
        globalState?.setToast({ type: "warning", message: err.response.data.msg })
      })
    showEditModal(true)
  }
  const handleRemoveClientModal = (clientEmail: string) => {
    setSelectedClientEmail(clientEmail);
    showConfirmDeleteModal(true);
  }
  return (
    <>
      <div className="container flex flex-col  m-auto min-h-lvh ">
        <div className="flex gap-2 justify-center items-center">
          <div>
            <button onClick={() => { showAddClientModal(true) }} className="my-btn">Adicionar Cliente</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table  w-96 m-auto my-10">
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Email</th>
                <th>Planilhas</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {
                clientList?.map((ele: TClients, index: number) => {
                  return (
                    <tr key={ele.name}>
                      <th>{String(index)}</th>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td><button onClick={() => { handleSelectedClient(ele.email) }} className="my-btn m-0 text-secondary">
                        <EditSpreadsheetSvg></EditSpreadsheetSvg>
                      </button></td>
                      <td><button onClick={() => { handleRemoveClientModal(ele.email) }} type="button" className="my-btn w-[50px] peer stroke-secondary  ">
                        <TrashSvg color="stroke-secondary"></TrashSvg>
                      </button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      {
        addClientModal &&
        <AddClientModal showAddClientModal={showAddClientModal} triggerRequest={triggerRequest} setTriggerRequest={setTriggerRequest}></AddClientModal>
      }
      {editModal &&
        <EditClientSpreadsheetModal selectedClient={selectedClientSpreadSheet} showEditModal={showEditModal}></EditClientSpreadsheetModal>
      }
      {confirmDeleteModal &&
        <RemoveClientModal showConfirmDeleteModal={showConfirmDeleteModal} triggerRequest={triggerRequest} setTriggerRequest={setTriggerRequest} selectedClientEmail={selectedClientEmail}></RemoveClientModal>
      }
    </>
  )
}

export default ManageClients
