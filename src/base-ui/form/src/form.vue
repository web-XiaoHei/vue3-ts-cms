<template>
  <div class="zk-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import type { IFormItem } from '../index';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      // default: () => {},
      required: true,
    },
    labelWidth: {
      type: String,
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 拷贝一份数据，只是取到值
    const formData = ref({ ...props.modelValue });
    watch(
      formData,
      (newValue) => {
        // console.log(newValue);
        emit('update:modelValue', newValue);
      },
      { deep: true },
    );
    return { formData };
  },
});
</script>

<style scoped lang="less">
.zk-form {
  padding-top: 22px;
}
</style>
