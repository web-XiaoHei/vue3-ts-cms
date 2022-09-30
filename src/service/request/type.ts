import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ZKRequestIntercepertors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig<any>) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface ZKRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZKRequestIntercepertors<T>;
  showloading?: boolean;
}
