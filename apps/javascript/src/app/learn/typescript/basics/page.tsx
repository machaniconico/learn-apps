import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TYPESCRIPT_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "TypeScriptの型注釈の正しい書き方はどれ？",
    options: [
      "let name = string: '太郎'",
      "let name: string = '太郎'",
      "let string name = '太郎'",
      "let name = (string) '太郎'",
    ],
    answer: 1,
    explanation: "TypeScriptでは変数名の後に : 型名 を付けて型を指定します。これを「型注釈（Type Annotation）」と呼びます。",
  },
  {
    question: "TypeScriptで戻り値がない関数の戻り値の型はどれ？",
    options: ["null", "undefined", "void", "never"],
    answer: 2,
    explanation: "戻り値がない関数にはvoid型を指定します。neverは決して値を返さない（例外を投げる等）関数に使います。",
  },
  {
    question: "TypeScriptのコンパイル後のJavaScriptファイルについて正しいのはどれ？",
    options: [
      "型情報がそのまま残る",
      "型情報は消えて通常のJavaScriptになる",
      "TypeScript専用のランタイムが必要",
      "ブラウザで直接実行できない",
    ],
    answer: 1,
    explanation: "コンパイル後のJavaScriptには型情報は残りません。型チェックはコンパイル時のみ行われ、出力は通常のJavaScriptとして動作します。",
  },
];

export default function TypeScriptBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">TypeScript レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">TypeScriptの基本</h1>
        <p className="text-gray-400">型のあるJavaScriptで、より安全なコードを書こう</p>
      </div>

      {/* TypeScriptとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TypeScriptとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptは<strong className="text-cyan-400">JavaScriptに型システムを追加した言語</strong>です。
          JavaScriptのコードはすべて有効なTypeScriptですが、TypeScriptではさらに「型注釈（Type Annotation）」を書くことで、
          変数や関数がどんな値を扱うかを明示できます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          型を宣言することで、コードを実行する前にエラーを発見できます。
          例えば、数値を期待する関数に文字列を渡してしまうようなバグを、コンパイル時に検出できます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><strong className="text-cyan-400">静的型チェック</strong> — 実行前にエラーを発見</li>
          <li><strong className="text-cyan-400">型推論</strong> — すべてに型を書かなくても自動推論される</li>
          <li><strong className="text-cyan-400">IDEサポート</strong> — 自動補完、リファクタリング、ホバー情報</li>
          <li><strong className="text-cyan-400">段階的導入</strong> — 既存のJSプロジェクトに少しずつ導入可能</li>
        </ul>
      </section>

      {/* 型注釈の基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型注釈の基本構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptでは変数名の後に<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">: 型名</code>を付けて型を指定します。
          これを「型注釈（Type Annotation）」と呼びます。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// TypeScript: 型注釈あり
let message: string = "こんにちは";
let count: number = 42;
let isActive: boolean = true;

// 型推論: 初期値から自動的に型が決まる
let name = "太郎";    // string と推論される
let age = 25;          // number と推論される
let done = false;      // boolean と推論される

// 型エラーの例（コンパイル時にエラーになる）
// message = 123;      // Error: Type 'number' is not assignable to type 'string'
// count = "hello";    // Error: Type 'string' is not assignable to type 'number'`}
        </pre>
      </section>

      {/* 関数の型 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数の型注釈</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数では引数と戻り値に型を指定できます。これにより、関数の使い方が明確になり、
          間違った引数を渡すとコンパイル時にエラーが出ます。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// 引数と戻り値に型を指定
function greet(name: string): string {
  return "こんにちは、" + name + "さん！";
}

// アロー関数
const add = (a: number, b: number): number => {
  return a + b;
};

// 戻り値がない関数は void
function log(message: string): void {
  console.log(message);
}

// オプション引数（?をつける）
function createUser(name: string, age?: number): string {
  if (age !== undefined) {
    return name + "（" + age + "歳）";
  }
  return name;
}

// デフォルト値
function repeat(text: string, times: number = 3): string {
  return text.repeat(times);
}

// 正しい呼び出し
greet("太郎");           // OK
add(1, 2);               // OK
createUser("花子");      // OK（ageは省略可能）
createUser("花子", 25);  // OK

// エラーになる呼び出し
// greet(123);           // Error: number は string に割り当てられない
// add("1", "2");        // Error: string は number に割り当てられない`}
        </pre>
      </section>

      {/* JavaScriptとの比較（実行可能） */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JavaScriptでの型チェック体験</h2>
        <p className="text-gray-400 mb-4">
          TypeScriptのコンパイラがなくても、JavaScriptで「型を意識する」コードを書いてみましょう。
          TypeScriptが裏でやっていることの概念を体験できます。
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

// TypeScript的な型チェックをJSで模倣
function assertType(value, expectedType, label) {
  const actualType = typeof value;
  if (actualType !== expectedType) {
    return '❌ ' + label + ': "' + expectedType + '"を期待したが"' + actualType + '"が来た';
  }
  return '✅ ' + label + ': 型チェックOK (' + expectedType + ')';
}

// 型を意識した関数
function greet(name) {
  if (typeof name !== "string") {
    throw new Error("nameはstring型でなければなりません");
  }
  return "こんにちは、" + name + "さん！";
}

function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("引数はnumber型でなければなりません");
  }
  return a + b;
}

// 正しい呼び出し
const result1 = greet("太郎");
const result2 = add(10, 20);

// 型チェックの結果
const checks = [
  assertType("太郎", "string", "name"),
  assertType(42, "number", "count"),
  assertType(true, "boolean", "isActive"),
  assertType("hello", "number", "wrongType"),
];

// 間違った呼び出しを試す
let errorResult = "";
try {
  add("1", "2");
} catch (e) {
  errorResult = e.message;
}

out.innerHTML = \`
<div class="section">
  <h3>関数の実行結果</h3>
  <div class="result">greet("太郎") → "\${result1}"
add(10, 20) → \${result2}</div>
</div>
<div class="section">
  <h3>型チェック（TypeScriptがコンパイル時にやること）</h3>
  \${checks.map(c => '<div class="result">' + c + '</div>').join("")}
</div>
<div class="section">
  <h3>型エラーのキャッチ</h3>
  <div class="error">add("1", "2") → Error: \${errorResult}</div>
  <div class="result">TypeScriptなら、このエラーは実行前に発見できます！</div>
</div>
\`;`}
        />
      </section>

      {/* コンパイルの仕組み */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンパイルの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptはブラウザやNode.jsで直接実行できません。
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">tsc</code>コマンド（TypeScriptコンパイラ）で
          JavaScriptに変換（トランスパイル）してから実行します。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// TypeScript (.ts ファイル)
function greet(name: string): string {
  return "Hello, " + name;
}
const msg: string = greet("World");

// ↓ tsc でコンパイル ↓

// JavaScript (.js ファイル) — 型注釈が消える
function greet(name) {
  return "Hello, " + name;
}
const msg = greet("World");`}
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          コンパイル後のJavaScriptには型情報は残りません。型チェックはコンパイル時のみ行われます。
          これを「構造的型付け（Structural Typing）」と呼びます。
        </p>
      </section>

      {/* tsconfig.json */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">tsconfig.json</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptプロジェクトの設定は<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">tsconfig.json</code>で管理します。
          コンパイルオプション、対象ファイル、出力先などを指定します。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// tsconfig.json の例
{
  "compilerOptions": {
    "target": "ES2020",          // 出力するJSのバージョン
    "module": "ESNext",          // モジュールシステム
    "strict": true,              // 厳格な型チェックを有効化
    "outDir": "./dist",          // 出力先ディレクトリ
    "rootDir": "./src",          // ソースディレクトリ
    "esModuleInterop": true,     // CommonJSとの互換性
    "skipLibCheck": true,        // .d.tsファイルのチェックをスキップ
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],       // コンパイル対象
  "exclude": ["node_modules"]    // 除外ファイル
}`}
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;strict&quot;: true</code>は特に重要です。
          これを有効にすると、<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">strictNullChecks</code>、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">noImplicitAny</code>など
          複数の厳格チェックがまとめて有効になります。
        </p>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="green" />
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>TypeScriptはJavaScriptに型を追加した言語</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">: 型名</code>で型注釈を書く</li>
          <li>型推論により、すべてに型を書く必要はない</li>
          <li>コンパイル時にエラーを検出し、実行前にバグを防ぐ</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">tsconfig.json</code>でプロジェクトの設定を管理</li>
          <li>コンパイル後は通常のJavaScriptとして動作する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="typescript" lessonId="basics" color="green" />
      <LessonNav lessons={TYPESCRIPT_LESSONS} currentId="basics" basePath="/learn/typescript" color="green" />
    </div>
  );
}
