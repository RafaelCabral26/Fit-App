import { SetStateAction, useState } from "react"

const RegisterModal = ({ showRegisterModal }: { showRegisterModal: React.Dispatch<SetStateAction<boolean>> }) => {
    const [registerInput, setRegisterInput] = useState({
        name:"",
        email:"",
        password:"",
        password_confirm:""
    })
    const handleRegisterInput =(e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterInput((prev:any) => {
            return {...prev, [name]:value};
        })
    }
    const tryRegister = () => {
        console.log(registerInput)
    }
    return (
        <div className="absolute h-screen w-screen">
            <div className="absolute h-screen w-screen top-0 left-0 bg-white blur-3xl ">
            </div>
            <div className="relative w-80 p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form className="my-form-modal">
                    <div className="flex justify-between">
                        <h1 className="">Cadastro</h1>
                        <button onClick={() => { showRegisterModal(false) }} className="text-2xl font-extrabold leading-3 ">X</button>
                    </div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name="email" onChange={handleRegisterInput} type="text" className="my-input" />

                    <label className="label">
                        <span className="label-text">Nome</span>
                    </label>
                    <input name="name" onChange={handleRegisterInput} type="text" className="my-input" />

                    <label className="label">
                        <span className="label-text">Senha</span>
                    </label>
                    <input name="password" onChange={handleRegisterInput} type="text" className="my-input" />

                    <label className="label">
                        <span className="label-text">Confirmar Senha</span>
                    </label>
                    <input name="password_confirm" onChange={handleRegisterInput} type="text" className="my-input" />

                    <button onClick={tryRegister} type="button" className="my-btn">Registrar</button>
                </form>
            </div>
        </div>
    )
}
export default RegisterModal
