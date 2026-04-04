import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function StringsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列操作</h1>
        <p className="text-gray-400">JavaScriptの豊富な文字列メソッドを使いこなそう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScriptの文字列（String）は非常に多くのメソッドを持っています。
          文字列の検索、抽出、変換、置換など、テキスト処理に必要な機能が豊富に揃っています。
        </p>
        <p className="text-gray-300 leading-relaxed mb-2">
          よく使うメソッドを覚えておくと、データの加工やバリデーションが効率的になります。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">slice()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">substring()</code> — 文字列の一部を抽出</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">includes()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">indexOf()</code> — 文字列の検索</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">replace()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">replaceAll()</code> — 文字列の置換</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">split()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">join()</code> — 分割と結合</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">trim()</code> — 前後の空白を除去</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">toUpperCase()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">toLowerCase()</code> — 大文字・小文字変換</li>
          <li>テンプレートリテラル — バッククォートを使った文字列埋め込み</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の検索・抽出</h2>
        <p className="text-gray-400 mb-4">slice、substring、includes、indexOfを使って文字列を操作してみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
#output { line-height: 1.8; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }`}
          defaultJs={`const out = document.getElementById("output");

const text = "JavaScript は楽しいプログラミング言語です";

// slice: 開始位置から終了位置まで抽出
const sliced = text.slice(0, 10);

// substring: sliceと似ているが負の値は0扱い
const sub = text.substring(11, 13);

// includes: 含まれるかチェック（true/false）
const hasWord = text.includes("楽しい");

// indexOf: 最初に見つかった位置（なければ-1）
const pos = text.indexOf("プログラミング");

// trim: 前後の空白を除去
const messy = "   こんにちは   ";
const trimmed = messy.trim();

// toUpperCase / toLowerCase
const mixed = "Hello World";
const upper = mixed.toUpperCase();
const lower = mixed.toLowerCase();

out.innerHTML = \`
<div class="section">
  <h3>元の文字列</h3>
  <div class="result">"\${text}"</div>
</div>
<div class="section">
  <h3>slice(0, 10)</h3>
  <div class="result">"\${sliced}"</div>
</div>
<div class="section">
  <h3>substring(11, 13)</h3>
  <div class="result">"\${sub}"</div>
</div>
<div class="section">
  <h3>includes("楽しい")</h3>
  <div class="result">\${hasWord}</div>
</div>
<div class="section">
  <h3>indexOf("プログラミング")</h3>
  <div class="result">\${pos}</div>
</div>
<div class="section">
  <h3>trim() — "   こんにちは   " → </h3>
  <div class="result">"\${trimmed}"</div>
</div>
<div class="section">
  <h3>toUpperCase() / toLowerCase()</h3>
  <div class="result">"\${upper}" / "\${lower}"</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">置換・分割・結合・テンプレートリテラル</h2>
        <p className="text-gray-400 mb-4">replace、split、join、テンプレートリテラルを活用しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
#output { line-height: 1.8; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }
.code { background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-size: 13px; white-space: pre; }`}
          defaultJs={`const out = document.getElementById("output");

// replace: 最初の一致のみ置換
const msg1 = "りんご と りんご";
const replaced = msg1.replace("りんご", "みかん");

// replaceAll: すべて置換
const replacedAll = msg1.replaceAll("りんご", "みかん");

// split: 文字列を配列に分割
const csv = "東京,大阪,名古屋,福岡";
const cities = csv.split(",");

// join: 配列を文字列に結合
const joined = cities.join(" → ");

// テンプレートリテラル
const name = "太郎";
const age = 25;
const greeting = \\\`こんにちは、\\\${name}さん！あなたは\\\${age}歳ですね。\\\`;

// 複数行の文字列
const multiline = \\\`1行目
2行目
3行目\\\`;

out.innerHTML = \`
<div class="section">
  <h3>replace("りんご", "みかん")</h3>
  <div class="result">"\${replaced}"</div>
</div>
<div class="section">
  <h3>replaceAll("りんご", "みかん")</h3>
  <div class="result">"\${replacedAll}"</div>
</div>
<div class="section">
  <h3>split(",") — "東京,大阪,名古屋,福岡"</h3>
  <div class="result">[\${cities.map(c => '"' + c + '"').join(", ")}]</div>
</div>
<div class="section">
  <h3>join(" → ")</h3>
  <div class="result">"\${joined}"</div>
</div>
<div class="section">
  <h3>テンプレートリテラル</h3>
  <div class="result">\${greeting}</div>
</div>
<div class="section">
  <h3>複数行テンプレートリテラル</h3>
  <div class="result" style="white-space:pre">\${multiline}</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">文字列メソッドを組み合わせて、テキスト処理プログラムを作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>テキスト変換ツール</h2>
  <textarea id="input" rows="3" placeholder="テキストを入力..."></textarea>
  <div class="buttons">
    <button onclick="toUpper()">大文字に</button>
    <button onclick="toLower()">小文字に</button>
    <button onclick="reverse()">逆順に</button>
    <button onclick="countChars()">文字数</button>
  </div>
  <div id="result"></div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; }
textarea { width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 16px; box-sizing: border-box; }
.buttons { display: flex; gap: 8px; margin: 12px 0; flex-wrap: wrap; }
button { background: #f59e0b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; }
button:hover { background: #d97706; }
#result { background: #f5f5f5; padding: 12px; border-radius: 8px; min-height: 40px; font-size: 16px; }`}
          defaultJs={`function toUpper() {
  const text = document.getElementById("input").value;
  document.getElementById("result").textContent = text.toUpperCase();
}
function toLower() {
  const text = document.getElementById("input").value;
  document.getElementById("result").textContent = text.toLowerCase();
}
function reverse() {
  const text = document.getElementById("input").value;
  document.getElementById("result").textContent = text.split("").reverse().join("");
}
function countChars() {
  const text = document.getElementById("input").value;
  const noSpaces = text.replace(/\\s/g, "").length;
  document.getElementById("result").textContent =
    "全体: " + text.length + "文字 / 空白除く: " + noSpaces + "文字";
}`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="strings" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="strings" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
