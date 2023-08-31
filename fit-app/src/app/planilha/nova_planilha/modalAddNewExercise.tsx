
import { SetStateAction, useEffect, useState } from "react"
import { TExercise, TMuscleGroups } from "./nova_planilha_Types"
import { ValidateAddExercise } from "./nova_planilha_Utilities"

const AddExerciseFormModal = ({ showNewExerciseModal, dayObject }: { showNewExerciseModal: React.Dispatch<SetStateAction<boolean>>, dayObject: TExercise[] }) => {
    const [exerciseList, setExerciseList] = useState<string | null>();
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<TMuscleGroups | null>()
    const [selectedSubGroups, setSubGroups] = useState<any[] | null>()
    const [newExercise, setNewExercise] = useState<TExercise>({
        name: "",
        sets: 0,
        quantity: 0,
        muscle_group: selectedMuscleGroup?.muscle_group,
        subgroup: "",
        uId: String(new Date(Date.now())),
        createdAt: new Date().toLocaleString()
    })

    useEffect(() => {
        const list = localStorage.getItem("Exercises_list")
        if (list) setExerciseList(JSON.parse(list))
    }, [])
    const handleSelectedMuscleGroup = (muscleType: TMuscleGroups | null) => {

        if (muscleType?.muscle_group === "arm") {
            setSubGroups(["Bíceps", "Tríceps", "Antebraço"]);
        } else if (muscleType?.muscle_group === "back") {
            setSubGroups(["Superior", "Dorsal", "Inferior"]);
        } else if (muscleType?.muscle_group === "chest") {
            setSubGroups(["Superior", "Medial", "Inferior"]);
        } else if (muscleType?.muscle_group === "leg") {
            setSubGroups(["Posterior", "Gluteos", "Quadriceps", "Panturrilha"]);
        } else if (muscleType?.muscle_group === "shoulder") {
            setSubGroups(["Anterior", "Posterior", "Lateral"]);
        } else {
            setSubGroups(null);

        }
        setSelectedMuscleGroup({ muscle_group: muscleType?.muscle_group })
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
        <form className="my-form-modal">
            <div className="flex justify-end">
                <button onClick={() => { showNewExerciseModal(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
            </div>
            <select className="select select-xs select-primary rounded-lg">
                <option onClick={() => handleSelectedMuscleGroup(null)}>Músculo</option>
                <option onClick={() => handleSelectedMuscleGroup({ muscle_group: "arm", subgroup: "" })}>Braços</option>
                <option onClick={() => handleSelectedMuscleGroup({ muscle_group: "back", subgroup: "" })}>Costas</option>
                <option onClick={() => handleSelectedMuscleGroup({ muscle_group: "chest", subgroup: "" })}>Peito</option>
                <option onClick={() => handleSelectedMuscleGroup({ muscle_group: "leg", subgroup: "" })}>Pernas</option>
                <option onClick={() => handleSelectedMuscleGroup({ muscle_group: "shoulder", subgroup: "" })}>Ombros</option>
            </select>
            <select className="select select-xs select-primary rounded-lg">
                <option >Subgrupo</option>
                {
                    selectedSubGroups?.map((ele: any) => {
                        return (
                            <option onClick={() => setSelectedMuscleGroup({ muscle_group: selectedMuscleGroup?.muscle_group })} value={ele}>{ele}</option>
                        )
                    })
                }
            </select>
            <div className="form-control">

            <label className="label">
                <span className="label-text-alt">Exercício</span>
            </label>
                <input autoFocus name="name" className="my-input" onChange={handleNewExerciseInput} type="text" placeholder="Nome do Exercício" />
            </div>

            <select className="my-input">

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
                <button type="button" onClick={() => console.log(selectedMuscleGroup)
                }>teste</button>
            </div>
        </form>
    )
}
export default AddExerciseFormModal 
