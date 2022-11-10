<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <span>
        <zk-form v-bind="modelConfig" v-model="formData"></zk-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import zkForm from '@/base-ui/form';

export default defineComponent({
  components: { zkForm },
  props: {
    modelConfig: {
      type: Object,
      requireds: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const dialogVisible = ref(false);
    const formData = ref({});

    return { dialogVisible, formData };
  },
});
</script>

<style scoped></style>
