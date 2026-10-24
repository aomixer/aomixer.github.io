<script setup lang="ts">
import { ref, onMounted } from 'vue'

type PostItem = {
  path?: string
  stem?: string
  title?: string
  pubDate?: string | Date
  heroImage?: string
}

withDefaults(
  defineProps<{
    posts: PostItem[]
    currentPage?: number
    totalPages?: number
    pagination?: boolean
  }>(),
  {
    currentPage: 1,
    totalPages: 1,
    pagination: true,
  },
)

function postHref(post: PostItem) {
  if (post.path) {
    const path = post.path.startsWith('/') ? post.path : `/${path}`
    return path.endsWith('/') ? path : `${path}/`
  }
  const slug = String(post.stem || '').replace(/^blog\//, '')
  return `/blog/${slug}/`
}

const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})

/**
 * タイムゾーンに影響されない、完全な日付文字列（YYYY-MM-DD）ベースの判定関数
 */
function isNewPost(pubDate?: string | Date): boolean {
  if (!pubDate) return false

  // 1. pubDate を "YYYY-MM-DD" の形に確実に正規化する
  const dateObj = new Date(pubDate)
  if (isNaN(dateObj.getTime())) return false

  // タイムゾーンによるズレを防ぐため、年・月・日を直接数値として取得
  const pubYear = dateObj.getFullYear()
  const pubMonth = dateObj.getMonth()
  const pubDay = dateObj.getDate()

  // 2. ブラウザ（またはクライアント）の「今日」を年月日ベースで取得
  const todayObj = new Date()
  const todayYear = todayObj.getFullYear()
  const todayMonth = todayObj.getMonth()
  const todayDay = todayObj.getDate()

  // それぞれを「その日の0時0分0秒」のタイムスタンプ（ミリ秒）に変換
  const pubTime = new Date(pubYear, pubMonth, pubDay).getTime()
  const todayTime = new Date(todayYear, todayMonth, todayDay).getTime()

  // 日数の差分を計算
  const diffTime = todayTime - pubTime
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  // 0日（今日）〜 30日前 以内であれば true
  return diffDays >= 0 && diffDays <= 30
}
</script>

<template>
  <ul class="c-postList">
    <li v-for="post in posts" :key="postHref(post)" class="c-postList__item">
      <NuxtLink :to="postHref(post)" class="c-postList__link">
        <!-- <img
          class="c-postList__img"
          width="720"
          height="360"
          :src="post.heroImage || '/assets/img/blog/noimage.png'"
          :alt="post.title || ''"
        > -->
        <p class="c-postList__date" :class="{ 'is-new': isClient && isNewPost(post.pubDate) }">
          <FormattedDate v-if="post.pubDate" :date="post.pubDate" />
        </p>
        <h4 class="c-postList__title">{{ post.title }}</h4>
      </NuxtLink>
    </li>
  </ul>

  <nav v-if="pagination && totalPages > 1" class="c-pagination">
    <NuxtLink
      v-if="currentPage > 1"
      :to="`/blog/page/${currentPage - 1}/`"
      class="c-pagination__arrow"
    >
      ＜前へ
    </NuxtLink>
    <NuxtLink
      v-for="page in totalPages"
      :key="page"
      :to="`/blog/page/${page}/`"
      class="c-pagination__link"
      :class="{ 'is-current': page === currentPage }"
    >
      {{ page }}
    </NuxtLink>
    <NuxtLink
      v-if="currentPage < totalPages"
      :to="`/blog/page/${currentPage + 1}/`"
      class="c-pagination__arrow"
    >
      次へ＞
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
@use "sass:color";
@use "~/assets/styles/variables" as *;

.c-postList {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
    width: 100%;

    @include pc {
      // width: calc(50% - 0.6rem);
    }
  }

  &__link {
    display: block;
    padding: 0.8rem;
    border: 1px solid #c0c0c0;
    background: #ffffff;
    color: inherit !important;
    text-decoration: none !important;

    @include pc {
      padding: 1.6rem;
    }

    &:hover {
      background: color.adjust($color-lightblue, $lightness: 7%);
    }
  }

  &__img {
    width: 100%;
    height: 36vw;
    margin-bottom: 0.6rem;
    object-fit: cover;
    border: 2px inset #808080;

    @include pc {
      height: 18rem;
    }
  }

  &__title {
    margin: 0 0 0.3rem;
    color: #0000ee;
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 1.4;

    @include pc {
      font-size: 1.8rem;
    }
  }

  &__date {
    margin: 0;
    color: #666699;
    font-size: 1.2rem;

    @include pc {
      font-size: 1.6rem;
    }

    &.is-new {
      display: flex;
      align-items: center;

      &::after {
        display: inline-block;
        margin-left: .4rem;
        padding: .4rem;
        background: $color-hot;
        color: #fff;
        font-size: 1rem;
        line-height: 1;
        content: "NEW!";
        animation: twinkle 1s steps(2, end) infinite;
      }
    }
  }
}

.c-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 2rem;
  font-family: var(--font-display);
  font-size: 1.4rem;

  &__link,
  &__arrow {
    @include bevel-out;
    min-width: 2.8rem;
    padding: 0.3rem 0.6rem;
    color: #000080 !important;
    text-decoration: none !important;
    text-align: center;
    background: #c0c0c0 !important;

    &:hover {
      background: #e0e0ff !important;
    }
  }

  &__link.is-current {
    @include bevel-in;
    color: #ff1493 !important;
    font-weight: 700;
  }
}
</style>