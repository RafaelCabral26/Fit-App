import jwt, { Jwt, GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "./AppError";

const auth = {
    createEncryptedPass: async (oldPassword: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(oldPassword, salt)
    },
    comparePasswords: async (inputPassword: string, DbPassword:string) => {
        const checkedPassword = await bcrypt.compare(inputPassword, DbPassword);
        if (!checkedPassword) throw new AppError(402,"Senha Inválida.");
    },
    createToken: async (dbUser:any) => {
        const secret = process.env.SECRET as Secret;
        let payload;
        dbUser.user_id ?
            payload = { user_id: dbUser.user_id, email: dbUser.email, name: dbUser.name } :
            payload = { trainer_id: dbUser.trainer_id, email: dbUser.email, name: dbUser.name };
        const token = jwt.sign(payload, secret, { expiresIn: "10 days" });
        return token;
    },

}

export default auth
