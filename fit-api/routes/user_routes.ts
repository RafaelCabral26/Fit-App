import { Request, Response, Router } from "express";
import auth from "../services/auth";
import User from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { TUser } from "../models/user.model";
import Trainer from "../models/trainer.model";
import { tryCatch } from "../services/tryCatch";
import { AppError } from "../services/AppError";

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


router.post("/login",
tryCatch(async (req:Request,res:Response) => {
        const userInput: TUser = req.body;
        if (!userInput.email || !userInput.password) {
        throw new AppError(402,"Preencha todos os campos.");
        }
        let dbUser = await User.findOne({ where: { email: userInput.email } });
        if (!dbUser) {
            dbUser = await Trainer.findOne({ where: { email: userInput.email } });
            if (!dbUser) throw new AppError(402,"Usuário não encontrado");
        }
        await auth.comparePasswords(userInput.password, dbUser.password);
        const userOrTrainer = dbUser.user_id ? { name: dbUser.name, email: dbUser.email, user_id: dbUser.user_id } : { name: dbUser.name, email: dbUser.email, trainer_id: dbUser.trainer_id }
        const token = await auth.createToken(userOrTrainer);
        res.cookie('authcookie', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
        return res.status(200).json({ msg: "Usuário Logado!" });
    })
)

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
        if (user.name === req.body.name) {
            throw new Error("Nenhum campo alterado");
        };
        let newToken;
        if (user.user_id) {
            newToken = await User.findOne({ 
                attributes: ['user_id','name', 'email'],
                where: { user_id: user.user_id }});
            newToken.set({
                name:req.body.name
            })
            await newToken.save()
        };
        if (user.trainer_id) {
            newToken = await Trainer.findOne({
                attributes: ['trainer_id','name', 'email'],
                where: { trainer_id: user.trainer_id }});
            newToken.set({
                name:req.body.name
            })
            
            await newToken.save()
        };

        if (newToken === null) throw new Error("Usuário não encontrado")
        const tokenReplacer = await auth.createToken(newToken);
        res.cookie('authcookie', tokenReplacer, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
        return res.status(200).json({ msg: "Dados atualizados." });
    } catch (err) {
        return res.status(402).json({ msg: "Erro ao editar dados." });
    }
})

export { router }
