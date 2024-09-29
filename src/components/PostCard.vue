<script setup lang="ts">

import {getTimeGap} from "../utils/globalFunc.ts";
import {computed, onMounted, ref} from "vue";
import DeleteButton from "@/components/DeleteButton.vue";
import {PostMeta, PostRecord} from "@/types/treeHole.ts";

const emits = defineEmits(['clickDetails'])
const goPostDetail = (post: PostRecord) => {
  console.log(post)
  emits('clickDetails', post)
}

const item_t = ref<PostRecord>({
  authorId: 0, commentCount: 0, content: [], createdAt: new Date(), title: "", updatedAt: new Date(),
  id: 1,
  authorName: "芝士雪豹",
  latestRepliedAt: new Date("2021-10-10 10:10:10"),
  upvoteCount: 10,
  contentJson: JSON.stringify([
    {
      type: "text",
      text: "我是帖子的内容，没想到吧！！"
    },
    {
      type: "image",
      url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    },
    {
      type: "video",
      url: "https://www.runoob.com/try/demo_source/movie.mp4"
    }
  ])
})

const postItem = defineModel()

const item = computed(() => {
  return postItem.value
})
onMounted(() => {
  // console.log(postItem.value)
  // item.value = postItem.value
  // console.log(props.postItem)
  // console.log(item.value)
})


</script>

<template>
  <el-container class="mx-2 border-[#bc6c25]/10 border-b-2">
    <el-aside width="12vw" class="pt-[20px]">
      <!--              <Avatar style="width: 10vw;height: 10vw; margin: 0;border-radius: 50%"></Avatar>-->
      <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </el-aside>
    <el-main class="pt-0">
      <el-row>
        <el-col :span="18" @click="goPostDetail(item)">
          <div class="text-[5vw] text-amber-500">
            {{ item.authorName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="float-right">
            <DeleteButton/>
          </div>
        </el-col>
      </el-row>

      <!--              <p style="margin: 0;font-size: 15px">2 分钟前</p>-->
      <p class="text-[3vw] text-gray-500">
        {{ getTimeGap(new Date(), item.latestRepliedAt) }}
      </p>

      <div class="mt-1 mb-4" @click="goPostDetail(item)">
        <div v-for="meta in JSON.parse(item.contentJson) as PostMeta[]">
          <div v-if="meta.type==='image'">
            <van-image
                :src="meta.url"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20"/>
              </template>
              <template v-slot:error>图片加载失败</template>
            </van-image>
          </div>
          <div v-if="meta.type==='text'" class="text-[5vw]">
            {{ meta.text }}
          </div>

          <div v-if="meta.type==='video'">
            <video controls width="300" height="100">
              <source :src="meta.url" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>


        </div>
      </div>

      <van-row>
        <van-col span="6" style="text-align: left">

        </van-col>
        <van-col span="6" style="text-align: left">

        </van-col>
        <van-col span="6" style="text-align: center">
          <el-tag type="warning" size="large">
            点赞: {{ item.upvoteCount }}
          </el-tag>
        </van-col>
        <van-col span="6" style="text-align: right">
          <el-tag type="warning" size="large">
            评论: {{ item.commentCount }}
          </el-tag>
        </van-col>
      </van-row>
    </el-main>
  </el-container>
</template>

<style scoped>
:deep(.el-main) {
  padding-right: 0;
}
</style>