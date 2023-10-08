import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import ExerciseComponent from "./ExerciseComponent"
import AddExerciseFormModal from "./modalAddNewExercise"
import { TDays, TExercise } from "./Spreadsheet_Types";
import { GlobalContext } from "@/services/MyToast";
import { useOnClickOutside } from "@/services/ClickOutsideHook";

const DayComponent = ({ index, day, daysArray, setNewDayArray }: { index: number, day: TDays, daysArray: TDays[], setNewDayArray: React.Dispatch<SetStateAction<TDays[]>> }) => {
    const globalState = useContext(GlobalContext);
    const [optionsDropdown, showOptions] = useState(false);
    const [newExerciseModal, showNewExerciseModal] = useState(false);
    const clickRef = useRef(null);
    useOnClickOutside(clickRef, () => {
        showOptions(false)
    })
    const dayIndex = index
    const handleDeleteDay = (e: React.SyntheticEvent) => {
        (e.currentTarget as HTMLInputElement).blur();
        daysArray.splice(index, 1);
        setNewDayArray([...daysArray]);
        localStorage.setItem("Ongoing_Spreadsheet", JSON.stringify(daysArray))
    }

    const handleModal = () => {
        showNewExerciseModal(true);
        globalState?.isDragDisabledSwitch(true);
    }
    return (
        <>
            <Droppable type="droppableExercise" key={day.dayUID} droppableId={`${day.dayUID}`}>
                {(provided, snapshot) => {
                    return (
                        <div className={`my-day-container ${snapshot.isDraggingOver ? "bg-sky-500 bg-opacity-30" : "bg-base-200"}`}
                            {...provided.droppableProps} ref={provided.innerRef}>
                            <div className="flex justify-between p-2 bg-base-300 rounded-t-md">
                                <h2>{"Dia " + (index + 1)}</h2>
                                <button onClick={() => showOptions(!optionsDropdown)} className="relative text-2xl ">...
                                    {optionsDropdown &&
                                        <div ref={clickRef} className="absolute right-0">
                                            <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li onClick={handleModal}><a>Adicionar</a></li>
                                                <li onClick={handleDeleteDay} className="text-red-500 hover:text-red-400"><a>Deletar</a></li>
                                            </ul>
                                        </div>
                                    }
                                </button>
                            </div>
                            {day.exercises.map((e: TExercise, index: number) => {
                                return <ExerciseComponent daysArray={daysArray} setNewDayArray={setNewDayArray} dayIndex={dayIndex} key={e.uId} item={e} index={index}></ExerciseComponent>
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            {newExerciseModal &&
                <AddExerciseFormModal showNewExerciseModal={showNewExerciseModal} dayObject={day.exercises} daysArray={daysArray}></AddExerciseFormModal>
            }
        </>
    )
}
export default DayComponent
