import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 抽取公用注册组件：按需引入element组件
import { globalRegister } from './globall';

// 全局引入element-plus
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

//
import './service/axios_demo.ts';
const app = createApp(App);
app.use(router);
app.use(store);
// app.use(ElementPlus);
// globalRegister(app);
app.use(globalRegister);
app.mount('#app');

console.log(process.env.VUE_APP_BASE_URL, 'BASE_URL');
console.log(process.env.VUE_APP_BASE_NAME, 'BASE_NAME');
