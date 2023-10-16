"use client"
import { Request, Response, Router } from "express"
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user.model";
import Trainer, { TTrainer } from "../models/trainer.model";
import Spreadsheet from "../models/spreadsheet.model";
import { tryCatch } from "../services/tryCatch";
import { AppError } from "../services/AppError";
const router = Router();

router.patch("/add_client",
tryCatch(async (req:Request,res:Response) => {
        const clientEmail = req.body.email;
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as any;
            if (!user.trainer_id) throw new AppError(403,"Conta sem permissão");
            const verifyUser = await User.findOne({ where: { email: clientEmail } });
            if (!verifyUser) throw new AppError(403,"Cliente não encontrado");
            const trainer = await Trainer.findOne({ where: { trainer_id: user.trainer_id } });
            if (!trainer.trainer_clients) {
                trainer.trainer_clients = [clientEmail];
                await trainer.save();
                return res.status(200).json({ msg: "Cliente adicionado." });
            };
            trainer?.trainer_clients.forEach((element: any) => {
                if (element === clientEmail) throw new AppError(403,"Cliente já foi adicionado");
            });
            trainer.trainer_clients = [...trainer.trainer_clients, clientEmail];
            await trainer.save();
            return res.status(200).json({ msg: "Cliente adicionado." });
        }
        return res.status(204).json({ err: "Faça login." });
}));

router.get("/client_list",
tryCatch(async (req:Request,res:Response) => {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (!token)  throw new AppError(403,"Faça Login...")
            const trainerCookie = jwt.verify(token, secret) as TTrainer;
            if (!trainerCookie.trainer_id) throw new AppError(403,"Usuário sem permissão");
            const trainer = await Trainer.findOne({ where: { trainer_id: trainerCookie.trainer_id } });
            if (trainer.trainer_clients) {
                let userData: any[] = []
                for (let key in trainer.trainer_clients) {
                    console.log("key", key);
                    let temp = await User.findOne({ where: { email: trainer.trainer_clients[key] } })
                    userData.push({ name: temp.name, email: temp.email })
                }
                return res.status(200).json({ client_table: userData });
            }
            return res.status(200).json({ client_table: [] });
}));

router.patch("/remove_client",
tryCatch(async (req:Request,res:Response) => {
        const clientEmail = req.body.client_email;
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (!token)  throw new AppError(403,"Faça Login...")
            const user = jwt.verify(token, secret) as any;
            const trainer = await Trainer.findOne({ where: { trainer_id: user.trainer_id } });
            if (!trainer.trainer_clients) {
                return res.status(200).json({ msg: "Lista já está vazia." });
            }
            await Spreadsheet.destroy({where:{ fk_trainer_id:user.trainer_id}});
            trainer.trainer_clients = await trainer.trainer_clients.filter((ele: any) => ele !== clientEmail);
            await trainer.save();
            return res.status(200).json({ msg: "Cliente Removido." });
}));

export { router }
