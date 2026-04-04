import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function PositionLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">position</h1>
        <p className="text-gray-400">static、relative、absolute、fixed、stickyで要素の配置方法を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">positionプロパティの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          positionプロパティは要素の配置方法を決定します。top、right、bottom、leftと組み合わせて使います：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">static</code> - デフォルト。通常の流れに従う</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">relative</code> - 元の位置を基準にずらす（元のスペースは保持）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">absolute</code> - 最も近いposition指定済みの親要素を基準に配置</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">fixed</code> - ビューポート（画面）を基準に固定配置</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">sticky</code> - スクロール位置に応じてrelativeとfixedを切り替え</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">z-index</code> - 要素の重なり順を制御</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">relativeとabsolute</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">relative</code>は元の位置からのずれ、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">absolute</code>は親要素からの絶対位置で配置します。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h3>relative の例</h3>
<div class="relative-demo">
  <div class="box">通常</div>
  <div class="box moved">relative で移動</div>
  <div class="box">通常</div>
</div>

<h3>absolute の例（親がrelative）</h3>
<div class="absolute-demo">
  <div class="badge">NEW</div>
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect fill='%2374b9ff' width='200' height='120' rx='8'/%3E%3Ctext x='100' y='65' text-anchor='middle' fill='white' font-size='16'%3E商品画像%3C/text%3E%3C/svg%3E" alt="商品">
  <div class="price">¥1,980</div>
</div>`}
          defaultCss={`h3 {
  font-family: sans-serif;
  margin: 16px 0 8px;
}
/* relative の例 */
.relative-demo {
  display: flex;
  gap: 10px;
}
.box {
  background: #6c5ce7;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  font-family: sans-serif;
}
.moved {
  position: relative;
  top: 20px;
  left: 10px;
  background: #e17055;
}

/* absolute の例 */
.absolute-demo {
  position: relative;
  display: inline-block;
  margin-top: 10px;
}
.absolute-demo img {
  display: block;
  border-radius: 8px;
}
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #d63031;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  font-family: sans-serif;
}
.price {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-family: sans-serif;
  font-weight: bold;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stickyとz-index</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">sticky</code>はスクロールに追従し、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">z-index</code>は要素の重なり順を決めます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h3>z-indexの例（重なり順）</h3>
<div class="stack-container">
  <div class="card card-1">z-index: 3（最前面）</div>
  <div class="card card-2">z-index: 2</div>
  <div class="card card-3">z-index: 1（最背面）</div>
</div>

<h3>中央配置のテクニック</h3>
<div class="center-container">
  <div class="centered-box">
    position: absolute で<br>上下左右中央配置
  </div>
</div>`}
          defaultCss={`h3 {
  font-family: sans-serif;
  margin: 20px 0 10px;
}

/* z-index の例 */
.stack-container {
  position: relative;
  height: 160px;
  margin-bottom: 10px;
}
.card {
  position: absolute;
  padding: 16px 24px;
  border-radius: 10px;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.card-1 {
  background: #d63031;
  top: 10px;
  left: 10px;
  z-index: 3;
}
.card-2 {
  background: #0984e3;
  top: 40px;
  left: 50px;
  z-index: 2;
}
.card-3 {
  background: #00b894;
  top: 70px;
  left: 90px;
  z-index: 1;
}

/* 中央配置 */
.center-container {
  position: relative;
  height: 150px;
  background: #dfe6e9;
  border-radius: 10px;
}
.centered-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #6c5ce7;
  color: white;
  padding: 16px 24px;
  border-radius: 10px;
  font-family: sans-serif;
  text-align: center;
  font-size: 14px;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用例：カード上のバッジとオーバーレイ</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="product-card">
  <div class="product-image">
    <div class="overlay">
      <span>詳細を見る</span>
    </div>
    <div class="sale-badge">SALE</div>
  </div>
  <div class="product-info">
    <h4>おしゃれなTシャツ</h4>
    <p class="original-price">¥3,980</p>
    <p class="sale-price">¥1,990</p>
  </div>
</div>`}
          defaultCss={`.product-card {
  width: 220px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  font-family: sans-serif;
}
.product-image {
  position: relative;
  height: 160px;
  background: linear-gradient(135deg, #74b9ff, #a29bfe);
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.overlay span {
  color: white;
  font-weight: bold;
  border: 2px solid white;
  padding: 8px 16px;
  border-radius: 6px;
}
.product-image:hover .overlay {
  opacity: 1;
}
.sale-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #d63031;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
.product-info {
  padding: 12px;
}
.product-info h4 {
  margin: 0 0 8px;
}
.original-price {
  text-decoration: line-through;
  color: #b2bec3;
  margin: 0;
  font-size: 14px;
}
.sale-price {
  color: #d63031;
  font-weight: bold;
  font-size: 20px;
  margin: 4px 0 0;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- positionを使って自由にレイアウトしてみよう -->
<div class="container">
  <div class="element">要素A</div>
  <div class="element">要素B</div>
</div>`}
          defaultCss={`.container {
  position: relative;
  height: 200px;
  background: #f5f6fa;
  border-radius: 10px;
}
.element {
  position: absolute;
  background: #6c5ce7;
  color: white;
  padding: 16px;
  border-radius: 8px;
  font-family: sans-serif;
}
.element:first-child {
  top: 20px;
  left: 20px;
}
.element:last-child {
  bottom: 20px;
  right: 20px;
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="position" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="position" basePath="/learn/css" color="blue" />
    </div>
  );
}
