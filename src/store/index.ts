import { createStore } from 'vuex';
import { IRootState } from './types';
import login from './login/login';
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy',
      age: 18,
    };
  },
  modules: { login },
});

export function setupStore() {
  //防止用户刷新页面导致vuex保存的东西会从内存中消失掉
  store.dispatch('login/loadLocalLogin');
}
export default store;
