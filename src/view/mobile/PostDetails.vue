<script setup lang="ts">

import {getTimeGap} from "@/utils/globalFunc.ts";
import {computed, onMounted, ref, Ref} from "vue";
import {CommentRecord, PostMeta, PostRecord} from "@/types/treeHole.ts";
import {Icon} from "@vicons/utils";
import HeartOutline from "@vicons/ionicons5/HeartOutline"
import Heart from "@vicons/ionicons5/Heart"
import {useUserStore} from "@/store/modules/userStore.ts";
import {Comment} from "@element-plus/icons-vue";
import {ListModel} from "@/types/listModel.ts";
import {webDeleteComment, webGetComments} from "@/api/comments.ts";
import CommentCreator from "@/components/CommentCreator.vue";
import {defaultAvatar} from "@/api/globalConst.ts";
import DeleteButton from "@/components/DeleteButton.vue";
import {ElMessage} from "element-plus";
import {webUpdateStar} from "@/api/star.ts";

const onDelete = (commentId: number) => {
  webDeleteComment(commentId).then(() => {
    ElMessage.warning('评论删除成功')
    reloadList()
  })
}
const curPosition = ref(0);
const images = computed(() => {
  const metas = JSON.parse(item.value.contentJson) as PostMeta[]

  console.log(metas)
  return metas.filter(meta => meta.type === 'image')
      .map(meta => meta.url)
})
const showPreview = ref(false)
const onClickImage = (url: string) => {
  curPosition.value = images.value.indexOf(url);
  showPreview.value = true
}

const postItem = defineModel()
const item: Ref<PostRecord> = computed(() => {
  // 每次切换帖子时，重新加载评论
  reloadList()
  return postItem.value as PostRecord
})

const userStore = useUserStore()
const starManager = (() => {
  const starTimer = ref();

  const onStar = () => {
    // 重置计时器
    clearTimeout(starTimer.value)

    // 已经点赞，取消点赞
    if (userStore.checkIfUpvote(item.value.id)) {
      userStore.cancelUpvote(item.value.id)
      item.value.upvoteCount--;
    } else {
      // 未点赞，点赞
      userStore.upvote(item.value.id)
      item.value.upvoteCount++;
    }

    // 在1秒后执行异步API调用
    starTimer.value = setTimeout(() => {
      console.log("发起点赞请求")
      console.log(userStore.userUpvoteList)
      webUpdateStar(item.value.id,
          userStore.userUpvoteList.some(t => t == item.value.id)
      ).then(() => {
        console.log('点赞状态修改成功')
      }).catch(() => {
        if (userStore.checkIfUpvote(item.value.id)) {
          userStore.cancelUpvote(item.value.id)
          item.value.upvoteCount--;
        } else {
          userStore.upvote(item.value.id)
          item.value.upvoteCount++;
        }
        console.log('点赞状态修改失败')
      })
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
//
// const comments = ref<CommentRecord[]>([
//   {
//     floorNum:1,
//     authorId: 0,
//     authorName: "芝士雪豹",
//     content: "我是评论的内容，没想到吧！！",
//     id: 1,
//     createdAt: new Date(),
//     postId: 1
//   }
// ])

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


const onCommentSuccess = () => {
  // 评论数增加
  (postItem.value as PostRecord).commentCount++
  reloadList()
}
</script>

<template>
  <van-pull-refresh v-model="loadComments.refreshing" @refresh="onRefresh" success-text="好好好！">

    <!--  帖子内容部分-->
    <div>


      <!--    头部用户部分-->
      <el-row>
        <el-col :span="4">
          <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                     :src="defaultAvatar"
          />
        </el-col>
        <el-col :span="20">
          <div class="text-[5vw] text-amber-500">
            {{ item.authorName }}
          </div>
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
          </div>
          <div v-if="meta.type==='text'" class="text-2xl">
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

            <CommentCreator :post-id="item.id" @on-success="onCommentSuccess"/>

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

    <van-image-preview closeable v-model:show="showPreview"
                       :images="images"
                       :start-position="curPosition">
      <!--                           @change="onChange"-->

      <!--          <template v-slot:index>第{{ index + 1 }}页</template>-->
    </van-image-preview>

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


      <div v-for="commentRecord in commentItems" :key="commentRecord.id">

        <div class="grid grid-cols-5 pb-5">
          <div class="col-span-1 grid-rows-2">
            <div>
              <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                         :src="defaultAvatar"
              />
            </div>
            <div>
              <el-tag type="warning">
                {{ commentRecord.floorNum ?? 1 }} 楼
              </el-tag>
            </div>
          </div>
          <div class="col-span-3 grid-rows-3">
            <div class="text-[4vw] text-amber-500">
              {{ commentRecord.authorName }}
            </div>
            <div class="text-[2.5vw] text-gray-400">
              {{ getTimeGap(new Date(), new Date(commentRecord.createdAt)) }}
            </div>
            <div>
              {{ commentRecord.content }}
            </div>
          </div>

          <div class="text-center">
            <DeleteButton
                v-if="commentRecord.authorId == 1"
                size="small"
                @on-confirm="onDelete(commentRecord.id)"
            />
          </div>
        </div>
      </div>

      <van-divider/>
    </van-list>
  </van-pull-refresh>

  <!--  回到顶端-->
  <van-back-top/>
</template>

<style scoped>

</style>