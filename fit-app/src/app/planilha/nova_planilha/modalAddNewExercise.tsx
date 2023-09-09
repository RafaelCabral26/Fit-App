import { SetStateAction, useContext, useEffect, useState } from "react"
import { TExercise, TMuscleGroups } from "./nova_planilha_Types"
import { ValidateAddExercise } from "./nova_planilha_Utilities"
import { Draggable, DroppableProvided, DroppableProvidedProps } from "@hello-pangea/dnd";
import { GlobalContext } from "@/services/MyToast";

const AddExerciseFormModal = ({ showNewExerciseModal, dayObject, dropProvided }: { showNewExerciseModal: React.Dispatch<SetStateAction<boolean>>, dayObject: TExercise[], dropProvided: any }) => {
    const globalState = useContext(GlobalContext);
    const [exerciseList, setExerciseList] = useState<string | null>();
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<TMuscleGroups | null>()
    const [selectedSubGroups, setSubGroups] = useState<any[] | null>()
    const [exerciseOptions, setExerciseOptions] = useState<any>();
    const [newExercise, setNewExercise] = useState<TExercise>({
        exercise_name: "",
        sets: 0,
        quantity: 0,
        muscle_group: "",
        subgroup: "",
        uId: crypto.randomUUID(),
        createdAt: new Date().toLocaleString(),
    })

    useEffect(() => {
        const list = localStorage.getItem("Exercises_list")
        if (list) setExerciseList(JSON.parse(list))
    }, [])
    const handleSelectedMuscleGroup = (muscleType: TMuscleGroups | null) => {
        let storageExerciseList = localStorage.getItem("Exercises_list");
        if (storageExerciseList !== null) {
            const arrayExerciseList = JSON.parse(storageExerciseList);
            for (const key in arrayExerciseList) {
                if (key === muscleType?.muscle_group) {
                    setExerciseOptions(arrayExerciseList[key]);
                }
            }
        }
        if (muscleType?.muscle_group === "Bracos") {
            setSubGroups(["Biceps", "Triceps", "Antebraço"]);
        } else if (muscleType?.muscle_group === "Costas") {
            setSubGroups(["Superior", "Dorsal", "Inferior"]);
        } else if (muscleType?.muscle_group === "Peito") {
            setSubGroups(["Superior", "Medial", "Inferior"]);
        } else if (muscleType?.muscle_group === "Pernas") {
            setSubGroups(["Posterior", "Gluteos", "Quadriceps", "Panturrilha"]);
        } else if (muscleType?.muscle_group === "Ombros") {
            setSubGroups(["Anterior", "Posterior", "Lateral"]);
        } else {
            setSubGroups(null);

        }
        setSelectedMuscleGroup(muscleType)
    }

    const handleNewExerciseInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setNewExercise((prev: TExercise) => {
            return { ...prev, [name]: value };
        })
    }
    const handleAddNewExercise = () => {
        const isExerciseValid = ValidateAddExercise(newExercise);
        if (!isExerciseValid) return;
        dayObject.push(newExercise);
        showNewExerciseModal(false);
    }
    return (
        <form className="my-form-modal bg-white cursor-none">
            <div className="flex justify-end">
                <button onClick={() => { showNewExerciseModal(false); globalState?.isDragDisabledSwitch(false) }} className="text-2xl font-extrabold leading-3">X</button>
            </div>
            <select className="select select-xs select-primary rounded-lg">
                <option key="musculo" onClick={() => handleSelectedMuscleGroup(null)}>Músculo</option>
                <option key="bracos" onClick={() => handleSelectedMuscleGroup({ muscle_group: "Bracos", subgroup: "" })}>Braços</option>
                <option key="costas" onClick={() => handleSelectedMuscleGroup({ muscle_group: "Costas", subgroup: "" })}>Costas</option>
                <option key="peito" onClick={() => handleSelectedMuscleGroup({ muscle_group: "Peito", subgroup: "" })}>Peito</option>
                <option key="pernas" onClick={() => handleSelectedMuscleGroup({ muscle_group: "Pernas", subgroup: "" })}>Pernas</option>
                <option key="ombros" onClick={() => handleSelectedMuscleGroup({ muscle_group: "Ombros", subgroup: "" })}>Ombros</option>
            </select>
            <select className="select select-xs select-primary rounded-lg">
                <option key="subgroup" >Subgrupo</option>
                {
                    selectedSubGroups?.map((ele: any) => {
                        return (
                            <option key={ele.muscle_group} onClick={() => setSelectedMuscleGroup({ muscle_group: selectedMuscleGroup?.muscle_group })} value={ele}>{ele}</option>
                        )
                    })
                }
            </select>

            <label className="label">
                <span className="label-text-alt">Exercício</span>
            </label>
            <input name="exercise_name" className="my-input " onChange={handleNewExerciseInput} type="text" placeholder="Nome do Exercício" />

            <select className="my-input">
                {
                    exerciseOptions?.map((ele: any) => {
                        return (
                            <option key={ele.exercise_name}>{ele.exercise_name}</option>
                        )
                    })
                }
                <option key="outro" >Outro</option>
            </select>

            <label className="label">
                <span className="label-text-alt">Séries</span>
            </label>
            <input name="sets" type="number" onChange={handleNewExerciseInput} className="my-input" />

            <label className="label">
                <span className="label-text-alt">Repetições</span>
            </label>
            <input name="quantity" type="number" onChange={handleNewExerciseInput} className="my-input" />
            <div>
                <button onClick={handleAddNewExercise} type="button" className="my-btn">
                    Criar
                </button>
            </div>
        </form>
    )
}
export default AddExerciseFormModal 
