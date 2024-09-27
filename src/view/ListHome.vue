<script setup lang="ts">

import HelperPage from "@/view/HelperPage.vue";
</script>

<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider
          collapse-mode="transform"
          :collapsed-width="120"
          :width="400"
          :show-collapsed-content="false"
          show-trigger="arrow-circle"
          content-style="padding: 24px;"
          bordered
      >
        <HelperPage/>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<style scoped>

</style>