import dotenv from "dotenv"
dotenv.config();
import errorHandler from "./middleware/errorHandler";
import { allRoutes } from "./routes/routes";
const sequelize = require("./models/createSequelize");
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();
console.log("NODE ENV", process.env.NODE_ENV);
const corsOptions = {
    origin: process.env.NODE_ENV == "production" ? ["https://cabral.vps-kinghost.net","https://fitandapp.site", "https://www.fitandapp.site"] : "http://localhost:3000",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err: Error) => console.log(err))
app.use("/api", allRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);

})

