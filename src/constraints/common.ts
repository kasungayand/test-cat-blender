export type ImageProcessType = {
    status: boolean,
    blends: object[],
    error?: object,
}

export type ImageProcessResponseType = {
    success: boolean,
    image: string
}

export type commandArgsType  = {
    greeting: string,
    who: string,
    width: number,
    height: number,
    color: string,
    size: number,
    filename: string,
}

export const ARRAYBUFFER = "arraybuffer";
export const BINARY = "binary";
export const JPEG = "jpeg";