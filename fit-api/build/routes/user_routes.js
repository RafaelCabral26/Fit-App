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
const auth_1 = __importDefault(require("../services/auth"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
const tryCatch_1 = require("../services/tryCatch");
const AppError_1 = require("../services/AppError");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/register", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    user.password = yield auth_1.default.createEncryptedPass(user.password);
    if (req.body.profile === "user") {
        yield user_model_1.default.create(user);
    }
    else if (req.body.profile === "trainer") {
        yield trainer_model_1.default.create(user);
    }
    return res.status(200).json({ msg: "Usuário Cadastrado!" });
})));
router.post("/login", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    if (!userInput.email || !userInput.password) {
        throw new AppError_1.AppError(402, "Preencha todos os campos.");
    }
    ;
    let dbUser = yield user_model_1.default.findOne({ where: { email: userInput.email, active: true } });
    if (!dbUser) {
        dbUser = yield trainer_model_1.default.findOne({ where: { email: userInput.email, active: true } });
        if (!dbUser)
            throw new AppError_1.AppError(403, "Usuário não encontrado");
    }
    yield auth_1.default.comparePasswords(userInput.password, dbUser.password);
    const userOrTrainer = dbUser.user_id ? { name: dbUser.name, email: dbUser.email, user_id: dbUser.user_id } : { name: dbUser.name, email: dbUser.email, trainer_id: dbUser.trainer_id };
    const token = yield auth_1.default.createToken(userOrTrainer);
    res.cookie('authcookie', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
    return res.status(200).json({ msg: "Usuário Logado!" });
})));
router.post("/check_user", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET;
    const token = req.cookies.authcookie;
    if (token) {
        const user = jsonwebtoken_1.default.verify(token, secret);
        if (user.trainer_id)
            return res.status(200).json({ logged: true, profile: "trainer" });
        if ('user_id' in user && user.user_id)
            return res.status(200).json({ logged: true, profile: "user" });
    }
    return res.status(200).json({ logged: false });
})));
router.get("/logout", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('authcookie');
    return res.status(200).json({ msg: "Usuário Deslogado" });
})));
router.get("/user_profile", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET;
    const token = req.cookies.authcookie;
    if (!token)
        throw new AppError_1.AppError(403, "Usuário deslogado.");
    const user = jsonwebtoken_1.default.verify(token, secret);
    return res.status(200).json({ email: user.email, name: user.name });
})));
router.patch("/edit_user", (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET;
    const token = req.cookies.authcookie;
    if (!token)
        throw new AppError_1.AppError(403, "Usuário deslogado.");
    const user = jsonwebtoken_1.default.verify(token, secret);
    if (user.name === req.body.name) {
        throw new AppError_1.AppError(403, "Nenhum campo alterado");
    }
    ;
    let newToken;
    if ("user_id" in user && user.user_id) {
        newToken = yield user_model_1.default.findOne({
            attributes: ['user_id', 'name', 'email'],
            where: { user_id: user.user_id }
        });
        newToken.set({
            name: req.body.name
        });
        yield newToken.save();
    }
    ;
    if (user.trainer_id) {
        newToken = yield trainer_model_1.default.findOne({
            attributes: ['trainer_id', 'name', 'email'],
            where: { trainer_id: user.trainer_id }
        });
        newToken.set({
            name: req.body.name
        });
        yield newToken.save();
    }
    ;
    if (newToken === null)
        throw new AppError_1.AppError(403, "Usuário não encontrado");
    const tokenReplacer = yield auth_1.default.createToken(newToken);
    res.cookie('authcookie', tokenReplacer, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
    return res.status(200).json({ msg: "Dados atualizados." });
})));
