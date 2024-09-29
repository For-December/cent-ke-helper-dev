<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import PostCreator from "@/components/PostCreator.vue";
import {webGetPosts} from "@/api/posts.ts";
import PostCard from "@/components/PostCard.vue";
import {ListModel} from "@/types/listModel.ts";
import {PostRecord} from "@/types/treeHole.ts";
import PostDetails from "@/view/mobile/PostDetails.vue";


const loadPosts = reactive({
  loading: false,
  finished: false,
  refreshing: false,
});

const count = ref(0);

const reloadList = () => {
  postItemsListModel.listInit()
  loadPosts.finished = false;
}
const onRefresh = () => {
  setTimeout(() => {

    postItemsListModel.listInit()
    loadPosts.refreshing = false;
    loadPosts.finished = false;

    count.value++;
    // onLoad();
  }, 1000);
}

const postItems = computed(() => {
  return postItemsListModel.listModelData.value
})

const postItemsListModel = new ListModel<PostRecord>()
onMounted(() => {

  console.log(postItemsListModel.listModelData.value)
})

const onLoad = () => {
  postItemsListModel.appendListModels(webGetPosts(
          postItemsListModel.nextPage.value,
          15,
          ""),
      (item) => {
        item.createdAt = new Date(item.createdAt)
        item.updatedAt = new Date(item.updatedAt)
        item.latestRepliedAt = new Date(item.latestRepliedAt)
      })
      .then((isFinished: boolean) => {
        if (isFinished) {
          loadPosts.finished = true;
        }

        loadPosts.loading = false;
      })
}


const detailsModel = reactive({
  postItem: {} as PostRecord,
  show: false,
})

const postDetailsRef = ref(null)

const onClickDetails = (post: PostRecord) => {
  console.log(post)
  detailsModel.postItem = post
  detailsModel.show = true
}


</script>

<template>
  <van-popup
      v-model:show="detailsModel.show"
      closeable
      close-icon="close"
      position="bottom"
      round
      :style="{ height: '75%' }"
  >
    <div class="p-5">
      <PostDetails v-model="detailsModel.postItem" ref="postDetailsRef"/>
    </div>
  </van-popup>
  <van-pull-refresh v-model="loadPosts.refreshing" @refresh="onRefresh" success-text="好好好！">

    <PostCreator @on-success="reloadList()"/>
    <div v-for="_ in 10">
      <van-skeleton title avatar :row="5" :loading="loadPosts.loading"/>
    </div>

    <van-list
        v-model:loading="loadPosts.loading"
        :finished="loadPosts.finished"
        finished-text="没有更多了"
        @load="onLoad"

        class="min-h-[70vh]"
    >
      <!--      这里如果是 postItemsListModel.listModelData.value 必须 .value-->
      <div v-for="(_,idx) in postItems" :key="idx">
        <PostCard v-model="postItems[idx]" @click-details="onClickDetails"/>
      </div>

    </van-list>
  </van-pull-refresh>
  <van-back-top/>
</template>

<style scoped>

</style>