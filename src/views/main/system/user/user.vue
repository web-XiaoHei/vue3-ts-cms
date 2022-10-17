<template>
  <div class="user">
    <!-- <zk-form
      :form-items="formItems"
      :label-width="labelWidth"
      :col-layout="colLayout"
      :item-style="itemStyle"
    /> -->
    <zk-form v-bind="formConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ZkForm from '@/base-ui/form';
import { formConfig } from './config/search.config';
export default defineComponent({
  components: { ZkForm },
  name: 'user',
  setup() {
    // const formItems: IFormItem[] = [
    //   {
    //     type: 'input',
    //     label: '用户名',
    //     placeholder: '请输入用户名',
    //   },
    //   {
    //     type: 'password',
    //     label: '密码',
    //     placeholder: '请输入密码',
    //   },
    //   {
    //     type: 'select',
    //     label: '喜欢的运动',
    //     placeholder: '请选择喜欢的运动',
    //     options: [
    //       { title: '篮球', value: 'baseketball' },
    //       { title: '足球', value: 'football' },
    //     ],
    //   },
    //   {
    //     type: 'datepicker',
    //     label: '创建时间',
    //     otherOptions: {
    //       startPlaceholder: '开始时间',
    //       endPlaceholder: '结束时间',
    //       type: 'datarange',
    //     },
    //   },
    // ];

    // const labelWidth = '120px';
    // // const colLayout = { span: 8 };
    // const colLayout = {
    //   xl: 6, // >1920px 4个
    //   lg: 8,
    //   md: 12,
    //   sm: 24,
    //   xs: 24,
    // };
    // const itemStyle = { padding: '10px 40px' };
    return { formConfig };
  },
});
</script>

<style scoped></style>
