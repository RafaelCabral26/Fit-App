import jwt, { Jwt, GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TUser } from "../models/user.model";

const auth = {
    createEncryptedPass: async (oldPassword: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(oldPassword, salt)
    },
    comparePasswords: async (inputPassword: string, DbPassword:string) => {
        const checkedPassword = await bcrypt.compare(inputPassword, DbPassword);
        if (!checkedPassword) throw new Error("Senha Inválida.");
    },
    createToken: async (user:TUser) => {
        const secret = process.env.SECRET as Secret;
        const payload = { id: user.id, email: user.email, profile: user.profile };
        const token = jwt.sign(payload, secret, { expiresIn: "10 days" });
        return token;
    },

}

export default auth
