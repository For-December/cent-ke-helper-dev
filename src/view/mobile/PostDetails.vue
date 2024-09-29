<script setup lang="ts">

import PostCard from "@/components/PostCard.vue";
const postItem = defineModel()
</script>

<template>
<PostCard v-model="postItem" @click-details="args => {}"/>
  {{postItem}}
</template>

<style scoped>

</style>