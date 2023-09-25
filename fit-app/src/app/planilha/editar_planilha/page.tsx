"use client"

const EditSpreadsheet = ({ params }: { params: { slug: string } }) => {
const teste = () => {
        console.log(params);
    } 
    return (
        <div>
            <button onClick={teste} className="my-btn">
                Editar PLanilha
            </button>
        </div>
    )
}

export default EditSpreadsheet;
