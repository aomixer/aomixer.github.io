<template>
  <div class="frameset">
    <aside class="frameset__menu">
      <SiteHeader />
    </aside>
    <div class="frameset__main">
      <div class="frameset__content">
        <main class="panel">
          <slot />
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
      background-image: linear-gradient(90deg, #ffe1f266 12px, transparent 12px), linear-gradient(#ffe1f266 12px, transparent 12px);
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
</style>
