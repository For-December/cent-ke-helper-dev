<script setup lang="ts">
import {ref} from "vue";
import TreeHole from "@/view/TreeHole.vue";

const pageNum = ref(0)
</script>

<template>
  <n-tabs ref="tabsInstRef"
          type="segment"
          animated
          v-model:value="pageNum">
    <n-tab-pane :name="0" tab="树洞">
      <TreeHole/>

    </n-tab-pane>
    <n-tab-pane :name="1" tab="个人中心">


    </n-tab-pane>
    <n-tab-pane :name="2" tab="上传">

    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>

</style>