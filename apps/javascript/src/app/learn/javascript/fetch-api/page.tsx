import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function FetchApiLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Fetch API</h1>
        <p className="text-gray-400">Web APIとの通信方法を学んでデータを取得・送信しよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Fetch APIとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Fetch APIは、ブラウザに組み込まれたHTTPリクエストを送信するための仕組みです。
          外部のAPI（サーバー）と通信してデータの取得や送信ができます。Promiseベースで設計されているので、
          async/awaitと組み合わせて使うのが一般的です。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">fetch(url)</code> — GETリクエスト</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">response.json()</code> — JSONレスポンスを解析</li>
          <li>POSTリクエスト — データの送信</li>
          <li>ヘッダー — リクエストの設定</li>
          <li>エラーハンドリング — ネットワークエラーやHTTPエラーの処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">GETリクエストとJSON</h2>
        <p className="text-gray-400 mb-4">公開APIからデータを取得してみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>ユーザー一覧（JSONPlaceholder API）</h2>
  <button id="loadBtn">データを取得</button>
  <div id="status"></div>
  <div id="users"></div>
</div>`}
          defaultCss={`body { font-family: sans-serif; }
#app { max-width: 600px; margin: 0 auto; }
h2 { color: #f59e0b; font-size: 18px; }
button { background: #f59e0b; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; }
button:hover { background: #d97706; }
button:disabled { background: #999; cursor: not-allowed; }
#status { margin: 12px 0; font-size: 14px; color: #666; }
.user-card { background: #f5f5f5; padding: 12px 16px; margin: 8px 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
.user-name { font-weight: bold; }
.user-email { color: #666; font-size: 13px; }
.spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid #ddd; border-top-color: #f59e0b; border-radius: 50%; animation: spin 0.6s linear infinite; margin-right: 8px; }
@keyframes spin { to { transform: rotate(360deg); } }
.error { color: #ef4444; }`}
          defaultJs={`const btn = document.getElementById("loadBtn");
const status = document.getElementById("status");
const usersDiv = document.getElementById("users");

btn.addEventListener("click", async () => {
  btn.disabled = true;
  status.innerHTML = '<span class="spinner"></span>読み込み中...';
  usersDiv.innerHTML = "";

  try {
    // GETリクエスト
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    // HTTPステータスチェック
    if (!response.ok) {
      throw new Error("HTTP " + response.status + ": " + response.statusText);
    }

    // JSONとして解析
    const users = await response.json();

    status.textContent = users.length + "件のユーザーを取得しました";

    // ユーザーカードを表示
    usersDiv.innerHTML = users.slice(0, 5).map(user =>
      '<div class="user-card">' +
        '<div><div class="user-name">' + user.name + '</div>' +
        '<div class="user-email">' + user.email + '</div></div>' +
        '<div>' + user.company.name + '</div>' +
      '</div>'
    ).join("");

  } catch (error) {
    status.innerHTML = '<span class="error">エラー: ' + error.message + '</span>';
  } finally {
    btn.disabled = false;
  }
});`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">POSTリクエストとエラーハンドリング</h2>
        <p className="text-gray-400 mb-4">データの送信方法とエラー処理を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>投稿を作成（POST）</h2>
  <form id="postForm">
    <input type="text" id="title" placeholder="タイトル" required>
    <textarea id="body" rows="3" placeholder="本文" required></textarea>
    <button type="submit">送信（POST）</button>
  </form>
  <div id="result"></div>
  <h3 style="margin-top: 24px; color: #f59e0b;">コードの解説</h3>
  <div id="code-explain"></div>
</div>`}
          defaultCss={`body { font-family: sans-serif; }
#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; font-size: 18px; }
input, textarea { display: block; width: 100%; padding: 10px; margin-bottom: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
button { background: #f59e0b; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; width: 100%; }
#result { margin-top: 16px; }
.success { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 8px; }
.error { background: #fef2f2; border: 1px solid #fecaca; padding: 12px; border-radius: 8px; color: #991b1b; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; white-space: pre-wrap; margin: 8px 0; }`}
          defaultJs={`// コードの解説を表示
document.getElementById("code-explain").innerHTML = \`
<div class="code-block">// POSTリクエストの基本構造
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "タイトル",
    body: "本文",
    userId: 1
  })
});
const data = await response.json();</div>
\`;

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = document.getElementById("result");
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  result.innerHTML = "送信中...";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1
        })
      }
    );

    if (!response.ok) {
      throw new Error("送信失敗: HTTP " + response.status);
    }

    const data = await response.json();
    result.innerHTML = '<div class="success">' +
      '<strong>送信成功！</strong><br>' +
      'ID: ' + data.id + '<br>' +
      'タイトル: ' + data.title + '<br>' +
      '本文: ' + data.body +
      '</div>';
  } catch (error) {
    result.innerHTML = '<div class="error">' + error.message + '</div>';
  }
});`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">公開APIを使ってデータを取得して表示してみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>TODO検索</h2>
  <div class="controls">
    <input type="number" id="userId" min="1" max="10" value="1" placeholder="ユーザーID (1-10)">
    <button onclick="loadTodos()">TODOを取得</button>
  </div>
  <div id="stats"></div>
  <div id="todos"></div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; }
.controls { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 8px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; }
button { background: #f59e0b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
#stats { display: flex; gap: 8px; margin-bottom: 12px; }
.stat { background: #f5f5f5; padding: 8px 16px; border-radius: 6px; font-size: 14px; }
.todo { padding: 8px 12px; margin: 4px 0; border-radius: 6px; font-size: 14px; }
.done { background: #f0fdf4; text-decoration: line-through; color: #666; }
.pending { background: #fef3c7; }`}
          defaultJs={`async function loadTodos() {
  const userId = document.getElementById("userId").value;
  const todosDiv = document.getElementById("todos");
  const statsDiv = document.getElementById("stats");
  todosDiv.innerHTML = "読み込み中...";

  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=" + userId
    );
    const todos = await res.json();

    const completed = todos.filter(t => t.completed).length;
    statsDiv.innerHTML =
      '<div class="stat">全' + todos.length + '件</div>' +
      '<div class="stat">完了: ' + completed + '</div>' +
      '<div class="stat">未完了: ' + (todos.length - completed) + '</div>';

    todosDiv.innerHTML = todos.map(t =>
      '<div class="todo ' + (t.completed ? "done" : "pending") + '">' +
      (t.completed ? "✓ " : "○ ") + t.title + '</div>'
    ).join("");
  } catch (err) {
    todosDiv.innerHTML = '<div style="color:red">' + err.message + '</div>';
  }
}`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="fetch-api" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="fetch-api" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
