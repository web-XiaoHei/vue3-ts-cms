<template>
  <div class="user">
    <page-search :formConfig="formConfig"></page-search>
    <div class="content">
      <zk-table
        :listData="userList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
        @handle-change-selct="handleChangeSelct"
      >
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import pageSearch from '@/components/page-search';
import { formConfig } from './config/search.config';
import { useStore } from '@/store';
import ZkTable from '@/base-ui/table';
import { Edit, Delete } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'user',
  components: { pageSearch, ZkTable },
  setup() {
    const store = useStore();
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10,
      },
    });

    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '120' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt',
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt',
      },
      {
        label: '操作',
        minWidth: '120',
        slotName: 'handler',
      },
    ];

    const showIndexColumn = true;
    const showSelectColumn = true;

    const handleChangeSelct = (payload: any) => {
      console.log(payload);
    };
    return {
      formConfig,
      userList,
      userCount,
      propList,
      showIndexColumn,
      showSelectColumn,
      handleChangeSelct,
      Edit,
      Delete,
    };
  },
});
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
