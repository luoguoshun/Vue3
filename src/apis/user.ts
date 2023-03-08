/*
 * @LastEditTime: 2023-03-08 09:49:04
 * @Descripttion: 用户操作接口
 */
import request from '@/utils/request';
import { requestModel } from '@/types/service';

// 获取用户信息
//注意：箭头一是Typescript的,箭头二是ES6的
// TypeScript 的函数类型是以 () => void 这样的形式来写的：左侧圆括号是函数的入参类型，如果没有参数，就只有一个圆括号，如果有参数，就按照参数的类型写进去；右侧则是函数的返回值。
//1.const getUserInfo: (userId: string) => Promise<any> 定义了函数的名称和类型
//2.= (userId: string) 定义了函数的入参和类型
//3.: Promise<any> => request.get('/api/users') 这里是函数的返回值和类型
export const getUserInfo: (userId: string) => Promise<requestModel> = (userId: string): Promise<requestModel> =>
  request.get<requestModel>(`/api/users?userId=${userId}`);

export function getUserInfo1(userId: string): Promise<requestModel> {
  return request.get<requestModel>(`/api/users?userId=${userId}`);
}

// 退出登录
export function logout(userId: string, password: string): Promise<any> {
  return request.post<requestModel>('/api/logout', {
    userId: userId,
    password: password,
  });
}
