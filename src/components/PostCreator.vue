<script setup lang="ts">
import {ref} from 'vue';
import {ElMessage} from "element-plus";
import {PictureFilled} from "@element-plus/icons-vue";
import {UploaderFileListItem} from "vant/lib/uploader/types";

const showPopover = ref(false);
const postContext = ref("");


const isPostCreating = ref(false)



// 文件相关
const fileList = ref<UploaderFileListItem[]>([])

const onBeforeRead = (file: File | File[]): boolean => {
  if (file instanceof File) {
    if (!file.type.includes('image')) {
      ElMessage.warning('这里只能上传图片嗷');
      return false
    }
  } else {
    // The some method returns true
    // if at least one element in the array
    // satisfies the provided testing function.
    if (file.some(f => f.type.includes('image'))) {
      return false;
    }
    // 相当于下面
    // for (let i = 0; i < file.length; i++) {
    //   if (file[i].type.includes('image')) {
    //     return false
    //   }
    // }
  }
  return true
}

const onAfterRead = (items: UploaderFileListItem | UploaderFileListItem[]) => {
  let fileListItem = items as UploaderFileListItem
  let file: File = fileListItem?.file!
  console.log(file)
  ElMessage.warning('图片添加成功！')

};

const onBeforeDelete = (file: any): boolean => {
  console.log(file)
  ElMessage.warning('删除成功！')
  return true
}

</script>

<template>
  <el-container class="p-1.5">
    <!--    <el-aside>-->
    <!--    </el-aside>-->
    <el-main class="border-[#bc6c25] border-b-2">
      <van-field
          v-model="postContext"
          rows="1"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入帖子内容"
          show-word-limit
      />
      <div class="pt-2">

        <van-popover v-model:show="showPopover" placement="bottom-start">
          <div>
            <div class="p-1.5">
              请选择图片
            </div>
            <div class="pl-1.5">
              <!-- 上传组件 -->
              <van-uploader
                  v-model="fileList"
                  accept="image/*"
                  multiple
                  :before-read="onBeforeRead"
                  :after-read="onAfterRead"
                  :before-delete="onBeforeDelete"
              />
            </div>

          </div>


          <!-- 预览图展示 -->
          <!--    <van-image-->
          <!--        v-for="(item, index) in fileList"-->
          <!--        :key="index"-->
          <!--        :src="item.url"-->
          <!--        :preview-src-list="fileList.map(file => file.url)"-->
          <!--        @click="onPreviewClick(index)"-->
          <!--    />-->
          <!--    <van-uploader v-model="fileList" multiple />-->

          <template #reference>
            <el-button type="warning" :icon="PictureFilled" circle/>
          </template>
        </van-popover>


        <el-button type="warning" style="float: right" :loading="isPostCreating">
          发布
        </el-button>
      </div>


    </el-main>
  </el-container>


</template>

<style scoped>

</style>