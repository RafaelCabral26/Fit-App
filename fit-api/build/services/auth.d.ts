import { TTrainer, TUser } from "../routes/types_routes";
import { Request, Response } from "express";
declare const auth: {
    createEncryptedPass: (oldPassword: string) => Promise<string>;
    comparePasswords: (inputPassword: string, DbPassword: string) => Promise<void>;
    createToken: (dbUser: TUser | TTrainer) => Promise<string>;
    checkDemonstrationProfile: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
};
export default auth;
