export type ImageProcessType = {
    status: boolean;
    blends: object[];
    error?: object;
};
export type ImageProcessResponseType = {
    success: boolean;
    image: string;
};
export type commandArgsType = {
    greeting: string;
    who: string;
    width: number;
    height: number;
    color: string;
    size: number;
    filename: string;
};
export declare const ARRAYBUFFER = "arraybuffer";
export declare const BINARY = "binary";
export declare const JPEG = "jpeg";
//# sourceMappingURL=common.d.ts.map