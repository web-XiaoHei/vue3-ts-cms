<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" v-model="currentTab" stretch>
      <el-tab-pane label="User" name="account">
        <template #label>
          <span>
            <el-icon><User /></el-icon>
            账号登录
          </span>
        </template>
        <login-acount ref="accountRef"></login-acount>
      </el-tab-pane>
      <el-tab-pane label="User" name="phone">
        <template #label>
          <span>
            <el-icon><Cellphone /></el-icon>
            手机登录
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import loginAcount from './login-acount.vue';
import loginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    loginAcount,
    loginPhone,
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof loginAcount>>();
    const phoneRef = ref<InstanceType<typeof loginPhone>>();
    const currentTab = ref('account');

    // 2.定义方法
    const handleLoginClick = () => {
      console.log('立即登录');
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        console.log('手机登录的逻辑');
      }
    };
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }

  .el-icon {
    vertical-align: middle;
  }
}
</style>
