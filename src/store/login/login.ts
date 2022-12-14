import { Module } from 'vuex';
import { ILoginState } from './types';
import { IRootState } from '../types';
import {
  accoutLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from '@/service/login/login';
import { IAccount } from '@/service/login/type';
import localCache from '@/utils/cache';
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus';
import router from '@/router';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // userMenus映射到=>routes

      const routes = mapMenusToRoutes(userMenus);
      // 将routes => router.main.children
      routes.forEach((route) => router.addRoute('main', route));

      // 获取用户按钮的权限
      const permission = mapMenusToPermissions(userMenus);
      state.permission = permission;
    },
  },
  actions: {
    async accoutLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accoutLoginRequest(payload);
      console.log(loginResult);
      const { id, token } = loginResult.data;
      console.log(id);

      commit('changeToken', token);
      localCache.setCache('token', token);
      // 2.获取用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      userMenusResult.data.forEach((item: any) => {
        item.icon = item.icon.split('-')[2];
      });
      const userMenus = userMenusResult.data;
      // console.log(userMenus);
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      // 4.跳转到首页
      router.push('/main');
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
      }
      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    },
  },
};

export default loginModule;
