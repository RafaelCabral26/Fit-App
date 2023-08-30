import { Draggable, DraggableProvided,  } from "react-beautiful-dnd"
import TrashSvg from "@/svgs/trashsvg"
import EditPencilSvg from "@/svgs/editpencil"
import { SetStateAction, useState } from "react"
import { TDays, TExercise } from "./nova_planilha_Types"
import { ValidateAddExercise } from "./nova_planilha_Utilities"

const ExerciseComponent = ({ item, index, daysArray, dayIndex, setNewDayArray }: { item: TExercise, index: number, daysArray: TDays[], dayIndex: number, setNewDayArray: React.Dispatch<SetStateAction<TDays[]>> }) => {
    const [editModal, openEditModal] = useState<boolean>(false);
    const [confirmDeleteModal, showDeleteModal] = useState<boolean>(false);
    const handleDeleteExercise = () => {
        const newArray = daysArray;
        newArray[dayIndex].exercises.splice(index, 1);
        setNewDayArray([...newArray]);
    };

    return (
        <Draggable draggableId={item.uId} key={item.uId} index={index}>
            {(provided, snapshot) => {
                return (
                    <div className={`flex justify-between p-2 m-2 shadow-sm bg-white border-2 border-stone-300 ${snapshot.isDragging ? "opacity-50" : "opacity-100"}`}
                        ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="flex flex-col">
                            <span>
                                {item.name}
                            </span>
                            <span className="flex gap-2">
                                <span>
                                    Séries
                                </span>
                                {item.sets}
                            </span>
                            <span className="flex gap-2">
                                <span>
                                    Repetições
                                </span>
                                {item.quantity}
                            </span>
                        </div>
                        <div className="">
                            <button onClick={() => { openEditModal(true) }} className="">
                                <EditPencilSvg />
                            </button>
                            <button onClick={() => { showDeleteModal(true) }}>
                                <TrashSvg />
                            </button>
                        </div>
                        {editModal &&
                            <EditExerciseForm openEditModal={openEditModal} index={index} daysArray={daysArray} setNewDayArray={setNewDayArray} dayIndex={dayIndex} item={item}></EditExerciseForm>
                        }
                        {confirmDeleteModal &&
                            <ConfirmDelete provided={provided} itemName={item.name} handleDeleteExercise={handleDeleteExercise} showDeleteModal={showDeleteModal}></ConfirmDelete>
                        }
                    </div>
                )
            }}
        </Draggable>
    )
}

const EditExerciseForm = ({ openEditModal, item, index, daysArray, dayIndex, setNewDayArray }: { openEditModal: React.Dispatch<SetStateAction<boolean>>, item: TExercise, index: number, daysArray: TDays[], dayIndex: number, setNewDayArray: React.Dispatch<SetStateAction<TDays[]>> }) => {
    const [newExercise, setNewExercise] = useState<TExercise>({
        name: item.name,
        sets: item.sets,
        quantity: item.quantity,
        muscleGroup: "",
        uId:item.uId
    })
    const handleNewExerciseInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setNewExercise((prev: TExercise) => {
            return { ...prev, [name]: value }
        })
    }
    const updateExercise = () => {
        const isExerciseValid = ValidateAddExercise(newExercise)
        if (!isExerciseValid) return;
        const newArray = daysArray;
        newArray[dayIndex].exercises.splice(index, 1, newExercise)
        setNewDayArray([...newArray])
        openEditModal(false);
    }
    return (
        <form className="w-96 h-96 p-8 rounded-xl border-secondary border-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
            <div className="flex justify-end">
                <button onClick={() => { openEditModal(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
            </div>
            <label className="label">
                <span className="label-text">Exercício</span>
            </label>
            <input onChange={handleNewExerciseInput} autoFocus name="name" className="my-input" type="text" value={newExercise.name} />

            <label className="label">
                <span className="label-text">Séries</span>
            </label>
            <input onChange={handleNewExerciseInput} name="sets" type="number" className="my-input" value={newExercise.sets} />

            <label className="label">
                <span className="label-text">Repetições</span>
            </label>
            <input onChange={handleNewExerciseInput} name="quantity" type="number" className="my-input" value={newExercise.quantity} />
            <div>
                <button onClick={updateExercise} type="button" className="btn btn-primary rounded-2xl my-2">
                    Atualizar
                </button>
            </div>
        </form>
    )
}
const ConfirmDelete = ({ provided, itemName, handleDeleteExercise, showDeleteModal }: { provided: DraggableProvided, itemName: string, handleDeleteExercise: () => void, showDeleteModal: React.Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div data-rbd-drag-handle-context-id={provided.dragHandleProps?.["data-rbd-drag-handle-context-id"]}
            autoFocus
            onBlur={() => { showDeleteModal(false) }}
            className="bg-white border-2 border-stone-300 rounded-md cursor-pointer
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="flex flex-col justify-between p-4 w-56 h-32 cursor-auto">
                <div>
                    <h2>
                        Deseja deletar
                    </h2>
                    <span className="font-bold">{itemName}?</span>
                </div>
                <div className="flex justify-between ">
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

