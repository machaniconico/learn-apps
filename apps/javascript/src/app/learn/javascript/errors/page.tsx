import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function ErrorsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラーハンドリング</h1>
        <p className="text-gray-400">エラーを適切に処理してプログラムの安定性を高めよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エラーハンドリングとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プログラムの実行中にエラーが発生することは避けられません。
          適切にエラーを捕捉して処理することで、プログラムのクラッシュを防ぎ、
          ユーザーにわかりやすいフィードバックを提供できます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">try...catch...finally</code> — エラーの捕捉と処理</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">throw</code> — 意図的にエラーを発生させる</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Error</code>オブジェクト — エラー情報を格納</li>
          <li>エラーの種類 — TypeError, RangeError, SyntaxError など</li>
          <li>カスタムエラー — 独自のエラークラス</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try/catch/finally と throw</h2>
        <p className="text-gray-400 mb-4">エラーの基本的な処理方法を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.error { background: #fef2f2; border-left: 4px solid #ef4444; }
.success { background: #f0fdf4; border-left: 4px solid #22c55e; }
.info { background: #eff6ff; border-left: 4px solid #3b82f6; }`}
          defaultJs={`const out = document.getElementById("output");
let html = "";

// 基本的な try...catch
try {
  const data = JSON.parse('{"name": "太郎"}');
  html += '<div class="section"><h3>正常なJSON解析</h3><div class="result success">成功: ' + data.name + '</div></div>';
} catch (error) {
  html += '<div class="result error">エラー: ' + error.message + '</div>';
}

// エラーが発生する場合
try {
  const bad = JSON.parse("これはJSONではない");
} catch (error) {
  html += '<div class="section"><h3>不正なJSON解析</h3><div class="result error">キャッチ: ' + error.message + '</div></div>';
}

// finally は必ず実行
let status = "";
try {
  status += "try実行 → ";
  throw new Error("テストエラー");
} catch (e) {
  status += "catch実行 → ";
} finally {
  status += "finally実行";
}
html += '<div class="section"><h3>finally は必ず実行される</h3><div class="result info">' + status + '</div></div>';

// throw で独自エラー
function divide(a, b) {
  if (b === 0) throw new Error("0で割ることはできません");
  return a / b;
}

try {
  html += '<div class="section"><h3>throwでエラーを投げる</h3>';
  html += '<div class="result success">10 / 2 = ' + divide(10, 2) + '</div>';
  divide(10, 0); // ここでエラー
} catch (e) {
  html += '<div class="result error">' + e.message + '</div></div>';
}

// エラーの種類を判定
function checkError() {
  let results = [];
  try { null.property; } catch (e) { results.push("TypeError: " + e.message); }
  try { decodeURI("%"); } catch (e) { results.push("URIError: " + e.message); }
  try { const a = new Array(-1); } catch (e) { results.push("RangeError: " + e.message); }
  return results;
}
html += '<div class="section"><h3>エラーの種類</h3>' +
  checkError().map(r => '<div class="result error">' + r + '</div>').join("") + '</div>';

out.innerHTML = html;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムエラーとデバッグ</h2>
        <p className="text-gray-400 mb-4">独自のエラークラスとデバッグのコツを学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
.error { background: #fef2f2; border-left: 4px solid #ef4444; }
.success { background: #f0fdf4; border-left: 4px solid #22c55e; }`}
          defaultJs={`const out = document.getElementById("output");

// カスタムエラークラス
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(resource + "が見つかりません");
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

// バリデーション関数
function validateUser(user) {
  if (!user.name || user.name.length < 2) {
    throw new ValidationError("name", "名前は2文字以上必要です");
  }
  if (!user.email || !user.email.includes("@")) {
    throw new ValidationError("email", "有効なメールアドレスを入力してください");
  }
  if (user.age < 0 || user.age > 150) {
    throw new ValidationError("age", "年齢が不正です");
  }
  return true;
}

let html = "";

// テストケース
const testCases = [
  { name: "太郎", email: "taro@example.com", age: 25 },
  { name: "", email: "bad", age: 25 },
  { name: "花子", email: "hanako@example.com", age: -5 },
];

html += '<div class="section"><h3>カスタムエラーによるバリデーション</h3>';
testCases.forEach(user => {
  try {
    validateUser(user);
    html += '<div class="result success">OK: ' + JSON.stringify(user) + '</div>';
  } catch (e) {
    if (e instanceof ValidationError) {
      html += '<div class="result error">[' + e.name + '] ' + e.field + ': ' + e.message + '</div>';
    } else {
      html += '<div class="result error">予期しないエラー: ' + e.message + '</div>';
    }
  }
});
html += '</div>';

// エラーの種類による分岐
function findUser(id) {
  const users = { 1: "太郎", 2: "花子" };
  if (!users[id]) throw new NotFoundError("ユーザーID:" + id);
  return users[id];
}

html += '<div class="section"><h3>エラーの種類で分岐</h3>';
[1, 3].forEach(id => {
  try {
    const name = findUser(id);
    html += '<div class="result success">ID ' + id + ': ' + name + '</div>';
  } catch (e) {
    if (e instanceof NotFoundError) {
      html += '<div class="result error">' + e.name + ': ' + e.message + '</div>';
    }
  }
});
html += '</div>';

// デバッグのコツ
html += '<div class="section"><h3>デバッグのコツ</h3><div class="result">' +
  '1. console.log() で値を確認\\n' +
  '2. console.error() でエラーを記録\\n' +
  '3. console.table() でオブジェクト/配列を表形式で表示\\n' +
  '4. debugger; 文でブレークポイントを設定\\n' +
  '5. try/catchで具体的なエラー情報を出力' +
  '</div></div>';

out.innerHTML = html;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">エラーハンドリングを使ったフォームバリデーションを作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>登録フォーム</h2>
  <form id="form">
    <input type="text" id="name" placeholder="名前（2文字以上）">
    <input type="email" id="email" placeholder="メールアドレス">
    <input type="number" id="age" placeholder="年齢（1〜120）">
    <button type="submit">登録</button>
  </form>
  <div id="result"></div>
</div>`}
          defaultCss={`#app { max-width: 400px; margin: 0 auto; }
h2 { color: #f59e0b; }
input { display: block; width: 100%; padding: 10px; margin-bottom: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
input.error { border-color: #ef4444; }
button { background: #f59e0b; color: #fff; border: none; padding: 10px 24px; border-radius: 6px; font-size: 16px; cursor: pointer; width: 100%; }
.msg { padding: 10px; border-radius: 6px; margin-top: 10px; }
.msg.ok { background: #f0fdf4; color: #166534; }
.msg.ng { background: #fef2f2; color: #991b1b; }`}
          defaultJs={`document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const result = document.getElementById("result");

  // すべてのエラー状態をリセット
  document.querySelectorAll("input").forEach(i => i.classList.remove("error"));

  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = Number(document.getElementById("age").value);

    if (!name || name.length < 2) {
      document.getElementById("name").classList.add("error");
      throw new Error("名前は2文字以上で入力してください");
    }
    if (!email || !email.includes("@")) {
      document.getElementById("email").classList.add("error");
      throw new Error("有効なメールアドレスを入力してください");
    }
    if (!age || age < 1 || age > 120) {
      document.getElementById("age").classList.add("error");
      throw new Error("年齢は1〜120の範囲で入力してください");
    }

    result.innerHTML = '<div class="msg ok">登録成功！' + name + 'さん（' + age + '歳）</div>';
  } catch (err) {
    result.innerHTML = '<div class="msg ng">' + err.message + '</div>';
  }
});`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="errors" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="errors" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
