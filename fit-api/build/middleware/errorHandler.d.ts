import { NextFunction, Request, Response } from "express";
import { Error } from "sequelize";
declare const errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorHandler;
