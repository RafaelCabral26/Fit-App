import dotenv from "dotenv"
dotenv.config();
import errorHandler from "./middleware/errorHandler";
import { allRoutes } from "./routes/routes";
const sequelize = require("./models/createSequelize");
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();
console.log("TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", process.env.CORS_ORIGIN);

const multipleOrigins = ["http://191.252.210.147/", "http://cabral.vps-kinghost.net/"];
const corsOptions = {
    origin: function(origin:string, callback:any) {
        if (multipleOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Erro na origem"),false);
        }
    },
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err: Error) => console.log(err))
app.use(allRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

})

