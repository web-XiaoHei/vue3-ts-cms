<template>
  <div class="zk-tabel">
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
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
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true,
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
  },
  emits: ['handleChangeSelct'],
  setup(props, { emit }) {
    const handleSelectChange = (value: any) => {
      console.log(value);
      emit('handleChangeSelct', value);
    };
    return { handleSelectChange };
  },
});
</script>

<style scoped></style>
