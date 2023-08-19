import { Jwt, GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

const auth = {
    createEncryptedPass: async (oldPassword: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(oldPassword, salt)
    },
    comparePasswords : async (inputPassword:string, DbPassword :string) => {
        const checkedPassword = await bcrypt.compare(inputPassword, DbPassword);
        if (!checkedPassword) throw new Error("Senha Inválida.")
    }
}
export default auth
