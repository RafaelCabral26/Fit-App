import { SetStateAction, useContext, useEffect, useState } from "react"
import { TExercise, TMuscleGroups, TSubgroups } from "./nova_planilha_Types"
import { ValidateAddExercise } from "./nova_planilha_Utilities"
import { GlobalContext } from "@/services/MyToast";

const AddExerciseFormModal = ({ showNewExerciseModal, dayObject, }: { showNewExerciseModal: React.Dispatch<SetStateAction<boolean>>, dayObject: TExercise[] }) => {
    const globalState = useContext(GlobalContext);
    const [exerciseOptions, setExerciseOptions] = useState<any>();
    const [exerciseList, setExerciseList] = useState<any>();
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<TMuscleGroups>()
    const [selectedSubGroup, setSelectedSubGroup] = useState<TSubgroups >()
    const [optionsSubGroups, setOptionsSubGroups] = useState<any[] | null>()
    const [customExerciseInput, showCustomExerciseInput] = useState<boolean>(false);
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
        const list = localStorage.getItem("Exercises_list");
        if (list) {
            setExerciseList(JSON.parse(list));
        }
    }, [])

    const filterSelectedMuscleGroup = (muscleType: TMuscleGroups | null) => {
        if (muscleType === null) return setExerciseOptions(null)
        if (exerciseList !== null) {
            for (const key in exerciseList) {
                if (key === muscleType) {
                    setExerciseOptions(exerciseList[key]);
                }
            }
        }
        if (muscleType === "Braços") {
            setOptionsSubGroups(["Bíceps", "Tríceps", "Antebraço"]);
        } else if (muscleType === "Costas") {
            setOptionsSubGroups(["Superior", "Dorsal", "Inferior"]);
        } else if (muscleType === "Peitoral") {
            setOptionsSubGroups(["Superior", "Medial", "Inferior"]);
        } else if (muscleType === "Pernas") {
            setOptionsSubGroups(["Posterior", "Gluteos", "Quadriceps", "Panturrilha"]);
        } else if (muscleType === "Ombros") {
            setOptionsSubGroups(["Anterior", "Posterior", "Lateral"]);
        } else {
            setOptionsSubGroups(null);

        }
        setSelectedMuscleGroup(muscleType)
    }

    const filterSelectedSubgroups = (subgroup:TSubgroups) => {
        
        if(selectedMuscleGroup){
            const choosenMuscle = exerciseList[selectedMuscleGroup]
            console.log("choosen",choosenMuscle);
            for (const key in choosenMuscle) {
                console.log("selecionados",choosenMuscle[key]);
                if (choosenMuscle[key].subgroup === subgroup) {
                    console.log("teste if 65",choosenMuscle[key].subgroup);
                    setExerciseOptions(choosenMuscle[key]);
                }

            }
        } 
        
    }

    const handleNewExerciseInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setNewExercise((prev: TExercise) => {
            if (!customExerciseInput) prev.exercise_name = "teste"
            prev.muscle_group = selectedMuscleGroup
            prev.subgroup = selectedSubGroup
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
                <option key={"musculo"} onClick={() => filterSelectedMuscleGroup(null)}>Músculo</option>
                <option key={"bracos"} onClick={() => filterSelectedMuscleGroup("Braços")}>Braços</option>
                <option key={"costas"} onClick={() => filterSelectedMuscleGroup("Costas")}>Costas</option>
                <option key={"peito"} onClick={() => filterSelectedMuscleGroup("Peitoral")}>Peito</option>
                <option key={"pernas"} onClick={() => filterSelectedMuscleGroup("Pernas")}>Pernas</option>
                <option key={"ombros"} onClick={() => filterSelectedMuscleGroup("Ombros")}>Ombros</option>
            </select>
            <select className="select select-xs select-primary rounded-lg">
                <option key="subgroup" >Subgrupo</option>
                {
                    optionsSubGroups?.map((subgroup: any) => {
                        return (
                            <option key={subgroup} onClick={() => {filterSelectedSubgroups(subgroup)}} value={subgroup}>{subgroup}</option>
                        )
                    })
                }
            </select>

            <label className="label">
                <span className="label-text-alt">Exercício</span>
            </label>
            <label className={`${customExerciseInput ? "input-group" : "hidden"} `}>
                <input name="exercise_name" className="my-input !rounded-l-xl  w-56" onChange={handleNewExerciseInput} type="text" placeholder="Nome do Exercício" />
                <span className="bg-primary text-sm !rounded-r-xl">
                    <button type="button" onClick={() => { showCustomExerciseInput(false) }}>
                        Listar
                    </button>
                </span>
            </label>

            <select defaultValue={"name exercise"} className={`${customExerciseInput ? "hidden" : "my-input"}`}>
                <option key="name exercise" hidden>Nome do Exercício</option>
                {
                    exerciseOptions?.map((ele: any) => {
                        return (
                            <option key={ele.exercise_name} value={ele.exercise_name}>{ele.exercise_name}</option>
                        )
                    })
                }
                <option key="outro" onClick={() => showCustomExerciseInput(true)}>Outro</option>
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
