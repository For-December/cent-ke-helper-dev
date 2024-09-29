<script setup lang="ts">

import {getTimeGap} from "@/utils/globalFunc.ts";
import {computed, ref, Ref} from "vue";
import {PostMeta, PostRecord} from "@/types/treeHole.ts";
import {Icon} from "@vicons/utils";
import HeartOutline from "@vicons/ionicons5/HeartOutline"
import Heart from "@vicons/ionicons5/Heart"
import {useUserStore} from "@/store/modules/userStore.ts";
import {Comment} from "@element-plus/icons-vue";

const postItem = defineModel()
const item: Ref<PostRecord> = computed(() => {
  return postItem.value
})

const userStore = useUserStore()
const starManager = (() => {
  const starTimer = ref(null);

  const onStar = () => {

    // 已经点赞，取消点赞
    if (userStore.checkIfUpvote(item.value.id)) {
      userStore.cancelUpvote(item.value.id)
      item.value.upvoteCount--;
    } else {
      // 未点赞，点赞
      userStore.upvote(item.value.id)
      item.value.upvoteCount++;
    }

    // 重置计时器
    clearTimeout(starTimer.value)
    // 在1秒后执行异步API调用
    starTimer.value = setTimeout(() => {
      console.log("发起点赞请求")
      console.log(userStore.userUpvoteList)
      // postStar(id, curUserId.value, curUser.value, isStar.value).then((status) => {
      //   console.log(status)
      // })
    }, 1000);
  }
  return {
    onStar
  }
})
()

</script>

<template>
  <div>


    <!--    头部用户部分-->
    <el-row>
      <el-col :span="4">
        <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </el-col>
      <el-col :span="20">
        {{ item.authorName }}<br/>
        {{ getTimeGap(new Date(), new Date(item.latestRepliedAt)) }}
      </el-col>
    </el-row>

    <!--    帖子内容的部分-->
    <div style="margin: 5vw">
      <div v-for="meta in JSON.parse(item.contentJson) as PostMeta[]">
        <div v-if="meta.type==='image'" @click="onClickImage(meta.url)">
          <van-image
              :src="meta.url"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
            </template>
            <template v-slot:error>图片加载失败</template>
          </van-image>
          <br/>
          <br/>
        </div>
        <div v-if="meta.type==='text'">
          {{ meta.text }}
          <br/>
          <br/>
        </div>
        <div v-if="meta.type==='video'">
          <video controls width="300" height="100">
            <source :src="meta.url" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>

      </div>

    </div>
    <p></p>
    <van-row style="margin: 5vw;">

      <van-col span="16"></van-col>

      <van-col span="4">
          <Icon @click="starManager.onStar()" size="6vw">
            <HeartOutline v-if="!userStore.checkIfUpvote(item.id)"/>
            <Heart v-else style="color: red"/>
          </Icon>
          {{ item.upvoteCount }}
      </van-col>

      <van-col span="4" class="text-right text-1xl">
        <Icon size="6vw" color="#bc6c25">
          <Comment/>
        </Icon>
        {{ item.commentCount }}
      </van-col>
    </van-row>
    <van-divider
        :style="{ color: '#bc6c25', borderColor: '#bc6c25', padding: '0 16px' }"
    >
      评论
    </van-divider>
  </div>
  {{ postItem }}
</template>

<style scoped>

</style>