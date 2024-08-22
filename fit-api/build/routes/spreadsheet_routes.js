"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const spreadsheet_model_1 = __importDefault(require("../models/spreadsheet.model"));
const tryCatch_1 = require("../services/tryCatch");
const AppError_1 = require("../services/AppError");
const router = (0, express_1.Router)();
exports.router = router;
router.patch("/new_spreadsheet", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.authcookie) {
        throw new AppError_1.AppError(403, "Faça login para salvar planilha.");
    }
    if (!req.body)
        throw new AppError_1.AppError(403, "PLanilha vazia.");
    const secret = process.env.SECRET;
    const user = jsonwebtoken_1.default.verify(req.cookies.authcookie, secret);
    const stringfiedDayArray = JSON.stringify(req.body);
    const spreadsheetMould = {
        fk_user_id: "user_id" in user && user.user_id ? user.user_id : null,
        fk_trainer_id: user.trainer_id ? user.trainer_id : null,
        spreadsheet_days: stringfiedDayArray,
    };
    let whereStatement = {};
    if ("user_id" in user && user.user_id)
        whereStatement = { fk_user_id: user.user_id };
    if (user.trainer_id)
        whereStatement = { fk_trainer_id: user.trainer_id };
    const { count, rows } = yield spreadsheet_model_1.default.findAndCountAll({
        where: whereStatement
    });
    if (count >= 4) {
        throw new AppError_1.AppError(403, "Máximo de 4 planilhas por usuário.");
    }
    yield spreadsheet_model_1.default.create(spreadsheetMould);
    return res.status(200).json({ msg: "Planilha Criada" });
})));
router.get("/list_user_spreadsheets", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.authcookie) {
        throw new AppError_1.AppError(405, "Faça login para ver planilhas.");
    }
    const secret = process.env.SECRET;
    const user = jsonwebtoken_1.default.verify(req.cookies.authcookie, secret);
    let whereStatement = {};
    if ("user_id" in user && user.user_id)
        whereStatement = { fk_user_id: user.user_id };
    if (user.trainer_id)
        whereStatement = { fk_trainer_id: user.trainer_id };
    const allSpreadsheets = yield spreadsheet_model_1.default.findAll({
        where: whereStatement
    });
    return res.status(200).json({ msg: "Bateu na API", spreadsheet: allSpreadsheets });
})));
router.delete("/delete_spreadsheet/:id", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield spreadsheet_model_1.default.destroy({
        where: {
            spreadsheet_id: req.params.id
        }
    });
    return res.status(200).json({ msg: "Planilha deletada." });
})));
router.delete("/delete_client_spreadsheet/:spreadsheet_id", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET;
    const user = jsonwebtoken_1.default.verify(req.cookies.authcookie, secret);
    if (!user.trainer_id)
        throw new Error("Usuário sem permissão");
    yield spreadsheet_model_1.default.destroy({
        where: {
            spreadsheet_id: req.params.spreadsheet_id,
            fk_trainer_id: user.trainer_id,
        }
    });
    return res.status(200).json({ msg: "Planilha deletada." });
})));
router.get("/search_spreadsheet/:spreadsheet_id", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.spreadsheet_id)
        throw new AppError_1.AppError(403, "Busca Incorreta");
    const queriedSpreadsheet = yield spreadsheet_model_1.default.findByPk(req.params.spreadsheet_id);
    return res.status(200).json({ spreadsheet: queriedSpreadsheet });
})));
router.patch("/update_spreadsheet", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stringfiedDayArray = JSON.stringify(req.body.spreadsheet_days);
    yield spreadsheet_model_1.default.update({ spreadsheet_days: stringfiedDayArray }, {
        where: {
            spreadsheet_id: req.body.spreadsheet_id,
        }
    });
    return res.status(200).json({ msg: "Planilha atualizada." });
})));
router.post("/get_client_spreadsheet", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET;
    if (!req.cookies.authcookie)
        throw new AppError_1.AppError(403, "Faça login.");
    const token = req.cookies.authcookie;
    const trainer = jsonwebtoken_1.default.verify(token, secret);
    if (!trainer)
        throw new AppError_1.AppError(403, "Faça login.");
    const user = yield user_model_1.default.findOne({ where: { email: req.body.client_email } });
    const userSpreadsheets = yield spreadsheet_model_1.default.findAll({ where: { fk_user_id: user.user_id, fk_trainer_id: trainer.trainer_id } });
    return res.status(200).json({ user_spreadsheets: userSpreadsheets });
})));
router.post("/send_spreadsheet", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET;
    const token = req.cookies.authcookie;
    const stringfiedDayArray = JSON.stringify(req.body.daysArray);
    if (!token)
        throw new AppError_1.AppError(403, "Faça login...");
    const trainer = jsonwebtoken_1.default.verify(token, secret);
    if (!trainer.trainer_id)
        throw new Error("Usuário sem permissão");
    const client = yield user_model_1.default.findOne({ where: { email: req.body.client_email } });
    const { count, rows } = yield spreadsheet_model_1.default.findAndCountAll({
        where: {
            fk_trainer_id: trainer.trainer_id,
        }
    });
    if (count >= 10)
        throw new Error("Limite de planilhas alcançado(10)");
    const spreadsheetMould = {
        fk_trainer_id: trainer.trainer_id,
        fk_user_id: client.user_id,
        spreadsheet_days: stringfiedDayArray,
    };
    yield spreadsheet_model_1.default.create(spreadsheetMould);
    return res.status(200).json({ msg: "Planilha enviada" });
})));
