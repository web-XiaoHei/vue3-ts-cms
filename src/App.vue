<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import 'element-plus/es/components/button/style/css';
// import { ElButton } from 'element-plus';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
