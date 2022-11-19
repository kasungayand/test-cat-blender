import { BaseController } from "./base.controller";
import { Service } from "typedi";
import { ImageControllerInterface } from "../interfaces";
import { IResponseObject } from "../interfaces/response";
import { ImageBuilder } from "../builders/image.builder";

@Service()
export class ImageController extends BaseController implements ImageControllerInterface {
  constructor() {
    super();
  }

  async writeImage(): Promise<IResponseObject> {
    try{
      const imageBuilder = new ImageBuilder();
      const buildRes:IResponseObject = await (await imageBuilder.fetchImages()).writeImage();
      return buildRes;
    }catch(error:any){
      return {
        success: false,
        error:error,
      };
    }
  }
}