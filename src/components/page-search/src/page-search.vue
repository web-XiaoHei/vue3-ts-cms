<template>
  <div class="page-search">
    <div class="user">
      <!-- <zk-form
      :form-items="formItems"
      :label-width="labelWidth"
      :col-layout="colLayout"
      :item-style="itemStyle"
    /> -->
      <zk-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button type="primary" :icon="Search" @click="handleQueryClick">
              搜索
            </el-button>
            <el-button
              type="primary"
              :icon="RefreshRight"
              @click="handleResetClick"
            >
              重置
            </el-button>
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
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ['handleResetClick', 'handleQueryClick'],
  components: { ZkForm },
  setup(props, { emit }) {
    // 双向数据绑定的属性应该是由配置文件的field来决定
    // 1.优化一：formDate中的属性应该动态来决定
    const formItems = props.searchFormConfig.formItems ?? [];

    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = '';
    }

    const formData = ref(formOriginData);
    // 2.优化二：重置按钮
    const handleResetClick = () => {
      // console.log('重置按钮');
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key];
      }
      emit('handleResetClick');
    };
    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      // console.log('搜索按钮');
      emit('handleQueryClick', formData.value);
    };
    return {
      formData,
      Search,
      RefreshRight,
      handleResetClick,
      handleQueryClick,
    };
  },
});
</script>

<style scoped>
.handle-btns {
  padding: 0 50px 20px 0;
  text-align: right;
}
</style>
