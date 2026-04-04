import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TYPESCRIPT_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function TypeScriptExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">TypeScript レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">TypeScript総合演習</h1>
        <p className="text-gray-400">型安全なTODOアプリのコードを読み解き、TypeScriptの力を実感しよう</p>
      </div>

      {/* 演習の目標 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">この演習の目標</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          これまで学んだTypeScriptの知識を総動員して、<strong className="text-cyan-400">型安全なTODOアプリ</strong>を
          理解しましょう。まずTypeScriptの完全なコードを読み、その後JavaScriptで同じロジックを実際に動かします。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>interface でデータ構造を定義</li>
          <li>ジェネリクスで汎用的なストア関数を作成</li>
          <li>ユニオン型とリテラル型でフィルター機能を実装</li>
          <li>ユーティリティ型（Partial, Pick）を活用</li>
          <li>型ガードで安全なデータ処理</li>
        </ul>
      </section>

      {/* TypeScript版 全コード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TypeScript版: 型定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まずはデータの型を定義します。TODOアプリに必要な型をinterfaceとtype aliasで宣言します。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// === 型定義 ===

// TODOの優先度（リテラル型ユニオン）
type Priority = "low" | "medium" | "high";

// TODOのフィルター
type FilterStatus = "all" | "active" | "completed";

// TODOアイテムの型
interface Todo {
  readonly id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  tags?: string[];
}

// TODO作成時の入力型（idとcreatedAtは自動生成）
type CreateTodoInput = Omit<Todo, "id" | "createdAt" | "completed"> & {
  completed?: boolean;
};

// TODO更新時の入力型（部分更新OK、idは変更不可）
type UpdateTodoInput = Partial<Omit<Todo, "id" | "createdAt">>;

// TODOリストの統計情報
interface TodoStats {
  total: number;
  active: number;
  completed: number;
  byPriority: Record<Priority, number>;
}`}
        </pre>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TypeScript版: TODOストア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネリクスを使った汎用的なIDジェネレータと、型安全なTODOストアを実装します。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// === ジェネリックなIDジェネレータ ===
function createIdGenerator(prefix: string = ""): () => number {
  let nextId = 1;
  return () => nextId++;
}

// === TODOストア ===
function createTodoStore() {
  const todos: Todo[] = [];
  const generateId = createIdGenerator();

  // 追加: CreateTodoInput → Todo
  function add(input: CreateTodoInput): Todo {
    const todo: Todo = {
      id: generateId(),
      title: input.title,
      completed: input.completed ?? false,
      priority: input.priority,
      createdAt: new Date(),
      tags: input.tags,
    };
    todos.push(todo);
    return todo;
  }

  // 更新: Partial で部分更新
  function update(id: number, updates: UpdateTodoInput): Todo | undefined {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    todos[index] = { ...todos[index], ...updates };
    return todos[index];
  }

  // 削除
  function remove(id: number): boolean {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
  }

  // 完了トグル
  function toggle(id: number): Todo | undefined {
    const todo = todos.find(t => t.id === id);
    if (!todo) return undefined;
    return update(id, { completed: !todo.completed });
  }

  // フィルター: FilterStatus ユニオン型で安全
  function getFiltered(status: FilterStatus): Todo[] {
    switch (status) {
      case "all": return [...todos];
      case "active": return todos.filter(t => !t.completed);
      case "completed": return todos.filter(t => t.completed);
    }
  }

  // ソート: keyof Pick<Todo, "priority" | "createdAt"> で安全
  function getSorted(by: "priority" | "createdAt"): Todo[] {
    const priorityOrder: Record<Priority, number> = {
      high: 0, medium: 1, low: 2
    };
    return [...todos].sort((a, b) => {
      if (by === "priority") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  // 統計: TodoStats 型で構造が保証される
  function getStats(): TodoStats {
    return {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length,
      byPriority: {
        high: todos.filter(t => t.priority === "high").length,
        medium: todos.filter(t => t.priority === "medium").length,
        low: todos.filter(t => t.priority === "low").length,
      },
    };
  }

  // タグで検索
  function findByTag(tag: string): Todo[] {
    return todos.filter(t => t.tags?.includes(tag) ?? false);
  }

  return { add, update, remove, toggle, getFiltered, getSorted, getStats, findByTag };
}`}
        </pre>
      </section>

      {/* JavaScript版: 動くコード */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JavaScript版: 実際に動かす</h2>
        <p className="text-gray-400 mb-4">
          上のTypeScriptコードと同じロジックをJavaScriptで実装し、TODOアプリを動かしてみましょう。
          TypeScriptの型がどのように安全性を提供しているか、コメントで確認できます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>型安全TODOアプリ</h2>
  <div id="input-area">
    <input type="text" id="title-input" placeholder="TODOを入力..." />
    <select id="priority-select">
      <option value="medium">普通</option>
      <option value="high">高</option>
      <option value="low">低</option>
    </select>
    <input type="text" id="tags-input" placeholder="タグ（カンマ区切り）" />
    <button id="add-btn">追加</button>
  </div>
  <div id="filter-area">
    <button class="filter-btn active" data-filter="all">すべて</button>
    <button class="filter-btn" data-filter="active">未完了</button>
    <button class="filter-btn" data-filter="completed">完了</button>
  </div>
  <div id="todo-list"></div>
  <div id="stats"></div>
</div>`}
          defaultCss={`#app { max-width: 520px; margin: 0 auto; font-family: sans-serif; }
h2 { color: #22d3ee; margin-bottom: 12px; }
#input-area { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
#title-input { flex: 1; min-width: 140px; padding: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
#priority-select { padding: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
#tags-input { flex: 1; min-width: 100px; padding: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
#add-btn { background: #22d3ee; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; }
#filter-area { display: flex; gap: 4px; margin-bottom: 12px; }
.filter-btn { background: #e5e7eb; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; }
.filter-btn.active { background: #22d3ee; color: #fff; }
.todo-item { display: flex; align-items: center; gap: 8px; padding: 10px; border-bottom: 1px solid #eee; }
.todo-item.completed .todo-title { text-decoration: line-through; color: #9ca3af; }
.todo-title { flex: 1; font-size: 14px; }
.priority { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
.priority-high { background: #fef2f2; color: #dc2626; }
.priority-medium { background: #fefce8; color: #ca8a04; }
.priority-low { background: #f0fdf4; color: #16a34a; }
.tag { font-size: 11px; background: #e0f2fe; color: #0284c7; padding: 1px 6px; border-radius: 3px; margin-left: 2px; }
.delete-btn { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 16px; }
#stats { margin-top: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; }
.stat-row { display: flex; justify-content: space-between; padding: 2px 0; }
.stat-label { color: #6b7280; }
.stat-value { font-weight: bold; color: #1f2937; }`}
          defaultJs={`// === TODOストア（TypeScript版と同じロジック） ===
function createTodoStore() {
  // TS: const todos: Todo[] = [];
  const todos = [];
  let nextId = 1;
  // TS: let currentFilter: FilterStatus = "all";

  // TS: add(input: CreateTodoInput): Todo
  function add(input) {
    const todo = {
      id: nextId++,
      title: input.title,
      completed: input.completed || false,
      priority: input.priority, // TS: Priority型で"low"|"medium"|"high"に限定
      createdAt: new Date(),
      tags: input.tags || [],
    };
    todos.push(todo);
    return todo;
  }

  // TS: toggle(id: number): Todo | undefined
  function toggle(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return undefined;
    todo.completed = !todo.completed;
    return todo;
  }

  // TS: remove(id: number): boolean
  function remove(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
  }

  // TS: getFiltered(status: FilterStatus): Todo[]
  function getFiltered(status) {
    switch (status) {
      case "all": return [...todos];
      case "active": return todos.filter(t => !t.completed);
      case "completed": return todos.filter(t => t.completed);
      default: return [...todos];
    }
  }

  // TS: getStats(): TodoStats
  function getStats() {
    return {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length,
      byPriority: {
        high: todos.filter(t => t.priority === "high").length,
        medium: todos.filter(t => t.priority === "medium").length,
        low: todos.filter(t => t.priority === "low").length,
      },
    };
  }

  return { add, toggle, remove, getFiltered, getStats };
}

// === UI ===
const store = createTodoStore();
let currentFilter = "all";

// サンプルデータ
store.add({ title: "TypeScriptの基本を復習する", priority: "high", tags: ["学習"] });
store.add({ title: "買い物リストを作る", priority: "medium", tags: ["生活"] });
store.add({ title: "本を読む", priority: "low", tags: ["趣味", "学習"] });

function render() {
  const todos = store.getFiltered(currentFilter);
  const stats = store.getStats();
  const priorityLabel = { high: "高", medium: "普通", low: "低" };

  document.getElementById("todo-list").innerHTML = todos.length === 0
    ? '<p style="color:#9ca3af;text-align:center;padding:20px;">TODOがありません</p>'
    : todos.map(t => {
      const tags = (t.tags || []).map(tag => '<span class="tag">' + tag + '</span>').join("");
      return '<div class="todo-item ' + (t.completed ? "completed" : "") + '">'
        + '<input type="checkbox" ' + (t.completed ? "checked" : "") + ' onchange="toggleTodo(' + t.id + ')" />'
        + '<span class="todo-title">' + t.title + tags + '</span>'
        + '<span class="priority priority-' + t.priority + '">' + priorityLabel[t.priority] + '</span>'
        + '<button class="delete-btn" onclick="deleteTodo(' + t.id + ')">&#10005;</button>'
        + '</div>';
    }).join("");

  document.getElementById("stats").innerHTML =
    '<div class="stat-row"><span class="stat-label">合計</span><span class="stat-value">' + stats.total + '</span></div>'
    + '<div class="stat-row"><span class="stat-label">未完了</span><span class="stat-value">' + stats.active + '</span></div>'
    + '<div class="stat-row"><span class="stat-label">完了</span><span class="stat-value">' + stats.completed + '</span></div>'
    + '<div class="stat-row"><span class="stat-label">高優先度</span><span class="stat-value" style="color:#dc2626">' + stats.byPriority.high + '</span></div>';
}

// イベントハンドラ
window.toggleTodo = function(id) { store.toggle(id); render(); };
window.deleteTodo = function(id) { store.remove(id); render(); };

document.getElementById("add-btn").addEventListener("click", () => {
  const titleInput = document.getElementById("title-input");
  const prioritySelect = document.getElementById("priority-select");
  const tagsInput = document.getElementById("tags-input");
  const title = titleInput.value.trim();
  if (!title) return;

  const tags = tagsInput.value.trim()
    ? tagsInput.value.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  // TS: CreateTodoInput 型で安全に入力
  store.add({ title, priority: prioritySelect.value, tags });
  titleInput.value = "";
  tagsInput.value = "";
  render();
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter; // TS: FilterStatus 型
    render();
  });
});

render();`}
        />
      </section>

      {/* TypeScriptの型がもたらす安全性 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TypeScriptの型がもたらす安全性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          上のJavaScriptコードでは、以下のようなバグが実行時まで見つかりません。
          TypeScriptなら、これらはすべてコンパイル時にエラーになります。
        </p>
        <pre className="bg-gray-950 text-sm text-gray-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`// === TypeScriptがコンパイル時に防ぐバグ ===

// 1. 存在しない優先度を指定
store.add({ title: "テスト", priority: "urgent" });
// Error: '"urgent"' は '"low" | "medium" | "high"' に割り当てられない

// 2. 必須プロパティの欠落
store.add({ priority: "high" });
// Error: Property 'title' is missing

// 3. 存在しないフィルターを指定
store.getFiltered("done");
// Error: '"done"' は '"all" | "active" | "completed"' に割り当てられない

// 4. 間違った型の引数
store.toggle("1");
// Error: 'string' は 'number' に割り当てられない

// 5. 読み取り専用プロパティの変更
const todo = store.add({ title: "テスト", priority: "low" });
todo.id = 999;
// Error: Cannot assign to 'id' because it is a read-only property

// 6. 統計情報の安全な利用
const stats = store.getStats();
// stats.byPriority.urgent はエラー（Record<Priority, number>型で制限）

// 7. オプショナルチェーン
const firstTag = todo.tags?.[0];
// TypeScriptは tags が undefined の可能性を認識し、?.を強制`}
        </pre>
      </section>

      {/* 学んだことの振り返り */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TypeScriptコース全体の振り返り</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">レッスン1: 基本</h3>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
              <li>型注釈と型推論</li>
              <li>関数の引数・戻り値の型</li>
              <li>コンパイルの仕組み</li>
              <li>tsconfig.json</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">レッスン2: 基本の型</h3>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
              <li>string, number, boolean</li>
              <li>配列とタプル</li>
              <li>enum, any, unknown, void, never</li>
              <li>ユニオン型と型エイリアス</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">レッスン3: インターフェース</h3>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
              <li>interface でオブジェクト型定義</li>
              <li>オプショナルとreadonly</li>
              <li>extends で拡張</li>
              <li>type vs interface</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">レッスン4: ジェネリクス</h3>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
              <li>型引数で再利用可能なコード</li>
              <li>ジェネリック制約</li>
              <li>ユーティリティ型</li>
              <li>Partial, Pick, Omit, Record</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 次のステップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">次のステップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptの基礎を習得しました。さらにスキルアップするために、以下のことに挑戦しましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><strong className="text-cyan-400">React + TypeScript</strong> — PropsやStateに型を付けてコンポーネントを作る</li>
          <li><strong className="text-cyan-400">Next.js + TypeScript</strong> — このアプリのように、TypeScript標準で開発する</li>
          <li><strong className="text-cyan-400">高度な型</strong> — Mapped Types, Template Literal Types, 型レベルプログラミング</li>
          <li><strong className="text-cyan-400">実プロジェクト</strong> — 既存のJSプロジェクトにTypeScriptを段階的に導入する</li>
          <li><strong className="text-cyan-400">型定義の読み方</strong> — node_modules/@types を読んでライブラリの型を理解する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="typescript" lessonId="ts-exercise" color="green" />
      <LessonNav lessons={TYPESCRIPT_LESSONS} currentId="ts-exercise" basePath="/learn/typescript" color="green" />
    </div>
  );
}
