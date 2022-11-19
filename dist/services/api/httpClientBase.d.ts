import { AxiosInstance, AxiosResponse } from "axios";
declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> {
    }
}
export declare abstract class HttpClient {
    protected readonly instance: AxiosInstance;
    constructor(baseURL: string);
    private _initializeResponseInterceptor;
    private _handleResponse;
    protected _responseBody: ({ data }: AxiosResponse) => any;
    protected _handleError: (error: any) => Promise<never>;
}
//# sourceMappingURL=httpClientBase.d.ts.map