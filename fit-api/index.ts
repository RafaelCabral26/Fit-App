import { allRoutes } from "./routes/routes";
require("dotenv").config()
const sequelize = require("./models/index.ts");
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials:true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err: any) => console.log(err))
app.use(allRoutes);
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

})

