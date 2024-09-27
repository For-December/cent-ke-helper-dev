<template>
  <div class="container">
    <el-card>
      <el-button type="text">1、tab栏切换（针对格式相同的内容）<i class="el-icon-s-order" /></el-button>
      <div class="tab-nav">
        <ul class="tab-tilte">
          <li v-for="(item, index) in tabs" :key="index" :class="{active:tabIndex==index}" @click="changeTab(index)">{{ item }}</li>
        </ul>
      </div>
      <div class="tab-content" :style="{ transform: `translateX(${-tabIndex * 100}%)` }">
        <div v-for="(item, index) in contents" :key="index" class="tab-item">{{ item.name }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const tabIndex = ref(0);
const tabs = ['tab栏1', 'tab栏2', 'tab栏3', 'tab栏4'];
const contents=[
  {
    id:'1',
    name:'内容1',
    pic:'',
    title:'tab栏一区域'
  },
  {
    id:'2',
    name:'内容2',
    pic:'',
    title:'tab栏二区域'
  },
  {
    id:'3',
    name:'内容3',
    pic:'',
    title:'tab栏三区域'
  },
  {
    id:'4',
    name:'内容4',
    pic:'',
    title:'tab栏四区域'
  }
];
const changeTab = (index) => {
  tabIndex.value = index;
};

</script>

<style lang="scss" scoped>
.container {
  width: 96%;
  margin: 2%;
}
.tab-nav ul{//ul默认有40左边距
  padding-left: 0px !important;
}
ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tab-tilte {
  display: flex;
}

.tab-tilte li {
  flex: 1;
  padding: 10px;
  text-align: center;
  background-color: #f4f4f4;
  cursor: pointer;
  transition: background-color 0.3s; /* 添加过渡效果 */
}

/* 点击对应的标题添加对应的背景颜色 */
.tab-tilte .active {
  background-color: #09f;
  color: #fff;
}

.tab-content {
  display: flex;
  transition: transform 0.5s ease; /* 添加过渡效果，并使用缓动函数 */
}

.tab-item {
  flex: 1;
  min-width: 96%;
  margin: 2%;
  line-height: 100px;
  text-align: left;
  background: rgb(0, 255, 200);
}
</style>