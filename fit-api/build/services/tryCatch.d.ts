import { NextFunction, Request, Response } from "express";
export declare const tryCatch: (controller: (req: Request, res: Response) => Promise<Response>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
