import { ImageProcessResponseType, ImageProcessType } from "../constraints/common";
import { ImageBuilderInterface } from "../interfaces";
import { ApiService } from "../services/api";
declare class ImageProcess {
    process: ImageProcessType;
}
export declare class ImageBuilder implements ImageBuilderInterface {
    process: ImageProcess;
    protected readonly apiService: ApiService;
    constructor();
    fetchImages(): Promise<this>;
    writeImage(): Promise<ImageProcessResponseType>;
}
export {};
//# sourceMappingURL=image.builder.d.ts.map