/*
 * @LastEditTime: 2023-03-08 15:09:11
 * @Descripttion: d.ts 文件是 TypeScript 用来声明变量、模块、type、interface 等等的。
 * 在 .d.ts 文件中声明变量或者模块后，在其他地方可以不用 import 导入就能直接使用，并且还有语法提示
 */
import axios from 'axios';
declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}
