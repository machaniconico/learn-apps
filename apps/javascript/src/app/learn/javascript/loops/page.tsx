import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function LoopsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ループ</h1>
        <p className="text-gray-400">繰り返し処理のさまざまな方法をマスターしよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ループの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScriptには複数のループ構文があり、用途に応じて使い分けます。
          回数が決まっている場合は<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code>、
          条件で繰り返す場合は<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">while</code>、
          配列を処理するなら<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">for...of</code>や
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">forEach</code>が適しています。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code> — 回数指定のループ</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">while</code> — 条件が真の間ループ</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">do...while</code> — 最低1回は実行</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">for...of</code> — 配列などの反復可能オブジェクト用</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">for...in</code> — オブジェクトのキー用</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">forEach</code> — 配列メソッド</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">break</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">continue</code> — ループの制御</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">for・while・do...while</h2>
        <p className="text-gray-400 mb-4">基本的なループ構文を確認しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }
.code { background: #1e1e1e; color: #d4d4d4; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px; white-space: pre; }`}
          defaultJs={`const out = document.getElementById("output");
let html = "";

// for ループ
let forResult = [];
for (let i = 1; i <= 5; i++) {
  forResult.push(i);
}

// while ループ
let whileResult = [];
let n = 1;
while (n <= 100) {
  whileResult.push(n);
  n *= 2;
}

// do...while ループ（最低1回実行）
let doResult = [];
let x = 10;
do {
  doResult.push(x);
  x++;
} while (x < 10); // 条件は偽だが1回は実行される

// break と continue
let breakResult = [];
for (let i = 1; i <= 10; i++) {
  if (i === 7) break; // 7で終了
  if (i % 2 === 0) continue; // 偶数はスキップ
  breakResult.push(i);
}

html += \`
<div class="section">
  <h3>for ループ (1〜5)</h3>
  <div class="code">for (let i = 1; i <= 5; i++) { ... }</div>
  <div class="result">[\${forResult.join(", ")}]</div>
</div>
<div class="section">
  <h3>while ループ (1から2倍ずつ、100以下)</h3>
  <div class="code">while (n <= 100) { n *= 2; }</div>
  <div class="result">[\${whileResult.join(", ")}]</div>
</div>
<div class="section">
  <h3>do...while (条件が偽でも1回実行)</h3>
  <div class="code">do { ... } while (x < 10); // x=10で開始</div>
  <div class="result">[\${doResult.join(", ")}] （1回だけ実行された）</div>
</div>
<div class="section">
  <h3>break と continue</h3>
  <div class="code">偶数はcontinueでスキップ、7でbreak</div>
  <div class="result">[\${breakResult.join(", ")}]</div>
</div>
\`;

out.innerHTML = html;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">for...of・for...in・forEach</h2>
        <p className="text-gray-400 mb-4">配列やオブジェクトに適したループを使いましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// for...of — 配列の要素を直接取得
const fruits = ["りんご", "バナナ", "みかん"];
let ofResult = [];
for (const fruit of fruits) {
  ofResult.push(fruit);
}

// for...of + entries() でインデックスも取得
let ofEntries = [];
for (const [i, fruit] of fruits.entries()) {
  ofEntries.push(i + ": " + fruit);
}

// for...in — オブジェクトのキーを列挙
const person = { name: "太郎", age: 25, city: "東京" };
let inResult = [];
for (const key in person) {
  inResult.push(key + " → " + person[key]);
}

// forEach — 配列メソッドとしてのループ
let forEachResult = [];
fruits.forEach((fruit, index) => {
  forEachResult.push("#" + (index + 1) + " " + fruit);
});

// 文字列もfor...ofで1文字ずつ
let chars = [];
for (const ch of "Hello") {
  chars.push(ch);
}

out.innerHTML = \`
<div class="section">
  <h3>for...of — 配列の要素を取得</h3>
  <div class="result">\${ofResult.join(", ")}</div>
</div>
<div class="section">
  <h3>for...of + entries() — インデックス付き</h3>
  <div class="result">\${ofEntries.join("\\n")}</div>
</div>
<div class="section">
  <h3>for...in — オブジェクトのキー</h3>
  <div class="result">\${inResult.join("\\n")}</div>
</div>
<div class="section">
  <h3>forEach — 配列メソッド</h3>
  <div class="result">\${forEachResult.join("\\n")}</div>
</div>
<div class="section">
  <h3>for...of 文字列 — 1文字ずつ</h3>
  <div class="result">[\${chars.map(c => '"' + c + '"').join(", ")}]</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">ループを使って九九の表を作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h2>九九の表</h2>
<table id="table"></table>`}
          defaultCss={`body { font-family: sans-serif; text-align: center; }
h2 { color: #f59e0b; }
table { border-collapse: collapse; margin: 0 auto; }
td { width: 40px; height: 40px; text-align: center; border: 1px solid #ddd; font-size: 14px; }
.header { background: #f59e0b; color: #fff; font-weight: bold; }
td:not(.header):hover { background: #fef3c7; }`}
          defaultJs={`const table = document.getElementById("table");
let html = "<tr><td class='header'>×</td>";

// ヘッダー行
for (let i = 1; i <= 9; i++) {
  html += '<td class="header">' + i + '</td>';
}
html += "</tr>";

// 各行
for (let i = 1; i <= 9; i++) {
  html += '<tr><td class="header">' + i + '</td>';
  for (let j = 1; j <= 9; j++) {
    html += "<td>" + (i * j) + "</td>";
  }
  html += "</tr>";
}

table.innerHTML = html;`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="loops" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="loops" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
