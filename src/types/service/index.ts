/**
 * @description: 定义消息响应实体对象的类型(TS常用使用接口定义对象的类型)
 */
interface resModel {
  code: number;
  message: string;
  data: any;
  [propname: string]: any;
}
interface queryModel {
  id?: any;//可选
  conditions: string;
  page: number;
  size: number;
}

export interface requestModel {
  <T>(data?: T): Promise<resModel>;
}
