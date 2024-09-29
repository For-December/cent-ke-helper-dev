<script setup lang="ts">

import {getTimeGap} from "@/utils/globalFunc.ts";
import {computed, onMounted, onUpdated, ref, Ref, watch} from "vue";
import {CommentRecord, PostMeta, PostRecord} from "@/types/treeHole.ts";
import {Icon} from "@vicons/utils";
import HeartOutline from "@vicons/ionicons5/HeartOutline"
import Heart from "@vicons/ionicons5/Heart"
import {useUserStore} from "@/store/modules/userStore.ts";
import {Comment, Delete, InfoFilled} from "@element-plus/icons-vue";
import {ListModel} from "@/types/listModel.ts";
import {webGetComments} from "@/api/comments.ts";
import PostCreator from "@/components/PostCreator.vue";
import CommentCreator from "@/components/CommentCreator.vue";

const postItem = defineModel()
const item: Ref<PostRecord> = computed(() => {
  // 每次切换帖子时，重新加载评论
  reloadList()
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
})()


const loadComments = ref({
  loading: false,
  finished: false,
  refreshing: false
})

const comments = ref<CommentRecord[]>([
  {
    authorId: 0,
    authorName: "芝士雪豹",
    content: "我是评论的内容，没想到吧！！",
    id: 1,
    modifyTime: new Date(),
    postId: 1
  }
])

const commentItems = computed(() => {
  return commentItemsListModel.listModelData.value
})

const reloadList = () => {
  console.log('reload')
  commentItemsListModel.listInit()
  loadComments.value.finished = false;
}

const onRefresh = () => {
  setTimeout(() => {
    commentItemsListModel.listInit()
    loadComments.value.refreshing = false;
    loadComments.value.finished = false;
    // onLoad();
  }, 1000);
}

const commentItemsListModel = new ListModel<CommentRecord>()

const onLoad = () => {
  commentItemsListModel.appendListModels(webGetComments(
          commentItemsListModel.nextPage.value,
          15,
          item.value.id),
      (comment) => {
        comment.createdAt = new Date(comment.createdAt)
      })
      .then((isFinished: boolean) => {
        if (isFinished) {
          loadComments.value.finished = true;
        }

        loadComments.value.loading = false;
      })
}

onMounted(() => {
  // watch(() => item.value.id, () => {
  //   reloadList()
  // })
})

const showPopover = ref(false)
</script>

<template>

  <!--  帖子内容部分-->
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
        <div v-if="meta.type==='text'" class="text-2xl">
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

        <van-popover v-model:show="showPopover" placement="bottom-end">

          <CommentCreator/>

          <template #reference>
            <!--            点这个评论-->
            <!--            reference内部所有元素都是触发popover的元素-->
            <Icon size="6vw" color="#bc6c25">
              <Comment/>
            </Icon>
            {{ item.commentCount }}
          </template>
        </van-popover>

      </van-col>
    </van-row>
  </div>


  <!--  评论部分-->

  <!--  {{ postItem }}-->

  <van-pull-refresh v-model="loadComments.refreshing" @refresh="onRefresh" success-text="好好好！">

    <van-list
        v-model:loading="loadComments.loading"
        :finished="loadComments.finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="min-h-[30vh]"
    >
      <van-divider
          :style="{ color: '#bc6c25', borderColor: '#bc6c25', padding: '0 16px' }"
      >
        评论区👇（下拉刷新）
      </van-divider>

      <div v-for="_ in 10">
        <van-skeleton title avatar :row="5" :loading="loadComments.loading"/>
      </div>

      <div v-for="item in commentItems" :key="item.id">
        <el-container>
          <el-aside width="12vw">
            <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <el-tag type="warning">
              {{ item.floorNum ?? 1 }} 楼
            </el-tag>
          </el-aside>
          <el-main style="padding-top: 0;">
            <el-row>
              <el-col :span="12">
                {{ item.authorName }}
              </el-col>
              <el-col :span="12">
                <div style="float: right">
                  <el-popconfirm
                      confirm-button-text="Yes"
                      cancel-button-text="No"
                      :icon="InfoFilled"
                      icon-color="#626AEF"
                      title="确定要删除此评论?"
                      @confirm="onDelete(item.id,item.postId,item.authorName)"
                      @cancel=""
                  >
                    <template #reference>
                      <el-button :type="'warning'" :icon="Delete" size="small"
                                 circle
                      />
                    </template>
                  </el-popconfirm>
                </div>
              </el-col>
            </el-row>

            <div class="text-gray-400">
              {{ getTimeGap(new Date(), new Date(item.modifyTime)) }}
            </div>

            {{ item.content }}
          </el-main>
        </el-container>


      </div>

      <van-divider/>
    </van-list>
  </van-pull-refresh>

  <!--  回到顶端-->
  <van-back-top/>
</template>

<style scoped>

</style>