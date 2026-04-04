import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TYPESCRIPT_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function TypeScriptGenericsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">TypeScript レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクス</h1>
        <p className="text-gray-400">型を引数にして、柔軟で再利用可能なコードを書こう</p>
      </div>

      {/* ジェネリクスとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">ジェネリクス（Generics）</strong>は、
          型を「引数」として受け取る仕組みです。関数やクラスを作るとき、
          使う型を後から指定できるようになります。これにより、型安全を保ちつつ再利用可能なコードが書けます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          例えば「配列の最初の要素を返す関数」を考えてみましょう。
          数値の配列にも文字列の配列にも使いたいですが、型を固定すると再利用できません。
          ジェネリクスを使えば、入力の型に応じて戻り値の型も自動的に決まります。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// ジェネリクスなしの場合: 型ごとに関数が必要
function firstNumber(arr: number[]): number | undefined {
  return arr[0];
}
function firstString(arr: string[]): string | undefined {
  return arr[0];
}

// any を使うと型安全が失われる
function firstAny(arr: any[]): any {
  return arr[0]; // 戻り値が any... 意味がない
}

// ジェネリクスを使う: <T> が型引数
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 使用時に型が決まる
const num = first([1, 2, 3]);        // num: number | undefined
const str = first(["a", "b", "c"]);  // str: string | undefined
const bool = first([true, false]);   // bool: boolean | undefined

// 明示的に型を指定することもできる
const explicit = first<string>(["hello"]);`}
        </pre>
      </section>

      {/* ジェネリック関数 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数の型引数を使ったり、型推論を活用したりできます。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// 複数の型引数
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}
const p = pair("hello", 42);  // p: [string, number]

// 型引数を使った変換関数
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}
const lengths = map(["hello", "world"], s => s.length);
// lengths: number[]

// アロー関数のジェネリクス
const identity = <T,>(value: T): T => value;

// ジェネリクスで型安全なイベントハンドラ
function createHandler<T>(initial: T) {
  let value = initial;
  return {
    get: (): T => value,
    set: (newValue: T): void => { value = newValue; },
  };
}

const counter = createHandler(0);     // T = number
counter.set(10);                       // OK
// counter.set("hello");              // Error: string は number に割り当てられない

const message = createHandler("");    // T = string
message.set("TypeScript");            // OK
// message.set(42);                   // Error`}
        </pre>
      </section>

      {/* ジェネリクスのJS体験 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック的パターンを試す</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスの概念をJavaScriptで体験しましょう。型に依存しない汎用関数を作ります。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #22d3ee; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// ジェネリック的な関数: どんな型でも動く
// TypeScript: function first<T>(arr: T[]): T | undefined
function first(arr) { return arr[0]; }

// TypeScript: function last<T>(arr: T[]): T | undefined
function last(arr) { return arr[arr.length - 1]; }

// TypeScript: function pair<A, B>(a: A, b: B): [A, B]
function pair(a, b) { return [a, b]; }

// TypeScript: function map<T, U>(arr: T[], fn: (item: T) => U): U[]
function map(arr, fn) { return arr.map(fn); }

// ジェネリックな状態管理
// TypeScript: function createStore<T>(initial: T)
function createStore(initial) {
  let state = initial;
  const listeners = [];
  return {
    getState: () => state,
    setState: (newState) => {
      state = typeof newState === "function" ? newState(state) : newState;
      listeners.forEach(fn => fn(state));
    },
    subscribe: (fn) => {
      listeners.push(fn);
      return () => {
        const i = listeners.indexOf(fn);
        if (i >= 0) listeners.splice(i, 1);
      };
    }
  };
}

// 数値ストア
const counterStore = createStore(0);
counterStore.setState(10);
counterStore.setState(prev => prev + 5);

// 文字列ストア
const nameStore = createStore("太郎");
nameStore.setState("花子");

// 配列ストア
const listStore = createStore([]);
listStore.setState(prev => [...prev, "りんご"]);
listStore.setState(prev => [...prev, "バナナ"]);
listStore.setState(prev => [...prev, "みかん"]);

out.innerHTML = \`
<div class="section">
  <h3>汎用関数（ジェネリクス的）</h3>
  <div class="result">first([1, 2, 3]) → \${first([1, 2, 3])}
first(["a", "b", "c"]) → "\${first(["a", "b", "c"])}"
last([10, 20, 30]) → \${last([10, 20, 30])}
pair("名前", 25) → [\${pair("名前", 25).map(v => JSON.stringify(v)).join(", ")}]
map([1,2,3], n => n*2) → [\${map([1,2,3], n => n*2).join(", ")}]
map(["a","bb","ccc"], s => s.length) → [\${map(["a","bb","ccc"], s => s.length).join(", ")}]</div>
</div>
<div class="section">
  <h3>ジェネリックな状態管理</h3>
  <div class="result">counterStore: \${counterStore.getState()} (number)
nameStore: "\${nameStore.getState()}" (string)
listStore: [\${listStore.getState().map(v => '"' + v + '"').join(", ")}] (string[])

TypeScriptでは型引数により
counterStore.setState("hello") はエラーになります。</div>
</div>
\`;`}
        />
      </section>

      {/* ジェネリック制約 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック制約（extends）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型引数に制約をつけることで、「少なくともこのプロパティを持つ型」のように限定できます。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// T は { length: number } を持つ型に限定
function logLength<T extends { length: number }>(value: T): T {
  console.log("長さ: " + value.length);
  return value;
}

logLength("hello");          // OK: string は length を持つ
logLength([1, 2, 3]);        // OK: 配列は length を持つ
logLength({ length: 10 });   // OK
// logLength(42);             // Error: number に length はない

// キーの制約: T のキーに限定
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "太郎", age: 25, email: "taro@test.com" };
const name = getProperty(person, "name");   // string
const age = getProperty(person, "age");     // number
// getProperty(person, "address");           // Error: "address" は keyof person にない

// 条件型（Conditional Types）
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>;    // "yes"
type B = IsString<number>;    // "no"

// infer で型を抽出
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Result = ReturnType<() => string>;  // string`}
        </pre>
      </section>

      {/* ジェネリックインターフェース */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックインターフェース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          interfaceにも型引数を使えます。APIレスポンスやコレクションなど、汎用的なデータ構造に便利です。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// APIレスポンスの汎用型
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// 使用例
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// T に User を指定
const userRes: ApiResponse<User> = {
  data: { id: 1, name: "太郎" },
  status: 200,
  message: "OK",
  timestamp: new Date(),
};

// T に Product[] を指定
const productsRes: ApiResponse<Product[]> = {
  data: [
    { id: 1, title: "りんご", price: 100 },
    { id: 2, title: "バナナ", price: 200 },
  ],
  status: 200,
  message: "OK",
  timestamp: new Date(),
};

// ページネーション付きレスポンス
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  totalPages: number;
  totalItems: number;
}`}
        </pre>
      </section>

      {/* ユーティリティ型 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ユーティリティ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptには、よく使う型変換をまとめた<strong className="text-cyan-400">ユーティリティ型</strong>が
          標準で用意されています。ジェネリクスを使って実装されています。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> — 全プロパティをオプショナルに
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }
// 更新時に便利: 変更したいフィールドだけ渡せる
function updateUser(id: number, updates: Partial<User>) { /* ... */ }
updateUser(1, { name: "太郎" }); // OK

// Required<T> — 全プロパティを必須に
type RequiredUser = Required<PartialUser>;
// { id: number; name: string; email: string; age: number; }

// Pick<T, K> — 指定したプロパティだけ抽出
type UserSummary = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Omit<T, K> — 指定したプロパティを除外
type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; age: number; }

// Record<K, V> — キーと値の型を指定
type UserRoles = Record<string, "admin" | "user" | "guest">;
const roles: UserRoles = {
  taro: "admin",
  hanako: "user",
};

// Readonly<T> — 全プロパティをreadonlyに
type ReadonlyUser = Readonly<User>;
// const user: ReadonlyUser = { ... };
// user.name = "変更"; // Error!

// Exclude, Extract — ユニオン型の操作
type Status = "active" | "inactive" | "pending" | "deleted";
type ActiveStatus = Exclude<Status, "deleted">;
// "active" | "inactive" | "pending"
type RemovedStatus = Extract<Status, "deleted" | "inactive">;
// "inactive" | "deleted"

// NonNullable — null, undefined を除外
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string`}
        </pre>
      </section>

      {/* ユーティリティ型の実践 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ユーティリティ型的パターンを実践</h2>
        <p className="text-gray-400 mb-4">
          Partial、Pick、Omitなどの考え方をJavaScriptで体験しましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #22d3ee; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.ts-hint { background: #ecfdf5; border-left: 3px solid #22d3ee; padding: 8px 12px; border-radius: 0 6px 6px 0; margin: 4px 0; font-family: monospace; font-size: 13px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// 元のユーザーデータ
const user = {
  id: 1,
  name: "太郎",
  email: "taro@example.com",
  age: 25,
  role: "admin"
};

// Partial 的: 一部だけ更新
function partialUpdate(original, updates) {
  return { ...original, ...updates };
}

const updated = partialUpdate(user, { name: "太郎（更新）", age: 26 });

// Pick 的: 指定したキーだけ抽出
function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

const summary = pick(user, ["id", "name"]);

// Omit 的: 指定したキーを除外
function omit(obj, keys) {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

const withoutEmail = omit(user, ["email"]);

// Record 的: キーと値の対応
function createRecord(keys, valueFn) {
  const result = {};
  for (const key of keys) {
    result[key] = valueFn(key);
  }
  return result;
}

const scoreBoard = createRecord(
  ["太郎", "花子", "次郎"],
  name => Math.floor(Math.random() * 100)
);

// Readonly 的: Object.freeze
const frozenUser = Object.freeze({ ...user });

out.innerHTML = \`
<div class="section">
  <h3>Partial — 一部更新</h3>
  <div class="result">\${JSON.stringify(updated, null, 2)}</div>
  <div class="ts-hint">TS: Partial&lt;User&gt; で全プロパティがオプションに</div>
</div>
<div class="section">
  <h3>Pick — キーを抽出</h3>
  <div class="result">pick(user, ["id", "name"])
→ \${JSON.stringify(summary)}</div>
  <div class="ts-hint">TS: Pick&lt;User, "id" | "name"&gt;</div>
</div>
<div class="section">
  <h3>Omit — キーを除外</h3>
  <div class="result">omit(user, ["email"])
→ \${JSON.stringify(withoutEmail)}</div>
  <div class="ts-hint">TS: Omit&lt;User, "email"&gt;</div>
</div>
<div class="section">
  <h3>Record — キーと値の型</h3>
  <div class="result">\${JSON.stringify(scoreBoard, null, 2)}</div>
  <div class="ts-hint">TS: Record&lt;string, number&gt;</div>
</div>
<div class="section">
  <h3>Readonly — Object.freeze</h3>
  <div class="result">Object.freeze で変更を防止
frozenUser.name = "変更" → TypeError!</div>
  <div class="ts-hint">TS: Readonly&lt;User&gt; でコンパイル時にエラー</div>
</div>
\`;`}
        />
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">{`<T>`}</code> で型引数を定義し、再利用可能なコードを作る</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">extends</code> でジェネリック制約を追加</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">keyof</code> でオブジェクトのキーを型として取得</li>
          <li>interfaceやクラスにもジェネリクスを使える</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Partial</code>, <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Required</code>, <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Pick</code>, <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Omit</code> など標準ユーティリティ型を活用</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Record</code>, <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Readonly</code>, <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">NonNullable</code> も頻出</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="typescript" lessonId="generics" color="green" />
      <LessonNav lessons={TYPESCRIPT_LESSONS} currentId="generics" basePath="/learn/typescript" color="green" />
    </div>
  );
}
