<script setup lang="ts">
import { SITE_TITLE } from '~/utils/site'
definePageMeta({
  layout: 'ura',
})

useSeoMeta({
  title: `裏ページ / ${SITE_TITLE}`,
  description: 'お絵描きゲーミングウーパー',
  ogTitle: `裏ページ / ${SITE_TITLE}`,
  ogDescription: 'お絵描きゲーミングウーパー',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <article>
    <!-- <h1 class="page-title">裏ページ</h1> -->

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <div class="ura__img">
      <img src="~/assets/img/ura/img_upa_eye.gif" alt="" width="200">
      <img src="~/assets/img/ura/omae.gif" alt="" width="200">
    </div>
    <p class="ura__txt">＜●＞＜●＞</p>

</article>
</template>

<style scoped lang="scss">
.ura {
  &__img {
    text-align: center;
  }

  &__txt {
    text-align: center;
  }
}
</style>
