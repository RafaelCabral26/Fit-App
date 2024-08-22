import { SetStateAction, useContext, useEffect, useState } from "react"
import { TDays, TDbExerciseObjSample, TDbExerciseSample, TExercise, TMuscleGroups, TSubgroups } from "./Spreadsheet_Types"
import { ValidateAddExercise } from "./Spreadsheet_Utilities"
import { GlobalContext } from "@/services/GlobalContext";
import EditSpreadsheetSvg from "@/svgs/editSpreadsheet";
import { filterNumberInput } from "@/services/tools";

const AddExerciseFormModal = ({ showNewExerciseModal, dayObject, daysArray }: { showNewExerciseModal: React.Dispatch<SetStateAction<boolean>>, dayObject: TExercise[], daysArray: TDays[] }) => {
  const globalState = useContext(GlobalContext);
  const [exerciseOptions, setExerciseOptions] = useState<TDbExerciseSample[] | null>();
  const [exerciseList, setExerciseList] = useState<TDbExerciseObjSample>();
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<TMuscleGroups>()
  const [selectedSubGroup, setSelectedSubGroup] = useState<TSubgroups>()
  const [optionsSubGroups, setOptionsSubGroups] = useState<TSubgroups[] | null>()
  const [selectedMuscleName, setSelectedMuscleName] = useState<string | null>();
  const [customExerciseInput, showCustomExerciseInput] = useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<TExercise>({
    exercise_name: "",
    sets: 0,
    quantity: 0,
    muscle_group: "",
    subgroup: "",
    obs: "",
    uId: crypto.randomUUID(),
  });

  useEffect(() => {
    const list = localStorage.getItem("Exercises_list");
    if (list) {
      setExerciseList(JSON.parse(list));
    }
  }, []);

  const filterSelectedMuscleGroup = (muscleType: TMuscleGroups | null) => {
    if (muscleType === null) return setExerciseOptions(null)
    if (exerciseList) {
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
      setOptionsSubGroups(["Posterior", "Glúteos", "Quadríceps", "Panturrilha"]);
    } else if (muscleType === "Ombros") {
      setOptionsSubGroups(["Anterior", "Posterior", "Lateral"]);
    } else if (muscleType === null) {
      setOptionsSubGroups(null);

    }
    setSelectedMuscleGroup(muscleType);
  };

  const filterSelectedSubgroups = (subgroup: TSubgroups) => {
    setSelectedSubGroup(subgroup)
    if (selectedMuscleGroup && exerciseList) {
      const choosenMuscle = exerciseList[selectedMuscleGroup];
      const filteredMuscles = choosenMuscle.filter((ele: TDbExerciseSample) => {
        return ele.subgroup === subgroup;
      })
      setExerciseOptions(filteredMuscles);
    }
  }

  const handleNewExerciseInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    const testString = /[0-9]+g/;
    setNewExercise((prev: TExercise) => {
      if (!customExerciseInput && selectedMuscleName) prev.exercise_name = selectedMuscleName;
      prev.muscle_group = selectedMuscleGroup
      prev.subgroup = selectedSubGroup
      return { ...prev, [name]: value };
    });
  }

  const handleAddNewExercise = () => {
    const isExerciseValid = ValidateAddExercise(newExercise);
    if (!isExerciseValid) return;
    dayObject.push(newExercise);
    showNewExerciseModal(false);
    globalState?.isDragDisabledSwitch(false);
    localStorage.setItem("Ongoing_Spreadsheet", JSON.stringify(daysArray));

  }

  return (
    <div className="fixed top-0 right-0 h-full w-screen backdrop-blur-md z-50">
      <form className="my-form-modal   z-10 flex flex-col gap-4">
        <div className="absolute  flex items-center rounded-t-md justify-between left-0 top-0 bg-secondary w-full h-14 p-4   ">
          <div className="flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ">
            <div className="w-10 text-white p-2  rounded-md">
              <EditSpreadsheetSvg></EditSpreadsheetSvg>
            </div>
            Adicionar Exercício
          </div>
          <button onClick={() => { showNewExerciseModal(false); globalState?.isDragDisabledSwitch(false) }} className="my-close-btn">X</button>
        </div>
        <span className="text-secondary mt-14">Filtros</span>
        <div className="flex self-start  gap-2">
          <select className="my-select pe-14 ">
            <option key={"musculo"} onClick={() => filterSelectedMuscleGroup(null)}>Músculo</option>
            <option key={"bracos"} onClick={() => filterSelectedMuscleGroup("Braços")}>Braços</option>
            <option key={"costas"} onClick={() => filterSelectedMuscleGroup("Costas")}>Costas</option>
            <option key={"peito"} onClick={() => filterSelectedMuscleGroup("Peitoral")}>Peito</option>
            <option key={"pernas"} onClick={() => filterSelectedMuscleGroup("Pernas")}>Pernas</option>
            <option key={"ombros"} onClick={() => filterSelectedMuscleGroup("Ombros")}>Ombros</option>
          </select>
          <select className="my-select pe-14 ">
            <option key="subgroup" >Subgrupo</option>
            {
              optionsSubGroups?.map((subgroup: TSubgroups) => {
                return (
                  <option key={subgroup} onClick={() => { filterSelectedSubgroups(subgroup) }} value={subgroup}>{subgroup}</option>
                )
              })
            }
          </select>
        </div>
        <label className={`${customExerciseInput ? "label-input" : "hidden"} relative`} >
          <input name="exercise_name" className="my-input peer " onChange={handleNewExerciseInput} type="text" placeholder="Nome do Exercício" />
          <span className="span-input">Exercício</span>
          <span onClick={() => { showCustomExerciseInput(false) }} className="absolute right-0 top-0 w-[15%] flex justify-center items-center  text-center font-mono text-white h-full bg-secondary text-lg cursor-pointer !rounded-none">
            Listar
          </span>
        </label>

        <select defaultValue={"name exercise"} className={`${customExerciseInput ? "hidden" : "my-select"} w-full`}>
          <option key="name exercise" hidden>Nome do Exercício</option>
          {
            exerciseOptions?.map((ele: TDbExerciseSample) => {
              return (
                <option onClick={() => setSelectedMuscleName(ele.exercise_name)} key={ele.exercise_name} value={ele.exercise_name}>{ele.exercise_name}</option>
              )
            })
          }
          <option key="outro" onClick={() => { showCustomExerciseInput(true); setSelectedMuscleName(null) }}>Outro</option>
        </select>

        <label htmlFor="sets" className="label-input">
          <input placeholder="Séries" id="sets" name="sets" type="text" pattern="[0-9]" inputMode="numeric" maxLength={3} onKeyDown={(e) => filterNumberInput(e)} onChange={handleNewExerciseInput} className="my-input peer " />
          <span className="span-input">Séries</span>
        </label>

        <label htmlFor="quantity" className="label-input">
          <input name="quantity" placeholder="Repetições" type="text" pattern="[0-9]" inputMode="numeric" maxLength={3} onKeyDown={(e) => filterNumberInput(e)} onChange={handleNewExerciseInput} className="my-input peer " />
          <span className="span-input">Repetições</span>
        </label>
        <label htmlFor="obs" className="label-input">
          <textarea placeholder="Observações" onChange={handleNewExerciseInput} name="obs" className="my-input peer " maxLength={100} />
          <span className="span-input">Observações</span>
        </label>
        <div className="form-control gap-2">

        </div>
        <div>
          <button onClick={handleAddNewExercise} type="button" className="my-btn w-full">
            CRIAR
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddExerciseFormModal 
