import dotenv from "dotenv"
dotenv.config();
import errorHandler from "./middleware/errorHandler";
import { allRoutes } from "./routes/routes";
import { NextFunction, Request, Response, Router } from "express";
import auth from "./services/auth";
import jwt, { Secret } from "jsonwebtoken";
import { myJwt } from "routes/types_routes";
const sequelize = require("./models/createSequelize");
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();
const corsOptions = {
    origin: process.env.NODE_ENV == "production" ? ["https://cabral.vps-kinghost.net", "https://fitandapp.site", "https://www.fitandapp.site"] : "http://localhost:3000",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err: Error) => console.log(err))

const tempRouter = Router()
tempRouter.patch("/*",
async (req:Request,res:Response, next:NextFunction) => {
            auth.checkDemonstrationProfile(req, res);
            next()
        }
)
app.use( (req:Request, res:Response, next:NextFunction) => {
    console.log("REQ METHODDDDDDDD", req.path);
if(req.method == "PATCH" || req.method == "DELETE" || req.path == "/api/send_spreadsheet"){
        console.log("TESTE AUTHHHHHHHHHHHHHHHHH");
        const secret = process.env.SECRET as Secret;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jwt.verify(token, secret) as myJwt;
            if (user.name === "Cliente" || user.name === "Treinador" || user.name === "Cliente2") {
                return res.status(202).json({msg:"Sem permissão, conta demonstrativa"})
            }
        }
    }
next();
}
)
app.use("/api", allRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);

})

