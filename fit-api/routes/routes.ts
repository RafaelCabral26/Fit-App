import { Router } from "express";
import { router as userRoutes } from "./user_routes";
export const allRoutes = Router().use(userRoutes)
