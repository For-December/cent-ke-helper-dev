<script setup lang="ts">
import {reactive, ref} from "vue";
import PostCreator from "@/components/PostCreator.vue";

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
</script>

<template>
  111
  <van-pull-refresh v-model="loadPosts.refreshing" @refresh="onRefresh" success-text="好好好！">

    <PostCreator/>

<!--    <PostCreator @loadAgain="onLoad"/>-->

<!--    <div v-for="rows in [5,5,5,5,5,5,5,5,5,5,5]">-->
<!--      <van-skeleton title :row="rows" :loading="loadPosts.loading">-->
<!--      </van-skeleton>-->
<!--    </div>-->
<!--    <van-list-->
<!--        v-model:loading="loadPosts.loading"-->
<!--        :finished="loadPosts.finished"-->
<!--        finished-text="没有更多了"-->
<!--        @load="onLoad"-->
<!--    >-->
<!--      <div v-for="item in list" :key="item.id as number">-->
<!--        <van-divider-->
<!--            :style="{ color: '#678cb2', borderColor: '#78b2b2',marginTop: '7px'}"-->
<!--        />-->

<!--        &lt;!&ndash;          <van-skeleton title avatar :row="3" :loading="true">&ndash;&gt;-->
<!--        <el-container>-->
<!--          <el-aside width="12vw">-->
<!--            &lt;!&ndash;              <Avatar style="width: 10vw;height: 10vw; margin: 0;border-radius: 50%"></Avatar>&ndash;&gt;-->
<!--            <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"-->
<!--                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"-->
<!--            />-->
<!--          </el-aside>-->
<!--          <el-main style="padding-top: 0;" @click="goPostDetail(item.id)">-->
<!--            <el-row>-->
<!--              <el-col :span="12">{{ item.authorName }} @{{ item.authorName }}</el-col>-->
<!--              <el-col :span="12">-->
<!--                <div style="float: right">删除 分享</div>-->
<!--              </el-col>-->
<!--            </el-row>-->

<!--            &lt;!&ndash;              <p style="margin: 0;font-size: 15px">2 分钟前</p>&ndash;&gt;-->
<!--            <p style="margin: 0;font-size: 15px">-->
<!--              {{ getTimeGap(new Date(), new Date(item.latestRepliedTime)) }}-->

<!--            </p>-->
<!--            <div>-->
<!--              &lt;!&ndash;                <br/>&ndash;&gt;-->
<!--              &lt;!&ndash;                {{ item.title + "\n" }}&ndash;&gt;-->
<!--              &lt;!&ndash;                <p style="margin: 0;">芝士雪豹</p>&ndash;&gt;-->
<!--            </div>-->
<!--            &lt;!&ndash;              :title="item.title"&ndash;&gt;-->
<!--            <p></p>-->
<!--            <div v-for="meta in JSON.parse(item.contentJson) as PostMeta[]">-->
<!--              <div v-if="meta.type==='image'">-->
<!--                <van-image-->
<!--                    :src="meta.url"-->
<!--                >-->
<!--                  <template v-slot:loading>-->
<!--                    <van-loading type="spinner" size="20"/>-->
<!--                  </template>-->
<!--                  <template v-slot:error>图片加载失败</template>-->
<!--                </van-image>-->
<!--              </div>-->
<!--              <div v-if="meta.type==='text'">-->
<!--                {{ meta.text }}-->
<!--                <br/>-->
<!--                <br/>-->
<!--              </div>-->

<!--              <div v-if="meta.type==='video'">-->
<!--                <video controls width="300" height="100">-->
<!--                  <source :src="meta.url" type="video/mp4">-->
<!--                  Your browser does not support the video tag.-->
<!--                </video>-->
<!--              </div>-->


<!--            </div>-->


<!--            &lt;!&ndash;              + "我是帖子的内容，没想到吧！！"&ndash;&gt;-->

<!--            <van-row>-->
<!--              <van-col span="8" style="text-align: left">点赞: {{ item.upvoteCount }}</van-col>-->
<!--              <van-col span="8" style="text-align: center">转发: 8</van-col>-->
<!--              <van-col span="8" style="text-align: right">-->
<!--                <el-button type="primary">评论</el-button>-->
<!--              </van-col>-->
<!--            </van-row>-->
<!--          </el-main>-->
<!--        </el-container>-->

<!--        &lt;!&ndash;          </van-skeleton>&ndash;&gt;-->
<!--        <div>-->


<!--          &lt;!&ndash;            <van-cell title="单元格" icon="shop-o">&ndash;&gt;-->
<!--          &lt;!&ndash;              &lt;!&ndash; 使用 right-icon 插槽来自定义右侧图标 &ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;              <template #right-icon>&ndash;&gt;-->
<!--          &lt;!&ndash;                ssm 阿哲&ndash;&gt;-->
<!--          &lt;!&ndash;                <van-icon name="search" class="search-icon" />&ndash;&gt;-->
<!--          &lt;!&ndash;              </template>&ndash;&gt;-->
<!--          &lt;!&ndash;            </van-cell>&ndash;&gt;-->

<!--          &lt;!&ndash;            <van-skeleton title avatar :row="3" :loading="loading">&ndash;&gt;-->
<!--          &lt;!&ndash;              <div>实际内容</div>&ndash;&gt;-->
<!--          &lt;!&ndash;            </van-skeleton>&ndash;&gt;-->


<!--        </div>-->

<!--      </div>-->
<!--      &lt;!&ndash;                  <van-skeleton title avatar :row="3" :loading="true">&ndash;&gt;-->

<!--      <van-divider-->
<!--          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
<!--      >-->
<!--        ######-->
<!--      </van-divider>-->
<!--      &lt;!&ndash;                  </van-skeleton>&ndash;&gt;-->


<!--    </van-list>-->
  </van-pull-refresh>
  <van-back-top/>
</template>

<style scoped>

</style>