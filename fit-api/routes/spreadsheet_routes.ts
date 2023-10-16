"use client"
import { Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User  from "../models/user.model";
import Spreadsheet from "../models/spreadsheet.model";
import { TTrainer, myJwt } from "./types_routes";
import { tryCatch } from "../services/tryCatch";
import { AppError } from "../services/AppError";

const router = Router();

router.patch("/new_spreadsheet",
    tryCatch(async (req: Request, res: Response) => {

        if (!req.cookies.authcookie) {
            throw new AppError(403, "Faça login para salvar planilha.");
        }
        if (!req.body) throw new AppError(403, "PLanilha vazia.");
        const secret = process.env.SECRET as Secret;
        const user = jwt.verify(req.cookies.authcookie, secret) as myJwt;
        const stringfiedDayArray = JSON.stringify(req.body);
        const spreadsheetMould = {
            fk_user_id: "user_id" in  user && user.user_id ? user.user_id : null,
            fk_trainer_id: user.trainer_id ? user.trainer_id : null,
            spreadsheet_days: stringfiedDayArray,
        };
        let whereStatement = {};
        if ("user_id" in user && user.user_id) whereStatement = { fk_user_id: user.user_id };
        if (user.trainer_id) whereStatement = { fk_trainer_id: user.trainer_id };
        const { count, rows } = await Spreadsheet.findAndCountAll({
            where: whereStatement
        });
        if (count >= 4) {
            throw new AppError(403, "Máximo de 4 planilhas por usuário.");
        }
        await Spreadsheet.create(spreadsheetMould);
        return res.status(200).json({ msg: "Planilha Criada" });
    }));

router.get("/list_user_spreadsheets",
    tryCatch(async (req: Request, res: Response) => {
        if (!req.cookies.authcookie) {
            throw new AppError(403, "Faça login para ver planilhas.");
        }
        const secret = process.env.SECRET as Secret;
        const user = jwt.verify(req.cookies.authcookie, secret) as myJwt;
        let whereStatement = {}
        if ("user_id" in user && user.user_id) whereStatement = { fk_user_id: user.user_id };
        if (user.trainer_id) whereStatement = { fk_trainer_id: user.trainer_id };
        const allSpreadsheets = await Spreadsheet.findAll({
            where: whereStatement
        });
        return res.status(200).json({ msg: "Bateu na API", spreadsheet: allSpreadsheets });
    }));

router.delete("/delete_spreadsheet/:id",
    tryCatch(async (req: Request, res: Response) => {
        await Spreadsheet.destroy({
            where: {
                spreadsheet_id: req.params.id
            }
        })
        return res.status(200).json({ msg: "Planilha deletada." });
    }));

router.delete("/delete_client_spreadsheet/:spreadsheet_id",
    tryCatch(async (req: Request, res: Response) => {
        const secret = process.env.SECRET as Secret;
        const user = jwt.verify(req.cookies.authcookie, secret) as myJwt;
        if (!user.trainer_id) throw new Error("Usuário sem permissão");
        await Spreadsheet.destroy({
            where: {
                spreadsheet_id: req.params.spreadsheet_id,
                fk_trainer_id: user.trainer_id,
            }
        });
        return res.status(200).json({ msg: "Planilha deletada." });
    }));

router.get("/search_spreadsheet/:spreadsheet_id",
    tryCatch(async (req: Request, res: Response) => {
        if(!req.params.spreadsheet_id) throw new AppError(403, "Busca Incorreta");
        const queriedSpreadsheet = await Spreadsheet.findByPk(req.params.spreadsheet_id)
        return res.status(200).json({ spreadsheet: queriedSpreadsheet });
    }));


router.patch("/update_spreadsheet",
    tryCatch(async (req: Request, res: Response) => {
        const stringfiedDayArray = JSON.stringify(req.body.spreadsheet_days);
        await Spreadsheet.update({ spreadsheet_days: stringfiedDayArray }, {
            where: {
                spreadsheet_id: req.body.spreadsheet_id,
            }
        })
        return res.status(200).json({ msg: "Planilha atualizada." });
    }));

router.post("/get_client_spreadsheet",
    tryCatch(async (req: Request, res: Response) => {
        const secret = process.env.SECRET as Secret;
        if (!req.cookies.authcookie) throw new AppError(403, "Faça login.");
        const token = req.cookies.authcookie;
        const trainer = jwt.verify(token, secret) as TTrainer;
        if (!trainer) throw new AppError(403, "Faça login.");
        const user = await User.findOne({ where: { email: req.body.client_email } });
        const userSpreadsheets = await Spreadsheet.findAll({ where: { fk_user_id: user.user_id, fk_trainer_id: trainer.trainer_id } });
        return res.status(200).json({ user_spreadsheets: userSpreadsheets });
    }));

router.post("/send_spreadsheet",
    tryCatch(async (req: Request, res: Response) => {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        const stringfiedDayArray = JSON.stringify(req.body.daysArray);
        if (!token) throw new AppError(403, "Faça login...");
        const trainer = jwt.verify(token, secret) as TTrainer;
        if (!trainer.trainer_id) throw new Error("Usuário sem permissão");
        const client = await User.findOne({ where: { email: req.body.client_email } });
        const { count, rows } = await Spreadsheet.findAndCountAll({
            where: {
                fk_trainer_id: trainer.trainer_id,
            }
        })
        if (count >= 10) throw new Error("Limite de planilhas alcançado(10)");
        const spreadsheetMould = {
            fk_trainer_id: trainer.trainer_id,
            fk_user_id: client.user_id,
            spreadsheet_days: stringfiedDayArray,
        };
        await Spreadsheet.create(spreadsheetMould);
        return res.status(200).json({ msg: "Planilha enviada" });

    }));

export { router };
