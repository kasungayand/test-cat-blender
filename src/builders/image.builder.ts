/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Service } from "typedi";
import minimist from "minimist";
import { writeFile } from "fs";
import { join } from "path";
import { Buffer } from "buffer";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const blend = require("@mapbox/blend");
import { ImageProcessResponseType, ImageProcessType, commandArgsType, ARRAYBUFFER, BINARY, JPEG } from "../constraints/common";
import { ImageBuilderInterface } from "../interfaces";
import { ApiService } from "../services/api";
import * as configurations from "../config";

const BASEURL = configurations.config.SERVER.BASEURL;
const argv:any = minimist(process.argv.slice(2)); //minimist.ParsedArgs
const {greeting = "Hello", who = "Kasun", width = 400, height = 500, color = "Pink", size = 100, filename = "cat-card"}:commandArgsType = argv;

class ImageProcess {
  process: ImageProcessType = {
    status: false,
    blends: [],
  };
}

@Service()
export class ImageBuilder implements ImageBuilderInterface {
  process: ImageProcess;
  protected readonly apiService: ApiService;
  constructor() {
    this.process = new ImageProcess();
    this.apiService = new ApiService(BASEURL);
  }

  async fetchImages(): Promise<this> {
    const greetingUrl = `${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`;

    const promises = [];
    promises.push(this.apiService._get(greetingUrl,{responseType: ARRAYBUFFER}));
    for(const name of who.split(",")){
      const url = `${name}?width=${width}&height=${height}&color=${color}&s=${size}`;
      promises.push(this.apiService._get(url,{responseType: ARRAYBUFFER}));
    }

    return await Promise.all(promises).then((responses) => {
      this.process.process.status = true;
      for(let i=0; i<promises.length; i++){
        this.process.process.blends.push({ buffer: Buffer.from(responses[i], BINARY), x: width*i, y:0 });
      }
      return this;
    }).catch((err:any) =>{
      this.process.process = {
        status:false,
        error:err,
        blends:[],
      };
      return this;
    });
  }

  async writeImage(): Promise<ImageProcessResponseType> {   
    return new Promise((resolve, reject) => {
      if(this.process.process.blends.length==0)
        resolve({
          success: false,
          image: "No response from server",
        });

      const fileOut:string = join(process.cwd(), `/${filename}.${JPEG}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      blend(this.process.process.blends, 
        { width: width * this.process.process.blends.length, height: height, format: JPEG}, 
        (err:any, data:string|Buffer) => {
          if(err)
            reject(err);

          if(typeof data === "undefined")
            resolve({
              success: false,
              image: "Blend failed",
            });
            
          writeFile(fileOut, data, BINARY, (err) => { 
            if(err) {
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
  }
}