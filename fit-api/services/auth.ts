import jwt, { Jwt, GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "./AppError";
import { TTrainer } from "../models/trainer.model";
import { TUser } from "../models/user.model";

type TCreateMethod = {
    createEncryptedPass(param: string): Promise<string>,
    comparePasswords(param1: string, param2: string): string,
    createToken(param: TUser | TTrainer): void,

}
const auth = {
    createEncryptedPass: async (oldPassword: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(oldPassword, salt)
    },
    comparePasswords: async (inputPassword: string, DbPassword: string) => {
        const checkedPassword = await bcrypt.compare(inputPassword, DbPassword);
        if (!checkedPassword) throw new AppError(402, "Senha Inválida.");
    },
    createToken: async (dbUser: TUser | TTrainer) => {
        const secret = process.env.SECRET as Secret;
        let payload;
        if ("user_id" in dbUser) {
            payload = { user_id: dbUser.user_id, email: dbUser.email, name: dbUser.name }
        } else if ("trainer_id" in dbUser) {
            payload = { trainer_id: dbUser.trainer_id, email: dbUser.email, name: dbUser.name };
        } else {
            throw new AppError(403,"Faça login...");
        }
        const token = jwt.sign(payload, secret, { expiresIn: "10 days" });
        return token;
    },

}
export default auth
