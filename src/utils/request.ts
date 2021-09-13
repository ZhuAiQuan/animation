/*
 * @Description: 用抽象类和抽象方法来约束类 看来适合多复用的类里啊 axios 还是更适合用implements来约束
 * @Author: zaq
 * @Date: 2021-09-13 14:08:17
 * @LastEditTime: 2021-09-13 15:18:48
 * @LastEditors: zaq
 * @Reference: 
 */
import axios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';

const timeout = 10 * 1000;

interface Queue {
  [key: string]: boolean
}
interface Response {
  code: number;
  data: unknown;
  msg: string;
}

abstract class Request {
  baseUrl: string;
  queue: Queue;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.queue = {};
  };
  abstract getInsideConfig(): AxiosRequestConfig
  abstract destroy(url: string): void
  abstract interceptors(instance: AxiosInstance, url: string): void
  abstract request(req: AxiosRequestConfig): AxiosPromise<Response>
}

export default class HttpRequest extends Request {
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  getInsideConfig() {
    return {
      baseUrl: this.baseUrl,
      timeout,
      headers: {
        //
      }
    }
  }
  destroy(url: string) {
    delete this.queue[url]
  }
  interceptors(instance: AxiosInstance, url: string) {
    instance.interceptors.request.use(
      data => {
        this.queue[url] = true;
        // 拦截器处理 添加header token之类的操作，拦截重复请求等 自行完善
        return data
      },
      error => {
        // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        return res
      },
      error => {}
    );
  }
  request(data: AxiosRequestConfig) {
    const instance = axios.create();
    const options = Object.assign(this.getInsideConfig(), data);
    /**
     * 由于内置的AxiosRequestConfig url参数为可选导致该项可能为undefined 所以强制断言成字符串
     * 如无需传api接口 请把拦截器里入参改为联合类型
     */
    this.interceptors(instance, (data.url as string));
    return instance(options)
  }
}

/**
 * 使用implements来声明类
 */
interface AxiosImplements {
  getInsideConfig(): AxiosRequestConfig
  destroy(url: string): void
  interceptors(instance: AxiosInstance, url: string): void
  request(req: AxiosRequestConfig): AxiosPromise<Response>
}

class AxiosRequest implements AxiosImplements {
  private baseUrl: string
  private queue: Queue
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.queue = {}
  }
  getInsideConfig() {
    return {
      baseUrl: this.baseUrl,
      timeout,
      headers: {
        //
      }
    }
  }
  destroy(url: string) {
    delete this.queue[url]
  }
  interceptors(instance: AxiosInstance, url: string) {
    instance.interceptors.request.use(
      data => {
        this.queue[url] = true;
        // 拦截器处理 添加header token之类的操作，拦截重复请求等 自行完善
        return data
      },
      error => {
        // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        return res
      },
      error => {}
    );
  }
  request(data: AxiosRequestConfig) {
    const instance = axios.create();
    const options = Object.assign(this.getInsideConfig(), data);
    /**
     * 由于内置的AxiosRequestConfig url参数为可选导致该项可能为undefined 所以强制断言成字符串
     * 如无需传api接口 请把拦截器里入参改为联合类型
     */
    this.interceptors(instance, (data.url as string));
    return instance(options)
  }
}