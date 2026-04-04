import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function ArraysLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列メソッド</h1>
        <p className="text-gray-400">配列の強力なメソッドを使ってデータを自在に操作しよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列メソッドの概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScriptの配列（Array）には、データの変換・フィルタリング・集計などを行う便利なメソッドが多数用意されています。
          これらを使いこなすことで、ループを使わずにデータを効率的に処理できます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">map()</code> — 各要素を変換して新しい配列を作成</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">filter()</code> — 条件に合う要素だけ抽出</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">reduce()</code> — 配列を1つの値にまとめる</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">find()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">findIndex()</code> — 条件に合う要素を検索</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">some()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">every()</code> — 条件チェック</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">sort()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">reverse()</code> — 並べ替え</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">flat()</code> — ネストされた配列を平坦化</li>
          <li>スプレッド構文 — 配列の展開・結合</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">map・filter・reduce</h2>
        <p className="text-gray-400 mb-4">配列操作の三大メソッドを使いこなしましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }
.arrow { color: #f59e0b; font-weight: bold; margin: 0 8px; }`}
          defaultJs={`const out = document.getElementById("output");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map: 各要素を2倍に
const doubled = numbers.map(n => n * 2);

// filter: 偶数だけ抽出
const evens = numbers.filter(n => n % 2 === 0);

// reduce: 合計を計算
const sum = numbers.reduce((acc, n) => acc + n, 0);

// メソッドチェーン: 奇数を2倍にして合計
const result = numbers
  .filter(n => n % 2 !== 0)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0);

// find / findIndex
const users = [
  { name: "太郎", age: 25 },
  { name: "花子", age: 30 },
  { name: "次郎", age: 20 }
];
const found = users.find(u => u.age >= 30);
const foundIdx = users.findIndex(u => u.name === "次郎");

out.innerHTML = \`
<div class="section">
  <h3>元の配列</h3>
  <div class="result">[\${numbers.join(", ")}]</div>
</div>
<div class="section">
  <h3>map(n => n * 2) — 各要素を2倍</h3>
  <div class="result">[\${doubled.join(", ")}]</div>
</div>
<div class="section">
  <h3>filter(n => n % 2 === 0) — 偶数だけ</h3>
  <div class="result">[\${evens.join(", ")}]</div>
</div>
<div class="section">
  <h3>reduce((acc, n) => acc + n, 0) — 合計</h3>
  <div class="result">\${sum}</div>
</div>
<div class="section">
  <h3>メソッドチェーン: 奇数→2倍→合計</h3>
  <div class="result">filter→map→reduce = \${result}</div>
</div>
<div class="section">
  <h3>find(u => u.age >= 30)</h3>
  <div class="result">\${JSON.stringify(found)}</div>
</div>
<div class="section">
  <h3>findIndex(u => u.name === "次郎")</h3>
  <div class="result">\${foundIdx}</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">some・every・sort・flat・スプレッド</h2>
        <p className="text-gray-400 mb-4">配列の判定、並べ替え、展開を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }`}
          defaultJs={`const out = document.getElementById("output");
const scores = [85, 92, 78, 95, 60];

// some: 1つでも条件を満たすか
const hasHigh = scores.some(s => s >= 90);

// every: すべてが条件を満たすか
const allPassed = scores.every(s => s >= 50);

// sort: 並べ替え（数値は比較関数が必要）
const sorted = [...scores].sort((a, b) => a - b);
const sortedDesc = [...scores].sort((a, b) => b - a);

// reverse
const reversed = [...scores].reverse();

// flat: ネストを平坦化
const nested = [[1, 2], [3, [4, 5]], [6]];
const flat1 = nested.flat();
const flatAll = nested.flat(Infinity);

// スプレッド構文
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
const copy = [...arr1];

out.innerHTML = \`
<div class="section">
  <h3>元の配列</h3>
  <div class="result">[\${scores.join(", ")}]</div>
</div>
<div class="section">
  <h3>some(s => s >= 90) — 90点以上が1つでもある？</h3>
  <div class="result">\${hasHigh}</div>
</div>
<div class="section">
  <h3>every(s => s >= 50) — 全員50点以上？</h3>
  <div class="result">\${allPassed}</div>
</div>
<div class="section">
  <h3>sort — 昇順 / 降順</h3>
  <div class="result">昇順: [\${sorted.join(", ")}]</div>
  <div class="result">降順: [\${sortedDesc.join(", ")}]</div>
</div>
<div class="section">
  <h3>flat() — ネストを平坦化</h3>
  <div class="result">元: [[1,2],[3,[4,5]],[6]]</div>
  <div class="result">flat(): [\${flat1.join(", ")}]</div>
  <div class="result">flat(Infinity): [\${flatAll.join(", ")}]</div>
</div>
<div class="section">
  <h3>スプレッド構文</h3>
  <div class="result">[...arr1, ...arr2] = [\${merged.join(", ")}]</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">配列メソッドを使って成績管理プログラムを作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>成績管理</h2>
  <div id="stats"></div>
  <div id="list"></div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; }
.stat { display: inline-block; background: #f59e0b; color: #fff; padding: 8px 16px; border-radius: 8px; margin: 4px; font-weight: bold; }
.student { background: #f5f5f5; padding: 8px 12px; margin: 4px 0; border-radius: 6px; display: flex; justify-content: space-between; }
.pass { border-left: 4px solid #22c55e; }
.fail { border-left: 4px solid #ef4444; }`}
          defaultJs={`const students = [
  { name: "田中", score: 85 },
  { name: "鈴木", score: 92 },
  { name: "佐藤", score: 45 },
  { name: "山田", score: 78 },
  { name: "高橋", score: 63 },
];

// 平均点を計算
const avg = students.reduce((sum, s) => sum + s.score, 0) / students.length;

// 最高点と最低点
const max = Math.max(...students.map(s => s.score));
const min = Math.min(...students.map(s => s.score));

// 統計表示
document.getElementById("stats").innerHTML =
  '<div class="stat">平均: ' + avg.toFixed(1) + '</div>' +
  '<div class="stat">最高: ' + max + '</div>' +
  '<div class="stat">最低: ' + min + '</div>';

// 点数順にソートして表示
const sorted = [...students].sort((a, b) => b.score - a.score);
document.getElementById("list").innerHTML = sorted
  .map(s => '<div class="student ' + (s.score >= 60 ? "pass" : "fail") + '">' +
    '<span>' + s.name + '</span><span>' + s.score + '点</span></div>')
  .join("");`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="arrays" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="arrays" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
