<template>
  <div class="page-content">
    <zk-table
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1.头部的插槽 -->
      <template #headerHandler>
        <el-button
          type="primary"
          size="default"
          v-if="isCreate"
          @click="handleNewClick"
        >
          新建用户
        </el-button>
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
      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          size="small"
          type="primary"
          :icon="Edit"
          link
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="isDelete"
          size="small"
          type="primary"
          :icon="Delete"
          @click="handleDeleteClick(scope.row)"
          link
        >
          删除
        </el-button>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item?.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </zk-table>
    <!--
    <el-table :data="userList" border style="width: 100%">
        <template v-for="item in propList" :key="item.prop">
          <el-table-column v-bind="item" align="center" />
        </template>
      </el-table> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, watch } from 'vue';
import { Edit, Delete, RefreshRight } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import ZkTable from '@/base-ui/table';
import { usePermission } from '@/hooks/usePermission';

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
  emits: ['newBtnClick', 'editBtnClick'],
  components: { ZkTable },
  setup(props, { emit }) {
    // 0 获取用户权限
    const isCreate = usePermission(props.pageName, 'create');
    const isUpdate = usePermission(props.pageName, 'update');
    const isDelete = usePermission(props.pageName, 'delete');
    const isQuery = usePermission(props.pageName, 'query');

    // 1.双向数据绑定
    const pageInfo = ref({
      pageSize: 10,
      currentPage: 1,
    });
    watch(pageInfo, () => getPageData());
    const store = useStore();

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;

      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };
    getPageData();

    // const userList = computed(() => store.state.system.userList);

    // 3.从vuex中获取数据
    const dataList = computed(() => {
      return store.getters[`system/pageListData`](props.pageName);
    });
    const dataCount = computed(() => {
      return store.getters[`system/pageListCount`](props.pageName);
    });

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false;
        if (item.slotName === 'createAt') return false;
        if (item.slotName === 'updateAt') return false;
        if (item.slotName === 'handler') return false;

        return true;
      },
    );
    // 5.删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      console.log(item);
      store.dispatch('system/deletePageDateAction', {
        pageName: props.pageName,
        id: item.id,
      });
    };

    const handleNewClick = () => {
      emit('newBtnClick');
    };
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item);
    };
    return {
      Edit,
      Delete,
      RefreshRight,
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
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
