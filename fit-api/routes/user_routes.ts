import { Router } from "express";
import auth from "../services/auth";
import User from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { TUser } from "../models/user.model";
import Trainer from "../models/trainer.model";

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
        res.status(403).send({ msg: err });
    }
});

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
        const userOrTrainer = dbUser.user_id ? { name: dbUser.name, email: dbUser.email, user_id: dbUser.user_id } : { name: dbUser.name, email: dbUser.email, trainer_id: dbUser.trainer_id }
        const token = await auth.createToken(userOrTrainer);
        res.cookie('authcookie', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
        return res.status(200).json({ msg: "Usuário Logado!" });
    } catch (err: any) {
        return res.status(400).json({ msg: err.message });
    }
});

router.post("/check_user", async (req, res, next) => {
    try {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as any;
            console.log("check_user", user);

            if (user.trainer_id) return res.status(200).json({ logged: true, profile: "trainer" });
            if (user.user_id) return res.status(200).json({ logged: true, profile: "user" });
        }
        return res.status(200).json({ logged: false });
    } catch (err) {
        return res.status(400).json({ msg: "Falha de conexão", err: err });
    }

});

router.get("/logout", async (req, res, next) => {
    try {
        res.clearCookie('authcookie');
        return res.status(200).json({ msg: "Usuário Deslogado" });
    } catch (err) {
        return res.status(400).json({ msg: "Erro ao tentar sair", error: err })
    }
});

router.get("/user_profile", async (req, res, next) => {
    try {

        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (!token) throw new Error("Usuário deslogado.");
        const user = jwt.verify(token, secret) as any;
        return res.status(200).json({ email: user.email, name: user.name })

    } catch (err) {
        console.log(err);
    }
})

router.patch("/edit_user", async (req, res, next) => {
    try {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (!token) throw new Error("Usuário deslogado.");
        const user = jwt.verify(token, secret) as any;
    } catch (err) {
        return res.status(402).json({ msg: "Erro ao editar dados." });
    }
})

export { router }
