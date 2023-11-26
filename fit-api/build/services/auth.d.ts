import { TTrainer, TUser } from "../routes/types_routes";
declare const auth: {
    createEncryptedPass: (oldPassword: string) => Promise<string>;
    comparePasswords: (inputPassword: string, DbPassword: string) => Promise<void>;
    createToken: (dbUser: TUser | TTrainer) => Promise<string>;
};
export default auth;
