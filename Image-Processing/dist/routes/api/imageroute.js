"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkImage_1 = require("../../uititiles/checkImage");
const imageRoute = express_1.default.Router();
imageRoute.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.filename;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    if (!fileName) {
        return res.status(400).send("Please add filename");
    }
    if (!width) {
        return res.status(400).send("Please add width");
    }
    if (!height) {
        return res.status(400).send("Please add height");
    }
    if (!(yield (0, checkImage_1.checkImageInFull)(fileName))) {
        return res.status(400).send("Image not found");
    }
    if (yield (0, checkImage_1.checkImageInThumb)(fileName, width, height)) {
        return res.status(400).send("Image Resized before");
    }
    yield (0, checkImage_1.saveImage)(fileName, width, height);
    res.status(200).sendFile(`assets/thumb/${fileName}.jpg`);
}));
exports.default = imageRoute;
