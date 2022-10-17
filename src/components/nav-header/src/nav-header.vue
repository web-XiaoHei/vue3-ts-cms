<template>
  <div class="nav-header">
    <el-icon :size="30">
      <component
        class="icons"
        :is="isFold ? 'Fold' : 'Expand'"
        @click="handleFoldClick"
      ></component>
    </el-icon>
    <div class="content">
      <zk-Breadcrumb :breadcrumbs="breadcrumbs"></zk-Breadcrumb>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import UserInfo from './user-info.vue';
import zkBreadcrumb from '@/base-ui/breadcrumb';
import { pathMapBreadcrumbs } from '@/utils/map-menus';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { UserInfo, zkBreadcrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(true);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };

    // 面包屑的数据
    const store = useStore();
    const route = useRoute();
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const currentPath = route.path;

      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    console.log(breadcrumbs.value);

    return { isFold, handleFoldClick, breadcrumbs };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
