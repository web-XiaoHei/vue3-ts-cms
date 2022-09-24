import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 抽取公用注册组件：按需引入element组件
import { globalRegister } from './globall';

// 全局引入element-plus
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(ElementPlus);
// globalRegister(app);
app.use(globalRegister);
app.mount('#app');
