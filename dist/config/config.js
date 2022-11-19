"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const environmentConfigs = process.env;
const getServer = () => {
    return {
        NODE_ENV: environmentConfigs.NODE_ENV || "local",
        PORT: environmentConfigs.SERVER_PORT || 3010,
        BASEURL: environmentConfigs.BASE_URL || "https://cataas.com/cat/says/",
    };
};
exports.default = {
    SERVER: getServer(),
};
