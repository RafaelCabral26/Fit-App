import { NextFunction, Request, Response } from "express";
import { AppError } from "../services/AppError";
import { Error, Sequelize, SequelizeScopeError, ValidationError } from "sequelize";

const errorHandler = (error:Error, req:Request, res:Response, next:NextFunction) => {
  if ( error instanceof ValidationError) {
    return res.status(303).send({
      msg: error.errors[0].message,
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
