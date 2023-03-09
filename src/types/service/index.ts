/*
 * @LastEditTime: 2023-03-09 14:31:24
 * @Descripttion: 
 */
/**
 * @description: 定义消息响应实体对象的类型(TS常用使用接口定义对象的类型)
 */
interface resModel {
  code: number;
  message: string;
  data: any;
  // 当用 string去索引resModel时会得到 any 类型的返回值
  [propname: string]: any;
}
//请求http模型泛型接口
export interface requestModel {
  // <T>(data?: T) :函数定义的类型部分
  //Promise<resModel> :函数的返回值
  <T>(data?: T): Promise<resModel>;
}
