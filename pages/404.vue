<script setup lang="ts">
import { SITE_TITLE } from '~/utils/site'

useSeoMeta({
  title: `404 Not Found / ${SITE_TITLE}`,
  description: 'ページがみつかりませんでした',
})
</script>

<template>
  <div class="not-found">
    <h1>
      <span class="rainbow-text">★★★ 404 Not Found ★★★</span>
    </h1>
    <p>ページがみつかりませんでした…</p>
    <p class="not-found__oops">(´・ω・`)</p>
    <p><NuxtLink to="/">⇒ トップへ戻る</NuxtLink></p>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  padding: 2.4rem 0;
  text-align: center;

  h1 {
    margin-bottom: 1.2rem;
    font-family: var(--font-display);
    font-size: 2.4rem;
  }

  &__oops {
    color: #ff1493;
    font-size: 2rem;
  }
}
</style>
