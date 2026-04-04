import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function HtmlTextLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">見出しと段落</h1>
        <p className="text-gray-400">テキストを構造化する基本要素を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">見出しタグ（h1〜h6）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          見出しタグは文書の階層構造を表します。<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h1&gt;</code> が最も大きく重要な見出しで、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h6&gt;</code> が最も小さい見出しです。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h1&gt;</code> - ページのメインタイトル（1ページに1つが推奨）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h2&gt;</code> - セクションの見出し</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h3&gt;</code>〜<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h6&gt;</code> - サブセクションの見出し</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">見出しの階層を試してみよう</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<h1>h1 - メインタイトル</h1>
<h2>h2 - セクション見出し</h2>
<h3>h3 - サブセクション</h3>
<h4>h4 - 小見出し</h4>
<h5>h5 - さらに小さい見出し</h5>
<h6>h6 - 最小の見出し</h6>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">段落タグ（p）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;p&gt;</code> タグは段落を表します。
          ブラウザは自動的に段落の前後に余白を追加します。
          HTML内の改行やスペースは、そのまま表示されない点に注意しましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;br&gt;</code> - 強制改行（段落内で改行したいとき）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;hr&gt;</code> - 水平線（セクションの区切り）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">段落と改行</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<h1>私のブログ</h1>

<p>これは最初の段落です。段落タグで囲むと、自動的に前後に余白がつきます。</p>

<p>これは2番目の段落です。<br>brタグを使うと、段落の中で改行できます。</p>

<hr>

<p>水平線（hr）の下に新しいセクションが始まります。</p>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リスト（ul / ol / li）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リストは項目を整理して表示するために使います：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;ul&gt;</code> - 順序なしリスト（箇条書き・ドット付き）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;ol&gt;</code> - 順序付きリスト（番号付き）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;li&gt;</code> - リスト項目（ul または ol の中に配置）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リストを作ってみよう</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<h2>好きな果物（順序なしリスト）</h2>
<ul>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>

<h2>朝のルーティン（順序付きリスト）</h2>
<ol>
  <li>起床</li>
  <li>歯磨き</li>
  <li>朝食</li>
  <li>出発</li>
</ol>

<h2>入れ子のリスト</h2>
<ul>
  <li>フロントエンド
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>バックエンド
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テキストの装飾（strong / em）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テキストに意味を付加するインライン要素です：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;strong&gt;</code> - 重要なテキスト（太字で表示される）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;em&gt;</code> - 強調テキスト（イタリックで表示される）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テキスト装飾を試してみよう</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<p>HTMLは<strong>Webページの構造</strong>を定義する言語です。</p>

<p><em>イタリック</em>で強調したり、<strong>太字</strong>で重要性を示したりできます。</p>

<p>両方を組み合わせることも<strong><em>可能</em></strong>です。</p>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h1&gt;</code>〜<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h6&gt;</code> で見出しの階層を作る</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;p&gt;</code> で段落を作り、<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;br&gt;</code> で改行する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;ul&gt;</code> / <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;ol&gt;</code> でリストを作り、<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;li&gt;</code> で項目を記述する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;strong&gt;</code> で太字、<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;em&gt;</code> でイタリックにできる</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;hr&gt;</code> でセクションを区切る水平線を引ける</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="html" lessonId="text" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="text" basePath="/learn/html" color="orange" />
    </div>
  );
}
