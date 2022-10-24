<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handle-reset-click="handleResetClick"
      @handle-query-click="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
    ></page-content>
    <div>
      <icon :data="yesUrl"></icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';

import { usePageSearch } from '@/hooks/usePageSearch';

import yesUrl from '@/icons/svg/yes.svg';

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent },
  setup() {
    const handleChangeSelct = (payload: any) => {
      console.log(payload);
    };

    const handleNewUser = () => {
      console.log('133');
    };

    const { handleResetClick, handleQueryClick, pageContentRef } =
      usePageSearch();
    return {
      handleChangeSelct,
      handleNewUser,
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      yesUrl,
    };
  },
});
</script>

<style scoped lang="less"></style>
