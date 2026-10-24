<script setup lang="ts">
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
    const path = post.path.startsWith('/') ? post.path : `/${post.path}`
    return path.endsWith('/') ? path : `${path}/`
  }
  const slug = String(post.stem || '').replace(/^blog\//, '')
  return `/blog/${slug}/`
}

/**
 * 投稿日が「今日から1ヶ月以内」かどうかを確実に判定する関数
 */
function isNewPost(pubDate?: string | Date): boolean {
  if (!pubDate) return false

  const date = new Date(pubDate)
  if (isNaN(date.getTime())) return false

  const today = new Date()

  // 比較のために「年・月・日」の差分を日数ベースで計算する（約30日前）
  // タイムゾーンのズレをなくすため、ミリ秒ベースで計算
  const diffTime = today.getTime() - date.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  // 0日（未来の投稿）〜 30日前 以内であれば true
  // ※未来の日付も考慮して diffDays >= 0 にしています
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
        <!-- v-bindで条件付きクラス (.is-new) を付与 -->
        <p class="c-postList__date" :class="{ 'is-new': isNewPost(post.pubDate) }">
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

      // .c-postList__title {
      //   color: #ff1493;
      //   background: #ffff00;
      // }

      // .c-postList__img {
      //   outline: 3px solid #00ffff;
      // }
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
