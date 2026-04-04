import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "JavaScriptで正規表現リテラルを作る正しい書き方はどれ？",
    options: [
      "new RegExp[abc]",
      "/[abc]/",
      "regexp([abc])",
      "#[abc]#",
    ],
    answer: 1,
    explanation: "/パターン/フラグ の形式が正規表現リテラルです。例: /hello/i はhelloを大文字小文字関係なくマッチします。",
  },
  {
    question: "正規表現の test() メソッドの戻り値の型はどれ？",
    options: ["string", "number", "boolean", "array"],
    answer: 2,
    explanation: "test()はパターンに一致すればtrue、一致しなければfalseを返すboolean型です。",
  },
  {
    question: "/\\d+/g の g フラグの意味はどれ？",
    options: [
      "大文字・小文字を区別しない",
      "文字列全体をすべて検索する（グローバル）",
      "複数行モードで検索する",
      "文字列の先頭のみ検索する",
    ],
    answer: 1,
    explanation: "g（global）フラグは文字列の中で一致するものすべてを検索します。gなしの場合は最初の一致のみ返します。",
  },
  {
    question: "メールアドレスのバリデーションに使う正規表現として最も適切なものはどれ？",
    options: [
      "/[a-z]+/",
      "/\\w+@\\w+\\.\\w+/",
      "/.*email.*/",
      "/^[a-zA-Z]$/",
    ],
    answer: 1,
    explanation: "/\\w+@\\w+\\.\\w+/ は「英数字@英数字.英数字」の形式を検証します。実際のバリデーションではより複雑なパターンを使いますが、基本はこの形です。",
  },
];

export default function RegexLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現</h1>
        <p className="text-gray-400">パターンマッチングで文字列を自在に検索・置換・検証しよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">正規表現とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          正規表現（RegExp）は、文字列のパターンを記述するための強力な仕組みです。
          メールアドレスの検証、URLの抽出、テキストの一括置換など、
          文字列処理で欠かせないツールです。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">/pattern/flags</code> — 正規表現リテラル</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">test()</code> — パターンに一致するか判定（true/false）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">match()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">matchAll()</code> — 一致した部分を取得</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">replace()</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">replaceAll()</code> — パターンで置換</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">exec()</code> — 詳細なマッチ情報を取得</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">split()</code> — パターンで分割</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">正規表現の基本構文とフラグ</h2>
        <p className="text-gray-400 mb-4">リテラル記法、よく使う特殊文字、フラグを確認しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
#output { line-height: 1.8; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }
.true { color: #16a34a; font-weight: bold; }
.false { color: #dc2626; font-weight: bold; }`}
          defaultJs={`const out = document.getElementById("output");

const text = "Hello, World! 2024年のJavaScript入門";

// \\.  — 任意の1文字
// \\d  — 数字 [0-9]
// \\w  — 英数字・アンダースコア [a-zA-Z0-9_]
// \\s  — 空白文字
// +   — 1回以上
// *   — 0回以上
// ?   — 0回または1回
// ^   — 行頭
// $   — 行末

// フラグ
// i   — 大文字小文字を無視
// g   — すべての一致を検索
// m   — 複数行モード

// test(): 一致すればtrue
const hasNumber = /\\d+/.test(text);
const hasHello  = /hello/i.test(text);  // i フラグで大小文字無視

// match(): 一致した部分を配列で返す
const numbers = text.match(/\\d+/g);    // g フラグで全件取得
const words   = text.match(/[a-zA-Z]+/g);

// split(): 正規表現で分割
const parts = "one  two   three".split(/\\s+/);

out.innerHTML = \`
<div class="section">
  <h3>test() — /\\\\d+/.test(text)</h3>
  <div class="result"><span class="\${hasNumber}">\${hasNumber}</span>（数字が含まれる）</div>
</div>
<div class="section">
  <h3>test() — /hello/i.test(text)（i フラグ）</h3>
  <div class="result"><span class="\${hasHello}">\${hasHello}</span>（Hello にマッチ）</div>
</div>
<div class="section">
  <h3>match(/\\\\d+/g) — 数字を全件取得</h3>
  <div class="result">[\${numbers ? numbers.map(n => '"' + n + '"').join(", ") : "null"}]</div>
</div>
<div class="section">
  <h3>match(/[a-zA-Z]+/g) — 英単語を全件取得</h3>
  <div class="result">[\${words ? words.map(w => '"' + w + '"').join(", ") : "null"}]</div>
</div>
<div class="section">
  <h3>split(/\\\\s+/) — 空白（複数）で分割</h3>
  <div class="result">[\${parts.map(p => '"' + p + '"').join(", ")}]</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キャプチャグループと replace()</h2>
        <p className="text-gray-400 mb-4">丸括弧でグループを作り、一致した部分を取り出したり置換に再利用できます。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
#output { line-height: 1.8; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }`}
          defaultJs={`const out = document.getElementById("output");

// キャプチャグループ: () で囲んだ部分を $1, $2 ... で参照できる

// 日付フォーマット変換: YYYY-MM-DD → DD/MM/YYYY
const date = "2024-03-15";
const reformatted = date.replace(
  /(\\d{4})-(\\d{2})-(\\d{2})/,
  "$3/$2/$1"
);

// 名前の順序を入れ替え: "姓 名" → "名 姓"
const name = "田中 太郎";
const swapped = name.replace(/(\\S+)\\s+(\\S+)/, "$2 $1");

// exec(): マッチの詳細情報（index、入力文字列、グループ）
const pattern = /(\\w+)@(\\w+\\.\\w+)/;
const email = "連絡先: user@example.com までどうぞ";
const result = pattern.exec(email);

// 名前付きキャプチャグループ (?<name>...)
const datePattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const dateMatch = "今日は 2024-12-25 です".match(datePattern);

out.innerHTML = \`
<div class="section">
  <h3>日付フォーマット変換（YYYY-MM-DD → DD/MM/YYYY）</h3>
  <div class="result">"\${date}" → "\${reformatted}"</div>
</div>
<div class="section">
  <h3>姓名の入れ替え</h3>
  <div class="result">"\${name}" → "\${swapped}"</div>
</div>
<div class="section">
  <h3>exec() でメールアドレスを解析</h3>
  <div class="result">
    全体マッチ: "\${result ? result[0] : "なし"}"<br>
    グループ1（ユーザー名）: "\${result ? result[1] : "なし"}"<br>
    グループ2（ドメイン）: "\${result ? result[2] : "なし"}"<br>
    マッチ位置（index）: \${result ? result.index : "なし"}
  </div>
</div>
<div class="section">
  <h3>名前付きグループ (?&lt;year&gt;...)(?&lt;month&gt;...)(?&lt;day&gt;...)</h3>
  <div class="result">
    年: \${dateMatch ? dateMatch.groups.year : "なし"}<br>
    月: \${dateMatch ? dateMatch.groups.month : "なし"}<br>
    日: \${dateMatch ? dateMatch.groups.day : "なし"}
  </div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">先読み・後読み（Lookahead / Lookbehind）</h2>
        <p className="text-gray-400 mb-4">特定のパターンの前後にあるものだけをマッチさせる高度なテクニックです。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
#output { line-height: 1.8; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; }`}
          defaultJs={`const out = document.getElementById("output");

// (?=...) 肯定先読み: 後ろに...が続く場合のみマッチ
// (?!...) 否定先読み: 後ろに...が続かない場合のみマッチ
// (?<=...) 肯定後読み: 前に...がある場合のみマッチ
// (?<!...) 否定後読み: 前に...がない場合のみマッチ

const prices = "りんご: 150円、みかん: 80円、ぶどう: 320円";

// 数字の後ろに「円」が続くものをすべて取得（先読み）
const amounts = prices.match(/\\d+(?=円)/g);

// 「円」の前にある数字だけを取得（後読み）
const beforeYen = prices.match(/(?<=: )\\d+/g);

// パスワード強度チェック（先読みを組み合わせる）
// 8文字以上、大文字・小文字・数字をそれぞれ1つ以上含む
const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$/;

const passwords = ["weakpass", "Stronger1", "abc123", "MyP@ssw0rd"];
const results = passwords.map(p => ({
  password: p,
  strong: strongPassword.test(p)
}));

out.innerHTML = \`
<div class="section">
  <h3>肯定先読み (?=円) — 「円」の前の数字のみ</h3>
  <div class="result">[\${amounts ? amounts.map(n => '"' + n + '"').join(", ") : "null"}]</div>
</div>
<div class="section">
  <h3>肯定後読み (?&lt;=: ) — 「: 」の後の数字のみ</h3>
  <div class="result">[\${beforeYen ? beforeYen.map(n => '"' + n + '"').join(", ") : "null"}]</div>
</div>
<div class="section">
  <h3>パスワード強度チェック（先読みの組み合わせ）</h3>
  <div class="result">
    \${results.map(r =>
      \`"\${r.password}": \${r.strong
        ? '<span style="color:#16a34a">強い</span>'
        : '<span style="color:#dc2626">弱い</span>'}\`
    ).join("<br>")}
  </div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よく使うパターン集</h2>
        <p className="text-gray-400 mb-4">実務でよく使われる正規表現パターンを試してみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>バリデーターツール</h2>
  <div class="field">
    <label>メールアドレス</label>
    <input id="emailInput" type="text" placeholder="例: user@example.com">
    <span id="emailResult"></span>
  </div>
  <div class="field">
    <label>電話番号（日本）</label>
    <input id="phoneInput" type="text" placeholder="例: 090-1234-5678">
    <span id="phoneResult"></span>
  </div>
  <div class="field">
    <label>郵便番号</label>
    <input id="zipInput" type="text" placeholder="例: 123-4567">
    <span id="zipResult"></span>
  </div>
  <div class="field">
    <label>URL</label>
    <input id="urlInput" type="text" placeholder="例: https://example.com">
    <span id="urlResult"></span>
  </div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; font-family: sans-serif; }
h2 { color: #f59e0b; }
.field { margin-bottom: 16px; }
label { display: block; font-size: 13px; color: #555; margin-bottom: 4px; }
input { width: 100%; padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 15px; box-sizing: border-box; }
input:focus { outline: none; border-color: #f59e0b; }
span { display: block; margin-top: 4px; font-size: 13px; font-weight: bold; }
.ok { color: #16a34a; }
.ng { color: #dc2626; }`}
          defaultJs={`// よく使う正規表現パターン
const PATTERNS = {
  email: /^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/,
  phone: /^0\\d{1,4}-\\d{1,4}-\\d{4}$/,
  zip:   /^\\d{3}-\\d{4}$/,
  url:   /^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-.,@?^=%&:\\/~+#]*[\\w\\-@?^=%&\\/~+#])?$/,
};

function validate(inputId, resultId, pattern) {
  const input = document.getElementById(inputId);
  const result = document.getElementById(resultId);
  input.addEventListener("input", () => {
    const val = input.value.trim();
    if (!val) { result.textContent = ""; return; }
    if (pattern.test(val)) {
      result.textContent = "OK";
      result.className = "ok";
    } else {
      result.textContent = "形式が正しくありません";
      result.className = "ng";
    }
  });
}

validate("emailInput", "emailResult", PATTERNS.email);
validate("phoneInput", "phoneResult", PATTERNS.phone);
validate("zipInput",   "zipResult",   PATTERNS.zip);
validate("urlInput",   "urlResult",   PATTERNS.url);`}
        />
      </section>

      <section className="mb-10">
        <Quiz questions={quizQuestions} color="yellow" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">正規表現を使ってテキスト処理ツールを作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>正規表現テスター</h2>
  <div class="row">
    <label>パターン（/ /不要）</label>
    <input id="patternInput" value="\\d+" placeholder="例: \\d+">
  </div>
  <div class="row">
    <label>フラグ</label>
    <input id="flagInput" value="g" placeholder="例: gi" style="width:60px">
  </div>
  <div class="row">
    <label>テスト文字列</label>
    <textarea id="textInput" rows="3">Hello World 123 test456 789!</textarea>
  </div>
  <button id="runBtn">テスト実行</button>
  <div id="output"></div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; font-family: sans-serif; }
h2 { color: #f59e0b; }
.row { margin-bottom: 12px; }
label { display: block; font-size: 13px; color: #555; margin-bottom: 4px; }
input, textarea { width: 100%; padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
button { background: #f59e0b; color: #fff; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; margin-bottom: 12px; }
button:hover { background: #d97706; }
#output { background: #f5f5f5; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 14px; min-height: 40px; white-space: pre-wrap; }
.match { background: #fef08a; border-radius: 2px; }`}
          defaultJs={`document.getElementById("runBtn").addEventListener("click", () => {
  const patternStr = document.getElementById("patternInput").value;
  const flags = document.getElementById("flagInput").value;
  const text = document.getElementById("textInput").value;
  const out = document.getElementById("output");

  try {
    const regex = new RegExp(patternStr, flags);
    const matches = text.match(regex);

    if (!matches) {
      out.textContent = "一致なし";
    } else {
      out.innerHTML = "一致した文字列:\\n" +
        matches.map((m, i) => \`  [\${i}] "\${m}"\`).join("\\n") +
        "\\n\\n合計: " + matches.length + " 件";
    }
  } catch (e) {
    out.textContent = "エラー: " + e.message;
  }
});`}
        />
      </section>

      <LessonCompleteButton categoryId="javascript" lessonId="regex" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="regex" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
