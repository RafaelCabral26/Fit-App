require("dotenv").config()
const express = require("express");
const cors = require('cors');

const app = express();

const corsOptions = {
    origin:"http://localhost:3000"
}
app.use(cors(corsOptions));
app.use(express.json());

