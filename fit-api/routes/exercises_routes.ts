import { Request, Response, Router } from "express";
import ExerciseSample from "../models/exercise_sample.model";
import { tryCatch } from "../services/tryCatch";

const router = Router();

router.get("/list_exercises",
tryCatch(async (req:Request,res:Response) => {
        const exerciseList = await ExerciseSample.findAll();
        
        return res.status(200).json({exercises:exerciseList});
})
);
export { router }
