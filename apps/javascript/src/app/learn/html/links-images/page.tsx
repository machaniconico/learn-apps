import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function HtmlLinksImagesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リンクと画像</h1>
        <p className="text-gray-400">Webページ同士をつなぎ、画像を表示する方法を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リンク（aタグ）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;a&gt;</code> タグは、他のページやリソースへのリンクを作成します。
          Webの「ハイパーテキスト」の核となる要素です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">href</code> - リンク先のURLを指定する属性（必須）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">target=&quot;_blank&quot;</code> - 新しいタブでリンクを開く</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">rel=&quot;noopener noreferrer&quot;</code> - target=&quot;_blank&quot; と一緒に使うセキュリティ対策</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">いろいろなリンク</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<h2>リンクの種類</h2>

<!-- 基本のリンク -->
<p><a href="https://example.com">基本のリンク</a></p>

<!-- 新しいタブで開くリンク -->
<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">
  新しいタブで開く
</a></p>

<!-- ページ内リンク -->
<p><a href="#section2">セクション2へジャンプ</a></p>

<!-- メールリンク -->
<p><a href="mailto:hello@example.com">メールを送る</a></p>

<br><br><br><br><br>

<h2 id="section2">セクション2</h2>
<p>ページ内リンクでここにジャンプしました。</p>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">画像（imgタグ）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;img&gt;</code> タグで画像を表示します。
          閉じタグは不要な「空要素」です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">src</code> - 画像ファイルのパス（必須）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">alt</code> - 画像が表示できないときの代替テキスト（必須・アクセシビリティ上重要）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">width</code> / <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">height</code> - 画像のサイズ指定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">画像を表示してみよう</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<h2>画像の表示</h2>

<!-- 基本の画像表示 -->
<img
  src="https://via.placeholder.com/300x200/6c5ce7/ffffff?text=Sample+Image"
  alt="サンプル画像"
  width="300"
  height="200"
>

<p>上の画像は300x200ピクセルです。</p>

<!-- サイズを変更した画像 -->
<img
  src="https://via.placeholder.com/150x150/00b894/ffffff?text=Small"
  alt="小さい画像"
  width="150"
  height="150"
>

<!-- altテキストの重要性 -->
<p>↓ 存在しない画像（altテキストが表示される）</p>
<img src="not-found.jpg" alt="この画像は見つかりません">`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">相対パスと絶対パス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リンクや画像のパス指定には2つの方法があります：
        </p>
        <ul className="space-y-3 text-gray-300 text-sm">
          <li>
            <strong className="text-white">絶対パス</strong> - 完全なURLを指定<br />
            <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">https://example.com/images/photo.jpg</code>
          </li>
          <li>
            <strong className="text-white">相対パス</strong> - 現在のファイルからの相対位置<br />
            <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">./images/photo.jpg</code>（同じフォルダのimagesフォルダ内）<br />
            <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">../photo.jpg</code>（1つ上のフォルダ）
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">画像リンクを作ろう</h2>
        <p className="text-gray-400 mb-4">
          aタグの中にimgタグを入れると、クリックできる画像リンクになります。
        </p>
        <CodePlayground
          mode="html"
          defaultHtml={`<h2>画像をクリックできるリンクにする</h2>

<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  <img
    src="https://via.placeholder.com/250x150/e17055/ffffff?text=Click+Me!"
    alt="クリックしてリンク先へ"
    width="250"
    height="150"
  >
</a>

<p>上の画像はリンクになっています。</p>

<h2>ナビゲーションメニューの例</h2>
<nav>
  <a href="#home">ホーム</a> |
  <a href="#about">私について</a> |
  <a href="#works">作品集</a> |
  <a href="#contact">お問い合わせ</a>
</nav>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;a href=&quot;URL&quot;&gt;</code> でリンクを作成する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">target=&quot;_blank&quot;</code> で新しいタブに開ける</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;img src=&quot;...&quot; alt=&quot;...&quot;&gt;</code> で画像を表示する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">alt</code> 属性はアクセシビリティとSEOの両方で重要</li>
          <li>絶対パスは完全なURL、相対パスは現在位置からの相対位置で指定する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="html" lessonId="links-images" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="links-images" basePath="/learn/html" color="orange" />
    </div>
  );
}
