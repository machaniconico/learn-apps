import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function JsExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン15</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JavaScript総合演習</h1>
        <p className="text-gray-400">これまで学んだ知識を活かしてTODOアプリを作ろう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">総合演習について</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、HTML・CSS・JavaScriptを組み合わせて完全なTODOアプリを構築します。
          これまで学んだ以下の知識をすべて活用します。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li>DOM操作 — 要素の作成、追加、削除、イベント処理</li>
          <li>配列メソッド — filter、map、forEachでデータを操作</li>
          <li>オブジェクト — TODOデータの構造化</li>
          <li>関数 — 機能ごとの関数設計</li>
          <li>エラーハンドリング — 入力のバリデーション</li>
          <li>テンプレートリテラル — HTMLの動的生成</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ステップ1: 基本構造とタスクの追加</h2>
        <p className="text-gray-400 mb-4">まずはTODOの追加と表示の基本機能を作りましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h1>📝 TODOアプリ</h1>
  <form id="todoForm">
    <input type="text" id="todoInput" placeholder="新しいタスクを入力..." autocomplete="off">
    <button type="submit">追加</button>
  </form>
  <div id="stats"></div>
  <ul id="todoList"></ul>
</div>`}
          defaultCss={`* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; background: #f8f9fa; padding: 20px; }
#app { max-width: 500px; margin: 0 auto; }
h1 { text-align: center; color: #f59e0b; margin-bottom: 20px; font-size: 24px; }
form { display: flex; gap: 8px; margin-bottom: 16px; }
input[type="text"] {
  flex: 1; padding: 12px 16px; border: 2px solid #e2e8f0;
  border-radius: 8px; font-size: 15px; outline: none;
}
input:focus { border-color: #f59e0b; }
button[type="submit"] {
  background: #f59e0b; color: #fff; border: none;
  padding: 12px 24px; border-radius: 8px; font-size: 15px;
  cursor: pointer; white-space: nowrap;
}
button[type="submit"]:hover { background: #d97706; }
#stats { display: flex; gap: 8px; margin-bottom: 12px; }
.stat { background: #fff; padding: 6px 12px; border-radius: 6px; font-size: 13px; color: #666; border: 1px solid #e2e8f0; }
ul { list-style: none; }
li {
  background: #fff; padding: 12px 16px; margin: 6px 0;
  border-radius: 8px; display: flex; align-items: center;
  gap: 12px; border: 1px solid #e2e8f0;
}
li.done { opacity: 0.6; }
li.done .todo-text { text-decoration: line-through; color: #999; }
.todo-check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #ddd; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.todo-check.checked { background: #f59e0b; border-color: #f59e0b; color: #fff; }
.todo-text { flex: 1; font-size: 15px; }
.todo-delete { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 20px; padding: 0 4px; opacity: 0; transition: opacity 0.2s; }
li:hover .todo-delete { opacity: 1; }`}
          defaultJs={`// TODOデータの配列
let todos = [];
let nextId = 1;

// 要素の参照
const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const stats = document.getElementById("stats");

// タスクを追加
function addTodo(text) {
  todos.push({
    id: nextId++,
    text: text,
    done: false,
    createdAt: new Date()
  });
  render();
}

// タスクの完了/未完了を切り替え
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.done = !todo.done;
  render();
}

// タスクを削除
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  render();
}

// 表示を更新
function render() {
  // 統計
  const total = todos.length;
  const done = todos.filter(t => t.done).length;
  stats.innerHTML =
    '<span class="stat">全' + total + '件</span>' +
    '<span class="stat">完了: ' + done + '</span>' +
    '<span class="stat">未完了: ' + (total - done) + '</span>';

  // リスト表示
  if (todos.length === 0) {
    list.innerHTML = '<li style="justify-content:center;color:#999">タスクがありません</li>';
    return;
  }

  list.innerHTML = todos.map(todo =>
    '<li class="' + (todo.done ? "done" : "") + '">' +
      '<div class="todo-check ' + (todo.done ? "checked" : "") +
      '" onclick="toggleTodo(' + todo.id + ')">' +
      (todo.done ? "✓" : "") + '</div>' +
      '<span class="todo-text">' + todo.text + '</span>' +
      '<button class="todo-delete" onclick="deleteTodo(' + todo.id + ')">×</button>' +
    '</li>'
  ).join("");
}

// フォーム送信イベント
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  addTodo(text);
  input.value = "";
  input.focus();
});

// 初期表示
render();`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ステップ2: フィルタリングと高度な機能</h2>
        <p className="text-gray-400 mb-4">フィルタ機能、一括操作、アニメーションを追加した完成版です。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h1>📝 TODOアプリ（完成版）</h1>
  <form id="todoForm">
    <input type="text" id="todoInput" placeholder="新しいタスクを入力..." autocomplete="off">
    <select id="priority">
      <option value="normal">普通</option>
      <option value="high">高</option>
      <option value="low">低</option>
    </select>
    <button type="submit">追加</button>
  </form>

  <div id="filters">
    <button class="filter active" data-filter="all" onclick="setFilter('all')">すべて</button>
    <button class="filter" data-filter="active" onclick="setFilter('active')">未完了</button>
    <button class="filter" data-filter="done" onclick="setFilter('done')">完了</button>
  </div>

  <div id="stats"></div>
  <ul id="todoList"></ul>

  <div id="actions">
    <button onclick="clearDone()" class="action-btn">完了済みを削除</button>
    <button onclick="toggleAll()" class="action-btn">一括切替</button>
  </div>
</div>`}
          defaultCss={`* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; background: #f8f9fa; padding: 20px; }
#app { max-width: 520px; margin: 0 auto; }
h1 { text-align: center; color: #f59e0b; margin-bottom: 20px; font-size: 22px; }
form { display: flex; gap: 8px; margin-bottom: 12px; }
input[type="text"] { flex: 1; padding: 10px 14px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; outline: none; }
input:focus { border-color: #f59e0b; }
select { padding: 10px 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 13px; background: #fff; }
button[type="submit"] { background: #f59e0b; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-size: 14px; cursor: pointer; }
#filters { display: flex; gap: 6px; margin-bottom: 12px; }
.filter { background: #fff; border: 1px solid #e2e8f0; padding: 6px 14px; border-radius: 6px; font-size: 13px; cursor: pointer; }
.filter.active { background: #f59e0b; color: #fff; border-color: #f59e0b; }
#stats { display: flex; gap: 6px; margin-bottom: 10px; }
.stat { background: #fff; padding: 4px 10px; border-radius: 6px; font-size: 12px; color: #666; border: 1px solid #e2e8f0; }
ul { list-style: none; }
li { background: #fff; padding: 10px 14px; margin: 5px 0; border-radius: 8px; display: flex; align-items: center; gap: 10px; border: 1px solid #e2e8f0; animation: slideIn 0.3s ease; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
li.done { opacity: 0.5; }
li.done .text { text-decoration: line-through; color: #999; }
.check { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #ddd; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 12px; }
.check.on { background: #f59e0b; border-color: #f59e0b; color: #fff; }
.text { flex: 1; font-size: 14px; }
.badge { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.badge-high { background: #fef2f2; color: #ef4444; }
.badge-low { background: #eff6ff; color: #3b82f6; }
.badge-normal { background: #f5f5f5; color: #999; }
.del { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px; opacity: 0; transition: 0.2s; }
li:hover .del { opacity: 1; }
#actions { display: flex; gap: 8px; margin-top: 12px; justify-content: center; }
.action-btn { background: #fff; border: 1px solid #e2e8f0; padding: 6px 14px; border-radius: 6px; font-size: 13px; cursor: pointer; color: #666; }
.action-btn:hover { background: #f5f5f5; }
.empty { text-align: center; color: #999; padding: 30px; }`}
          defaultJs={`let todos = [];
let nextId = 1;
let currentFilter = "all";

const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const priority = document.getElementById("priority");
const list = document.getElementById("todoList");
const stats = document.getElementById("stats");

function addTodo(text, pri) {
  todos.push({ id: nextId++, text, done: false, priority: pri });
  render();
}

function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  render();
}

function setFilter(f) {
  currentFilter = f;
  document.querySelectorAll(".filter").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === f);
  });
  render();
}

function clearDone() {
  todos = todos.filter(t => !t.done);
  render();
}

function toggleAll() {
  const allDone = todos.every(t => t.done);
  todos.forEach(t => t.done = !allDone);
  render();
}

function getFiltered() {
  if (currentFilter === "active") return todos.filter(t => !t.done);
  if (currentFilter === "done") return todos.filter(t => t.done);
  return todos;
}

function render() {
  const total = todos.length;
  const done = todos.filter(t => t.done).length;
  stats.innerHTML =
    '<span class="stat">全' + total + '件</span>' +
    '<span class="stat">完了: ' + done + '</span>' +
    '<span class="stat">未完了: ' + (total - done) + '</span>';

  const filtered = getFiltered();
  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty">タスクがありません</div>';
    return;
  }

  list.innerHTML = filtered.map(t =>
    '<li class="' + (t.done ? "done" : "") + '">' +
      '<div class="check ' + (t.done ? "on" : "") + '" onclick="toggleTodo(' + t.id + ')">' + (t.done ? "✓" : "") + '</div>' +
      '<span class="text">' + t.text + '</span>' +
      '<span class="badge badge-' + t.priority + '">' +
      (t.priority === "high" ? "高" : t.priority === "low" ? "低" : "普通") + '</span>' +
      '<button class="del" onclick="deleteTodo(' + t.id + ')">×</button>' +
    '</li>'
  ).join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text, priority.value);
  input.value = "";
  priority.value = "normal";
  input.focus();
});

// サンプルデータ
addTodo("JavaScriptの復習をする", "high");
addTodo("買い物リストを作る", "normal");
addTodo("メールを確認する", "low");`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">TODOアプリにオリジナルの機能を追加してみましょう。以下のアイデアを参考にしてください。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h1>📝 マイTODOアプリ</h1>
  <p style="text-align:center;color:#999;margin-bottom:16px;">自由にカスタマイズしてみよう！</p>

  <form id="form">
    <input type="text" id="input" placeholder="タスクを入力..." autocomplete="off">
    <button type="submit">追加</button>
  </form>

  <ul id="list"></ul>

  <!-- アイデア:
    - 期限（日付）を追加
    - カテゴリ分け（仕事、プライベートなど）
    - ドラッグ&ドロップで並べ替え
    - 検索機能
    - 編集機能（ダブルクリックで編集）
  -->
</div>`}
          defaultCss={`* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; background: #f8f9fa; padding: 20px; }
#app { max-width: 500px; margin: 0 auto; }
h1 { text-align: center; color: #f59e0b; margin-bottom: 8px; }
form { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; outline: none; }
input:focus { border-color: #f59e0b; }
button[type="submit"] { background: #f59e0b; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
ul { list-style: none; }
li { background: #fff; padding: 12px; margin: 6px 0; border-radius: 8px; display: flex; align-items: center; gap: 10px; border: 1px solid #e2e8f0; }
.done .text { text-decoration: line-through; color: #999; }
.toggle { cursor: pointer; font-size: 20px; }
.text { flex: 1; }
.delete { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px; }`}
          defaultJs={`let todos = [];
let id = 0;

function render() {
  const list = document.getElementById("list");
  list.innerHTML = todos.map(t =>
    '<li class="' + (t.done ? "done" : "") + '">' +
      '<span class="toggle" onclick="toggle(' + t.id + ')">' + (t.done ? "✅" : "⬜") + '</span>' +
      '<span class="text">' + t.text + '</span>' +
      '<button class="delete" onclick="del(' + t.id + ')">×</button>' +
    '</li>'
  ).join("") || '<li style="justify-content:center;color:#999">タスクを追加しましょう！</li>';
}

function toggle(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function del(id) {
  todos = todos.filter(t => t.id !== id);
  render();
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: ++id, text, done: false });
  input.value = "";
  render();
});

render();`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="js-exercise" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="js-exercise" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
