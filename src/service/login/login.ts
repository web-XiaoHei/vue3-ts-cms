import zkRequest from '../index';
import { IAccount, ILoginResult } from './type';
import { IDataType } from '../types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //用法：/users/id
  UserMenus = '/role/', //用法：role/id/menu
}
export function accoutLoginRequest(account: IAccount) {
  return zkRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return zkRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showloading: false,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return zkRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showloading: false,
  });
}
