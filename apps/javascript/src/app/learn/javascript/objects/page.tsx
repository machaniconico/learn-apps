import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function ObjectsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オブジェクト詳細</h1>
        <p className="text-gray-400">JavaScriptのオブジェクトを深く理解しよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクトとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オブジェクトは「キーと値のペア」の集合です。プロパティやメソッドを持ち、
          関連するデータと機能をまとめて管理できます。JavaScriptでは最も重要なデータ構造の一つです。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li>プロパティ — オブジェクトに格納されたデータ</li>
          <li>メソッド — オブジェクトに格納された関数</li>
          <li>分割代入（destructuring） — プロパティを変数に展開</li>
          <li>スプレッド構文 — オブジェクトのコピー・結合</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Object.keys()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">values()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">entries()</code></li>
          <li>計算プロパティ名（computed properties）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロパティ・メソッド・分割代入</h2>
        <p className="text-gray-400 mb-4">オブジェクトの基本操作と分割代入を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// オブジェクトの作成
const user = {
  name: "田中太郎",
  age: 28,
  email: "tanaka@example.com",
  // メソッド
  greet() {
    return "こんにちは、" + this.name + "です！";
  }
};

// プロパティへのアクセス
const dotAccess = user.name;
const bracketAccess = user["email"];

// 分割代入（destructuring）
const { name, age, email } = user;

// デフォルト値付き分割代入
const { name: userName, country = "日本" } = user;

// ネストされたオブジェクトの分割代入
const company = {
  name: "テック株式会社",
  address: {
    city: "東京",
    zip: "100-0001"
  }
};
const { address: { city, zip } } = company;

out.innerHTML = \`
<div class="section">
  <h3>オブジェクト</h3>
  <div class="result">\${JSON.stringify(user, null, 2)}</div>
</div>
<div class="section">
  <h3>プロパティアクセス</h3>
  <div class="result">user.name → "\${dotAccess}"
user["email"] → "\${bracketAccess}"</div>
</div>
<div class="section">
  <h3>メソッド呼び出し</h3>
  <div class="result">user.greet() → "\${user.greet()}"</div>
</div>
<div class="section">
  <h3>分割代入</h3>
  <div class="result">const { name, age, email } = user;
name → "\${name}", age → \${age}, email → "\${email}"</div>
</div>
<div class="section">
  <h3>デフォルト値・リネーム</h3>
  <div class="result">userName → "\${userName}", country → "\${country}"</div>
</div>
<div class="section">
  <h3>ネストの分割代入</h3>
  <div class="result">city → "\${city}", zip → "\${zip}"</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スプレッド・Object.keys/values/entries・計算プロパティ</h2>
        <p className="text-gray-400 mb-4">オブジェクトの展開と便利なメソッドを使いこなしましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// スプレッド構文でコピー
const original = { a: 1, b: 2, c: 3 };
const copy = { ...original };

// スプレッドで結合・上書き
const defaults = { theme: "light", lang: "ja", fontSize: 14 };
const settings = { ...defaults, theme: "dark", fontSize: 18 };

// Object.keys / values / entries
const product = { name: "ノートPC", price: 120000, stock: 5 };
const keys = Object.keys(product);
const values = Object.values(product);
const entries = Object.entries(product);

// 計算プロパティ名
const field = "color";
const dynamic = { [field]: "red", [field + "Code"]: "#ff0000" };

// Object.entriesとreduceで変換
const prices = { apple: 100, banana: 200, orange: 150 };
const taxIncluded = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, Math.round(v * 1.1)])
);

out.innerHTML = \`
<div class="section">
  <h3>スプレッドでコピー</h3>
  <div class="result">\${JSON.stringify(copy)}</div>
</div>
<div class="section">
  <h3>スプレッドで結合・上書き</h3>
  <div class="result">\${JSON.stringify(settings, null, 2)}</div>
</div>
<div class="section">
  <h3>Object.keys()</h3>
  <div class="result">[\${keys.map(k => '"' + k + '"').join(", ")}]</div>
</div>
<div class="section">
  <h3>Object.values()</h3>
  <div class="result">[\${values.join(", ")}]</div>
</div>
<div class="section">
  <h3>Object.entries()</h3>
  <div class="result">\${entries.map(e => JSON.stringify(e)).join("\\n")}</div>
</div>
<div class="section">
  <h3>計算プロパティ名</h3>
  <div class="result">\${JSON.stringify(dynamic)}</div>
</div>
<div class="section">
  <h3>Object.entriesで税込計算</h3>
  <div class="result">\${JSON.stringify(prices)} → \${JSON.stringify(taxIncluded)}</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">オブジェクトを使ってプロフィールカードを作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="cards"></div>`}
          defaultCss={`body { font-family: sans-serif; }
#cards { display: flex; gap: 16px; flex-wrap: wrap; }
.card { background: #fff; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; width: 200px; text-align: center; }
.card h3 { color: #f59e0b; margin: 8px 0 4px; }
.card p { color: #666; font-size: 14px; margin: 2px 0; }
.tag { display: inline-block; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin: 2px; }`}
          defaultJs={`const members = [
  { name: "田中", role: "エンジニア", skills: ["JavaScript", "React"] },
  { name: "鈴木", role: "デザイナー", skills: ["Figma", "CSS"] },
  { name: "佐藤", role: "PM", skills: ["企画", "分析"] },
];

const cards = members.map(({ name, role, skills }) => {
  const tags = skills.map(s => '<span class="tag">' + s + '</span>').join("");
  return '<div class="card">' +
    '<h3>' + name + '</h3>' +
    '<p>' + role + '</p>' +
    '<div>' + tags + '</div>' +
    '</div>';
}).join("");

document.getElementById("cards").innerHTML = cards;`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="objects" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="objects" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
