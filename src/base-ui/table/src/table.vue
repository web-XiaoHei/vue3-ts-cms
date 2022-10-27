<template>
  <div class="zk-tabel">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="80"
        label="序号"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    listData: {
      type: Array,
      required: true,
    },
    listCount: {
      type: Number,
      defalt: 0,
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default: () => ({ pageSize: 10, currentPage: 1 }),
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['handleChangeSelct', 'update:page'],
  setup(props, { emit }) {
    const handleSelectChange = (value: any) => {
      console.log(value);
      emit('handleChangeSelct', value);
    };

    const handleSizeChange = (pageSize: number) => {
      console.log(pageSize, 'pageSize');

      emit('update:page', { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage });
    };
    return { handleSelectChange, handleSizeChange, handleCurrentChange };
  },
});
</script>

<style scoped lang="less">
.zk-tabel {
  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>
