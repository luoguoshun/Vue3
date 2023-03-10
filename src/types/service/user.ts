/*
 * @LastEditTime: 2023-03-10 14:14:04
 * @Descripttion: 管理用户业务的公共类型
 */
/**
 * @description: 用户信息信息
 */
export interface role {
  userId: string;
  userName: string;
  sex: number;
  age: number;
  address: string;
  currentaddress: string;
  phone: string;
  headerSrc: string;
  noteSrc: string;
  description: string;
  createdTime: Date;
}
