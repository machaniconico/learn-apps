import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function FunctionsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数詳細</h1>
        <p className="text-gray-400">アロー関数、クロージャ、高階関数など関数の応用を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数の応用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScriptの関数は「第一級オブジェクト」です。変数に代入したり、引数として渡したり、
          戻り値として返すことができます。この柔軟性が、JavaScriptの大きな強みです。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">アロー関数</code> — 簡潔な関数記法</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">デフォルト引数</code> — 引数の初期値</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">残余引数（rest）</code> — 可変長引数</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">スコープ</code> — 変数の有効範囲</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">クロージャ</code> — 外側の変数を記憶する関数</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">IIFE</code> — 即時実行関数式</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">高階関数</code> — 関数を受け取る/返す関数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アロー関数・デフォルト引数・残余引数</h2>
        <p className="text-gray-400 mb-4">ES6で導入されたモダンな関数構文を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.code { background: #1e1e1e; color: #d4d4d4; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px; white-space: pre; }`}
          defaultJs={`const out = document.getElementById("output");

// 通常の関数
function add(a, b) { return a + b; }

// アロー関数（省略形いろいろ）
const add2 = (a, b) => a + b;
const square = x => x * x;  // 引数1つなら()省略可
const hello = () => "Hello!"; // 引数なし

// デフォルト引数
const greet = (name = "ゲスト", greeting = "こんにちは") => {
  return greeting + "、" + name + "さん！";
};

// 残余引数（rest parameters）
const sum = (...numbers) => {
  return numbers.reduce((acc, n) => acc + n, 0);
};

// 分割代入を引数に
const introduce = ({ name, age }) => {
  return name + "（" + age + "歳）";
};

out.innerHTML = \`
<div class="section">
  <h3>アロー関数</h3>
  <div class="code">const add2 = (a, b) => a + b;
const square = x => x * x;
const hello = () => "Hello!";</div>
  <div class="result">add2(3, 5) → \${add2(3, 5)}
square(4) → \${square(4)}
hello() → \${hello()}</div>
</div>
<div class="section">
  <h3>デフォルト引数</h3>
  <div class="code">const greet = (name = "ゲスト", greeting = "こんにちは") => ...</div>
  <div class="result">greet() → "\${greet()}"
greet("太郎") → "\${greet("太郎")}"
greet("花子", "おはよう") → "\${greet("花子", "おはよう")}"</div>
</div>
<div class="section">
  <h3>残余引数（...rest）</h3>
  <div class="code">const sum = (...numbers) => numbers.reduce(...)</div>
  <div class="result">sum(1, 2, 3) → \${sum(1, 2, 3)}
sum(10, 20, 30, 40) → \${sum(10, 20, 30, 40)}</div>
</div>
<div class="section">
  <h3>分割代入の引数</h3>
  <div class="result">introduce({ name: "太郎", age: 25 }) → "\${introduce({ name: "太郎", age: 25 })}"</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スコープ・クロージャ・高階関数</h2>
        <p className="text-gray-400 mb-4">関数の重要な概念を理解しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.code { background: #1e1e1e; color: #d4d4d4; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px; white-space: pre; }`}
          defaultJs={`const out = document.getElementById("output");

// クロージャ: 外側の変数を記憶
function createCounter() {
  let count = 0; // この変数は外からアクセスできない
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
const counter = createCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
const countResult = counter.getCount();

// 高階関数: 関数を引数に取る
function repeat(n, action) {
  let results = [];
  for (let i = 0; i < n; i++) {
    results.push(action(i));
  }
  return results;
}
const squares = repeat(5, i => (i + 1) * (i + 1));

// 関数を返す関数
function multiplier(factor) {
  return (number) => number * factor;
}
const double = multiplier(2);
const triple = multiplier(3);

// IIFE（即時実行関数式）
const result = (() => {
  const secret = "隠れた値";
  return "IIFEの結果: " + secret;
})();

out.innerHTML = \`
<div class="section">
  <h3>クロージャ — カウンター</h3>
  <div class="code">function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
}</div>
  <div class="result">increment() ×3, decrement() ×1
counter.getCount() → \${countResult}</div>
</div>
<div class="section">
  <h3>高階関数 — 関数を引数に</h3>
  <div class="code">function repeat(n, action) { ... }
const squares = repeat(5, i => (i+1) * (i+1));</div>
  <div class="result">[\${squares.join(", ")}]</div>
</div>
<div class="section">
  <h3>関数を返す関数</h3>
  <div class="code">function multiplier(factor) {
  return (number) => number * factor;
}
const double = multiplier(2);
const triple = multiplier(3);</div>
  <div class="result">double(5) → \${double(5)}
triple(5) → \${triple(5)}</div>
</div>
<div class="section">
  <h3>IIFE（即時実行関数式）</h3>
  <div class="result">\${result}</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">クロージャを使った簡単な計算機を作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>クロージャ計算機</h2>
  <div id="display">0</div>
  <div class="buttons">
    <button onclick="calc.add(7)">+7</button>
    <button onclick="calc.add(3)">+3</button>
    <button onclick="calc.subtract(2)">-2</button>
    <button onclick="calc.multiply(2)">×2</button>
    <button onclick="calc.reset()">リセット</button>
  </div>
  <div id="history"></div>
</div>`}
          defaultCss={`#app { max-width: 400px; margin: 0 auto; text-align: center; }
h2 { color: #f59e0b; }
#display { font-size: 48px; font-weight: bold; color: #f59e0b; margin: 16px 0; }
.buttons { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
button { padding: 10px 20px; border: none; border-radius: 8px; background: #f59e0b; color: #fff; font-size: 16px; cursor: pointer; }
button:hover { background: #d97706; }
#history { margin-top: 16px; text-align: left; font-family: monospace; font-size: 14px; color: #666; }`}
          defaultJs={`// クロージャで状態を管理
const calc = (() => {
  let value = 0;
  let logs = [];

  function update(op) {
    logs.push(op + " → " + value);
    document.getElementById("display").textContent = value;
    document.getElementById("history").innerHTML =
      logs.map(l => "<div>" + l + "</div>").join("");
  }

  return {
    add(n) { value += n; update("+" + n); },
    subtract(n) { value -= n; update("-" + n); },
    multiply(n) { value *= n; update("×" + n); },
    reset() { value = 0; logs = []; update("リセット"); }
  };
})();`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="functions" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="functions" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
