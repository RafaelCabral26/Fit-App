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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("./AppError");
const auth = {
    createEncryptedPass: (oldPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        return yield bcrypt_1.default.hash(oldPassword, salt);
    }),
    comparePasswords: (inputPassword, DbPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const checkedPassword = yield bcrypt_1.default.compare(inputPassword, DbPassword);
        if (!checkedPassword)
            throw new AppError_1.AppError(402, "Senha Inválida.");
    }),
    createToken: (dbUser) => __awaiter(void 0, void 0, void 0, function* () {
        const secret = process.env.SECRET;
        let payload;
        if ("user_id" in dbUser) {
            payload = { user_id: dbUser.user_id, email: dbUser.email, name: dbUser.name };
        }
        else if ("trainer_id" in dbUser) {
            payload = { trainer_id: dbUser.trainer_id, email: dbUser.email, name: dbUser.name };
        }
        else {
            throw new AppError_1.AppError(403, "Faça login...");
        }
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "10 days" });
        return token;
    }),
    checkDemonstrationProfile: (req, res) => {
        console.log("TESTE AUTHHHHHHHHHHHHHHHHH");
        const secret = process.env.SECRET;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jsonwebtoken_1.default.verify(token, secret);
            if (user.name === "Cliente" || user.name === "Treinador" || user.name === "Cliente2") {
                return res.status(200).json({ msg: "Sem permissão, conta demonstrativa" });
            }
        }
    }
};
exports.default = auth;
