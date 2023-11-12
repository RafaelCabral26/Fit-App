import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import ExerciseComponent from "./ExerciseComponent"
import AddExerciseFormModal from "./modalAddNewExercise"
import { TDays, TExercise } from "./Spreadsheet_Types";
import { GlobalContext } from "@/services/GlobalContext";
import { useOnClickOutside } from "@/services/ClickOutsideHook";
import DragIndicatorSvg from "@/svgs/dragIndicator";

const DayComponent = ({ index, day, daysArray, setNewDayArray }: { index: number, day: TDays, daysArray: TDays[], setNewDayArray: React.Dispatch<SetStateAction<TDays[]>> }) => {
    const globalState = useContext(GlobalContext);
    const [optionsDropdown, showOptions] = useState(false);
    const [deleteDayModal, showDeleteDayModal] = useState<boolean>(false);
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
            <Droppable direction={window.innerWidth > 640 ? "horizontal" : "vertical"}
                type="droppableExercise" key={day.dayUID} droppableId={`${day.dayUID}`}>
                {(provided, snapshot) => {
                    return (
                        <div className={`sm:flex my-2 rounded-sm shadow-md gap-2 min-w-[320px]  h-auto  ${snapshot.isDraggingOver ? "bg-secondary/70 " : "bg-base-200"}`}
                            {...provided.droppableProps} ref={provided.innerRef}>
                            <div className="sm:h-full flex sm:flex-col items-center justify-around gap-4   p-2  bg-neutral text-white rounded-t-sm ">
                                <h2 className="font-mono row-start-2 leading-none sm:vertical-text tracking-tighter   " >{"Dia" + (index + 1)}</h2>
                                <div className="w-[20px] sm:order-first  text-white/40 row-start-1  col-start-2 justify-self-center">
                                    <DragIndicatorSvg></DragIndicatorSvg>
                                </div>
                                <button onClick={() => showOptions(!optionsDropdown)} className="relative row-start-2 col-start-3 justify-self-end text-2xl leading-4  ">...
                                    {optionsDropdown &&
                                        <div ref={clickRef} className="absolute right-0 md:right-auto md:bottom-0 md:left-4 ">
                                            <ul tabIndex={0} className="my-dropdown  ">
                                                <li className="text-primary" onClick={handleModal}><a>Adicionar</a></li>
                                                <li onClick={() => showDeleteDayModal(true)} className="text-red-500 hover:text-red-400"><a>Deletar</a></li>
                                            </ul>
                                        </div>
                                    }
                                    {
                                        deleteDayModal &&
                                        (
                                            <div className="bg-white text-neutral flex flex-col items-center text-lg justify-between gap-4 p-10 cursor-auto border-2  rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                                <div className="flex flex-col">
                                                    <span>Deseja deletar</span>
                                                    <span className="font-bold uppercase">{"Dia " + (index + 1)+ "?"}</span>
                                                </div>
                                                <div className="flex gap-2 ">
                                                    <button onClick={handleDeleteDay} className="btn btn-md rounded-sm btn-secondary ">
                                                        deletar
                                                    </button>
                                                    <button onClick={() => { showDeleteDayModal(false) }} className="btn btn-md rounded-sm text-white btn-warning">
                                                        cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </button>
                            </div >
                            <div className="flex flex-col sm:flex-row">
                                {day.exercises.map((e: TExercise, index: number) => {
                                    return <ExerciseComponent daysArray={daysArray} setNewDayArray={setNewDayArray} dayIndex={dayIndex} key={e.uId} item={e} index={index}></ExerciseComponent>
                                })}
                                {provided.placeholder}
                            </div>
                        </div >
                    )
                }}
            </Droppable >
            {newExerciseModal &&
                <AddExerciseFormModal showNewExerciseModal={showNewExerciseModal} dayObject={day.exercises} daysArray={daysArray}></AddExerciseFormModal>
            }
        </>
    )
}
export default DayComponent
