import { IResponseObject } from "./response";

interface ImageControllerInterface {
    writeImage(): Promise<IResponseObject>
}

export default ImageControllerInterface;