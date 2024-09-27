<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import PostCreator from "@/components/PostCreator.vue";
import {webGetPosts} from "@/api/posts.ts";
import PostCard from "@/components/PostCard.vue";
import {ListModel} from "@/types/listModel.ts";
import {PostRecord} from "@/types/treeHole.ts";


const loadPosts = reactive({
  loading: false,
  finished: false,
  refreshing: false,
});

const count = ref(0);
const onRefresh = () => {
  setTimeout(() => {

    loadPosts.refreshing = false;
    loadPosts.finished = false;

    count.value++;
    // onLoad();
  }, 1000);
}

const postItems = computed(()=>{
  return postItemsListModel.listModelData.value
})

const postItemsListModel = new ListModel<PostRecord>()
onMounted(() => {

  console.log(postItemsListModel.listModelData.value)
})

const onLoad = () => {
  postItemsListModel.appendListModels(webGetPosts(), (item) => {
    item.createdAt = new Date(item.createdAt)
    item.updatedAt = new Date(item.updatedAt)
    item.latestRepliedAt = new Date(item.latestRepliedAt)
  }).then((isFinished: boolean) => {
    if (isFinished) {
      loadPosts.finished = true;
    }

    loadPosts.loading = false;
  })
}


</script>

<template>
  <van-pull-refresh v-model="loadPosts.refreshing" @refresh="onRefresh" success-text="好好好！">

    <PostCreator/>
    <div v-for="_ in 10">
      <van-skeleton title avatar :row="5" :loading="loadPosts.loading"/>
    </div>

    <van-list
        v-model:loading="loadPosts.loading"
        :finished="loadPosts.finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
<!--      这里如果是 postItemsListModel.listModelData.value 必须 .value-->
      <div v-for="postItem in postItems" :key="postItem.id">
        <PostCard :post-item="postItem"/>
      </div>
      <!--      <div v-for="item in list" :key="item.id as number">-->
      <!--        <van-divider-->
      <!--            :style="{ color: '#678cb2', borderColor: '#78b2b2',marginTop: '7px'}"-->
      <!--        />-->

      <!--        &lt;!&ndash;          <van-skeleton title avatar :row="3" :loading="true">&ndash;&gt;-->


      <!--        <div>-->

      <!--        </div>-->

      <!--      </div>-->


    </van-list>
  </van-pull-refresh>
  <van-back-top/>
</template>

<style scoped>

</style>