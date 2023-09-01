import { Router } from "express";
import Exercise from "../models/exercise.model";
import { TExercise } from "../models/exercise.model";

const router = Router();

router.get("/list_exercises", async (req, res, next) => {
    try {
        const exerciseList = await Exercise.findAll();
        console.log(exerciseList);
        res.status(200).json({exercises:exerciseList})
    } catch (err) {
        res.status(401).json({msg:"Erro na busca de exercicios"});
    }
})
export { router }
