<script setup lang="ts">
import { SITE_TITLE } from '~/utils/site'

const route = useRoute()
const slugParam = computed(() => {
  const raw = route.params.slug
  return Array.isArray(raw) ? raw.join('/') : String(raw || '')
})

const { data: post } = await useAsyncData(
  () => `blog-${slugParam.value}`,
  () => queryCollection('blog').path(`/blog/${slugParam.value}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
}

useSeoMeta({
  title: `${post.value.title} / ${SITE_TITLE}`,
  description: post.value.description,
  ogTitle: `${post.value.title} / ${SITE_TITLE}`,
  ogDescription: post.value.description,
  ogImage: post.value.heroImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <article v-if="post" class="post">
    <!-- <div v-if="post.heroImage" class="post__hero">
      <img :src="post.heroImage" :alt="post.title" width="1020" height="510">
    </div> -->
    <div class="post__meta">
      <FormattedDate v-if="post.pubDate" :date="post.pubDate" />
      <div v-if="post.updatedDate" class="post__updated">
        Last updated on <FormattedDate :date="post.updatedDate" />
      </div>
    </div>
    <h1 class="post__title">
      <span class="rainbow-text">{{ post.title }}</span>
    </h1>
    <hr>
    <div class="prose">
      <ContentRenderer :value="post" />
    </div>
    <p class="post__back">
      <NuxtLink to="/blog/">ブログ一覧に戻る</NuxtLink>
    </p>
  </article>
</template>

<style scoped lang="scss">
@use "~/assets/styles/variables" as *;

.post {
  &__hero {
    margin-bottom: 1.2rem;
    text-align: center;

    img {
      width: 100%;
      max-height: 32rem;
      object-fit: cover;
    }
  }

  &__meta {
    margin-bottom: 0.6rem;
    color: #669;
    text-align: center;
    font-size: 1.6rem;
  }

  &__updated {
    margin-top: 0.3rem;
    font-style: italic;
  }

  &__title {
    margin: 0 0 0.8rem;
    font-family: var(--font-display);
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.4;

    @include pc {
      font-size: 2.8rem;
    }
  }

  &__back {
    margin: 2rem 0 0;
    text-align: center;
    font-size: 1.6rem;

    @include pc {
      margin-top: 4rem;
    }

    a {
      position: relative;
      padding-left: 2.4rem;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 14px;
        height: 17px;
        background: #ff1493;
        clip-path: polygon(0 50%, 60.6% 0, 60.6% 26.4%, 100% 26.4%, 100% 73.6%, 60.6% 73.6%, 60.6% 100%);
        transform: translate(0,-50%);
        content: "";
        animation: twinkle 1s steps(2, end) infinite;
      }
    }

  }
}
</style>
