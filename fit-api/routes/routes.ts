import { Router } from "express";
import { router as userRoutes } from "./user_routes";
import { router as exercisesRoutes } from "./exercises_routes";
export const allRoutes = Router().use(userRoutes, exercisesRoutes)
