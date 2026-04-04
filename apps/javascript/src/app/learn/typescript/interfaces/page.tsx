import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TYPESCRIPT_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function TypeScriptInterfacesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">TypeScript レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターフェース</h1>
        <p className="text-gray-400">オブジェクトの型を定義して、構造を明確にしよう</p>
      </div>

      {/* interfaceの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">interfaceの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">interface</code>は
          オブジェクトの「形」を定義する仕組みです。
          どんなプロパティがあり、それぞれがどんな型かを記述します。
          TypeScriptでは、オブジェクトの構造が一致すれば型チェックを通過します（構造的部分型）。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// interface でオブジェクトの型を定義
interface User {
  id: number;
  name: string;
  email: string;
}

// この型に合うオブジェクトを作成
const user: User = {
  id: 1,
  name: "太郎",
  email: "taro@example.com",
};

// プロパティが足りないとエラー
// const bad: User = { id: 1, name: "太郎" };
// Error: Property 'email' is missing

// 余分なプロパティもエラー（直接代入時）
// const bad2: User = { id: 1, name: "太郎", email: "...", age: 25 };
// Error: Object literal may only specify known properties`}
        </pre>
      </section>

      {/* オプショナルとreadonly */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オプショナルプロパティとreadonly</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティを任意にしたり、変更不可にしたりできます。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`interface BlogPost {
  readonly id: number;       // 変更不可
  title: string;
  body: string;
  tags?: string[];           // オプショナル（あってもなくてもOK）
  publishedAt?: Date;        // オプショナル
  readonly createdAt: Date;  // 変更不可
}

const post: BlogPost = {
  id: 1,
  title: "TypeScript入門",
  body: "TypeScriptは素晴らしい...",
  createdAt: new Date(),
  // tags と publishedAt は省略OK
};

// readonlyプロパティは変更できない
// post.id = 2;        // Error: Cannot assign to 'id' because it is a read-only property
// post.createdAt = new Date(); // Error

// 通常のプロパティは変更OK
post.title = "TypeScript完全入門";

// オプショナルプロパティの安全なアクセス
const tagCount = post.tags?.length ?? 0;  // 0
const firstTag = post.tags?.[0] ?? "なし"; // "なし"`}
        </pre>
      </section>

      {/* メソッドとインデックスシグネチャ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドとインデックスシグネチャ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          interfaceにはメソッドの型定義や、動的なキーの型定義も含められます。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// メソッドを持つinterface
interface Calculator {
  value: number;
  add(n: number): Calculator;      // メソッド構文
  subtract: (n: number) => Calculator;  // プロパティ構文
  reset(): Calculator;
  getResult(): number;
}

// インデックスシグネチャ: 任意のキーを許容
interface StringMap {
  [key: string]: string;  // 任意の文字列キーで string 値
}

const translations: StringMap = {
  hello: "こんにちは",
  goodbye: "さようなら",
  thanks: "ありがとう",
  // 何個でも追加OK
};

// 固定プロパティ + インデックスシグネチャ
interface Config {
  version: number;          // 必須
  debug: boolean;           // 必須
  [key: string]: unknown;   // その他は何でもOK
}

const config: Config = {
  version: 1,
  debug: true,
  apiUrl: "https://api.example.com",
  timeout: 3000,
};`}
        </pre>
      </section>

      {/* interfaceの拡張 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">interfaceの拡張（extends）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">extends</code>を使って、
          既存のinterfaceを拡張（継承）できます。コードの再利用性が高まります。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// 基本のinterface
interface Animal {
  name: string;
  age: number;
}

// 拡張: Animal のプロパティを継承 + 追加
interface Dog extends Animal {
  breed: string;
  isGoodBoy: boolean;
}

// Dog は name, age, breed, isGoodBoy を持つ
const shiba: Dog = {
  name: "ポチ",
  age: 3,
  breed: "柴犬",
  isGoodBoy: true,
};

// 複数のinterfaceを同時に拡張
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface SoftDelete {
  deletedAt?: Date;
  isDeleted: boolean;
}

// 複数の interface を extends で合成
interface Article extends Timestamps, SoftDelete {
  id: number;
  title: string;
  body: string;
  author: string;
}

// Article は全プロパティを持つ
const article: Article = {
  id: 1,
  title: "TypeScript入門",
  body: "...",
  author: "太郎",
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// interface の宣言マージ（同名で追加定義）
interface Window {
  myCustomProp: string;
}
// 既存の Window interface に myCustomProp が追加される`}
        </pre>
      </section>

      {/* interfaceの実践 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクトの構造を実践する</h2>
        <p className="text-gray-400 mb-4">
          interfaceの考え方をJavaScriptで実践してみましょう。
          オブジェクトの構造をバリデーションする関数を作ります。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #22d3ee; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.pass { border-left: 3px solid #22c55e; }
.fail { border-left: 3px solid #ef4444; }`}
          defaultJs={`const out = document.getElementById("output");

// TypeScriptのinterfaceをJSでシミュレート
// interface User { id: number; name: string; email: string; age?: number; }
function validateUser(obj) {
  const errors = [];
  if (typeof obj.id !== "number") errors.push("id は number 型が必要");
  if (typeof obj.name !== "string") errors.push("name は string 型が必要");
  if (typeof obj.email !== "string") errors.push("email は string 型が必要");
  if (obj.age !== undefined && typeof obj.age !== "number") {
    errors.push("age は number 型が必要（省略可）");
  }
  return { valid: errors.length === 0, errors };
}

// interface を拡張するイメージ
// interface Admin extends User { role: string; permissions: string[]; }
function validateAdmin(obj) {
  const base = validateUser(obj);
  const errors = [...base.errors];
  if (typeof obj.role !== "string") errors.push("role は string 型が必要");
  if (!Array.isArray(obj.permissions)) errors.push("permissions は配列が必要");
  return { valid: errors.length === 0, errors };
}

// テストデータ
const tests = [
  { label: "正しいUser", data: { id: 1, name: "太郎", email: "taro@test.com" }, fn: validateUser },
  { label: "ageあり", data: { id: 2, name: "花子", email: "hana@test.com", age: 25 }, fn: validateUser },
  { label: "不正User", data: { id: "abc", name: 123 }, fn: validateUser },
  { label: "正しいAdmin", data: { id: 3, name: "管理者", email: "admin@test.com", role: "admin", permissions: ["read", "write"] }, fn: validateAdmin },
  { label: "不正Admin", data: { id: 4, name: "偽物", email: "fake@test.com", role: 123 }, fn: validateAdmin },
];

out.innerHTML = \`
<div class="section">
  <h3>interface バリデーション結果</h3>
  \${tests.map(t => {
    const result = t.fn(t.data);
    const cls = result.valid ? "pass" : "fail";
    const status = result.valid ? "✅ PASS" : "❌ FAIL";
    const detail = result.valid ? "型チェック通過" : result.errors.join("\\n  ");
    return '<div class="result ' + cls + '">' + t.label + ': ' + status + '\\n  ' + detail + '\\nデータ: ' + JSON.stringify(t.data) + '</div>';
  }).join("")}
</div>
<div class="section">
  <h3>ポイント</h3>
  <div class="result">TypeScriptでは、このバリデーションを
コンパイラが自動で行います。

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // ? = オプショナル
}

と定義するだけで型安全が保証されます。</div>
</div>
\`;`}
        />
      </section>

      {/* type vs interface */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">type vs interface</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">type</code>と
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">interface</code>は
          似ていますが、いくつかの違いがあります。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// === interface でできて type でできないこと ===

// 宣言マージ（同名で追加）
interface User {
  name: string;
}
interface User {
  age: number;
}
// User は { name: string; age: number; } になる

// type では同名の再宣言はエラー
// type Point = { x: number; };
// type Point = { y: number; }; // Error!


// === type でできて interface でできないこと ===

// プリミティブ型のエイリアス
type ID = string | number;

// ユニオン型
type Status = "active" | "inactive" | "pending";

// タプル型
type Pair = [string, number];

// マップ型
type Readonly<T> = { readonly [P in keyof T]: T[P] };


// === どちらを使うべき？ ===

// オブジェクトの型定義 → interface が推奨
//   - 拡張しやすい (extends)
//   - エラーメッセージがわかりやすい
//   - 宣言マージでライブラリの型を拡張できる

// ユニオン型、プリミティブ、関数型 → type を使う
//   - interface では表現できない

// チームで統一することが大切！`}
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">interface</code> でオブジェクトの構造を定義</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">?</code> でオプショナルプロパティ、<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">readonly</code> で変更不可</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">extends</code> で既存のinterfaceを拡張</li>
          <li>インデックスシグネチャで動的なキーに対応</li>
          <li>同名interfaceは自動マージされる</li>
          <li>オブジェクト型は interface、その他は type を使うのが一般的</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="typescript" lessonId="interfaces" color="green" />
      <LessonNav lessons={TYPESCRIPT_LESSONS} currentId="interfaces" basePath="/learn/typescript" color="green" />
    </div>
  );
}
