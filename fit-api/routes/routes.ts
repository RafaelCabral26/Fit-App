import { Router } from "express";
import { router as userRoutes } from "./user_routes";
import { router as exercisesRoutes } from "./exercises_routes";
import { router as spreadsheetRoutes } from "./spreadsheet_routes";
import { router as trainerRoutes } from "./trainer_routes";
export const allRoutes = Router().use(userRoutes, exercisesRoutes,spreadsheetRoutes, trainerRoutes);
