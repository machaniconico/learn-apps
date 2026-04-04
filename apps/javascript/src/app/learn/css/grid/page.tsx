import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function GridLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Gridレイアウト</h1>
        <p className="text-gray-400">display: gridを使って、2次元のレイアウトを自在にコントロールしよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CSS Gridの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CSS Gridは行と列の2次元レイアウトを作るための仕組みです。Flexboxが1次元（横or縦）なのに対し、Gridは両方向を同時に制御できます：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">display: grid</code> - グリッドコンテナを作成</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">grid-template-columns</code> - 列の数とサイズを定義</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">grid-template-rows</code> - 行の数とサイズを定義</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">gap</code> - グリッド間の余白</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">grid-column / grid-row</code> - アイテムの配置範囲を指定</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">fr</code> - 残りスペースの比率を指定する単位</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本のグリッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">grid-template-columns</code>で列を定義し、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">gap</code>で間隔を設定します。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h3>3列の均等グリッド</h3>
<div class="grid-3col">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>

<h3>異なるサイズの列</h3>
<div class="grid-mixed">
  <div class="item">サイドバー</div>
  <div class="item">メインコンテンツ</div>
  <div class="item">広告</div>
</div>`}
          defaultCss={`h3 {
  font-family: sans-serif;
  margin: 16px 0 8px;
}
.grid-3col {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.grid-mixed {
  display: grid;
  grid-template-columns: 200px 1fr 150px;
  gap: 10px;
}
.item {
  background: #6c5ce7;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">グリッドアイテムの配置（span）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">grid-column</code>や
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">grid-row</code>で、アイテムを複数セルにまたがって配置できます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="layout">
  <div class="item header">ヘッダー（横3列分）</div>
  <div class="item sidebar">サイドバー</div>
  <div class="item main">メインコンテンツ（横2列分）</div>
  <div class="item footer">フッター（横3列分）</div>
</div>`}
          defaultCss={`.layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 200px auto;
  gap: 10px;
  font-family: sans-serif;
}
.item {
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header {
  grid-column: 1 / 4;
  background: #2d3436;
}
.sidebar {
  grid-column: 1 / 2;
  background: #0984e3;
}
.main {
  grid-column: 2 / 4;
  background: #00b894;
}
.footer {
  grid-column: 1 / 4;
  background: #2d3436;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">repeat()とauto-fit/auto-fill</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">repeat()</code>関数と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">minmax()</code>を使うと、レスポンシブなグリッドが簡単に作れます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="gallery">
  <div class="card">カード 1</div>
  <div class="card">カード 2</div>
  <div class="card">カード 3</div>
  <div class="card">カード 4</div>
  <div class="card">カード 5</div>
  <div class="card">カード 6</div>
  <div class="card">カード 7</div>
  <div class="card">カード 8</div>
</div>`}
          defaultCss={`/* auto-fitで自動的に列数が変わる */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}
.card {
  background: linear-gradient(135deg, #6c5ce7, #0984e3);
  color: white;
  padding: 24px 16px;
  border-radius: 10px;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 14px;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- グリッドレイアウトを自由に作ってみよう -->
<div class="my-grid">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
  <div class="box">D</div>
</div>`}
          defaultCss={`.my-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.box {
  background: #00b894;
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="grid" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="grid" basePath="/learn/css" color="blue" />
    </div>
  );
}
