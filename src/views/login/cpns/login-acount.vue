<template>
  <div class="login-acount">
    <el-form
      label-width="auto"
      label-position="left"
      :rules="rules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../config/account-config';
import { ElForm } from 'element-plus';
import localCache from '@/utils/cache';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? '',
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('真正执行登录逻辑');
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name);
            localCache.setCache('password', account.password);
          } else {
            localCache.removeCache('name');
            localCache.removeCache('password');
          }
          // 2.开始进行登录验证
          store.dispatch('login/accoutLoginAction', { ...account });
        }
      });
    };
    return { account, rules, formRef, loginAction };
  },
});
</script>

<style scoped></style>
