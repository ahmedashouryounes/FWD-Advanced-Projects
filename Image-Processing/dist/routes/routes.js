"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageroute_1 = __importDefault(require("./api/imageroute"));
const routes = express_1.default.Router();
routes.use("/", imageroute_1.default);
exports.default = routes;
