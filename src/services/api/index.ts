/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service } from "typedi";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import * as HttpClientBase from "./httpClientBase";

@Service()
export class ApiService extends HttpClientBase.HttpClient {
  
  public constructor(baseUrl: string) {
    super(baseUrl);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    const headers: AxiosRequestHeaders = {
    };
    config.headers = headers;
    
    return config;
  };

  public _get = async (url: string, queryParams?: AxiosRequestConfig<any>) : Promise<any> => {
    return this.instance.get(url,{...queryParams}).then(this._responseBody);
  };
}