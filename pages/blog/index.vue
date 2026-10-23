<script setup lang="ts">
import { SITE_DESCRIPTION, SITE_TITLE } from '~/utils/site'

const posts = await useBlogPosts()
const page = computed(() => paginatePosts(posts.value, 1))

useSeoMeta({
  title: `日記 / ${SITE_TITLE}`,
  description: SITE_DESCRIPTION,
  ogTitle: `日記 / ${SITE_TITLE}`,
  ogDescription: SITE_DESCRIPTION,
})
</script>

<template>
  <div>
    <h1 class="page-title">日記</h1>
    <PostList
      :posts="page.items"
      :current-page="page.currentPage"
      :total-pages="page.totalPages"
    />
  </div>
</template>
