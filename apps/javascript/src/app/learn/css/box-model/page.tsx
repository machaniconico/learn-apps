import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function CssBoxModelLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ボックスモデル</h1>
        <p className="text-gray-400">すべてのHTML要素は「箱」として扱われる仕組みを理解しよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ボックスモデルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CSSでは、すべてのHTML要素が「ボックス（箱）」として扱われます。
          ボックスは内側から順に4つの領域で構成されています：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">content</code> - コンテンツ領域（テキストや画像が表示される部分）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding</code> - 内側の余白（コンテンツとボーダーの間）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">border</code> - ボーダー（枠線）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">margin</code> - 外側の余白（他の要素との間隔）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ボックスモデルを視覚的に確認</h2>
        <CodePlayground
          mode="css"
          defaultHtml={`<div class="box">
  <p>コンテンツ領域</p>
</div>
<div class="box second">
  <p>2番目のボックス</p>
</div>`}
          defaultCss={`.box {
  /* コンテンツの幅と高さ */
  width: 250px;
  height: 100px;

  /* padding: 内側の余白 */
  padding: 20px;

  /* border: 枠線 */
  border: 4px solid #0984e3;

  /* margin: 外側の余白 */
  margin: 20px;

  background-color: #dfe6e9;
  color: #2d3436;
  font-family: sans-serif;
}

.second {
  border-color: #e17055;
  background-color: #fab1a0;
}

/* 実際のボックスの幅 =
   width + padding左右 + border左右
   = 250 + 40 + 8 = 298px */`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">padding（内側の余白）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          paddingはコンテンツとボーダーの間の余白です。方向ごとに個別指定もできます：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding: 20px;</code> - 上下左右すべて20px</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding: 10px 20px;</code> - 上下10px、左右20px</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding: 10px 20px 30px 40px;</code> - 上、右、下、左（時計回り）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding-top</code>, <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding-right</code>, <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding-bottom</code>, <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding-left</code> - 個別指定</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">margin（外側の余白）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          marginは要素の外側の余白で、他の要素との間隔を制御します。paddingと同じ記法が使えます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">margin: auto;</code> - ブロック要素を中央揃え（左右）</li>
          <li>隣り合う垂直方向のmarginは「マージンの相殺」が起こる（大きい方だけ適用される）</li>
          <li>marginには負の値も設定できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">padding と margin の違い</h2>
        <CodePlayground
          mode="css"
          defaultHtml={`<div class="outer">
  <div class="box-a">paddingが大きい箱</div>
  <div class="box-b">marginが大きい箱</div>
  <div class="box-c">中央揃えの箱</div>
</div>`}
          defaultCss={`.outer {
  background: #f8f9fa;
  padding: 10px;
  font-family: sans-serif;
}

.box-a {
  background: #a29bfe;
  color: white;
  padding: 40px;
  margin: 10px;
  border: 2px solid #6c5ce7;
}

.box-b {
  background: #55efc4;
  color: #2d3436;
  padding: 10px;
  margin: 40px;
  border: 2px solid #00b894;
}

.box-c {
  background: #fdcb6e;
  color: #2d3436;
  padding: 15px;
  width: 200px;
  margin: 20px auto; /* 中央揃え */
  text-align: center;
  border: 2px solid #e17055;
}`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">box-sizing: border-box</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デフォルトでは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">width</code> はコンテンツ領域だけの幅です。
          paddingとborderを足すと、実際の表示サイズが指定値より大きくなります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">box-sizing: border-box</code> を使うと、
          paddingとborderを含めた合計が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">width</code> になるため、計算が簡単になります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">box-sizing の比較</h2>
        <CodePlayground
          mode="css"
          defaultHtml={`<div class="content-box">content-box（デフォルト）<br>width: 200px + padding + border</div>
<div class="border-box">border-box<br>width: 200px（padding・border込み）</div>`}
          defaultCss={`.content-box {
  box-sizing: content-box; /* デフォルト */
  width: 200px;
  padding: 20px;
  border: 5px solid #d63031;
  background: #fab1a0;
  margin-bottom: 16px;
  font-family: sans-serif;
  font-size: 14px;
  /* 実際の幅: 200 + 40 + 10 = 250px */
}

.border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid #0984e3;
  background: #74b9ff;
  font-family: sans-serif;
  font-size: 14px;
  /* 実際の幅: ぴったり200px */
}

/* 実務ではすべての要素に border-box を適用するのが一般的 */
/* *, *::before, *::after {
  box-sizing: border-box;
} */`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>すべてのHTML要素は content → padding → border → margin の「ボックス」で構成される</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">padding</code> は内側の余白、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">margin</code> は外側の余白</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">margin: auto</code> でブロック要素を中央揃えできる</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">box-sizing: border-box</code> を使うとサイズ計算が直感的になる</li>
          <li>実務では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">* &#123; box-sizing: border-box; &#125;</code> をリセットCSSに含めるのが一般的</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="css" lessonId="box-model" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="box-model" basePath="/learn/css" color="blue" />
    </div>
  );
}
