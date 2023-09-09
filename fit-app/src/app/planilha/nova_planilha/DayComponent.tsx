import { SetStateAction, useContext, useEffect, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import ExerciseComponent from "./ExerciseComponent"
import AddExerciseFormModal from "./modalAddNewExercise"
import { TDays, TExercise  } from "./nova_planilha_Types";
import { GlobalContext } from "@/services/MyToast";

const DayComponent = ({ index, day, daysArray, setNewDayArray, dropProvided }: { index: number, day: TDays, daysArray: TDays[], setNewDayArray: React.Dispatch<SetStateAction<TDays[]>>, dropProvided:any }) => {
    const globalState = useContext(GlobalContext)
    const [optionsDropdown, showOptions] = useState(false);
    const [newExerciseModal, showNewExerciseModal] = useState(false);
    const dayIndex = index
    const handleDeleteDay = (e:React.SyntheticEvent ) => {
        (e.currentTarget as HTMLInputElement).blur();
        daysArray.splice(index, 1);
        setNewDayArray([...daysArray]);

    }
    
    const handleModal = () => {
        showNewExerciseModal(true);
        globalState?.isDragDisabledSwitch(true)
    }
    
    return (
        <>
            <Droppable  type="droppableExercise" key={day.day} droppableId={`${day.day}`}>
                {(provided, snapshot) => {
                    return (
                        <div className={`bg-white rounded-lg w-full shadow-lg m-2
                        border-2 border-secondary ${snapshot.isDraggingOver ? "bg-sky-500 bg-opacity-30" : "bg-white"}`}
                        {...provided.droppableProps} ref={provided.innerRef}>
                            <div className="flex justify-between p-2 bg-sky-500 rounded-t-sm border-secondary ">
                                <h2>{"Dia " + (index + 1)}</h2>
                                <button onClick={() => showOptions(!optionsDropdown)} className="relative text-2xl cursor-pointer">...
                                    {optionsDropdown &&
                                        <div className="absolute right-0">
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li onClick={handleModal}><a>Adicionar</a></li>
                                                <li><a>Item 2</a></li>
                                               <li onClick={handleDeleteDay} className="text-red-500 hover:text-red-400"><a>Deletar</a></li>
                                            </ul>
                                    </div>
                                    }
                                </button>
                            </div>
                            {day.exercises.map((e: TExercise, index: number) => {
                                return <ExerciseComponent daysArray={daysArray} setNewDayArray={setNewDayArray} dayIndex={dayIndex} key={day.day} item={e} index={index}></ExerciseComponent>
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            {newExerciseModal &&
                    <AddExerciseFormModal dropProvided={dropProvided} showNewExerciseModal={showNewExerciseModal} dayObject={day.exercises}></AddExerciseFormModal>
            }
        </>
    )
}
export default DayComponent
