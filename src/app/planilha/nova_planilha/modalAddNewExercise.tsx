
import { Dispatch, useState  } from "react"
import { TExercise, TDays,  } from "./page"
import { validateAddExercise } from "./formValidator"

export const AddExerciseFormModal = ({  showNewExerciseModal,dayObject,daysArray, setNewDayArray }: {  showNewExerciseModal:any, dayObject:any, daysArray:any,setNewDayArray:any }) => {
    const [newExercise, setNewExercise] = useState<TExercise>({
        name: "",
        sets: 0,
        quantity: 0,
        muscleGroup: "",
    })

    const handleNewExerciseInput = (e: any) => {
        const name = e.target.name
        const value = e.target.value
        setNewExercise((prev: any) => {
            return { ...prev, [name]: value, dateId: new Date(Date.now()), uId:String(Date.now()) }
        })
    }
    const handleAddNewExercise = () => {
        const isExerciseValid = validateAddExercise(newExercise);
        if (!isExerciseValid) return;
        dayObject.push(newExercise);
        showNewExerciseModal(false);
    }
    return (
        <form   className="w-96 h-96 p-8 rounded-xl border-secondary border-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
            <div className="flex justify-end">
                <button onClick={() => { showNewExerciseModal(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
            </div>
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
                <button onClick={handleAddNewExercise} type="button" className="btn btn-primary rounded-2xl my-2">
                    Add
                </button>
            </div>
        </form>
    )
}
export default AddExerciseFormModal 
