import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function SemanticLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セマンティックHTML</h1>
        <p className="text-gray-400">意味のあるタグでページの構造を明確にしよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">セマンティックHTMLとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          「セマンティック」は「意味のある」という意味です。divの代わりに、その内容の「意味」を表すタグを使うことで、
          ブラウザ・検索エンジン・スクリーンリーダーがページの構造を正しく理解できるようになります。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <h3 className="font-semibold text-red-400 mb-2">悪い例</h3>
            <pre className="text-sm text-gray-400 font-mono">&lt;div class=&quot;header&quot;&gt;...&lt;/div&gt;
&lt;div class=&quot;nav&quot;&gt;...&lt;/div&gt;
&lt;div class=&quot;main&quot;&gt;...&lt;/div&gt;
&lt;div class=&quot;footer&quot;&gt;...&lt;/div&gt;</pre>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h3 className="font-semibold text-green-400 mb-2">良い例</h3>
            <pre className="text-sm text-gray-400 font-mono">&lt;header&gt;...&lt;/header&gt;
&lt;nav&gt;...&lt;/nav&gt;
&lt;main&gt;...&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">主なセマンティックタグ</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<header>
  <h1>サイト名</h1>
  <nav>
    <a href="/">ホーム</a>
    <a href="/about">概要</a>
    <a href="/contact">お問い合わせ</a>
  </nav>
</header>

<main>
  <article>
    <h2>記事タイトル</h2>
    <p>記事の本文がここに入ります。articleは独立したコンテンツのまとまりです。</p>
    <time datetime="2026-03-28">2026年3月28日</time>
  </article>

  <section>
    <h2>セクション見出し</h2>
    <p>sectionはテーマでグループ化された内容です。</p>
  </section>

  <aside>
    <h3>サイドバー</h3>
    <p>asideは本文に関連するが補足的な内容です。</p>
  </aside>
</main>

<footer>
  <p>&copy; 2026 サイト名. All rights reserved.</p>
</footer>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">タグの使い分け</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;header&gt;</code><span className="text-gray-300">ページやセクションのヘッダー（ロゴ、ナビ）</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;nav&gt;</code><span className="text-gray-300">ナビゲーションリンクのまとまり</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;main&gt;</code><span className="text-gray-300">ページの主要コンテンツ（1ページに1つ）</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;article&gt;</code><span className="text-gray-300">独立した記事やブログ投稿</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;section&gt;</code><span className="text-gray-300">テーマ別のセクション</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;aside&gt;</code><span className="text-gray-300">サイドバー、補足情報</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;footer&gt;</code><span className="text-gray-300">ページやセクションのフッター</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;figure&gt;</code><span className="text-gray-300">画像やイラスト+キャプション</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;time&gt;</code><span className="text-gray-300">日付・時刻</span></div>
          <div className="flex gap-3"><code className="text-orange-400 font-mono w-24 shrink-0">&lt;mark&gt;</code><span className="text-gray-300">ハイライトされたテキスト</span></div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">セマンティックタグを使ってブログページの構造を作ってみましょう。</p>
        <CodePlayground
          mode="html"
          defaultHtml={`<!-- セマンティックタグでブログページを作ろう -->
<header>
  <h1>My Blog</h1>
</header>

<main>
  <article>
    <h2>最初の記事</h2>
    <p>ここに内容を書く</p>
  </article>
</main>

<footer>
  <p>フッター</p>
</footer>`}
        />
      </section>
      <LessonCompleteButton categoryId="html" lessonId="semantic" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="semantic" basePath="/learn/html" color="orange" />
    </div>
  );
}
