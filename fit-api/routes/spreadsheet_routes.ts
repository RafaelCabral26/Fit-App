"use client"
import { Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { TUser } from "../models/user.model";
import Spreadsheet from "../models/spreadsheet.model";

const router = Router();

router.post("/new_spreadsheet", async (req, res, next) => {
    try {
        if (!req.cookies.authcookie) {
            return res.status(202).json({ msg: "Faça login para salvar planilha." })
        }
        const secret = process.env.SECRET as Secret;
        const user = jwt.verify(req.cookies.authcookie, secret) as TUser;
        const stringfiedDayArray = JSON.stringify(req.body)
        const spreadsheetMould = {
            trainer_id: null,
            user_id: user.user_id,
            spreadsheet_days: stringfiedDayArray,
        }
        const { count, rows } = await Spreadsheet.findAndCountAll({
            where: {
                user_id: user.user_id
            }
        })
        if (count >= 4) {
            return res.status(202).json({ msg: "Máximo de 4 planilhas por usuário." })
        }
        await Spreadsheet.create(spreadsheetMould)
        res.status(200).json({ msg: "Planilha Criada" })
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Erro ao criar planilha." })
    }
})
router.get("/list_user_spreadsheets", async (req, res, next) => {
    try {
        if (!req.cookies.authcookie) {
            return res.status(202).json({ msg: "Faça login para ver planilhas." })
        }
        const secret = process.env.SECRET as Secret;
        const user = jwt.verify(req.cookies.authcookie, secret) as TUser;
        const allSpreadsheets = await Spreadsheet.findAll({
            where: {
                user_id: user.user_id
            }
        });
        res.status(200).json({ msg: "Bateu na API", spreadsheet: allSpreadsheets });
    } catch (err) {
        console.log(err);
    }
})
router.delete("/delete_spreadsheet/:id", async (req, res, next) => {
    try {
        Spreadsheet.destroy({
            where: {
                spreadsheet_id:req.params.id
            }
        }) 
        return res.status(200).json({msg:"Planilha deletada."});
    } catch (err) {
        console.log(err);
        return res.status(402).json({msg:"Erro ao tentar deletar."});

    }
})
router.get("/search_spreadsheet/:spreadsheet_id", async (req, res,next) => {
    try{
    const queriedSpreadsheet = await Spreadsheet.findByPk(req.params.spreadsheet_id)
   return res.status(200).json({spreadsheet:queriedSpreadsheet}) ;
    } catch(err) {
        console.log(err);
        return res.status(400).json({msg:"Erro ao buscar planilha."});
    }
})
router.patch("/update_spreadsheet", async (req, res,next) => {
    try {
        const stringfiedDayArray = JSON.stringify(req.body.spreadsheet_days);
        await Spreadsheet.update({spreadsheet_days:stringfiedDayArray}, {
            where: {
                spreadsheet_id:req.body.spreadsheet_id,
            }
        }) 
        return res.status(200).json({msg:"Planilha atualizada."});
    } catch (err) {
       console.log(err);
       return res.status(402).json({msg:"Erro ao atualizar."}); 
    }
})
export { router }
