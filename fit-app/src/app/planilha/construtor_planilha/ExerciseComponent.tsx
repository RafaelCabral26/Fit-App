import { Draggable, DraggableProvided, } from "@hello-pangea/dnd"
import TrashSvg from "@/svgs/trashsvg"
import EditPencilSvg from "@/svgs/editpencil"
import { SetStateAction, useContext, useRef, useState } from "react"
import { TDays, TExercise } from "./Spreadsheet_Types"
import { ValidateAddExercise } from "./Spreadsheet_Utilities"
import { GlobalContext } from "@/services/GlobalContext"
import { useOnClickOutside } from "@/services/ClickOutsideHook"

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
                    <div className={`flex  justify-between p-2 m-2 shadow-sm bg-base-100 border-[1px] border-primary ${snapshot.isDragging ? "opacity-50" : "opacity-100"}`}
                        ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="flex text-sm  flex-col w-32 ">
                            <span className="font-sans text-base overflow-clip hover:overflow-visible">
                                <span>{item.exercise_name}</span>
                            </span>
                            <span className="flex gap-2 items-center ">
                                <span className="font-sans ">Séries</span>
                                <span className="text-base  ">{item.sets}</span>
                            </span>
                            <span className="flex gap-2 items-center">
                                <span className="font-sans">Repetições</span>
                               <span className="text-base">{item.quantity}</span> 
                            </span>
                            <span className="flex flex-col break-words ">
                                <span className="font-sans ">Obs</span>
                                <span className="text-xs">{item.obs}</span>
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <button type="button" onClick={() => { handleEditModal(true) }} className="w-5">
                                <EditPencilSvg />
                            </button>
                            <button type="button" className="w-5" onClick={() => { showDeleteModal(true);globalState?.isDragDisabledSwitch(true) }}>
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
        obs: item.obs,
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
        <form className="my-form-modal max-w-sm flex flex-col gap-4  ">
            <div className="h-14 p-4 mt-[-33px] mx-[-32px] flex justify-between items-center bg-secondary text-white mb-4 ">
                <div className="flex justify-center items-center font-sans  self-center  uppercase">
                    <div className="w-10 ">
                        <EditPencilSvg></EditPencilSvg>
                    </div>
                    Alterar
                </div>
                <button type="button" onClick={() => { handleEditModal(false) }} className="self-start text-3xl font-bold leading-3 ">X</button>
            </div>
            <label htmlFor="exercise_name" className="label-input">
                <input onChange={handleNewExerciseInput} autoFocus name="exercise_name" className="my-input peer " placeholder={`Exercício - ${item.exercise_name}`} type="text" value={newExercise.exercise_name} />
                <span className="span-input">Exercício Anterior - {item.exercise_name}</span>
            </label>

            <label htmlFor="sets" className="label-input">
                <input onChange={handleNewExerciseInput} name="sets" type="number" className="my-input peer " value={newExercise.sets} placeholder={`Séries - ${item.sets}`} />
                <span className="span-input">Séries - {item.sets}</span>
            </label>

            <label htmlFor="quantity" className="label-input">
                <input onChange={handleNewExerciseInput} name="quantity" type="number" className="my-input peer " value={newExercise.quantity} placeholder={`Repetições ${item.quantity}`} />
                <span className="span-input">Repetições - {item.quantity}</span>
            </label>

            <div className="form-control gap-2">
                <label htmlFor="obs" className="label-input">
                    <textarea placeholder="Observações" onChange={handleNewExerciseInput} name="obs" defaultValue={newExercise.obs} className="my-input peer " maxLength={100} />
                    <span className="span-input">Observações</span>
                </label>

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
    const globalState = useContext(GlobalContext);
    const clickRef = useRef(null);
    useOnClickOutside(clickRef, () => {
        showDeleteModal(false);
        globalState?.isDragDisabledSwitch(false) 
    });
    const handleDelete = () => {
        handleDeleteExercise();
        globalState?.isDragDisabledSwitch(false);
    }

    return (
        <div data-rfd-drag-handle-context-id={provided.dragHandleProps?.["data-rfd-drag-handle-context-id"]}
            autoFocus
            onBlur={() => { showDeleteModal(false); globalState?.isDragDisabledSwitch(false)}}
            ref={clickRef}
            className="bg-white w-60 pb-4 text-neutral flex flex-col items-center text-lg justify-between gap-4 shadow-md  -2  rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="bg-secondary rounded-sm w-full flex justify-center items-center h-10">
                <div className="w-8 border-2 border-white rounded-sm">
                    <TrashSvg color="#ffffff"></TrashSvg>
                </div>
            </div>
            <div>
                <h2>
                    Deseja deletar
                </h2>
                <span className="font-bold">{itemName}?</span>
            </div>
            <div className="flex gap-2 ">
                <button onClick={handleDelete} className="my-btn-red ">
                    deletar
                </button>
                <button onClick={() => { showDeleteModal(false); globalState?.isDragDisabledSwitch(false)}} className="my-btn">
                    cancelar
                </button>
            </div>
        </div>
    )
};

export default ExerciseComponent

