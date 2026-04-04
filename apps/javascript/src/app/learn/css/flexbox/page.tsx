import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function CssFlexboxLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flexboxレイアウト</h1>
        <p className="text-gray-400">要素を横並びや中央揃えにする強力なレイアウト手法を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Flexboxとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Flexbox（Flexible Box Layout）は、1次元のレイアウトを簡単に制御できるCSSの仕組みです。
          親要素に <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">display: flex</code> を指定するだけで、
          子要素が横並びになり、様々な配置を制御できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><strong className="text-white">フレックスコンテナ</strong> - <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">display: flex</code> を持つ親要素</li>
          <li><strong className="text-white">フレックスアイテム</strong> - コンテナの直接の子要素</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">display: flex の基本</h2>
        <CodePlayground
          mode="css"
          defaultHtml={`<h3>flexなし（通常の表示）</h3>
<div class="no-flex">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>

<h3>display: flex あり</h3>
<div class="with-flex">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>`}
          defaultCss={`.no-flex {
  background: #f0f0f0;
  padding: 10px;
  margin-bottom: 20px;
}

.with-flex {
  display: flex;
  background: #f0f0f0;
  padding: 10px;
}

.item {
  background: #6c5ce7;
  color: white;
  padding: 20px 30px;
  margin: 5px;
  border-radius: 8px;
  font-family: sans-serif;
  font-size: 18px;
  font-weight: bold;
}

h3 {
  font-family: sans-serif;
  color: #2d3436;
}`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">flex-direction</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フレックスアイテムの並ぶ方向を指定します：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">row</code>（デフォルト）- 横方向（左→右）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">row-reverse</code> - 横方向（右→左）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">column</code> - 縦方向（上→下）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">column-reverse</code> - 縦方向（下→上）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">justify-content（主軸の配置）</h2>
        <p className="text-gray-400 mb-4">
          主軸方向（横並びの場合は水平方向）のアイテム配置を制御します。値を変えて試してみましょう。
        </p>
        <CodePlayground
          mode="css"
          defaultHtml={`<h3>flex-start（デフォルト）</h3>
<div class="container start">
  <div class="item">A</div><div class="item">B</div><div class="item">C</div>
</div>

<h3>center</h3>
<div class="container center">
  <div class="item">A</div><div class="item">B</div><div class="item">C</div>
</div>

<h3>space-between</h3>
<div class="container between">
  <div class="item">A</div><div class="item">B</div><div class="item">C</div>
</div>

<h3>space-around</h3>
<div class="container around">
  <div class="item">A</div><div class="item">B</div><div class="item">C</div>
</div>

<h3>space-evenly</h3>
<div class="container evenly">
  <div class="item">A</div><div class="item">B</div><div class="item">C</div>
</div>`}
          defaultCss={`.container {
  display: flex;
  background: #dfe6e9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.start   { justify-content: flex-start; }
.center  { justify-content: center; }
.between { justify-content: space-between; }
.around  { justify-content: space-around; }
.evenly  { justify-content: space-evenly; }

.item {
  background: #0984e3;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-family: sans-serif;
  font-weight: bold;
}
h3 { font-family: sans-serif; color: #2d3436; font-size: 14px; margin: 8px 0 4px; }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">align-items（交差軸の配置）</h2>
        <p className="text-gray-400 mb-4">
          交差軸方向（横並びの場合は垂直方向）のアイテム配置を制御します。
        </p>
        <CodePlayground
          mode="css"
          defaultHtml={`<div class="container">
  <div class="item tall">高い</div>
  <div class="item">普通</div>
  <div class="item short">低い</div>
</div>`}
          defaultCss={`.container {
  display: flex;
  align-items: center; /* stretch | flex-start | flex-end | center | baseline */
  justify-content: center;
  gap: 12px;
  height: 200px;
  background: #dfe6e9;
  border-radius: 8px;
  padding: 10px;
}

.item {
  background: #00b894;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  font-family: sans-serif;
  font-weight: bold;
}
.tall { padding: 40px 24px; }
.short { padding: 8px 24px; }

/* align-items の値を変えてみよう:
   stretch   - 親の高さいっぱいに伸びる
   flex-start - 上揃え
   flex-end   - 下揃え
   center     - 中央揃え
   baseline   - テキストのベースライン揃え */`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">gap / flex-wrap / flex-grow</h2>
        <p className="text-gray-400 mb-4">
          アイテム間の余白、折り返し、伸縮を制御するプロパティです。
        </p>
        <CodePlayground
          mode="css"
          defaultHtml={`<h3>gap と flex-wrap</h3>
<div class="wrap-container">
  <div class="card">カード1</div>
  <div class="card">カード2</div>
  <div class="card">カード3</div>
  <div class="card">カード4</div>
  <div class="card">カード5</div>
</div>

<h3>flex-grow</h3>
<div class="grow-container">
  <div class="sidebar">サイドバー</div>
  <div class="main">メイン（flex-grow: 1）</div>
</div>`}
          defaultCss={`.wrap-container {
  display: flex;
  flex-wrap: wrap;   /* はみ出したら折り返す */
  gap: 12px;         /* アイテム間の余白 */
  background: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.card {
  background: #6c5ce7;
  color: white;
  padding: 20px 30px;
  border-radius: 8px;
  font-family: sans-serif;
  min-width: 120px;
}

.grow-container {
  display: flex;
  gap: 12px;
  background: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
}

.sidebar {
  background: #fdcb6e;
  color: #2d3436;
  padding: 20px;
  border-radius: 8px;
  font-family: sans-serif;
  width: 150px;
  flex-shrink: 0;  /* 縮まない */
}

.main {
  background: #00cec9;
  color: white;
  padding: 20px;
  border-radius: 8px;
  font-family: sans-serif;
  flex-grow: 1;    /* 残りの幅を占める */
}

h3 { font-family: sans-serif; color: #2d3436; font-size: 14px; }`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">display: flex</code> で子要素が横並びになる</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">justify-content</code> で主軸方向（水平）の配置を制御</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">align-items</code> で交差軸方向（垂直）の配置を制御</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">flex-direction</code> で並び方向を変更できる</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">gap</code> でアイテム間の余白、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">flex-wrap</code> で折り返しを制御</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">flex-grow</code> / <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">flex-shrink</code> でアイテムの伸縮を制御</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="css" lessonId="flexbox" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="flexbox" basePath="/learn/css" color="blue" />
    </div>
  );
}
