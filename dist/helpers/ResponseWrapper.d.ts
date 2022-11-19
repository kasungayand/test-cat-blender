import { Response } from "express";
import { IResponseObject } from "../interfaces/response";
export declare class ResponseWrapper {
    res: Response;
    constructor(response: Response);
    private handle;
    created(response: IResponseObject): Response;
    ok(response: IResponseObject): Response;
    unauthorized(response: IResponseObject): Response;
    forbidden(response: IResponseObject): Response;
    notAllowed(response: IResponseObject): Response;
    error(response: IResponseObject): Response;
}
//# sourceMappingURL=ResponseWrapper.d.ts.map