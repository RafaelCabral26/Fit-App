"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const routes_1 = require("./routes/routes");
const express_1 = require("express");
const auth_1 = __importDefault(require("./services/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize = require("./models/createSequelize");
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const corsOptions = {
    origin: process.env.NODE_ENV == "production" ? ["https://cabral.vps-kinghost.net", "https://fitandapp.site", "https://www.fitandapp.site"] : "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
const tempRouter = (0, express_1.Router)();
tempRouter.patch("/*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    auth_1.default.checkDemonstrationProfile(req, res);
    next();
}));
app.use((req, res, next) => {
    console.log("REQ METHODDDDDDDD", req.path);
    if (req.method == "PATCH" || req.method == "DELETE" || req.path == "/api/send_spreadsheet") {
        console.log("TESTE AUTHHHHHHHHHHHHHHHHH");
        const secret = process.env.SECRET;
        const token = req.cookies.authcookie;
        if (token) {
            const user = jsonwebtoken_1.default.verify(token, secret);
            if (user.name === "Cliente" || user.name === "Treinador" || user.name === "Cliente2") {
                return res.status(202).json({ msg: "Sem permissão, conta demonstrativa" });
            }
        }
    }
    next();
});
app.use("/api", routes_1.allRoutes);
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
