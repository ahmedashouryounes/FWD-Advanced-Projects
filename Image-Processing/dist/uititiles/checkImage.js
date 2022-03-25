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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const checkImageInFull = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const imageInFull = path_1.default.resolve('./') + `/assets/full/${filename}.jpg`;
    try {
        yield fs_1.promises.access(imageInFull);
        return true;
    }
    catch (_a) {
        return false;
    }
});
exports.checkImageInFull = checkImageInFull;
const checkImageInThumb = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const imageInThumb = path_1.default.resolve('./') + `/assets/thumb/${filename}.jpg`;
    try {
        yield fs_1.promises.access(imageInThumb);
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.checkImageInThumb = checkImageInThumb;
const saveImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const imageInFull = path_1.default.resolve('./') + `/assets/full/${filename}.jpg`;
    const imageInThumb = path_1.default.resolve('./') + `/assets/thumb/${filename}_${width}_${height}.jpg`;
    yield (0, sharp_1.default)(imageInFull).resize(width, height).toFile(imageInThumb);
    yield fs_1.promises.chmod(imageInThumb, 0o666);
    return imageInThumb;
});
exports.saveImage = saveImage;
