import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function BackgroundsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">背景・グラデーション</h1>
        <p className="text-gray-400">background-color、background-image、グラデーションで美しい背景を作ろう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">背景関連プロパティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CSSの背景プロパティを使えば、色・画像・グラデーションなど多彩な背景を設定できます：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">background-color</code> - 背景色を指定</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">background-image</code> - 背景画像やグラデーションを指定</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">linear-gradient()</code> - 直線的なグラデーション</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">radial-gradient()</code> - 放射状のグラデーション</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">background-size</code> - 背景のサイズ（cover, contain など）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">background-position</code> - 背景の位置</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">背景色と基本グラデーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">background-color</code>で単色、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">linear-gradient</code>で美しいグラデーションを作れます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="box solid">単色の背景</div>
<div class="box gradient-1">左から右へグラデーション</div>
<div class="box gradient-2">斜めグラデーション</div>
<div class="box gradient-3">3色グラデーション</div>`}
          defaultCss={`.box {
  padding: 24px;
  margin: 10px 0;
  border-radius: 12px;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.solid {
  background-color: #6c5ce7;
}

.gradient-1 {
  background: linear-gradient(to right, #0984e3, #00cec9);
}

.gradient-2 {
  background: linear-gradient(135deg, #fd79a8, #e17055);
}

.gradient-3 {
  background: linear-gradient(to right, #6c5ce7, #0984e3, #00cec9);
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">放射状グラデーションとパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">radial-gradient</code>は中心から広がるグラデーション、
          繰り返しグラデーションでパターンも作れます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="box radial">放射状グラデーション</div>
<div class="box radial-pos">位置をずらした放射状</div>
<div class="box stripes">ストライプパターン</div>
<div class="box checkers">チェック柄風パターン</div>`}
          defaultCss={`.box {
  padding: 30px;
  margin: 10px 0;
  border-radius: 12px;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

.radial {
  background: radial-gradient(circle, #fdcb6e, #e17055);
}

.radial-pos {
  background: radial-gradient(circle at top left, #a29bfe, #6c5ce7, #2d3436);
}

.stripes {
  background: repeating-linear-gradient(
    45deg,
    #0984e3,
    #0984e3 10px,
    #74b9ff 10px,
    #74b9ff 20px
  );
}

.checkers {
  background-color: #dfe6e9;
  background-image:
    linear-gradient(45deg, #b2bec3 25%, transparent 25%),
    linear-gradient(-45deg, #b2bec3 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #b2bec3 75%),
    linear-gradient(-45deg, transparent 75%, #b2bec3 75%);
  background-size: 30px 30px;
  background-position: 0 0, 0 15px, 15px -15px, -15px 0;
  color: #2d3436;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">背景の実用的な使い方</h2>
        <p className="text-gray-400 mb-4">
          グラデーションとテキストを組み合わせて、実用的なカード・バナーを作ってみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="hero">
  <h1>ようこそ！</h1>
  <p>美しいグラデーション背景のヒーローセクション</p>
</div>

<div class="cards">
  <div class="card card-1">
    <h3>プラン A</h3>
    <p>月額 ¥980</p>
  </div>
  <div class="card card-2">
    <h3>プラン B</h3>
    <p>月額 ¥1,980</p>
  </div>
  <div class="card card-3">
    <h3>プラン C</h3>
    <p>月額 ¥3,980</p>
  </div>
</div>`}
          defaultCss={`.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  border-radius: 16px;
  color: white;
  text-align: center;
  font-family: sans-serif;
  margin-bottom: 16px;
}
.hero h1 { margin: 0 0 8px; font-size: 28px; }
.hero p { margin: 0; opacity: 0.9; }

.cards {
  display: flex;
  gap: 12px;
}
.card {
  flex: 1;
  padding: 24px;
  border-radius: 12px;
  color: white;
  font-family: sans-serif;
  text-align: center;
}
.card h3 { margin: 0 0 8px; }
.card p { margin: 0; font-size: 20px; font-weight: bold; }

.card-1 { background: linear-gradient(135deg, #00b894, #00cec9); }
.card-2 { background: linear-gradient(135deg, #0984e3, #6c5ce7); }
.card-3 { background: linear-gradient(135deg, #e17055, #fdcb6e); }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- 好きなグラデーションを作ってみよう -->
<div class="my-box">
  <h2>マイデザイン</h2>
  <p>色を変えたり方向を変えたりしてみよう</p>
</div>`}
          defaultCss={`.my-box {
  background: linear-gradient(to right, #6c5ce7, #0984e3);
  padding: 40px;
  border-radius: 16px;
  color: white;
  text-align: center;
  font-family: sans-serif;
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="backgrounds" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="backgrounds" basePath="/learn/css" color="blue" />
    </div>
  );
}
