<template>
  <div class="content">
    <page-search :formConfig="formConfig"></page-search>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageSearch from '@/components/page-search';
import { formConfig } from './config/search.config';
export default defineComponent({
  components: { pageSearch },
  name: 'user',
  setup() {
    return { formConfig };
  },
});
</script>

<style scoped lang="less"></style>
