<template>
  <div>
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :hide-on-click-modal="hideOnClickModal"
          preview-teleported
          :initial-index="4"
          fit="cover"
          @load="gotAllPicture(scope.row.imgUrl)"
        ></el-image>
      </template>
      <template #oldPrice="scope">{{ '¥ ' + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue';
import pageContent from '@/components/page-content';
import { contentTableConfig } from './config/content.config';
export default defineComponent({
  components: {
    pageContent,
  },
  setup() {
    const hideOnClickModal = ref(true);

    const pictureList = ref<any>([]);

    const gotAllPicture = (scope: any) => {
      pictureList.value.push(toRaw(scope));
    };

    return {
      pictureList,
      hideOnClickModal,
      contentTableConfig,
      gotAllPicture,
    };
  },
});
</script>

<style scoped></style>
