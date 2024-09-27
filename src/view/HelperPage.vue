<script setup lang="ts">

import HelperCollapse from "@/components/helper/HelperCollapse.vue";
import {watch} from "vue";
import {GlobalTeachInfosObj} from "@/store/teachInfosObj.ts";
import {GlobalCacheObj} from "../store/cacheObj.ts";
import {validData} from "@/store/globalData.ts";

GlobalCacheObj.loadData()
watch(validData, (newValue) => {
  if (newValue == false) {
    // console.log(validData.value)
    // 第二次请求
    GlobalTeachInfosObj.loadGlobalTeachInfos(false)
    validData.value = true
  }
})
</script>

<template>
  <div class="bg-[#ffffff] text-[#000001]">
    <div class="bg-[#dda15e]/50 h-[100%]">
      <div
          class="flex w-[100%] h-11 bg-[#dda15e] border-2 border-[#bc6c25] place-items-center place-content-center mt"
      >
        <h1 class="text-1xl">蹭课小助手</h1>
      </div>

      <div
          class="flex h-11 bg-[#dda15e]/50 place-items-center place-content-center rounded-3xl mt-3.5 ml-6 mr-6 mb-3.5"
      >
        <div class="text-4">{{ GlobalCacheObj.weekday }} {{ GlobalCacheObj.lessonTime }}</div>
      </div>

      <HelperCollapse/>
    </div>
  </div>

  <div class="float-right mr-4 text-blue-400">
    交流群: 240728548
  </div>

</template>

<style scoped>

</style>