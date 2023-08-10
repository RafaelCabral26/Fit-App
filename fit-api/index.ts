import { Request, Response } from "express";
require("dotenv").config()
const mySequelize = require("./models/index.ts");
const express = require("express");
const cors = require('cors');

const app = express();

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
app.listen(4000, () => {
    console.log('Server listening on port 4000');

})
