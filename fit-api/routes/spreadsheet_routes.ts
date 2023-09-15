import { Router } from "express";

const router = Router();

router.post("/new_spreadsheet", async (req, res, next) => {
    try {
        console.log(req.body[0].exercises);
        res.status(200).json({ msg: "Bateu na API" })
    } catch (err) {
        console.log(err);
    }
})

export {router}
