"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ImageBuilder = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const typedi_1 = require("typedi");
const minimist_1 = __importDefault(require("minimist"));
const fs_1 = require("fs");
const path_1 = require("path");
const buffer_1 = require("buffer");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blend = require("@mapbox/blend");
const common_1 = require("../constraints/common");
const api_1 = require("../services/api");
const configurations = __importStar(require("../config"));
const BASEURL = configurations.config.SERVER.BASEURL;
const argv = (0, minimist_1.default)(process.argv.slice(2)); //minimist.ParsedArgs
const { greeting = "Hello", who = "Kasun", width = 400, height = 500, color = "Pink", size = 100, filename = "cat-card" } = argv;
class ImageProcess {
    constructor() {
        this.process = {
            status: false,
            blends: [],
        };
    }
}
let ImageBuilder = class ImageBuilder {
    constructor() {
        this.process = new ImageProcess();
        this.apiService = new api_1.ApiService(BASEURL);
    }
    fetchImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const greetingUrl = `${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`;
            const promises = [];
            promises.push(this.apiService._get(greetingUrl, { responseType: common_1.ARRAYBUFFER }));
            for (const name of who.split(",")) {
                const url = `${name}?width=${width}&height=${height}&color=${color}&s=${size}`;
                promises.push(this.apiService._get(url, { responseType: common_1.ARRAYBUFFER }));
            }
            return yield Promise.all(promises).then((responses) => {
                this.process.process.status = true;
                for (let i = 0; i < promises.length; i++) {
                    this.process.process.blends.push({ buffer: buffer_1.Buffer.from(responses[i], common_1.BINARY), x: width * i, y: 0 });
                }
                return this;
            }).catch((err) => {
                this.process.process = {
                    status: false,
                    error: err,
                    blends: [],
                };
                return this;
            });
        });
    }
    writeImage() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.process.process.blends.length == 0)
                    resolve({
                        success: false,
                        image: "No response from server",
                    });
                const fileOut = (0, path_1.join)(process.cwd(), `/${filename}.${common_1.JPEG}`);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                blend(this.process.process.blends, { width: width * this.process.process.blends.length, height: height, format: common_1.JPEG }, (err, data) => {
                    if (err)
                        reject(err);
                    if (typeof data === "undefined")
                        resolve({
                            success: false,
                            image: "Blend failed",
                        });
                    (0, fs_1.writeFile)(fileOut, data, common_1.BINARY, (err) => {
                        if (err) {
                            reject(err);
                        }
                        console.log("The file was saved!");
                        resolve({
                            success: true,
                            image: fileOut,
                        });
                    });
                });
            });
        });
    }
};
ImageBuilder = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ImageBuilder);
exports.ImageBuilder = ImageBuilder;
