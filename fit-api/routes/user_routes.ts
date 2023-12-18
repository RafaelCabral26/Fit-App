import { Request, Response, Router } from "express";
import auth from "../services/auth";
import User from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { TUser, myJwt, TTrainer } from "./types_routes";
import Trainer from "../models/trainer.model";
import { tryCatch } from "../services/tryCatch";
import { AppError } from "../services/AppError";

const router = Router();

router.post("/register",
tryCatch(async (req:Request,res:Response) => {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        user.password = await auth.createEncryptedPass(user.password);
        if (req.body.profile === "user") {
            await User.create(user);
        } else if (req.body.profile === "trainer") {
            await Trainer.create(user);
        }
        return res.status(200).json({ msg: "Usuário Cadastrado!" });
    })
);

router.post("/login",
tryCatch(async (req:Request,res:Response) => {
        const userInput: TUser = req.body;
        if (!userInput.email || !userInput.password) {
        throw new AppError(402,"Preencha todos os campos.");
        };
        let dbUser = await User.findOne({ where: { email: userInput.email, active: true } });
        if (!dbUser) {
            dbUser = await Trainer.findOne({ where: { email: userInput.email, active: true } });
            if (!dbUser) throw new AppError(403,"Usuário não encontrado");
        }
        await auth.comparePasswords(userInput.password, dbUser.password);
        const userOrTrainer = dbUser.user_id ? { name: dbUser.name, email: dbUser.email, user_id: dbUser.user_id } : { name: dbUser.name, email: dbUser.email, trainer_id: dbUser.trainer_id };
        
        const token = await auth.createToken(userOrTrainer);
        res.cookie('authcookie', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
        return res.status(200).json({ msg: "Usuário Logado!" });
    })
)

router.post("/check_user",
tryCatch(async (req:Request,res:Response) => {

        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as myJwt;
            if (user.trainer_id) return res.status(200).json({ logged: true, profile: "trainer" });
            if ('user_id' in user && user.user_id) return res.status(200).json({ logged: true, profile: "user" });
        }
        return res.status(200).json({ logged: false });
}));

router.get("/logout",
tryCatch(async (req:Request,res:Response) => {
        res.clearCookie('authcookie');
        return res.status(200).json({ msg: "Usuário Deslogado" });
    }));

router.get("/user_profile",
tryCatch(async (req:Request,res:Response) => {

        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (!token) throw new AppError(403,"Usuário deslogado.");
        const user = jwt.verify(token, secret) as myJwt;
        return res.status(200).json({ email: user.email, name: user.name })
}));

router.patch("/edit_user",
tryCatch(async (req:Request,res:Response) => {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (!token) throw new AppError(403,"Usuário deslogado.");
        const user = jwt.verify(token, secret) as myJwt;
        auth.checkDemonstrationProfile(user)
        if (user.name === req.body.name) {
            throw new AppError(403,"Nenhum campo alterado");
        };
        let newToken;
        if ("user_id" in user && user.user_id) {
            newToken = await User.findOne({ 
                attributes: ['user_id','name', 'email'],
                where: { user_id: user.user_id }});
            newToken.set({
                name:req.body.name
            });
            await newToken.save();
        };
        if (user.trainer_id) {
            newToken = await Trainer.findOne({
                attributes: ['trainer_id','name', 'email'],
                where: { trainer_id: user.trainer_id }});
            newToken.set({
                name:req.body.name
            });
            await newToken.save();
        };
        if (newToken === null) throw new AppError(403,"Usuário não encontrado");
        const tokenReplacer = await auth.createToken(newToken);
        res.cookie('authcookie', tokenReplacer, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
        return res.status(200).json({ msg: "Dados atualizados." });
}));



export { router }
