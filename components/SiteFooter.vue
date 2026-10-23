<script setup lang="ts">
import { computed } from 'vue'

const year = new Date().getFullYear()




const flavorTexts = [
  "Hello world", // 0時~
  "つよい サイト よわい サイト そんなの ひとの かって",
  "寝ろ",
  "みすてぃっく☆ばる～んをやりましょう",
  "外、明るくない？",
  "おれは しょうきに もどった！",
  "しょーがねーだろ赤ちゃんなんだから",
  "腕立て伏せでもしていろ",
  "そんな装備で大丈夫か？",
  "勝てばよかろうなのだァァァッ!!",
  "アーバロン、アーバロン、うーるーわーしーの〜〜",
  "たこ焼きライス",
  "ちがう！！もっと真剣になるのだ！",
  "私が町長です。",
  "う～ん、でかい。",
  "見つけたよ。誰にも渡さないよ。これで大金持ちだよ！",
  "エル・プサイ・コングルゥ",
  "チャームポイントは泣きボクロ",
  "ジュブブデモ・フレ・フメルジャン",
  "あきらめたらそこで試合終了だよ",
  "心じゃよッ！",
  "こんなさいとにまじになっちゃってどうするの",
  "君のような勘のいいガキは嫌いだよ",
  "馬券は自己責任ですからね"  // 23時~
]

const currentFlavorText = computed(() => {
  const hours = new Date().getHours()
  return flavorTexts[hours] ?? "Hello world"
})
</script>

<template>
  <footer class="footer">
    <hr class="footer__hr">
    <p class="footer__line">
      <span class="footer__blink">◆</span>
      {{ currentFlavorText }}
      <span class="footer__blink">◆</span>
    </p>
    <p class="footer__copy">
      ↑時間帯によってメッセージが変わります
    </p>
    <p class="footer__copy">
      &copy; 2003-{{ year }} aomixer All rights reserved.<br>
      Since 2003.2.3
    </p>
  </footer>
</template>

<style scoped lang="scss">
@use "~/assets/styles/variables" as *;

.footer {
  margin-top: 1.6rem;
  // color: #ff9;
  font-family: var(--font-display);
  font-size: 1.4rem;
  text-align: center;
  // text-shadow: 1px 1px 0 #fff;

  @include pc {
    margin-top: 3.2rem;
  }

  &__hr {
    margin: 0 0 1.6rem;

    @include pc {
      margin-bottom: 3.2rem;
    }
  }

  &__line {
    margin: 0 0 0.6rem;
    // color: #0ff;
  }

  &__blink {
    color: #ff1493;
    animation: twinkle 1s steps(2, end) infinite;
  }

  &__copy {
    line-height: 1.6;
    font-size: 1.1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
