
import { ValidateEditInput } from '@/components/ValidationUserInput';
import { GlobalContext } from '@/services/GlobalContext';
import myHTTP from '@/services/axiosconfig';
import { useRouter } from 'next/navigation';
import React, { SetStateAction, useContext, useEffect, useState } from 'react'

const EditProfileModal = ({ userData, showModalEditProfile }: {
    userData: { name: string },
    showModalEditProfile: React.Dispatch<SetStateAction<boolean>>,
}) => {
    const globalState = useContext(GlobalContext);
    const router = useRouter();
    const [editInput, setEditInput] = useState<{ name: string }>({ name: "" });

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditInput((prev: { name: string }) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        setEditInput({ name: userData?.name });
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
                <h1>Editar</h1>
                <button onClick={() => showModalEditProfile(false)} className='text-2xl'>X</button>
            </div>
            <label className="label">
                <span className="label-text text-xs">Nome</span>
            </label>
            <input name='name' onChange={handleEditChange} value={editInput?.name} type='text' className='my-input' />
            <button type='submit' className='my-btn'>Alterar</button>
        </form>
    )
}

export default EditProfileModal
