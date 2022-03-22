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
exports.saveImage = exports.checkImageInThumb = exports.checkImageInFull = void 0;
const fs_1 = require("fs");
const image_size_1 = __importDefault(require("image-size"));
const sharp_1 = __importDefault(require("sharp"));
const checkImageInFull = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const image = `assets/full/${filename}.jpg`;
    try {
        yield fs_1.promises.access(image);
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.checkImageInFull = checkImageInFull;
const checkImageInThumb = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const image = `assets/thumb/${filename}.jpg`;
    try {
        const dimensions = (0, image_size_1.default)(image);
        if (dimensions.width == width && dimensions.height == height)
            return false;
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.checkImageInThumb = checkImageInThumb;
const saveImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sharp_1.default)(`assets/full/${filename}.jpg`)
        .resize(width, height)
        .toFile(`assets/thumb/${filename}.jpg`, (err, info) => { });
});
exports.saveImage = saveImage;
