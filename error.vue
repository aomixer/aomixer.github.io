<script setup lang="ts">
import type { NuxtError } from '#app'
import { SITE_TITLE } from '~/utils/site'

const props = defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: `${props.error?.statusCode || 500} / ${SITE_TITLE}`,
  description: 'ページがみつかりませんでした',
})

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="frameset">
    <aside class="frameset__menu">
      <SiteHeader />
    </aside>
    <div class="frameset__main">
      <div class="frameset__content">
        <main class="panel not-found">
          <h1>
            <span class="rainbow-text">
              ★★★ {{ error?.statusCode || 500 }} {{ error?.statusMessage || 'Error' }} ★★★
            </span>
          </h1>
          <p>ページがみつかりませんでした…</p>
          <p class="not-found__oops">(´・ω・`)</p>
          <p>
            <button type="button" class="not-found__btn" @click="handleClear">
              ⇒ トップへ戻る
            </button>
          </p>
        </main>
        <SiteFooter />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/variables" as *;

.frameset {
  min-height: 100vh;

  @include pc {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  &__menu {
    @include pc {
      flex: 0 0 200px;
      width: 200px;
      height: 100%;
      overflow: auto;
      border-right: 4px ridge #c0c0c0;
      background-color: #ffffff;
      background-image: linear-gradient(90deg, #fff7d780 12px, transparent 12px), linear-gradient(#fff7d780 12px, transparent 12px);
      background-position: 10px 10px;
      background-size: 24px 24px;
    }
  }

  &__main {
    @include pc {
      flex: 1 1 auto;
      min-width: 0;
      height: 100%;
      overflow: auto;
      background-color: var(--bg);
      background-image: url('/assets/img/bg_star.png');
      background-repeat: repeat;
    }
  }

  &__content {
    width: min(96%, 760px);
    margin: 0 auto;
    padding: 1.2rem 0 3.2rem;

    @include pc {
      width: min(94%, 820px);
      padding: 1.6rem 1.2rem 3.2rem;
    }
  }
}

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

  &__btn {
    @include bevel-out;
    padding: 0.5rem 1.2rem;
    color: #000080;
    font-family: var(--font-display);
    font-size: 1.4rem;
    cursor: pointer;

    &:active {
      @include bevel-in;
    }
  }
}
</style>
