
import { SetStateAction, useEffect, useState } from "react"
import { TExercise, TMuscleGroups } from "./nova_planilha_Types"
import { ValidateAddExercise } from "./formValidator"

const AddExerciseFormModal = ({ showNewExerciseModal, dayObject  }: { showNewExerciseModal: React.Dispatch<SetStateAction<boolean>>, dayObject: TExercise[]  }) => {
    const [exerciseList, setExerciseList] = useState<string | null>();
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<TMuscleGroups | null>()
    const [newExercise, setNewExercise] = useState<TExercise>({
        name: "",
        sets: 0,
        quantity: 0,
        uId: String(new Date(Date.now())),
        createdAt: new Date().toLocaleString()
    })
    
    useEffect(() => {
        const list = localStorage.getItem("Exercises_list")
        if (list) setExerciseList(JSON.parse(list))
    },[])

    const handleTest = () => {
        console.log(exerciseList);
    }

    const handleNewExerciseInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setNewExercise((prev: TExercise) => {
            return { ...prev, [name]: value  };
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
            <select>
                <option>Default</option>
                
            </select>
            <label className="label">
                <span className="label-text">Exercício</span>
            </label>
            <input autoFocus name="name" className="my-input" onChange={handleNewExerciseInput} type="text" placeholder="Nome do Exercício" />

            <label className="label">
                <span className="label-text">Séries</span>
            </label>
            <input name="sets" type="number" onChange={handleNewExerciseInput} className="my-input" />

            <label className="label">
                <span className="label-text">Repetições</span>
            </label>
            <input name="quantity" type="number" onChange={handleNewExerciseInput} className="my-input" />
            <div>
                <button onClick={handleAddNewExercise} type="button" className="my-btn">
                    Criar
                </button>
                <button type="button" onClick={handleTest}>Teste</button>
            </div>
        </form>
    )
}
export default AddExerciseFormModal 
