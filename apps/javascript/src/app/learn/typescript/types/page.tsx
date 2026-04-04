import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TYPESCRIPT_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function TypeScriptTypesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">TypeScript レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">基本の型</h1>
        <p className="text-gray-400">TypeScriptで使える様々な型を覚えよう</p>
      </div>

      {/* プリミティブ型 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プリミティブ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptの基本となる型は、JavaScriptのプリミティブ型に対応しています。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// string — 文字列
let greeting: string = "こんにちは";
let template: string = \`名前は\${name}です\`;

// number — 数値（整数・小数どちらも）
let integer: number = 42;
let float: number = 3.14;
let hex: number = 0xff;
let binary: number = 0b1010;

// boolean — 真偽値
let isStudent: boolean = true;
let hasPermission: boolean = false;

// null と undefined
let nothing: null = null;
let notDefined: undefined = undefined;

// symbol — 一意の識別子
let id: symbol = Symbol("id");

// bigint — 大きな整数
let big: bigint = 9007199254740991n;`}
        </pre>
      </section>

      {/* 配列とタプル */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列とタプル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列は同じ型の要素の並び、タプルは異なる型の要素を固定長で持てる型です。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// 配列 — 2つの書き方
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["太郎", "花子", "次郎"];

// 配列は同じ型のみ
// numbers.push("hello"); // Error!

// タプル — 型と長さが固定
let person: [string, number] = ["太郎", 25];
let rgb: [number, number, number] = [255, 128, 0];

// タプルの分割代入
let [name, age] = person;
// name は string、age は number

// ラベル付きタプル（可読性向上）
let user: [name: string, age: number, active: boolean] = ["花子", 30, true];

// 読み取り専用タプル
let point: readonly [number, number] = [10, 20];
// point[0] = 5; // Error: readonly`}
        </pre>
      </section>

      {/* 配列操作を実際に試す */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の型を意識した操作</h2>
        <p className="text-gray-400 mb-4">
          JavaScriptの配列操作を、型を意識しながら試してみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #22d3ee; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// number[] — 数値の配列
const scores = [85, 92, 78, 95, 88];
const average = scores.reduce((a, b) => a + b, 0) / scores.length;
const highScores = scores.filter(s => s >= 90);

// string[] — 文字列の配列
const fruits = ["りんご", "バナナ", "みかん"];
const uppercased = fruits.map(f => f + "ジュース");

// タプル的な使い方: [string, number]
const entries = [["太郎", 85], ["花子", 92], ["次郎", 78]];
const sorted = [...entries].sort((a, b) => b[1] - a[1]);

// 配列の型を確認する関数
function describeArray(arr) {
  const types = [...new Set(arr.map(v => typeof v))];
  return "要素数: " + arr.length + ", 型: [" + types.join(", ") + "]";
}

out.innerHTML = \`
<div class="section">
  <h3>number[] の操作</h3>
  <div class="result">scores: [\${scores.join(", ")}]
average: \${average.toFixed(1)}
highScores (>= 90): [\${highScores.join(", ")}]</div>
</div>
<div class="section">
  <h3>string[] の操作</h3>
  <div class="result">fruits: [\${fruits.join(", ")}]
mapped: [\${uppercased.join(", ")}]</div>
</div>
<div class="section">
  <h3>[string, number][] — タプル配列</h3>
  <div class="result">ランキング:
\${sorted.map((e, i) => (i + 1) + "位: " + e[0] + " (" + e[1] + "点)").join("\\n")}</div>
</div>
<div class="section">
  <h3>配列の型情報</h3>
  <div class="result">\${describeArray(scores)}
\${describeArray(fruits)}
\${describeArray([1, "hello", true])}</div>
</div>
\`;`}
        />
      </section>

      {/* enum */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">enum（列挙型）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">enum</code>は、
          関連する定数のグループに名前をつけられる型です。
          コードの可読性を高め、マジックナンバーを排除します。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// 数値enum（デフォルトで0から連番）
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}

let dir: Direction = Direction.Up;

// 文字列enum
enum Color {
  Red = "#ff0000",
  Green = "#00ff00",
  Blue = "#0000ff",
}

let color: Color = Color.Red;

// const enum（コンパイル時にインライン化される）
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

// TypeScriptでは、enum の代わりに
// as const オブジェクトを使うことも多い
const STATUS = {
  Active: "active",
  Inactive: "inactive",
  Pending: "pending",
} as const;

type Status = typeof STATUS[keyof typeof STATUS];
// type Status = "active" | "inactive" | "pending"`}
        </pre>
      </section>

      {/* any, unknown, void, never */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">特殊な型: any, unknown, void, never</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScript独自の特殊な型があります。それぞれの役割と使い分けを理解しましょう。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// any — 型チェックを無効化（できるだけ避ける）
let anything: any = "hello";
anything = 42;          // OK
anything = true;        // OK
anything.toFixed();     // エラーにならない（危険！）

// unknown — 安全な any（型チェック必須）
let mystery: unknown = "hello";
// mystery.toUpperCase(); // Error: unknownには操作できない

// 型ガードで安全に使う
if (typeof mystery === "string") {
  mystery.toUpperCase(); // OK: string と確認済み
}

// void — 戻り値がない関数
function logMessage(msg: string): void {
  console.log(msg);
  // return は不要（return; はOK）
}

// never — 絶対に値を返さない（例外やループ）
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(): never {
  while (true) {
    // 永遠に終わらない
  }
}

// never は網羅性チェックに使える
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle": return Math.PI * 10 * 10;
    case "square": return 10 * 10;
    case "triangle": return (10 * 10) / 2;
    default:
      const _exhaustive: never = shape;
      return _exhaustive; // 全パターン網羅されていれば到達しない
  }
}`}
        </pre>
      </section>

      {/* anyとunknownの違いを体験 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型ガードを体験する</h2>
        <p className="text-gray-400 mb-4">
          TypeScriptの<code className="text-cyan-400">unknown</code>型で必要な「型ガード」の概念を、JavaScriptで体験してみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #22d3ee; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.error { background: #fef2f2; color: #dc2626; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }`}
          defaultJs={`const out = document.getElementById("output");

// 型ガード: typeof で型を確認してから操作する
function safeProcess(value) {
  // TypeScriptの unknown 型と同じ考え方
  if (typeof value === "string") {
    return "文字列: " + value.toUpperCase() + " (長さ: " + value.length + ")";
  }
  if (typeof value === "number") {
    return "数値: " + value.toFixed(2) + " (整数?: " + Number.isInteger(value) + ")";
  }
  if (typeof value === "boolean") {
    return "真偽値: " + value;
  }
  if (Array.isArray(value)) {
    return "配列: [" + value.join(", ") + "] (長さ: " + value.length + ")";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "object") {
    return "オブジェクト: " + JSON.stringify(value);
  }
  return "不明な型: " + typeof value;
}

// さまざまな値をテスト
const testValues = [
  "Hello TypeScript",
  42,
  3.14,
  true,
  [1, 2, 3],
  { name: "太郎", age: 25 },
  null,
  undefined,
];

const results = testValues.map(v => safeProcess(v));

out.innerHTML = \`
<div class="section">
  <h3>型ガード（typeof）で安全に操作</h3>
  \${results.map(r => '<div class="result">' + r + '</div>').join("")}
</div>
<div class="section">
  <h3>ポイント</h3>
  <div class="result">TypeScriptの unknown 型では、typeof で型を
確認するまでメソッドを呼べません。
これにより「型の安全性」が保証されます。

any型は確認なしで何でもできてしまうので危険です。
unknown を使って型ガードで安全にコーディングしましょう。</div>
</div>
\`;`}
        />
      </section>

      {/* ユニオン型と型エイリアス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ユニオン型と型エイリアス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">ユニオン型</strong>は「AまたはB」という複数の型を許容します。
          <strong className="text-cyan-400">型エイリアス</strong>は型に別名をつけて再利用できます。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// ユニオン型: | で複数の型を組み合わせる
let id: string | number;
id = "abc-123";  // OK
id = 42;         // OK
// id = true;    // Error

// リテラル型のユニオン（特定の値だけを許可）
type Direction = "up" | "down" | "left" | "right";
let dir: Direction = "up";   // OK
// dir = "diagonal";         // Error

// 型エイリアス: type で型に名前をつける
type UserID = string | number;
type Point = { x: number; y: number };
type StringOrNull = string | null;

// 型エイリアスでオブジェクト型
type User = {
  id: UserID;
  name: string;
  email: string;
  age?: number;         // オプションプロパティ
  readonly createdAt: string;  // 読み取り専用
};

// 交差型: & で型を合成
type Timestamped = {
  createdAt: string;
  updatedAt: string;
};

type Article = {
  title: string;
  body: string;
};

type TimestampedArticle = Article & Timestamped;
// { title, body, createdAt, updatedAt } を全て持つ

// 関数型
type Formatter = (value: number) => string;
const toYen: Formatter = (v) => "¥" + v.toLocaleString();`}
        </pre>
      </section>

      {/* ユニオン型の活用 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ユニオン型的パターンを試す</h2>
        <p className="text-gray-400 mb-4">
          ユニオン型の考え方をJavaScriptで実践してみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #22d3ee; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// ユニオン型: string | number を扱う関数
function formatId(id) {
  // TypeScriptでは id: string | number と宣言
  if (typeof id === "string") {
    return "ID: " + id.toUpperCase();
  }
  return "ID: #" + id.toString().padStart(6, "0");
}

// リテラル型ユニオン: "success" | "error" | "loading"
function getStatusMessage(status) {
  switch (status) {
    case "success": return "✅ 完了しました";
    case "error":   return "❌ エラーが発生しました";
    case "loading": return "⏳ 読み込み中...";
    default:        return "❓ 不明なステータス";
  }
}

// 判別可能なユニオン型 (Discriminated Union)
function calculateArea(shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const shapes = [
  { kind: "circle", radius: 5 },
  { kind: "rectangle", width: 10, height: 3 },
  { kind: "triangle", base: 8, height: 6 },
];

out.innerHTML = \`
<div class="section">
  <h3>string | number の処理分岐</h3>
  <div class="result">\${formatId("abc-xyz")}
\${formatId(42)}</div>
</div>
<div class="section">
  <h3>リテラル型ユニオン</h3>
  <div class="result">\${getStatusMessage("success")}
\${getStatusMessage("error")}
\${getStatusMessage("loading")}</div>
</div>
<div class="section">
  <h3>判別可能なユニオン型 (Discriminated Union)</h3>
  <div class="result">\${shapes.map(s =>
    s.kind + ": 面積 = " + calculateArea(s).toFixed(2)
  ).join("\\n")}</div>
</div>
\`;`}
        />
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">string</code>, <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">number</code>, <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">boolean</code> がプリミティブ型の基本</li>
          <li>配列は <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">number[]</code>、タプルは <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[string, number]</code></li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">enum</code> で定数グループを定義</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">any</code>は型チェック無効化、<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">unknown</code>は安全な代替</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">void</code>は戻り値なし、<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">never</code>は到達不能</li>
          <li>ユニオン型 <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">A | B</code> で複数の型を許容</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">type</code> で型エイリアスを定義して再利用</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="typescript" lessonId="types" color="green" />
      <LessonNav lessons={TYPESCRIPT_LESSONS} currentId="types" basePath="/learn/typescript" color="green" />
    </div>
  );
}
