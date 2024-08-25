import jwt, {  Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "./AppError";
import { TTrainer, TUser, myJwt } from "../routes/types_routes";
import { NextFunction, Request, Response } from "express";

const auth = {
    createEncryptedPass: async (oldPassword: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(oldPassword, salt);
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
    checkDemonstrationProfile: (req:Request, res:Response) => {
        console.log("TESTE AUTHHHHHHHHHHHHHHHHH");
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as myJwt;
            if (user.name === "Cliente" || user.name === "Treinador" || user.name === "Cliente2") {
                return res.status(200).json({msg:"Sem permissão, conta demonstrativa"})
            }
        }
    }

}
export default auth;
