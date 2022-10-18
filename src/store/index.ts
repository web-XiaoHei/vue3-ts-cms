import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, IStoreType } from './types';
import login from './login/login';
import system from './main/system/system';
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy',
      age: 18,
    };
  },
  modules: { login, system },
});

export function setupStore() {
  //防止用户刷新页面导致vuex保存的东西会从内存中消失掉
  store.dispatch('login/loadLocalLogin');
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
