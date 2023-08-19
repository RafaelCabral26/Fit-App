import { Router } from "express";
import auth from "../services/auth";
import User from "../models/user.model";
const sequelize = require("../models/index.ts")
const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        user.password = await auth.createEncryptedPass(user.password)
        console.log(user);
        await User.create(user);
        res.status(200).json({ msg: "Usuário Cadastrado!" })
        next();
    } catch (err) {
        console.log("catch", err);
        
        res.status(400).send({ msg: err })
    }
})
export { router }
