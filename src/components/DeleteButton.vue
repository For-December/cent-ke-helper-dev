<script setup lang="ts">

import {Delete, InfoFilled} from "@element-plus/icons-vue";

const emits = defineEmits(['onConfirm', 'onCancel'])

const onConfirm = ()=>{
  emits('onConfirm')
}

const onCancel = ()=>{
  emits('onCancel')
}
</script>

<template>
  <el-popconfirm
      confirm-button-text="Yes"
      cancel-button-text="No"
      :icon="InfoFilled"
      icon-color="#626AEF"
      title="确定删除?"
      @confirm="onConfirm"
      @cancel="onCancel"
  >
    <template #reference>
      <el-button :type="'warning'" :icon="Delete" size="default"
                 circle
      />
    </template>
  </el-popconfirm>

</template>

<style scoped>

</style>