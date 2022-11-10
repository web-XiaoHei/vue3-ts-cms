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
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      :modelConfig="modelConfig"
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModel from '@/components/page-model';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';

import { usePageSearch } from '@/hooks/usePageSearch';

import { modelConfig } from './config/model.config';

// import yesUrl from '@/icons/svg/yes.svg';

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent, PageModel },
  setup() {
    const handleChangeSelct = (payload: any) => {
      console.log(payload);
    };

    const handleNewUser = () => {
      console.log('133');
    };

    const { handleResetClick, handleQueryClick, pageContentRef } =
      usePageSearch();

    const pageModelRef = ref<InstanceType<typeof PageModel>>();

    const defaultInfo = ref({});
    const handleNewData = () => {
      if (pageModelRef.value) {
        pageModelRef.value.dialogVisible = true;
      }
    };

    const handleEditData = (item: any) => {
      defaultInfo.value = { ...item };
      if (pageModelRef.value) {
        pageModelRef.value.dialogVisible = true;
      }
    };

    return {
      handleChangeSelct,
      handleNewUser,
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modelConfig,
      handleNewData,
      handleEditData,
      pageModelRef,
      defaultInfo,
    };
  },
});
</script>

<style scoped lang="less"></style>
