
const ExerciseComponent = ({ item, index, daysArray, dayIndex, setNewDayArray }: { item: any, index: any, daysArray: any, dayIndex: any, setNewDayArray: any }) => {
    const handleDeleteExercise = () => {
        const newArray = daysArray
        newArray[dayIndex].exercises.splice(index, 1)
        setNewDayArray([...newArray])
    }
    return (
        <Draggable draggableId={item.name} key={item.name} index={index}>
            {(provided, snapshot) => {
                return (
                    <div className={`p-2 m-2 shadow-sm bg-white border-2 border-stone-300 ${snapshot.isDragging ? "opacity-50" : "opacity-100"}`}
                        ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                        {item.name}
                        <button onClick={handleDeleteExercise}>
                            <TrashSvg />
                        </button>
                    </div>
                )
            }}
        </Draggable>
    )
}
export default SpreadsheetBuilder

