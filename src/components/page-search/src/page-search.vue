<template>
  <div class="page-search">
    <div class="user">
      <!-- <zk-form
      :form-items="formItems"
      :label-width="labelWidth"
      :col-layout="colLayout"
      :item-style="itemStyle"
    /> -->
      <zk-form v-bind="formConfig" v-model="formData">
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button type="primary" :icon="Search">搜索</el-button>
            <el-button type="primary" :icon="RefreshRight">重置</el-button>
          </div>
        </template>
      </zk-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ZkForm from '@/base-ui/form';

import { Search, RefreshRight } from '@element-plus/icons-vue';

export default defineComponent({
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
  },
  components: { ZkForm },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: '',
    });
    return { formData, Search, RefreshRight };
  },
});
</script>

<style scoped>
.handle-btns {
  padding: 0 50px 20px 0;
  text-align: right;
}
</style>
