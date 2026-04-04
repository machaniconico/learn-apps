import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function CssSelectorsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セレクタとプロパティ</h1>
        <p className="text-gray-400">CSSでHTML要素を選択し、スタイルを適用する方法を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CSSとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CSS（Cascading Style Sheets）は、HTMLの見た目を装飾するための言語です。
          色、サイズ、配置、アニメーションなど、Webページのビジュアルをすべてコントロールできます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          CSSの基本的な書き方は「<strong className="text-white">セレクタ</strong> &#123; <strong className="text-white">プロパティ</strong>: <strong className="text-white">値</strong>; &#125;」です。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本のセレクタ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          要素を選択する3つの基本的なセレクタがあります：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">要素セレクタ</code> - タグ名で選択（例: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">p</code>, <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">h1</code>）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">クラスセレクタ</code> - class属性で選択（例: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">.highlight</code>）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">IDセレクタ</code> - id属性で選択（例: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#header</code>）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セレクタを試してみよう</h2>
        <CodePlayground
          mode="css"
          defaultHtml={`<h1>見出しのスタイル</h1>
<p>普通の段落テキストです。</p>
<p class="highlight">ハイライトされた段落です。</p>
<p class="highlight">こちらもハイライトです。</p>
<p id="special">特別なIDを持つ段落です。</p>`}
          defaultCss={`/* 要素セレクタ: すべてのh1を装飾 */
h1 {
  color: #6c5ce7;
  font-size: 28px;
}

/* 要素セレクタ: すべてのpを装飾 */
p {
  color: #2d3436;
  font-size: 16px;
  line-height: 1.6;
}

/* クラスセレクタ: .highlight を持つ要素 */
.highlight {
  background-color: #ffeaa7;
  padding: 8px 12px;
  border-radius: 4px;
}

/* IDセレクタ: #special を持つ要素 */
#special {
  color: #d63031;
  font-weight: bold;
  border-left: 4px solid #d63031;
  padding-left: 12px;
}`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">結合子（コンビネータ）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          セレクタを組み合わせて、より具体的に要素を選択できます：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">div p</code> - 子孫セレクタ（div内のすべてのp）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">div &gt; p</code> - 子セレクタ（divの直接の子のp）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">h1 + p</code> - 隣接兄弟セレクタ（h1の直後のp）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">h1 ~ p</code> - 一般兄弟セレクタ（h1以降のすべてのp）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">結合子を使ってみよう</h2>
        <CodePlayground
          mode="css"
          defaultHtml={`<div class="container">
  <h2>コンテナの見出し</h2>
  <p>コンテナ直下の段落1</p>
  <p>コンテナ直下の段落2</p>
  <div class="inner">
    <p>内側のdiv内の段落</p>
  </div>
</div>
<p>コンテナの外の段落</p>`}
          defaultCss={`/* 子孫セレクタ: container内のすべてのp */
.container p {
  color: #0984e3;
}

/* 子セレクタ: containerの直接の子のpだけ */
.container > p {
  font-weight: bold;
  border-bottom: 2px solid #0984e3;
  padding-bottom: 4px;
}

/* 隣接兄弟: h2の直後のpだけ */
h2 + p {
  font-size: 18px;
  color: #e17055;
}

.container {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">詳細度（Specificity）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のCSSルールが同じ要素に適用される場合、「詳細度」が高いルールが優先されます：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">要素セレクタ（p）</code> → 詳細度: 低</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">クラスセレクタ（.text）</code> → 詳細度: 中</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">IDセレクタ（#main）</code> → 詳細度: 高</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">インラインスタイル</code> → 詳細度: 最高</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mt-4">
          同じ詳細度の場合は、後に書かれたルールが優先されます（カスケード）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よく使うプロパティ</h2>
        <CodePlayground
          mode="css"
          defaultHtml={`<div class="card">
  <h2 class="card-title">カードのタイトル</h2>
  <p class="card-text">CSSの基本的なプロパティを使って、見た目を整えています。色、余白、フォントサイズなどを変えてみましょう。</p>
</div>`}
          defaultCss={`/* color: テキストの色 */
/* font-size: 文字サイズ */
/* font-weight: 文字の太さ */
/* margin: 外側の余白 */
/* padding: 内側の余白 */
/* background-color: 背景色 */
/* border-radius: 角丸 */

.card {
  background-color: #ffffff;
  padding: 24px;
  margin: 16px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.card-title {
  color: #2d3436;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}

.card-text {
  color: #636e72;
  font-size: 15px;
  line-height: 1.7;
}`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>要素セレクタ（<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">p</code>）、クラスセレクタ（<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">.class</code>）、IDセレクタ（<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#id</code>）が基本</li>
          <li>結合子を使えば、親子・兄弟関係で要素を絞り込める</li>
          <li>詳細度によって、どのスタイルが優先されるか決まる</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">color</code>、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">font-size</code>、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">margin</code>、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding</code> がよく使うプロパティ</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="css" lessonId="selectors" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="selectors" basePath="/learn/css" color="blue" />
    </div>
  );
}
