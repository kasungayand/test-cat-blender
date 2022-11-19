"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const typedi_1 = __importDefault(require("typedi"));
const Image_controller_1 = require("./Image.controller");
exports.ImageModule = typedi_1.default.get(Image_controller_1.ImageController);
