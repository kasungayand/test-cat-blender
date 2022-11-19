import { ImageProcessResponseType } from "../constraints/common";

interface ImageBuilderInterface {
    fetchImages(): Promise<this>
    writeImage(): Promise<ImageProcessResponseType>
}

export default ImageBuilderInterface;