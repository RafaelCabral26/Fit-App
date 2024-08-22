"use strict";
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
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
const spreadsheet_model_1 = __importDefault(require("../models/spreadsheet.model"));
const tryCatch_1 = require("../services/tryCatch");
const AppError_1 = require("../services/AppError");
const router = (0, express_1.Router)();
exports.router = router;
router.patch("/add_client", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientEmail = req.body.email;
    const secret = process.env.SECRET;
    const token = req.cookies.authcookie;
    if (token) {
        const user = jsonwebtoken_1.default.verify(token, secret);
        if (!user.trainer_id)
            throw new AppError_1.AppError(403, "Conta sem permissão");
        const verifyUser = yield user_model_1.default.findOne({ where: { email: clientEmail } });
        if (!verifyUser)
            throw new AppError_1.AppError(403, "Cliente não encontrado");
        const trainer = yield trainer_model_1.default.findOne({ where: { trainer_id: user.trainer_id } });
        if (!trainer.trainer_clients) {
            trainer.trainer_clients = [clientEmail];
            yield trainer.save();
            return res.status(200).json({ msg: "Cliente adicionado." });
        }
        ;
        trainer === null || trainer === void 0 ? void 0 : trainer.trainer_clients.forEach((element) => {
            if (element === clientEmail)
                throw new AppError_1.AppError(403, "Cliente já foi adicionado");
        });
        trainer.trainer_clients = [...trainer.trainer_clients, clientEmail];
        yield trainer.save();
        return res.status(200).json({ msg: "Cliente adicionado." });
    }
    return res.status(204).json({ err: "Faça login." });
})));
router.get("/client_list", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET;
    const token = req.cookies.authcookie;
    if (!token)
        throw new AppError_1.AppError(403, "Faça Login...");
    const trainerCookie = jsonwebtoken_1.default.verify(token, secret);
    if (!trainerCookie.trainer_id)
        throw new AppError_1.AppError(403, "Usuário sem permissão");
    const trainer = yield trainer_model_1.default.findOne({ where: { trainer_id: trainerCookie.trainer_id } });
    if (trainer.trainer_clients) {
        let userData = [];
        for (let key in trainer.trainer_clients) {
            let temp = yield user_model_1.default.findOne({ where: { email: trainer.trainer_clients[key] } });
            userData.push({ name: temp.name, email: temp.email });
        }
        return res.status(200).json({ client_table: userData });
    }
    return res.status(200).json({ client_table: [] });
})));
router.patch("/remove_client", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientEmail = req.body.client_email;
    const secret = process.env.SECRET;
    const token = req.cookies.authcookie;
    if (!token)
        throw new AppError_1.AppError(403, "Faça Login...");
    const user = jsonwebtoken_1.default.verify(token, secret);
    const trainer = yield trainer_model_1.default.findOne({ where: { trainer_id: user.trainer_id } });
    if (!trainer.trainer_clients) {
        return res.status(200).json({ msg: "Lista já está vazia." });
    }
    yield spreadsheet_model_1.default.destroy({ where: { fk_trainer_id: user.trainer_id } });
    trainer.trainer_clients = yield trainer.trainer_clients.filter((ele) => ele !== clientEmail);
    yield trainer.save();
    return res.status(200).json({ msg: "Cliente Removido." });
})));
