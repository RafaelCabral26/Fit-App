import { Router } from "express";
import auth from "../services/auth";
import User from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { TUser } from "../models/user.model";
const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        user.password = await auth.createEncryptedPass(user.password)
        await User.create(user);
        res.status(200).json({ msg: "Usuário Cadastrado!" })
        next();
    } catch (err) {
        res.status(400).send({ msg: err })
    }
})

router.post("/login", async (req, res, next) => {
    try {

        const userInput: { email: string, password: string } = req.body;
        if (!userInput.email || !userInput.password) {
            throw new Error("Preencha todos os campos.");
        }
        const dbUser = await User.findOne({ where: { email: userInput.email } });
        if (!dbUser) throw new Error("Usuário não encontrado");
        await auth.comparePasswords(userInput.password, dbUser.password);
        const token = await auth.createToken(dbUser);
        res.cookie('authcookie', token, { httpOnly: true, maxAge: 36000 * 60, sameSite: "none", secure: true });
        return res.status(200).json({ msg: "Usuário Logado!" })
    } catch (err: any) {
        return res.status(400).json({ msg: err.message });
    }
    })
router.post("/check_user", async (req, res, next) => {
    try {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as TUser;
            return res.status(200).json({logged:true,profile:user.profile})
        }
        return res.status(200).json({ logged: false });
    } catch (err) {
        return res.status(400).json({ msg:"Falha de conexão", err:err });
    }

})
router.get("/logout", async (req,res,next) => {
    try {
        res.clearCookie('authcookie');
        return res.status(200).json({msg:"Usuário Deslogado"});
    } catch (err) {
       return res.status(400).json({msg:"Erro ao tentar sair", error:err}) 
    }
})
export { router }
