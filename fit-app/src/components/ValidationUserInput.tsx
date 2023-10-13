import { TRegisterInput } from "./RegisterModal";

export const ValidateRegisterInput = (registerInput: TRegisterInput): { valid: boolean, message: string } => {
    for (const e in registerInput) {
        if (e.length === 0) {
            return { valid: false, message: "Preencha todos os campos." }
        }
    };
    if (registerInput.name.length < 5) {
        return { valid: false, message: "Nome mínimo de 5 dígitos." }
    } else if (registerInput.password.length < 8) {
        return { valid: false, message: "Senha de no mínimo 8 dígitos" }

    } else if (registerInput.password !== registerInput.password_confirm) {
        return { valid: false, message: "Erro na confirmação de senha." }

    } 
    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerInput.email) === false){
        return {valid:false, message:"Formato do Email inválido."}
    }
    return {valid:true, message:"Cadastro realizado."}
}

export const ValidateEditInput = (editInput:{name:string,email:string}  ): { valid: boolean, message: string } => {
    for (const e in editInput) {
        if (e.length === 0) {
            return { valid: false, message: "Preencha todos os campos." }
        }
    };
    if (editInput?.name?.length < 5) {
        return { valid: false, message: "Nome mínimo de 5 dígitos." }
    }  else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(editInput.email) === false){
        return {valid:false, message:"Formato do Email inválido."}
    }
    return {valid:true, message:"Cadastro realizado."}
}
