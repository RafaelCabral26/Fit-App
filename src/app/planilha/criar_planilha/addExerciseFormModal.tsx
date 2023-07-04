import { Dispatch, useState  } from "react"
import { TExercise, TDays,  } from "./page"
import { validateAddExercise } from "./formValidators"

export const AddExerciseFormModal = ({  setAddExerciseModal,dayObject,daysArray, setNewDay }: {  setAddExerciseModal: Dispatch<React.SetStateAction<boolean>>, dayObject:TDays, daysArray:TDays[],setNewDay:Dispatch<React.SetStateAction<TDays[]>> }) => {
    const [newExercise, setNewExercise] = useState<TExercise>({
        name: "",
        sets: 0,
        quantity: 0,
        muscleGroup: "",
        createdAt: new Date()
    })

    const handleNewExerciseInput = (e: any) => {
        const name = e.target.name
        const value = e.target.value
        setNewExercise((prev: any) => {
            return { ...prev, [name]: value }
        })
    }
    const handleAddNewExercise = () => {
        const isExerciseValid = validateAddExercise(newExercise)
        if (!isExerciseValid) return
        dayObject.exerciseArray.push(newExercise)
        setAddExerciseModal(false)
    }
    return (
        <form className="w-96 h-96 p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-300">
            <div className="flex justify-end">
                <button onClick={() => { setAddExerciseModal(false) }} className="text-2xl font-extrabold leading-3">X</button>
            </div>
            <label className="label">
                <span className="label-text">Exercício</span>
            </label>
            <input name="name" className="input w-full" onChange={handleNewExerciseInput} type="text" placeholder="Nome do Exercício" />

            <label className="label">
                <span className="label-text">Séries</span>
            </label>
            <input name="sets" type="number" onChange={handleNewExerciseInput} className="input w-full" />

            <label className="label">
                <span className="label-text">Repetições</span>
            </label>
            <input name="quantity" type="number" onChange={handleNewExerciseInput} className="input w-full" />
            <div>
                <button onClick={handleAddNewExercise} type="button" className="btn my-2">
                    Add
                </button>
            </div>
        </form>
    )
}
 
