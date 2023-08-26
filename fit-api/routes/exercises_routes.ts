import { Router } from "express";
import Exercise from "../models/exercise.model";
import { TExercise } from "../models/exercise.model";
import { defaultExercisesList } from "../config/exercises_list";

const router = Router();

router.get("/exercises_list", async (req, res, next) => {
    try {
        const exerciseList = await Exercise.findAll();
        console.log(exerciseList);

    } catch (err) {

    }
})
export { router }
