import { Router } from "express";
import auth from "../services/auth";
import User from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { TUser } from "../models/user.model";
import Trainer, { TTrainer } from "../models/trainer.model";
const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        user.password = await auth.createEncryptedPass(user.password)
        if (req.body.profile === "user") {
            await User.create(user);
        } else if (req.body.profile === "trainer") {
            await Trainer.create(user);
        }
        res.status(200).json({ msg: "Usuário Cadastrado!" })
    } catch (err) {
        res.status(403).send({ msg: err })
    }
})

router.post("/login", async (req, res, next) => {
    try {

        const userInput: TUser = req.body;
        if (!userInput.email || !userInput.password) {
            throw new Error("Preencha todos os campos.");
        }
        let dbUser = await User.findOne({ where: { email: userInput.email } });
        if (!dbUser) {
            dbUser = await Trainer.findOne({ where: { email: userInput.email } });
            if (!dbUser) throw new Error("Usuário não encontrado");
        }
        await auth.comparePasswords(userInput.password, dbUser.password);
        const token = await auth.createToken(dbUser);

        res.cookie('authcookie', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
        return res.status(200).json({ msg: "Usuário Logado!" })
    } catch (err: any) {
        return res.status(400).json({ msg: err.message });
    }
})
export type TUserAndTrainer = {
    trainer?: TTrainer,
    user?: TUser
}
router.post("/check_user", async (req, res, next) => {
    try {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as any;
            if (user.trainer_id) return res.status(200).json({ logged: true, profile: "trainer" });
            if (user.user_id) return res.status(200).json({ logged: true, profile: "user" });
        }
        return res.status(200).json({ logged: false });
    } catch (err) {
        return res.status(400).json({ msg: "Falha de conexão", err: err });
    }

})
router.get("/logout", async (req, res, next) => {
    try {
        res.clearCookie('authcookie');
        return res.status(200).json({ msg: "Usuário Deslogado" });
    } catch (err) {
        return res.status(400).json({ msg: "Erro ao tentar sair", error: err })
    }
})

export { router }
