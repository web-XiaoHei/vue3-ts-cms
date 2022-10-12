import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 抽取公用注册组件：按需引入element组件
import { globalRegister } from './globall';
// import zkRequest from './service';
import 'normalize.css';
import './assets/css/index.less';
import { setupStore } from './store';

// 全局引入element-plus
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

// import './service/axios_demo.ts';
const app = createApp(App);
app.use(router);
app.use(store);
// app.use(ElementPlus);
// globalRegister(app);
app.use(globalRegister);
app.mount('#app');
setupStore();
// console.log(process.env.VUE_APP_BASE_URL, 'BASE_URL');
// console.log(process.env.VUE_APP_BASE_NAME, 'BASE_NAME');

// interface DataType {
//   data: any;
//   returnCode: string;
//   success: boolean;
// }
//
// zkRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     headers: {},
//     showloading: true,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的config');
//         if (config.headers) {
//           config.headers['token'] = '123';
//         }
//         return config;
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的response');
//         return res;
//       },
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//     console.log(res.returnCode);
//     console.log(res.success);
//   });
