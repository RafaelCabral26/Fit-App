import { NextFunction, Request, Response } from "express";
import { AppError } from "../services/AppError";

const errorHandler = (error:any, req:Request, res:Response, next:NextFunction) => {
  console.log(error);

  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      msg: error.message,
    });
  }

  return res.status(500).send("Erro no servidor.");
};

export default errorHandler;
