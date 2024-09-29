<script setup lang="ts">

const message = ref('')
</script>

<template>
  <el-container>
    <el-main style="padding-bottom: 0;padding-top: 0">

      <n-form-item
          :rule="{
        required: true,
        message: `评论不能为空`,
        trigger: ['input', 'blur'],
        }"
      >
        <n-input v-model:value="message" clearable
                 placeholder="请输入评论内容"
        />
        <n-button style="margin-left: 12px" type="warning">
          发布
        </n-button>
      </n-form-item>

    </el-main>
  </el-container>
</template>

<style scoped>

</style>