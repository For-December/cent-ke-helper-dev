<template>
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
          :department="departments[0]"
          @get-cur-building-with-department="getCurBuildingWithDepartment"
          :all-buildings="curBuildings(departments[0])"
        />

      </el-collapse-item>
      <el-collapse-item title="Feedback" name="2">
        <template #title>
          <span class="ml-2">
          <img width="20vw" src="/src/assets/helper/2.svg" alt="">
          </span>
          <span class="ml-1">工学部</span>
        </template>
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Efficiency" name="3">
        <template #title>
          <span class="ml-2">
          <img width="20vw" src="/src/assets/helper/3.svg" alt="">
          </span>
          <span class="ml-1">信息学部</span>
        </template>
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Controllability" name="4">
        <template #title>
          <span class="ml-2">
          <img width="20vw" src="/src/assets/helper/4.svg" alt="">
          </span>
          <span class="ml-1">医学部</span>
        </template>
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">

import KingArea from "@/components/KingArea.vue";
import {teachInfos} from "@/store/globalData.ts";
import {computed, ref} from "vue";
import {Items} from "@/types/Items";
import {hasTeachInfo, teachInfosCacheKey, validData} from "@/api/globalConst.ts";
const emits = defineEmits(['changeDepartment']);

const departments = ref([
  "文理学部",
  "工学部",
  "信息学部",
  "医学部",
  "网安基地"
]);

'#d5d8dc'

'#c48833'

const collapseHeaderBgColor = ref(
    'bg-[#dda15e]'
) // #dee2e6

const collapseKingBgColor = ref(
    'bg-[#fefae0]'
)


// const collapseBuildingIconColor = ref(
//     '#606c38'
// )
// const collapseChoseBoxColor = ref(
//     'rgb(255,69,137,0.1)'
// )
const collapseContentBgColor = ref(
    'bg-[#dda15e]/50'
) // adb5bd
const infoCardColor = ref(
    // '#606c38'
    'rgba(96,108,56,0.5)'
)
'#dbfaff'


const curDepartment = ref(departments.value[0]);
emits('changeDepartment', curDepartment.value)

const curBuildingDepartmentMap = ref(new Map<string, string>())

const getCurBuildingWithDepartment = (building, department) => {
  curBuildingDepartmentMap.value.set(department, building)
  // console.log(curBuildingDepartmentMap.value);
}


const buildingsMap = ref(new Map<string, string[]>())

const curBuildings = computed(() => {
  return (department) => {
    return buildingsMap.value.get(department)
  }
})


const getBuildings = () => {
  for (const department of departments.value) {
    for (let building of teachInfos.value.get(department).keys()) {
      buildingsMap.value.get(department).push(building)
    }

    // 后端已排序
    // 原地排序
    // buildingsMap.value.get(department).sort();
  }
}


// 场景：父组件和子组件在页面展示内容，
// 按照正常的生命周期顺序是 =》父组件创建=》子组件创建=》子组件挂载=》父组件挂载

// hasTeachInfo.value.set("文理学部",true)

// 这里是创建父组件时执行的逻辑，先初始化buildingsMap，使子组件得以有效
for (const department of departments.value) {
  buildingsMap.value.set(department, [])
}

const initTeachInfos = (data: Items.BuildingTeachInfos[][]) => {
  for (let i = 0; i < 5; i++) {
    // console.log(data[i])

    let tempMap = new Map<string, Items.TeachInfo[]>()

    // 是否无课
    hasTeachInfo.value.set(departments.value[i], data[i].length !== 0)

    // 初始化当前选中的教学楼
    curBuildingDepartmentMap.value.set(departments.value[i],
        data[i].length !== 0 ? data[i][0].building : '')

    // console.log(hasTeachInfo.value.get(departments.value[i]));
    data[i].forEach(t => {
      tempMap.set(t.building, t.infos)
    })
    teachInfos.value.set(departments.value[i], tempMap)
  }
  getBuildings()
}

const reqTeachInfos = () => {
  // 重置buildingsMap
  for (const department of departments.value) {
    buildingsMap.value.set(department, [])
  }
  webGetTeachInfos()
      .then((data) => {
        isApiError.value = false
        if (data.length != 5) {
          console.log("断言失败，数据长度应当为5！")
          return
        }

        localStorage.setItem(teachInfosCacheKey, JSON.stringify(data))
        console.log("refresh")

        initTeachInfos(data)

        // console.log(buildingsMap.value);
      })
      .catch((err) => {
        isApiError.value = true
        console.log(err)
      })
}

let data = localStorage.getItem(teachInfosCacheKey)
if (data != null && data != '') {

  initTeachInfos(JSON.parse(data))
} else {
  // 没有缓存，网络获取信息
  reqTeachInfos()
}

watch(validData, (newValue) => {
  if (newValue == false) {
    // console.log(validData.value)
    // 第二次请求
    reqTeachInfos()
    validData.value = true
  }
})


</script>

<style scoped lang="scss">
:deep(.el-collapse-item .el-collapse-item__header){
  background: #dda15e;
  border: #bc6c25 0.5vw solid;
  margin-bottom: 1vw;
}

</style>