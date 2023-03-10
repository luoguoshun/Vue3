/*
 * @LastEditTime: 2023-03-10 14:12:04
 * @Descripttion: 管理角色业务的公共类型
 */
/**
 * @description: 角色信息
 */
export interface role {
  roleId: string;
  roleName: string;
  description: string;
  createdTime: Date;
}
