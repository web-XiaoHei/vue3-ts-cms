<template>
  <div class="user">
    <page-search :formConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import pageSearch from '@/components/page-search';
import pageContent from '@/components/page-content';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';

export default defineComponent({
  name: 'users',
  components: { pageSearch, pageContent },
  setup() {
    const handleChangeSelct = (payload: any) => {
      console.log(payload);
    };

    const handleNewUser = () => {
      console.log('133');
    };

    return {
      handleChangeSelct,
      handleNewUser,
      searchFormConfig,
      contentTableConfig,
    };
  },
});
</script>

<style scoped lang="less"></style>
