"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const routes_1 = require("./routes/routes");
require("dotenv").config();
const sequelize = require("./models/createSequelize");
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
app.use(routes_1.allRoutes);
app.use(errorHandler_1.default);
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
