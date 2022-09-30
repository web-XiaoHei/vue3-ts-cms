import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { ElLoading } from 'element-plus';
import type { ZKRequestIntercepertors, ZKRequestConfig } from './type';
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

const DEAFULT_LOADING = true;

class ZKRequest {
  instance: AxiosInstance;
  interceptors?: ZKRequestIntercepertors;
  loading?: LoadingInstance;
  showLoading: boolean;

  constructor(config: ZKRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.showLoading = config.showloading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求成功拦截');

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据。。。。',
            background: 'rgba(0, 0, 0, 0.7)',
          });
        }
        return config;
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败拦截');
        return err;
      },
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应成功拦截');

        // 将loading移除
        setTimeout(() => {
          this.loading?.close();
        }, 2000);

        const data = res.data;
        if (data.returnCode === '-1001') {
          console.log('请求失败');
        } else {
          return res.data;
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败拦截');
        // 将loading移除
        this.loading?.close();

        if (err.response.status === 404) {
          console.log('404的错误~');
        }
        return err;
      },
    );
  }

  request<T>(config: ZKRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对数据的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 2.判断是否需要显示loading
      if (config.showloading === false) {
        this.showLoading = config.showloading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置true，这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置true，这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: ZKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: ZKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: ZKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T>(config: ZKRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default ZKRequest;
