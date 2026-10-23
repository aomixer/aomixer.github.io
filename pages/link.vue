<script setup lang="ts">
import { SITE_TITLE } from '~/utils/site'

useSeoMeta({
  title: `リンク集 / ${SITE_TITLE}`,
  description: 'お絵描きゲーミングウーパー',
  ogTitle: `リンク集 / ${SITE_TITLE}`,
  ogDescription: 'お絵描きゲーミングウーパー',
})
</script>

<template>
  <article>
    <h1 class="page-title">リンク集</h1>
    <p>
      相互リンクは受け付けていません。
    </p>

    <section class="section">
      <h2 class="section-ttl">配信サイト</h2>
      <ul class="section-list">
        <li><a href="https://www.twitch.tv/aomixer" target="_blank" rel="noopener">Twitch</a>：メイン</li>
        <li>
          <a href="https://www.youtube.com/@%E3%81%82%E3%81%8A%E3%81%A4%E3%81%8D" target="_blank" rel="noopener">YouTube</a>：同時配信、アーカイブ
        </li>
        <li><a href="https://www.nicovideo.jp/user/413294" target="_blank" rel="noopener">ニコ生</a>：たまに同時配信</li>
      </ul>
    </section>

    <section class="section">
      <h2 class="section-ttl">グッズ</h2>
      <p>うぱつきのグッズを下記のサイトで販売しています。</p>
      <ul class="section-list">
        <li><a href="https://aomixer.booth.pm/" target="_blank" rel="noopener">BOOTH</a>：アクキーなど</li>
        <li><a href="https://suzuri.jp/aomixer/" target="_blank" rel="noopener">SUZURI</a>：ファッションアイテム多め</li>
      </ul>
    </section>

    <section class="section">
      <h2 class="section-ttl">
        <a href="https://skeb.jp/@aomixer" target="_blank" rel="noopener">Skeb</a>
        <span>（期間限定）</span>
      </h2>
      <p>
        やり取りなく絵やボイスの依頼ができます。<br>
        SD（ミニキャラ）イラストや、ゆるいテイストの絵が得意です。<br>
        ボイスはだぎゃ声でしかやりません。
      </p>
    </section>

    <section class="section">
      <h2 class="section-ttl">支援関連</h2>
      <p>甘やかしたいと思ったときに。</p>
      <ul class="section-list">
        <li>
          <a href="https://www.amazon.jp/hz/wishlist/ls/1IAYKQ5JLAR6Y" target="_blank" rel="noopener">Amazonほしいものリスト</a>
        </li>
        <li><a href="https://giftee.com/u/aomixer" target="_blank" rel="noopener">Giftee</a>：SUSHI!!!!!!!!</li>
      </ul>
    </section>

    <section class="section">
      <h2 class="section-ttl">Special thanks!!</h2>
      <div class="link-list">
        <a href="https://1kbsozai.com/" target="_blank" rel="noopener"><img src="~/assets/img/link/bnr_1kb.gif" alt="1キロバイトの素材屋さん"></a>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
.section {
  margin-top: 2.4rem;
  padding: 1rem;
  border: 3px double #0000ee;
  background: #f0f8ff;
}

.section-ttl {
  margin-bottom: 1rem;
  padding: 0 0 0.8rem 3.2rem;
  border-bottom: 2px dashed #ff1493;
  background: url(~/assets/img/icon_circle.gif) no-repeat top left;
  color: #000080;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: bold;

  span {
    font-size: 1.3rem;
    color: #ff1493;
  }

  img {
    vertical-align: middle;
  }
}

.section-list {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 0 0 0.4rem;
    padding-left: 2.4rem;
    background: url(~/assets/img/icon_heart.gif) no-repeat left .6rem;
  }
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  img {
    vertical-align: middle;
  }
}
</style>
