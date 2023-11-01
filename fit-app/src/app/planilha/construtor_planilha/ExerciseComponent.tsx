import { Draggable, DraggableProvided, } from "@hello-pangea/dnd"
import TrashSvg from "@/svgs/trashsvg"
import EditPencilSvg from "@/svgs/editpencil"
import { SetStateAction, useContext, useState } from "react"
import { TDays, TExercise } from "./Spreadsheet_Types"
import { ValidateAddExercise } from "./Spreadsheet_Utilities"
import { GlobalContext } from "@/services/GlobalContext"

const ExerciseComponent = ({ item, index, daysArray, dayIndex, setNewDayArray }: { item: TExercise, index: number, daysArray: TDays[], dayIndex: number, setNewDayArray: React.Dispatch<SetStateAction<TDays[]>> }) => {

    const globalState = useContext(GlobalContext);
    const [editModal, openEditModal] = useState<boolean>(false);
    const [confirmDeleteModal, showDeleteModal] = useState<boolean>(false);


    const handleDeleteExercise = () => {
        const newArray = daysArray;
        newArray[dayIndex].exercises.splice(index, 1);
        setNewDayArray([...newArray]);

    };

    const handleEditModal = (myBoolean: boolean) => {
        openEditModal(!editModal);
        globalState?.isDragDisabledSwitch(myBoolean);
    }

    return (
        <Draggable isDragDisabled={globalState?.isDragDisabledState} draggableId={item.uId} key={item.uId} index={index}>
            {(provided, snapshot) => {
                return (
                    <div className={`flex  justify-between p-2 m-2 shadow-sm bg-base-100 border-2 border-base-300 ${snapshot.isDragging ? "opacity-50" : "opacity-100"}`}
                        ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="flex flex-col w-32 ">
                            <span className="overflow-clip hover:overflow-visible">
                                {item.exercise_name}
                            </span>
                            <span className="flex gap-2">
                                <span>Séries</span>
                                {item.sets}
                            </span>
                            <span className="flex gap-2">
                                <span>Repetições</span>
                                {item.quantity}
                            </span>
                            <span className="flex flex-col  break-words ">
                                <span>Obs</span>
                                <span className="text-xs">
                                    {item.obs}
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="button" onClick={() => { handleEditModal(true) }} className="">
                                <EditPencilSvg />
                            </button>
                            <button type="button" onClick={() => { showDeleteModal(true) }}>
                                <TrashSvg color="#D40431" />
                            </button>
                        </div>
                        {editModal &&
                            <EditExerciseForm handleEditModal={handleEditModal} index={index} daysArray={daysArray} setNewDayArray={setNewDayArray} dayIndex={dayIndex} item={item}></EditExerciseForm>
                        }
                        {confirmDeleteModal &&
                            <ConfirmDelete provided={provided} itemName={item.exercise_name} handleDeleteExercise={handleDeleteExercise} showDeleteModal={showDeleteModal}></ConfirmDelete>
                        }
                    </div>
                )
            }}
        </Draggable>
    )
}

const EditExerciseForm = ({ handleEditModal, item, index, daysArray, dayIndex, setNewDayArray }: { handleEditModal: (myBoolean: boolean) => void, item: TExercise, index: number, daysArray: TDays[], dayIndex: number, setNewDayArray: React.Dispatch<SetStateAction<TDays[]>> }) => {

    const [newExercise, setNewExercise] = useState<TExercise>({
        exercise_name: item.exercise_name,
        sets: item.sets,
        quantity: item.quantity,
        muscle_group: item.muscle_group,
        subgroup: "",
        obs:item.obs,
        uId: item.uId
    })

    const handleNewExerciseInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewExercise((prev: TExercise) => {
            return { ...prev, [name]: value };
        })
    }

    const updateExercise = () => {
        const isExerciseValid = ValidateAddExercise(newExercise);
        if (!isExerciseValid) return;
        const newArray = daysArray;
        newArray[dayIndex].exercises.splice(index, 1, newExercise);
        setNewDayArray([...newArray]);
        handleEditModal(false);
    }

    return (
        <form className="my-form-modal">
            <div className="flex justify-end">
                <button type="button" onClick={() => { handleEditModal(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
            </div>
            <label className="label">
                <span className="label-text">Exercício</span>
            </label>
            <input onChange={handleNewExerciseInput} autoFocus name="exercise_name" className="my-input" type="text" value={newExercise.exercise_name} />

            <label className="label">
                <span className="label-text">Séries</span>
            </label>
            <input onChange={handleNewExerciseInput} name="sets" type="number" className="my-input" value={newExercise.sets} />

            <label className="label">
                <span className="label-text">Repetições</span>
            </label>
            <input onChange={handleNewExerciseInput} name="quantity" type="number" className="my-input" value={newExercise.quantity} />

            <div className="form-control gap-2">
                <label className="label-text">
                    <span>Observações</span>
                </label>
                <textarea onChange={handleNewExerciseInput}  name="obs"  defaultValue={newExercise.obs} className="my-input resize-none h-20 w-fit  border-primary rounded-xl " maxLength={100} />

            </div>
            <div>
                <button onClick={updateExercise} type="button" className="my-btn w-full">
                    ATUALIZAR
                </button>
            </div>
        </form>
    )
}
const ConfirmDelete = ({ provided, itemName, handleDeleteExercise, showDeleteModal }: { provided: DraggableProvided, itemName: string, handleDeleteExercise: () => void, showDeleteModal: React.Dispatch<SetStateAction<boolean>> }) => {

    return (
        <div data-rfd-drag-handle-context-id={provided.dragHandleProps?.["data-rfd-drag-handle-context-id"]}
            autoFocus
            onBlur={() => { showDeleteModal(false) }}
            className="bg-white border-2 border-stone-300 rounded-md cursor-pointer
            fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="flex flex-col justify-between gap-2 p-4  cursor-auto">
                <div>
                    <h2>
                        Deseja deletar
                    </h2>
                    <span className="font-bold">{itemName}?</span>
                </div>
                <div className="flex gap-2 ">
                    <button onClick={handleDeleteExercise} className="btn btn-sm rounded-md btn-warning">
                        deletar
                    </button>
                    <button onClick={() => { showDeleteModal(false) }} className="btn btn-sm rounded-md btn-info">
                        cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ExerciseComponent

