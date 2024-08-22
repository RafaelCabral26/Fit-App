"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const routes_1 = require("./routes/routes");
const sequelize = require("./models/createSequelize");
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
console.log("NODE ENV", process.env.NODE_ENV);
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
app.use("/api", routes_1.allRoutes);
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
