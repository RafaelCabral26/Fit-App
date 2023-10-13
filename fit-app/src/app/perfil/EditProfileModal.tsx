
import { ValidateEditInput } from '@/components/ValidationUserInput';
import { GlobalContext } from '@/services/MyToast';
import myHTTP from '@/services/axiosconfig';
import React, { SetStateAction, useContext, useEffect, useState } from 'react'

const EditProfileModal = ({ userData, showModalEditProfile }: {
    userData: { name: string, email: string } ,
    showModalEditProfile:React.Dispatch<SetStateAction<boolean>>,
}) => {
    const globalState = useContext(GlobalContext);
    const [editInput, setEditInput] = useState<{ name: string , email:string  }>({name:"", email:""});
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditInput((prev: any) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        setEditInput({ name: userData?.name, email:userData?.email })
    },[]);

    const tryEditUser = (e:React.SyntheticEvent) => {
        e.preventDefault();
        const input = ValidateEditInput(editInput);
        if (!input.valid) return globalState?.setToast({type:"warning", message:input.message});
        myHTTP.patch("/edit_user", editInput)
        .then(res => {
                console.log(res);
            })
        .catch(err => {
                console.log(err);
            });
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
            <input  name='name' onChange={handleEditChange} value={editInput?.name} type='text' className='my-input' />
            <label className="label">
                <span className="label-text text-xs">Email</span>
            </label>
            <input  onChange={handleEditChange} value={editInput?.email} name="email" type='text' className='my-input' />
            <button type='submit' className='my-btn'>Alterar</button>
        </form>
    )
}

export default EditProfileModal
