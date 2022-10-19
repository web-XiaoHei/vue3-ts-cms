<template>
  <div class="page-content">
    <zk-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1.头部的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
        <el-button :icon="RefreshRight">刷新</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable === 1 ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <el-button size="small" type="primary" :icon="Edit" link>
          编辑
        </el-button>
        <el-button size="small" type="primary" :icon="Delete" link>
          删除
        </el-button>
      </template>
    </zk-table>

    <!-- <el-table :data="userList" border style="width: 100%">
        <template v-for="item in propList" :key="item.prop">
          <el-table-column v-bind="item" align="center" />
        </template>
      </el-table> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { Edit, Delete, RefreshRight } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import ZkTable from '@/base-ui/table';

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object as PropType<any>,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  components: { ZkTable },
  setup(props) {
    const store = useStore();

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // console.log({ ...queryInfo.value }, 'queryInfo');

      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo,
        },
      });
    };
    getPageData();

    // const userList = computed(() => store.state.system.userList);
    // const userCount = computed(() => store.state.system.userCount);

    // 从vuex中获取数据
    const dataList = computed(() => {
      return store.getters[`system/pageListData`](props.pageName);
    });

    return {
      Edit,
      Delete,
      RefreshRight,
      dataList,
      getPageData,
    };
  },
});
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
