<script setup lang="ts">

import {useUserStore} from "@/store/modules/userStore.ts";

const userStore = useUserStore()
userStore.initUpvoteList()
</script>

<template>
  <router-view/>

</template>

<style scoped></style>
