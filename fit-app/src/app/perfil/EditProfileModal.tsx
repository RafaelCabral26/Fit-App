
import { ValidateEditInput } from '@/components/ValidationUserInput';
import { GlobalContext } from '@/services/GlobalContext';
import myHTTP from '@/services/axiosconfig';
import EditPencilSvg from '@/svgs/editpencil';
import { useRouter } from 'next/navigation';
import React, { SetStateAction, useContext, useEffect, useState } from 'react'

const EditProfileModal = ({ userData, showModalEditProfile }: {
    userData: { name: string, email:string } | undefined,
    showModalEditProfile: React.Dispatch<SetStateAction<boolean>>,
}) => {
    const globalState = useContext(GlobalContext);
    const [editInput, setEditInput] = useState<{ name: string }>({ name: "" });

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditInput((prev: { name: string }) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        if (userData) setEditInput({ name: userData?.name });
    }, []);

    const tryEditUser = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const input = ValidateEditInput(editInput);
        if (!input.valid) return globalState?.setToast({ type: "warning", message: input.message });
        myHTTP.patch("/edit_user", editInput)
            .then(res => {
                globalState?.setToast({ type: "success", message: res.data.msg });
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            })
            .catch(err => {
                globalState?.setToast({ type: "warning", message: err.response.data.msg })
            })

    };
    return (
        <form onSubmit={tryEditUser} className='my-form-modal flex flex-col '>
            <div className='flex justify-between'>
                    <div className="absolute  flex items-center justify-between left-0 top-0 bg-secondary w-full h-14 p-4  ">
                        <div className="flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ">
                            <div className="w-10 text-white p-2  rounded-sm">
                            <EditPencilSvg></EditPencilSvg>
                            </div>
                        editar
                        </div>
                        <button type="button" onClick={() => { showModalEditProfile(false) }} className="self-start text-3xl font-bold leading-3 text-white ">X</button>
                    </div>
            </div>
            <label htmlFor='name' className="label-input mt-14">
                <input name='name' placeholder='Novo Nome' onChange={handleEditChange} value={editInput?.name} type='text' className='my-input peer ' />
                <span className="span-input ">Novo Nome</span>
            </label>
            <button type='submit' className='my-btn'>Alterar</button>
        </form>
    )
}

export default EditProfileModal
