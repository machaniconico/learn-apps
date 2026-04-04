import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function ModulesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン14</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モジュール</h1>
        <p className="text-gray-400">import/exportを使ってコードを整理しよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">モジュールとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          モジュールは、コードを複数のファイルに分割して管理する仕組みです。
          各ファイルが独自のスコープを持ち、必要な部分だけを公開（export）し、
          他のファイルから取り込み（import）できます。コードの再利用性と保守性が向上します。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">export</code> — 関数や変数を外部に公開</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">import</code> — 他のモジュールから取り込む</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">export default</code> — デフォルトエクスポート</li>
          <li>名前付きエクスポート — 複数の値を個別にエクスポート</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">import()</code> — 動的インポート</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">export と import の基本</h2>
        <p className="text-gray-400 mb-4">モジュールの基本構文をコード例で確認しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 20px; }
.section h3 { color: #f59e0b; margin-bottom: 8px; }
.file { background: #1e1e1e; border-radius: 8px; overflow: hidden; margin: 8px 0; }
.file-header { background: #333; color: #ccc; padding: 6px 12px; font-size: 12px; font-family: monospace; }
.file-content { color: #d4d4d4; padding: 12px; font-family: monospace; font-size: 13px; white-space: pre; }
.keyword { color: #c586c0; }
.string { color: #ce9178; }
.func { color: #dcdcaa; }
.const { color: #4fc1ff; }
.comment { color: #6a9955; }
.result { background: #f5f5f5; padding: 10px 12px; border-radius: 6px; margin: 8px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.note { background: #fef3c7; border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 4px; font-size: 13px; color: #92400e; margin: 8px 0; }`}
          defaultJs={`const out = document.getElementById("output");

out.innerHTML = \`
<div class="section">
  <h3>1. 名前付きエクスポート（Named Export）</h3>
  <div class="file">
    <div class="file-header">📄 math.js</div>
    <div class="file-content"><span class="comment">// 個別にエクスポート</span>
<span class="keyword">export</span> <span class="keyword">const</span> <span class="const">PI</span> = 3.14159;

<span class="keyword">export</span> <span class="keyword">function</span> <span class="func">add</span>(a, b) {
  <span class="keyword">return</span> a + b;
}

<span class="keyword">export</span> <span class="keyword">function</span> <span class="func">multiply</span>(a, b) {
  <span class="keyword">return</span> a * b;
}

<span class="comment">// まとめてエクスポートも可能</span>
<span class="keyword">const</span> <span class="const">E</span> = 2.71828;
<span class="keyword">function</span> <span class="func">subtract</span>(a, b) { <span class="keyword">return</span> a - b; }
<span class="keyword">export</span> { <span class="const">E</span>, <span class="func">subtract</span> };</div>
  </div>
  <div class="file">
    <div class="file-header">📄 app.js</div>
    <div class="file-content"><span class="comment">// 必要なものだけインポート</span>
<span class="keyword">import</span> { add, multiply, <span class="const">PI</span> } <span class="keyword">from</span> <span class="string">'./math.js'</span>;

console.log(<span class="func">add</span>(2, 3));       <span class="comment">// 5</span>
console.log(<span class="func">multiply</span>(4, 5));  <span class="comment">// 20</span>
console.log(<span class="const">PI</span>);              <span class="comment">// 3.14159</span>

<span class="comment">// 別名をつけてインポート</span>
<span class="keyword">import</span> { add <span class="keyword">as</span> sum } <span class="keyword">from</span> <span class="string">'./math.js'</span>;
console.log(<span class="func">sum</span>(1, 2));  <span class="comment">// 3</span>

<span class="comment">// すべてをまとめてインポート</span>
<span class="keyword">import</span> * <span class="keyword">as</span> math <span class="keyword">from</span> <span class="string">'./math.js'</span>;
console.log(math.<span class="func">add</span>(1, 2));  <span class="comment">// 3</span></div>
  </div>
</div>

<div class="section">
  <h3>2. デフォルトエクスポート（Default Export）</h3>
  <div class="file">
    <div class="file-header">📄 User.js</div>
    <div class="file-content"><span class="comment">// 1ファイルにつき1つだけ</span>
<span class="keyword">export default</span> <span class="keyword">class</span> User {
  <span class="func">constructor</span>(name) {
    <span class="keyword">this</span>.name = name;
  }
  <span class="func">greet</span>() {
    <span class="keyword">return</span> <span class="string">"こんにちは、"</span> + <span class="keyword">this</span>.name;
  }
}</div>
  </div>
  <div class="file">
    <div class="file-header">📄 app.js</div>
    <div class="file-content"><span class="comment">// デフォルトは{}不要、好きな名前でインポート</span>
<span class="keyword">import</span> User <span class="keyword">from</span> <span class="string">'./User.js'</span>;
<span class="keyword">import</span> MyUser <span class="keyword">from</span> <span class="string">'./User.js'</span>; <span class="comment">// 別名もOK</span>

<span class="keyword">const</span> u = <span class="keyword">new</span> User(<span class="string">"太郎"</span>);
console.log(u.<span class="func">greet</span>()); <span class="comment">// こんにちは、太郎</span></div>
  </div>
</div>

<div class="note">
  💡 名前付きとデフォルトは同時に使えます：
  import User, { helper } from './User.js';
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">動的インポートと実践パターン</h2>
        <p className="text-gray-400 mb-4">動的インポートとモジュールの実践的な使い方を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 20px; }
.section h3 { color: #f59e0b; margin-bottom: 8px; }
.file { background: #1e1e1e; border-radius: 8px; overflow: hidden; margin: 8px 0; }
.file-header { background: #333; color: #ccc; padding: 6px 12px; font-size: 12px; font-family: monospace; }
.file-content { color: #d4d4d4; padding: 12px; font-family: monospace; font-size: 13px; white-space: pre; }
.keyword { color: #c586c0; }
.string { color: #ce9178; }
.func { color: #dcdcaa; }
.const { color: #4fc1ff; }
.comment { color: #6a9955; }
.result { background: #f5f5f5; padding: 10px 12px; border-radius: 6px; margin: 8px 0; font-size: 14px; }
.tree { background: #f5f5f5; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; white-space: pre; }`}
          defaultJs={`const out = document.getElementById("output");

out.innerHTML = \`
<div class="section">
  <h3>3. 動的インポート（Dynamic Import）</h3>
  <div class="file">
    <div class="file-header">📄 app.js</div>
    <div class="file-content"><span class="comment">// 必要な時にだけモジュールを読み込む</span>
<span class="keyword">async function</span> <span class="func">loadChart</span>() {
  <span class="comment">// import() はPromiseを返す</span>
  <span class="keyword">const</span> { Chart } = <span class="keyword">await</span> <span class="func">import</span>(<span class="string">'./chart.js'</span>);
  <span class="keyword">const</span> chart = <span class="keyword">new</span> Chart();
  chart.<span class="func">render</span>();
}

<span class="comment">// ボタンクリック時にだけ読み込む</span>
button.<span class="func">addEventListener</span>(<span class="string">'click'</span>, loadChart);

<span class="comment">// 条件分岐で読み込むモジュールを変える</span>
<span class="keyword">const</span> lang = navigator.language;
<span class="keyword">const</span> messages = <span class="keyword">await</span> <span class="func">import</span>(
  <span class="string">\\\`./locales/\\\${lang}.js\\\`</span>
);</div>
  </div>
  <div class="result">動的インポートは、初回読み込みを軽くしたい場合や、条件に応じて異なるモジュールを使いたい場合に有効です。</div>
</div>

<div class="section">
  <h3>4. 実践的なプロジェクト構成</h3>
  <div class="tree">src/
├── index.js          <span class="comment"># エントリーポイント</span>
├── utils/
│   ├── math.js       <span class="comment"># 数学ユーティリティ</span>
│   ├── string.js     <span class="comment"># 文字列ユーティリティ</span>
│   └── index.js      <span class="comment"># まとめてre-export</span>
├── models/
│   ├── User.js       <span class="comment"># ユーザーモデル</span>
│   └── Product.js    <span class="comment"># 商品モデル</span>
└── services/
    └── api.js        <span class="comment"># API通信</span></div>
</div>

<div class="section">
  <h3>5. Re-export パターン</h3>
  <div class="file">
    <div class="file-header">📄 utils/index.js（バレルファイル）</div>
    <div class="file-content"><span class="comment">// 各ファイルからre-export</span>
<span class="keyword">export</span> { add, subtract } <span class="keyword">from</span> <span class="string">'./math.js'</span>;
<span class="keyword">export</span> { capitalize, truncate } <span class="keyword">from</span> <span class="string">'./string.js'</span>;
<span class="keyword">export</span> { formatDate } <span class="keyword">from</span> <span class="string">'./date.js'</span>;</div>
  </div>
  <div class="file">
    <div class="file-header">📄 app.js</div>
    <div class="file-content"><span class="comment">// 1つのパスからまとめてインポートできる</span>
<span class="keyword">import</span> { add, capitalize, formatDate } <span class="keyword">from</span> <span class="string">'./utils'</span>;</div>
  </div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">モジュール構成をシミュレーションして理解を深めましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>モジュールシミュレーション</h2>
  <p>ボタンをクリックすると、各モジュールの関数を実行します。</p>
  <div class="buttons">
    <button onclick="useMath()">mathモジュール</button>
    <button onclick="useString()">stringモジュール</button>
    <button onclick="useUser()">Userモジュール</button>
  </div>
  <div id="result"></div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; }
p { color: #666; font-size: 14px; }
.buttons { display: flex; gap: 8px; margin: 16px 0; flex-wrap: wrap; }
button { background: #f59e0b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; }
button:hover { background: #d97706; }
#result { background: #f5f5f5; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 14px; white-space: pre-wrap; min-height: 100px; }`}
          defaultJs={`// --- math.js モジュール（シミュレーション）---
const MathModule = (() => {
  const PI = 3.14159;
  function add(a, b) { return a + b; }
  function multiply(a, b) { return a * b; }
  function circleArea(r) { return PI * r * r; }
  // export { PI, add, multiply, circleArea }
  return { PI, add, multiply, circleArea };
})();

// --- string.js モジュール ---
const StringModule = (() => {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function truncate(str, len) {
    return str.length > len ? str.slice(0, len) + "..." : str;
  }
  return { capitalize, truncate };
})();

// --- User.js モジュール ---
const UserModule = (() => {
  class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
    greet() { return "こんにちは、" + this.name + "さん！"; }
    toString() { return this.name + " <" + this.email + ">"; }
  }
  // export default User
  return { default: User };
})();

const result = document.getElementById("result");

function useMath() {
  const { PI, add, multiply, circleArea } = MathModule;
  result.textContent =
    "import { PI, add, multiply, circleArea } from './math.js';\\n\\n" +
    "PI = " + PI + "\\n" +
    "add(10, 20) = " + add(10, 20) + "\\n" +
    "multiply(6, 7) = " + multiply(6, 7) + "\\n" +
    "circleArea(5) = " + circleArea(5).toFixed(2);
}

function useString() {
  const { capitalize, truncate } = StringModule;
  result.textContent =
    "import { capitalize, truncate } from './string.js';\\n\\n" +
    'capitalize("hello") = "' + capitalize("hello") + '"\\n' +
    'truncate("これは長い文字列です", 6) = "' + truncate("これは長い文字列です", 6) + '"';
}

function useUser() {
  const User = UserModule.default;
  const user = new User("太郎", "taro@example.com");
  result.textContent =
    "import User from './User.js';\\n\\n" +
    "const user = new User(\\"太郎\\", \\"taro@example.com\\");\\n" +
    "user.greet() = \\"" + user.greet() + "\\"\\n" +
    "user.toString() = \\"" + user.toString() + "\\"";
}`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="modules" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="modules" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
