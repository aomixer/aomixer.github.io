<script setup lang="ts">
import { onMounted } from 'vue'

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

// -----------------------------------------------------------------
// ブラウザ側（クライアント）で表示された瞬間に実行する処理
// -----------------------------------------------------------------
onMounted(() => {
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()
  const todayDay = today.getDate()
  const todayTime = new Date(todayYear, todayMonth, todayDay).getTime()

  // 記事リストの各日付要素を取得して判定
  const dateElements = document.querySelectorAll<HTMLElement>('.js-post-date')

  dateElements.forEach((el) => {
    const pubDateStr = el.dataset.date
    if (!pubDateStr) return

    const dateObj = new Date(pubDateStr)
    if (isNaN(dateObj.getTime())) return

    const pubYear = dateObj.getFullYear()
    const pubMonth = dateObj.getMonth()
    const pubDay = dateObj.getDate()
    const pubTime = new Date(pubYear, pubMonth, pubDay).getTime()

    // 日数の差分を計算
    const diffDays = (todayTime - pubTime) / (1000 * 60 * 60 * 24)

    // 0日（今日）〜 30日前 以内であれば、親の pタグに .is-new を強制付与
    if (diffDays >= 0 && diffDays <= 30) {
      el.closest('.c-postList__date')?.classList.add('is-new')
    }
  })
})
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
        <!-- data-date に元の公開日を持たせておき、あとからJSでクラスを付与する -->
        <p class="c-postList__date">
          <span class="js-post-date" :data-date="post.pubDate">
            <FormattedDate v-if="post.pubDate" :date="post.pubDate" />
          </span>
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