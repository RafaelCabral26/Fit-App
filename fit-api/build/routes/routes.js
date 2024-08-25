"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user_routes");
const exercises_routes_1 = require("./exercises_routes");
const spreadsheet_routes_1 = require("./spreadsheet_routes");
const trainer_routes_1 = require("./trainer_routes");
exports.allRoutes = (0, express_1.Router)().use(user_routes_1.router, exercises_routes_1.router, spreadsheet_routes_1.router, trainer_routes_1.router);
