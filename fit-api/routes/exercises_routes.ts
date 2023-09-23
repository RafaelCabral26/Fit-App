import { Router } from "express";
import ExerciseSample from "../models/exercise_sample.model";

const router = Router();

router.get("/list_exercises", async (req, res, next) => {
    try {
        const exerciseList = await ExerciseSample.findAll();
        res.status(200).json({exercises:exerciseList})
    } catch (err) {
        res.status(401).json({msg:"Erro na busca de exercicios"});
    }
})
export { router }
