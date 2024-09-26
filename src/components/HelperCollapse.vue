<template>

  <!--  折叠面板部分-->
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          <span class="ml-2">
          <img width="20vw" src="/src/assets/helper/1.svg" alt="">
          </span>
          <span class="ml-1">文理学部</span>
        </template>

        <KingArea
            :all-buildings="GlobalTeachInfosObj.getBuildings(globalDepartments.at(0))"
            v-model="curBuilding"
        />

        <CourseList
            :cur-department="globalDepartments.at(0)"
            :cur-building="curBuilding"
        />



      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <span class="ml-2">
          <img width="20vw" src="/src/assets/helper/2.svg" alt="">
          </span>
          <span class="ml-1">工学部</span>
        </template>
        <KingArea
            :all-buildings="GlobalTeachInfosObj.getBuildings(globalDepartments.at(1))"
        />

      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <span class="ml-2">
          <img width="20vw" src="/src/assets/helper/3.svg" alt="">
          </span>
          <span class="ml-1">信息学部</span>
        </template>
        <KingArea
            :all-buildings="GlobalTeachInfosObj.getBuildings(globalDepartments.at(2))"
        />

      </el-collapse-item>
      <el-collapse-item name="4">
        <template #title>
          <span class="ml-2">
          <img width="20vw" src="/src/assets/helper/4.svg" alt="">
          </span>
          <span class="ml-1">医学部</span>
        </template>
        <KingArea
            :all-buildings="GlobalTeachInfosObj.getBuildings(globalDepartments.at(3))"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">

import KingArea from "@/components/KingArea.vue";

import {globalDepartments, GlobalTeachInfosObj} from "@/store/teachInfosObj.ts";
import CourseList from "@/components/CourseList.vue";
import {ref} from "vue";

GlobalTeachInfosObj.loadGlobalTeachInfos()
const curBuilding = ref('')
// const changeCurBuilding = (building:string)=>{
//   console.log(building)
//   curBuilding.value = building
// }
</script>

<style scoped lang="scss">
:deep(.el-collapse-item .el-collapse-item__header) {
  background: #dda15e;
  border: #bc6c25 0.5vw solid;
  margin-bottom: 1vw;
}

</style>