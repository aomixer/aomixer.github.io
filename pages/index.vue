<script setup lang="ts">
import { SITE_DESCRIPTION, SITE_TITLE } from '~/utils/site'

const posts = await useBlogPosts()
const latest = computed(() => posts.value.slice(0, 4))

useSeoMeta({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ogTitle: SITE_TITLE,
  ogDescription: SITE_DESCRIPTION,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="home">
    <section class="home__hero">
      <p class="home__stars" aria-hidden="true">★★★★★★★</p>
      <h1 class="home__brand">
        <span class="rainbow-text">{{ SITE_TITLE }}</span>
      </h1>
      <p class="home__stars" aria-hidden="true">★★★★★★★</p>
      <p class="home__marquee" aria-label="ウェルカムメッセージ">
        <span class="home__marquee-track">
          ★★★ Welcome to my homepage ★<a href="/ura/" class="home__ura">★</a>★
        </span>
      </p>
    </section>

    <p class="home__counter">
      あなたは
      <img src="http://aomixer.s325.xrea.com/dream/dream.cgi?id=index" alt="アクセスカウンター">
      人目のお客様です
    </p>

    <section class="home__posts">
      <h2 class="home__posts-title">最近の日記</h2>
      <PostList :posts="latest.slice(0, 3)" :pagination="false" />
      <!-- <p class="home__more">
        <NuxtLink to="/blog/">ブログ一覧</NuxtLink>
      </p> -->
    </section>
</div>

</template>

<style scoped lang="scss">
@use "sass:color";
@use "~/assets/styles/variables" as *;

.home {
  &__hero {
    margin: 0 0 1.6rem;
    padding: 1.6rem 0.8rem 1.2rem;
    // border: 4px ridge #ffd700;
    border: 4px solid #ffd700;
    background: $color-lightblue;
    text-align: center;
  }

  &__stars {
    margin: 0;
    color: #ff0;
    font-size: 1.6rem;
    letter-spacing: 0.2em;
    animation: twinkle 1.4s steps(2, end) infinite;
  }

  &__brand {
    margin: 0.8rem 0;
    font-family: var(--font-logo);
    font-size: clamp(2.4rem, 6vw, 4rem);
    line-height: 1.3;
  }

  &__marquee {
    overflow: hidden;
    margin-top: 1.2rem;
    padding: 0.4rem 0;
    border-top: 2px dashed #fff;
    border-bottom: 2px dashed #fff;
    background: $color-lightblue;
    color: $color-blue;
    font-family: var(--font-display);
    white-space: nowrap;
  }

  &__marquee-track {
    display: inline-block;
    min-width: 100%;
    animation: marquee-scroll 22s linear infinite;
  }

  &__counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin: 0 0 1.6rem;
    padding: 0.8rem;
    flex-wrap: wrap;
    text-align: center;
    color: $color-ink;
    font-weight: 700;
  }

  &__posts-title {
    margin-bottom: 1.2rem;
    color: $color-hot;
    font-family: var(--font-display);
    font-size: 1.8rem;
    text-align: center;
    // text-shadow: 1px 1px 0 #ffd700;

    &::before,
    &::after {
      display: inline-block;
      margin: 0 .5em;
      width: 22px;
      height: 14px;
      background: url(~/assets/img/icon_heart02.gif) no-repeat;

      content: "";
    }
  }

  &__more {
    margin: 1.6rem 0 0;
    text-align: center;
    font-size: 1.6rem;
  }

  &__ura {
    color: $color-blue;
    font-weight: normal;
    text-decoration: none;

    &:hover {
      background: transparent;
      cursor: crosshair;
    }
  }
}
</style>
