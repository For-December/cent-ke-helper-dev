<script setup lang="ts">
import {computed, ref} from 'vue';
import {ElMessage} from "element-plus";
import {PictureFilled, UserFilled} from "@element-plus/icons-vue";
import {UploaderFileListItem} from "vant/lib/uploader/types";
import {webCreatePost} from "@/api/posts.ts";
import {showWarningMsg} from "@/utils/globalFunc.ts";
import {PopoverAction} from "vant";
import {defaultAvatar, defaultUsername} from "@/api/globalConst.ts";

const emits = defineEmits(['onSuccess'])

const showImagePopover = ref(false);

const showUserPopover = ref(false);
const userImageError = ref(false);
const curUserIdx = ref(1);

const changeUserActions: PopoverAction[] = [
  {
    text: '选择身份👇',
    disabled: true
  },
  {
    text: defaultUsername,
    icon: defaultAvatar,
    color: '#1989fa'
  }
];
const curUserImgSrc = computed(() => {
  return changeUserActions[curUserIdx.value].icon
})
const onSelectUserImage = (action: PopoverAction, index: number) => {
  changeUserActions.forEach(t => t.disabled ? 1 : t.color = '#000000')
  action.color = '#1989fa'
  curUserIdx.value = index;

  userImageError.value = !changeUserActions[curUserIdx.value].icon;
  console.log(userImageError.value)
}

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

const onCreatePost = () => {
  isPostCreating.value = true;
  console.log(fileList.value)
  let files: File[] = fileList.value.map(t => t?.file!);

  if (postContext.value === '') {
    ElMessage.error('内容不能为空')
    isPostCreating.value = false
    return
  }

  webCreatePost({
    authorId: 1,
    authorName: "Jack",
    text: postContext.value,
    images: files,
    tags: "test"
  }).then(
      () => {
        showWarningMsg("发布成功")
        postContext.value = ''
        files.length = 0

        emits('onSuccess')
      }
  ).finally(() => {
    isPostCreating.value = false
  })
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

        <span class="mr-2">
                 <van-popover v-model:show="showUserPopover"
                              placement="bottom-start"
                              :actions="changeUserActions"
                              @select="onSelectUserImage">
          <template #reference>

            <el-button
                v-if="!userImageError"
                type="warning" circle>
               <el-avatar
                   size="small"
                   :src="curUserImgSrc"
               />
            </el-button>
            <el-button
                v-else
                type="warning"
                :icon="UserFilled" circle/>
          </template>
        </van-popover>
        </span>

        <span>
          <van-popover v-model:show="showImagePopover" placement="bottom-start">
          <div>
            <div class="p-1.5">
              请选择图片（最多五张）
            </div>
            <div class="pl-1.5">
              <!-- 上传组件 -->
              <van-uploader
                  v-model="fileList"
                  accept="image/*"
                  multiple
                  :max-count="5"
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
        </span>


        <el-button type="warning" style="float: right" :loading="isPostCreating"
                   @click="onCreatePost"
        >
          发布
        </el-button>
      </div>


    </el-main>
  </el-container>


</template>

<style scoped>

</style>