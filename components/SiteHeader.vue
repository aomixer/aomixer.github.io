<script setup lang="ts">
import { SITE_TITLE } from '~/utils/site'

const route = useRoute()

const links = [
  { to: '/', label: 'トップ' },
  { to: '/about/', label: 'プロフィール' },
  { to: '/blog/', label: '日記' },
  { to: '/link/', label: 'リンク集' },
]

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/' || route.path === ''
  }
  if (path === '/blog/') {
    return route.path === '/blog' || route.path.startsWith('/blog/')
  }
  return route.path === path || route.path === path.replace(/\/$/, '')
}
</script>

<template>
  <header class="header">
    <p class="header__welcome header__welcome--sp">
      ★★★ {{ SITE_TITLE }} ★★★
    </p>

    <div class="header__side">
      <p class="header__brand">
        <span class="header__brand-star">★</span>
        メニュー
        <span class="header__brand-star">★</span>
      </p>
      <nav class="header__nav" aria-label="メインメニュー">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="header__btn"
          :class="{ 'is-active': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "~/assets/styles/variables" as *;

.header {
  width: min(96%, 760px);
  margin: 0 auto 1.2rem;
  padding-top: 1.2rem;
  text-align: center;

  @include pc {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 1.6rem 1rem;
  }

  &__welcome {
    overflow: hidden;
    margin: 0 0 1rem;
    padding: 0.4rem 0;
    border: 2px solid $color-cyan;
    background: #000066;
    color: #ffff00;
    font-family: var(--font-display);
    font-size: 1.3rem;
    white-space: nowrap;
    animation: blink-bar 2s steps(2, end) infinite;

    @include pc {
      display: none;
    }
  }

  &__side {
    @include pc {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
    }
  }

  &__brand {
    display: none;
    margin: 0;
    color: #ffff00;
    font-family: var(--font-display);
    font-size: 2rem;
    line-height: 1.4;
    text-shadow: 2px 2px 0 #ff1493;

    @include pc {
      display: block;
    }
  }

  &__brand-star {
    color: #00ffff;
    animation: twinkle 1.2s steps(2, end) infinite;
  }

  &__site-name {
    display: none;
    margin: 0;
    padding: 0.6rem 0.4rem;
    border: 2px dashed #00ffff;
    background: #000033;
    color: #ffffff;
    font-family: var(--font-display);
    font-size: 1.2rem;
    line-height: 1.4;
    word-break: break-all;

    @include pc {
      display: block;
    }
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;

    @include pc {
      flex-direction: column;
      width: 100%;
      gap: 0.8rem;
    }
  }

  &__btn {
    position: relative;
    border-radius: 10px;
    box-shadow: -1px -1px 4px inset rgba(#000,.8), 6px 6px 4px inset rgba(#fff,.4), -6px -6px 4px inset rgba(#000,.5);
    padding: 0.5rem 1rem;
    // color:#f2b500 !important;
    color:#fff !important;
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-style: italic;
    font-weight: bold;
    text-decoration: none !important;
    text-align: center;
    // text-shadow:
    //    2px  2px 1px #0077c6,
    //   -2px  2px 1px #0077c6,
    //    2px -2px 1px #0077c6,
    //   -2px -2px 1px #0077c6,
    //    2px  0px 1px #0077c6,
    //    0px  2px 1px #0077c6,
    //   -2px  0px 1px #0077c6,
    //    0px -2px 1px #0077c6;
    text-shadow: 2px 2px 1px #000;
    background-color:#a8d7f9;
      // background-image: linear-gradient(0deg, #002952 10%, #3685D3 35% 65%, #ebf5ff 90%);

    @include sp {
      min-width: 7.2rem;
      padding-right: 2rem;
      padding-left: 2rem;
    }

    @include pc {
      display: block;
      width: 100%;
      font-size: 1.6rem;
    }

    &::before {
      display: none;
      position: absolute;
      top: calc(50% + 1px);
      left: 7%;
      border: 6px solid transparent;
      border-left: 12px solid #000;
      border-right: 0;
      transform: translate(0,-50%);
      content: "";
    }

    &::after {
      display: none;
      position: absolute;
      top: 50%;
      left: 7%;
      border: 5px solid transparent;
      border-left: 9px solid #fff;
      border-right: 0;
      transform: translate(0,-50%);
      content: "";
    }

    &:active,
    &.is-active {
      &::before {
        display: block;
      }

      &::after {
        display: block;
      }
    }
  }

  &__note {
    display: none;
    margin: 0.8rem 0 0;
    color: #00ff66;
    font-family: var(--font-display);
    font-size: 1.1rem;
    animation: twinkle 1.6s steps(2, end) infinite;

    @include pc {
      display: block;
    }
  }
}

@keyframes blink-bar {
  0%,
  100% {
    border-color: #00ffff;
  }
  50% {
    border-color: #ff1493;
  }
}
</style>
