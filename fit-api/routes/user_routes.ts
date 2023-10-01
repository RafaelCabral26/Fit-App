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
            password: req.body.password,
            profile: req.body.profile
        };
        user.password = await auth.createEncryptedPass(user.password)
        await User.create(user);
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
        const dbUser = await User.findOne({ where: { email: userInput.email } });
        if (!dbUser) throw new Error("Usuário não encontrado");
        await auth.comparePasswords(userInput.password, dbUser.password);
        const token = await auth.createToken(dbUser);
        res.cookie('authcookie', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
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
            return res.status(200).json({ logged: true, profile: user.profile })
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

router.patch("/add_client", async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as TUser;
            if (user.profile !== "trainer") throw new Error("Conta sem permissão");
            const verifyUser = await User.findOne({ where: { email: userEmail } });
            if (!verifyUser) throw new Error("Cliente não encontrado")
            const trainer = await User.findOne({ where: { user_id: user.user_id } });
            if (trainer.trainer_clients === null) {
                trainer.trainer_clients = [userEmail];
                await trainer.save();
                return res.status(200).json({ msg: "Cliente adicionado." });
            }
            trainer.trainer_clients.forEach((element: any) => {
                if (element === userEmail) throw new Error("Cliente já foi adicionado")
            });
            trainer.trainer_clients = [...trainer.trainer_clients, userEmail]
            await trainer.save();
            return res.status(200).json({ msg: "Cliente adicionado." });
        }
        return res.status(204).json({ err: "Faça login." });
    } catch (err: any) {
        return res.status(402).json({ msg: err.message })
    }
})
router.get("/client_list", async (req, res, next) => {
    try {
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as TUser;
            if (user.profile !== "trainer") throw new Error("Usuário sem permissão");
            const trainer = await User.findOne({ where: { user_id: user.user_id } });
            return res.status(200).json({ client_list: trainer.trainer_clients })
        }
    } catch (err) {
        console.log(err);
    }
});
export { router }
