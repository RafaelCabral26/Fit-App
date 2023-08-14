import { Request, Response } from "express";
require("dotenv").config()
const mySequelize = require("./models/index.ts");
const User = require("./models/user.model.ts")
const express = require("express");
const cors = require('cors');

const app = express();
console.log("NODE_DOCKER_PORT",process.env.NODE_DOCKER_PORT);

const corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions));
app.use(express.json());

mySequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err: any) => console.log(err))

app.get("/", (req: Request, res: Response) => {
    res.json({ msg: "teste API" })
})
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');

})
