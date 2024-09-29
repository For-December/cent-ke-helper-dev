<script setup lang="ts">

import {computed, Ref, ref} from "vue";
import {webCreateComment} from "@/api/comments.ts";
import {ElMessage} from "element-plus";

const message = ref('')

const emits = defineEmits(['onSuccess'])

const props = defineProps(['postId'])

const postId: Ref<number> = computed(() => {
  return props.postId
})

const isCommentCreating = ref(false)
const onSubmitComment = () => {
  if (message.value === '') {
    ElMessage.error('评论不能为空')
    return
  }

  isCommentCreating.value = true
  console.log(postId.value)
  emits('onSuccess')
  webCreateComment(postId.value, message.value)
      .then(() => {
        ElMessage.warning('评论成功')
        message.value = ''
        emits('onSuccess')
      }).finally(() => {
    isCommentCreating.value = false
  })
  // message.value = ''
}


</script>

<template>
  <el-container>
    <el-main style="padding-bottom: 0;padding-top: 0">

      <n-form-item>
        <!--        :rule="{-->
        <!--        required: true,-->
        <!--        message: `评论不能为空`,-->
        <!--        trigger: ['input', 'blur'],-->
        <!--        }"-->
        <n-input v-model:value="message" clearable
                 placeholder="请输入评论内容"
        />
        <n-button style="margin-left: 12px"
                  type="warning"
                  :loading="isCommentCreating"
                  @click="onSubmitComment"
        >
          发布
        </n-button>
      </n-form-item>

    </el-main>
  </el-container>
</template>

<style scoped>

</style>