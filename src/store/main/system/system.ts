import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import { ISystemState } from './types';
import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
    };
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data;

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);

      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },
  },
};

export default systemModule;
