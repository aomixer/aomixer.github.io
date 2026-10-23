<script setup lang="ts">
import { SITE_DESCRIPTION, SITE_TITLE } from '~/utils/site'

const route = useRoute()
const posts = await useBlogPosts()

const pageNumber = computed(() => Number(route.params.page) || 1)
const page = computed(() => paginatePosts(posts.value, pageNumber.value))

if (import.meta.server && (pageNumber.value < 1 || pageNumber.value > page.value.totalPages)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

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
