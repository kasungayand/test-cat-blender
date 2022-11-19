import { AxiosRequestConfig } from "axios";
import * as HttpClientBase from "./httpClientBase";
export declare class ApiService extends HttpClientBase.HttpClient {
    constructor(baseUrl: string);
    private _initializeRequestInterceptor;
    private _handleRequest;
    _get: (url: string, queryParams?: AxiosRequestConfig<any>) => Promise<any>;
}
//# sourceMappingURL=index.d.ts.map