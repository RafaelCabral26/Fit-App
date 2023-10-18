import { JwtPayload } from "jsonwebtoken";

export type myJwt = JwtPayload & TUser | TTrainer;

export type TUser = {
    user_id?: string,
    name?: string,
    password?: string,
    email: string,
    active?: boolean
};

export type TTrainer = {
    trainer_id?: string,
    name?: string,
    password?: string,
    email: string,
    active?: boolean
};

export type TClients = {
    name:string,
    email:string,
};

