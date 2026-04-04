import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function AsyncLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期処理</h1>
        <p className="text-gray-400">コールバック、Promise、async/awaitで非同期処理をマスターしよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非同期処理とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JavaScriptはシングルスレッドですが、非同期処理により時間のかかる処理（API通信、タイマーなど）を
          メインスレッドをブロックせずに実行できます。非同期処理の進化の歴史を学びましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">コールバック</code> — 最も基本的な方法（コールバック地獄に注意）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Promise</code> — コールバックを改善した仕組み</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">async/await</code> — Promiseを同期的に書ける構文</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Promise.all</code> — 複数の非同期処理を並列実行</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Promise.race</code> — 最初に完了したものを取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールバックとPromise</h2>
        <p className="text-gray-400 mb-4">setTimeoutを使ってコールバックとPromiseの違いを理解しましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output">
  <button id="btn-callback" onclick="runCallback()">コールバック実行</button>
  <button id="btn-promise" onclick="runPromise()">Promise実行</button>
  <div id="log"></div>
</div>`}
          defaultCss={`body { font-family: sans-serif; }
button { background: #f59e0b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; margin: 4px; cursor: pointer; font-size: 14px; }
button:hover { background: #d97706; }
#log { margin-top: 16px; }
.entry { padding: 6px 12px; margin: 4px 0; border-radius: 4px; font-family: monospace; font-size: 13px; animation: fadeIn 0.3s; }
.step { background: #eff6ff; border-left: 3px solid #3b82f6; }
.done { background: #f0fdf4; border-left: 3px solid #22c55e; }
.error { background: #fef2f2; border-left: 3px solid #ef4444; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}
          defaultJs={`const log = document.getElementById("log");

function addLog(msg, type = "step") {
  const time = new Date().toLocaleTimeString();
  log.innerHTML += '<div class="entry ' + type + '">[' + time + '] ' + msg + '</div>';
  log.scrollTop = log.scrollHeight;
}

// コールバック方式
function fetchData(callback) {
  addLog("データ取得開始...");
  setTimeout(() => {
    callback({ name: "太郎", age: 25 });
  }, 1000);
}

function runCallback() {
  log.innerHTML = "<h3>コールバック方式</h3>";
  addLog("処理開始");
  fetchData((data) => {
    addLog("データ取得完了: " + JSON.stringify(data), "done");
  });
  addLog("fetchDataの呼び出し後（非同期なのですぐ実行される）");
}

// Promise方式
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    addLog("Promise: データ取得開始...");
    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        resolve({ name: "花子", score: 95 });
      } else {
        reject(new Error("データ取得に失敗しました"));
      }
    }, 1000);
  });
}

function runPromise() {
  log.innerHTML = "<h3>Promise方式</h3>";
  addLog("処理開始");
  fetchDataPromise()
    .then(data => {
      addLog("成功: " + JSON.stringify(data), "done");
    })
    .catch(err => {
      addLog("失敗: " + err.message, "error");
    })
    .finally(() => {
      addLog("（finallyは必ず実行される）", "step");
    });
  addLog("Promiseの呼び出し後（非同期）");
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">async/await・Promise.all・Promise.race</h2>
        <p className="text-gray-400 mb-4">モダンな非同期処理の書き方を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output">
  <button onclick="runAsyncAwait()">async/await 実行</button>
  <button onclick="runPromiseAll()">Promise.all 実行</button>
  <button onclick="runPromiseRace()">Promise.race 実行</button>
  <div id="log"></div>
</div>`}
          defaultCss={`body { font-family: sans-serif; }
button { background: #f59e0b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; margin: 4px; cursor: pointer; font-size: 14px; }
button:hover { background: #d97706; }
#log { margin-top: 16px; }
.entry { padding: 6px 12px; margin: 4px 0; border-radius: 4px; font-family: monospace; font-size: 13px; animation: fadeIn 0.3s; }
.step { background: #eff6ff; border-left: 3px solid #3b82f6; }
.done { background: #f0fdf4; border-left: 3px solid #22c55e; }
.error { background: #fef2f2; border-left: 3px solid #ef4444; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}
          defaultJs={`const log = document.getElementById("log");

function addLog(msg, type = "step") {
  log.innerHTML += '<div class="entry ' + type + '">' + msg + '</div>';
}

// 擬似的な非同期関数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser() {
  return delay(800).then(() => ({ id: 1, name: "太郎" }));
}

function fetchPosts(userId) {
  return delay(600).then(() => [
    { title: "初投稿" },
    { title: "JavaScriptを学ぶ" }
  ]);
}

function fetchComments() {
  return delay(400).then(() => ["いいね！", "参考になりました"]);
}

// async/await
async function runAsyncAwait() {
  log.innerHTML = "<h3>async/await</h3>";
  try {
    addLog("ユーザー取得中...");
    const user = await fetchUser();
    addLog("ユーザー: " + user.name, "done");

    addLog("投稿取得中...");
    const posts = await fetchPosts(user.id);
    addLog("投稿数: " + posts.length, "done");

    posts.forEach(p => addLog("  - " + p.title));
  } catch (err) {
    addLog("エラー: " + err.message, "error");
  }
}

// Promise.all - 並列実行
async function runPromiseAll() {
  log.innerHTML = "<h3>Promise.all（並列実行）</h3>";
  addLog("3つの処理を同時に開始...");
  const start = Date.now();

  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(),
      fetchPosts(1),
      fetchComments()
    ]);
    const elapsed = Date.now() - start;
    addLog("すべて完了！（" + elapsed + "ms）", "done");
    addLog("ユーザー: " + user.name);
    addLog("投稿数: " + posts.length);
    addLog("コメント数: " + comments.length);
  } catch (err) {
    addLog("エラー: " + err.message, "error");
  }
}

// Promise.race - 最初に完了したもの
async function runPromiseRace() {
  log.innerHTML = "<h3>Promise.race（最速のものを取得）</h3>";
  addLog("3つの処理を競争開始...");

  const result = await Promise.race([
    delay(500).then(() => "処理A（500ms）"),
    delay(300).then(() => "処理B（300ms）"),
    delay(700).then(() => "処理C（700ms）")
  ]);
  addLog("勝者: " + result, "done");
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">非同期処理を使ったローディング表示を作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>データダッシュボード</h2>
  <button onclick="loadAll()">データ読み込み</button>
  <div id="cards"></div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; }
button { background: #f59e0b; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; margin-bottom: 16px; }
#cards { display: grid; gap: 12px; }
.card { background: #f5f5f5; padding: 16px; border-radius: 8px; }
.card h3 { margin: 0 0 8px; color: #f59e0b; }
.loading { text-align: center; color: #999; }
.spinner { display: inline-block; width: 20px; height: 20px; border: 3px solid #ddd; border-top-color: #f59e0b; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }`}
          defaultJs={`function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchSales() {
  await delay(1200);
  return { total: 1250000, count: 342 };
}

async function fetchUsers() {
  await delay(800);
  return { active: 156, new: 23 };
}

async function fetchOrders() {
  await delay(1500);
  return { pending: 12, shipped: 45 };
}

function showLoading(id) {
  document.getElementById(id).innerHTML =
    '<div class="loading"><div class="spinner"></div> 読み込み中...</div>';
}

async function loadAll() {
  const cards = document.getElementById("cards");
  cards.innerHTML =
    '<div class="card" id="c1"></div>' +
    '<div class="card" id="c2"></div>' +
    '<div class="card" id="c3"></div>';

  showLoading("c1");
  showLoading("c2");
  showLoading("c3");

  // 並列で取得
  const [sales, users, orders] = await Promise.all([
    fetchSales().then(d => {
      document.getElementById("c1").innerHTML =
        '<h3>売上</h3><p>合計: ¥' + d.total.toLocaleString() + '</p><p>件数: ' + d.count + '</p>';
      return d;
    }),
    fetchUsers().then(d => {
      document.getElementById("c2").innerHTML =
        '<h3>ユーザー</h3><p>アクティブ: ' + d.active + '</p><p>新規: ' + d.new + '</p>';
      return d;
    }),
    fetchOrders().then(d => {
      document.getElementById("c3").innerHTML =
        '<h3>注文</h3><p>処理中: ' + d.pending + '</p><p>発送済: ' + d.shipped + '</p>';
      return d;
    })
  ]);
}`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="async" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="async" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
