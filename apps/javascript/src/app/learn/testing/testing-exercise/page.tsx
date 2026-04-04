import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TESTING_LESSONS } from "@/lib/lessons-data";

export default function TestingExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">テスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テスト総合演習</h1>
        <p className="text-gray-400">TODOアプリにユニットテスト、コンポーネントテスト、E2Eテストを書こう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、TODOアプリに対して3種類のテストを書きます。
          テストピラミッドに従い、ユニットテスト → コンポーネントテスト → E2Eテストの順に進めましょう。
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
            <h3 className="font-semibold text-pink-400 mb-2">演習1: ユニットテスト</h3>
            <p className="text-gray-300 text-sm">TODOのビジネスロジック（追加、削除、フィルタリング）をテスト</p>
          </div>
          <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
            <h3 className="font-semibold text-pink-400 mb-2">演習2: コンポーネントテスト</h3>
            <p className="text-gray-300 text-sm">TODOの各コンポーネントをReact Testing Libraryでテスト</p>
          </div>
          <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
            <h3 className="font-semibold text-pink-400 mb-2">演習3: E2Eテスト</h3>
            <p className="text-gray-300 text-sm">PlaywrightでTODOアプリの操作フロー全体をテスト</p>
          </div>
        </div>
      </section>

      {/* テスト対象のコード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">テスト対象：TODOアプリのコード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、テスト対象となるTODOアプリのコードを確認しましょう。
          ビジネスロジック、コンポーネント、APIの3層に分かれています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// types.ts - 型定義
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = "all" | "active" | "completed";`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// todo-logic.ts - ビジネスロジック（純粋関数）
import { Todo, FilterType } from "./types";

export function createTodo(title: string): Todo {
  if (!title.trim()) {
    throw new Error("タイトルは必須です");
  }
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };
}

export function toggleTodo(todo: Todo): Todo {
  return { ...todo, completed: !todo.completed };
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

export function filterTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

export function countRemaining(todos: Todo[]): number {
  return todos.filter((todo) => !todo.completed).length;
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.completed);
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// TodoApp.tsx - メインコンポーネント
import { useState } from "react";
import { Todo, FilterType } from "./types";
import {
  createTodo, toggleTodo, deleteTodo,
  filterTodos, countRemaining, clearCompleted
} from "./todo-logic";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [error, setError] = useState("");

  const handleAdd = () => {
    try {
      const newTodo = createTodo(input);
      setTodos([...todos, newTodo]);
      setInput("");
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    }
  };

  const handleToggle = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? toggleTodo(t) : t)));
  };

  const handleDelete = (id: string) => {
    setTodos(deleteTodo(todos, id));
  };

  const filtered = filterTodos(todos, filter);
  const remaining = countRemaining(todos);

  return (
    <div>
      <h1>TODOアプリ</h1>
      <div>
        <input
          placeholder="新しいタスク"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>追加</button>
      </div>
      {error && <p role="alert">{error}</p>}
      <ul>
        {filtered.map((todo) => (
          <li key={todo.id} data-testid="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              aria-label={\`\${todo.title}を完了にする\`}
            />
            <span style={{
              textDecoration: todo.completed ? "line-through" : "none"
            }}>
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}
              aria-label={\`\${todo.title}を削除\`}>削除</button>
          </li>
        ))}
      </ul>
      <div>
        <span data-testid="remaining-count">{remaining}件の未完了</span>
        <button onClick={() => setFilter("all")}>すべて</button>
        <button onClick={() => setFilter("active")}>未完了</button>
        <button onClick={() => setFilter("completed")}>完了済み</button>
        <button onClick={() => setTodos(clearCompleted(todos))}>
          完了済みを削除
        </button>
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* 演習1: ユニットテスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習1: ユニットテスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">todo-logic.ts</code>の
          各関数をテストしましょう。純粋関数なのでモック不要で簡単にテストできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// todo-logic.test.ts
import { describe, test, expect } from "vitest";
import {
  createTodo, toggleTodo, deleteTodo,
  filterTodos, countRemaining, clearCompleted,
} from "./todo-logic";
import { Todo } from "./types";

// テスト用のヘルパー
function makeTodo(overrides: Partial<Todo> = {}): Todo {
  return {
    id: "test-1",
    title: "テスト用タスク",
    completed: false,
    createdAt: new Date("2026-01-01"),
    ...overrides,
  };
}

describe("createTodo", () => {
  test("タイトルからTODOを作成できる", () => {
    const todo = createTodo("買い物に行く");
    expect(todo.title).toBe("買い物に行く");
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeDefined();
    expect(todo.createdAt).toBeInstanceOf(Date);
  });

  test("タイトルの前後の空白を除去する", () => {
    const todo = createTodo("  掃除する  ");
    expect(todo.title).toBe("掃除する");
  });

  test("空文字列でエラーを投げる", () => {
    expect(() => createTodo("")).toThrow("タイトルは必須です");
  });

  test("空白だけの文字列でエラーを投げる", () => {
    expect(() => createTodo("   ")).toThrow("タイトルは必須です");
  });
});

describe("toggleTodo", () => {
  test("未完了のTODOを完了にする", () => {
    const todo = makeTodo({ completed: false });
    const toggled = toggleTodo(todo);
    expect(toggled.completed).toBe(true);
  });

  test("完了のTODOを未完了にする", () => {
    const todo = makeTodo({ completed: true });
    const toggled = toggleTodo(todo);
    expect(toggled.completed).toBe(false);
  });

  test("元のオブジェクトを変更しない（イミュータブル）", () => {
    const todo = makeTodo({ completed: false });
    const toggled = toggleTodo(todo);
    expect(todo.completed).toBe(false); // 元は変わらない
    expect(toggled).not.toBe(todo);     // 別のオブジェクト
  });
});

describe("deleteTodo", () => {
  test("指定したIDのTODOを削除する", () => {
    const todos = [
      makeTodo({ id: "1", title: "タスク1" }),
      makeTodo({ id: "2", title: "タスク2" }),
      makeTodo({ id: "3", title: "タスク3" }),
    ];
    const result = deleteTodo(todos, "2");
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(["1", "3"]);
  });

  test("存在しないIDの場合、配列は変わらない", () => {
    const todos = [makeTodo({ id: "1" })];
    const result = deleteTodo(todos, "999");
    expect(result).toHaveLength(1);
  });
});

describe("filterTodos", () => {
  const todos = [
    makeTodo({ id: "1", completed: false }),
    makeTodo({ id: "2", completed: true }),
    makeTodo({ id: "3", completed: false }),
  ];

  test("'all' ですべてのTODOを返す", () => {
    expect(filterTodos(todos, "all")).toHaveLength(3);
  });

  test("'active' で未完了のTODOだけ返す", () => {
    const result = filterTodos(todos, "active");
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  test("'completed' で完了済みのTODOだけ返す", () => {
    const result = filterTodos(todos, "completed");
    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(true);
  });
});

describe("countRemaining", () => {
  test("未完了のTODOの数を返す", () => {
    const todos = [
      makeTodo({ completed: false }),
      makeTodo({ completed: true }),
      makeTodo({ completed: false }),
    ];
    expect(countRemaining(todos)).toBe(2);
  });

  test("空配列で0を返す", () => {
    expect(countRemaining([])).toBe(0);
  });
});

describe("clearCompleted", () => {
  test("完了済みのTODOを除去する", () => {
    const todos = [
      makeTodo({ id: "1", completed: false }),
      makeTodo({ id: "2", completed: true }),
      makeTodo({ id: "3", completed: true }),
    ];
    const result = clearCompleted(todos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});`}</code>
        </pre>
      </section>

      {/* 演習2: コンポーネントテスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習2: コンポーネントテスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          React Testing Libraryを使って、TODOアプリのコンポーネントをテストします。
          ユーザーが実際に行う操作をシミュレートしましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// TodoApp.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "./TodoApp";

describe("TodoApp コンポーネント", () => {
  test("初期状態で空のリストが表示される", () => {
    render(<TodoApp />);

    expect(screen.getByText("TODOアプリ")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("新しいタスク")).toBeInTheDocument();
    expect(screen.getByTestId("remaining-count")).toHaveTextContent("0件の未完了");
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(0);
  });

  test("タスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(screen.getByPlaceholderText("新しいタスク"), "牛乳を買う");
    await user.click(screen.getByText("追加"));

    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.getByTestId("remaining-count")).toHaveTextContent("1件の未完了");
  });

  test("Enterキーでタスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("新しいタスク");
    await user.type(input, "洗濯する{Enter}");

    expect(screen.getByText("洗濯する")).toBeInTheDocument();
  });

  test("空のタスクを追加するとエラーが出る", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.click(screen.getByText("追加"));

    expect(screen.getByRole("alert")).toHaveTextContent("タイトルは必須です");
  });

  test("タスクを完了にできる", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // タスクを追加
    await user.type(screen.getByPlaceholderText("新しいタスク"), "掃除する");
    await user.click(screen.getByText("追加"));

    // チェックボックスをクリック
    await user.click(screen.getByLabelText("掃除するを完了にする"));

    // 完了状態を確認
    expect(screen.getByLabelText("掃除するを完了にする")).toBeChecked();
    expect(screen.getByTestId("remaining-count")).toHaveTextContent("0件の未完了");
  });

  test("タスクを削除できる", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // タスクを追加
    await user.type(screen.getByPlaceholderText("新しいタスク"), "料理する");
    await user.click(screen.getByText("追加"));

    // 削除ボタンをクリック
    await user.click(screen.getByLabelText("料理するを削除"));

    // 削除を確認
    expect(screen.queryByText("料理する")).not.toBeInTheDocument();
  });

  test("フィルターで表示を切り替えられる", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // 2つのタスクを追加
    const input = screen.getByPlaceholderText("新しいタスク");
    await user.type(input, "タスクA{Enter}");
    await user.type(input, "タスクB{Enter}");

    // タスクAを完了にする
    await user.click(screen.getByLabelText("タスクAを完了にする"));

    // 「未完了」フィルター
    await user.click(screen.getByText("未完了"));
    expect(screen.queryByText("タスクA")).not.toBeInTheDocument();
    expect(screen.getByText("タスクB")).toBeInTheDocument();

    // 「完了済み」フィルター
    await user.click(screen.getByText("完了済み"));
    expect(screen.getByText("タスクA")).toBeInTheDocument();
    expect(screen.queryByText("タスクB")).not.toBeInTheDocument();

    // 「すべて」フィルター
    await user.click(screen.getByText("すべて"));
    expect(screen.getByText("タスクA")).toBeInTheDocument();
    expect(screen.getByText("タスクB")).toBeInTheDocument();
  });

  test("完了済みを一括削除できる", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // タスクを追加して1つ完了にする
    const input = screen.getByPlaceholderText("新しいタスク");
    await user.type(input, "残すタスク{Enter}");
    await user.type(input, "消すタスク{Enter}");
    await user.click(screen.getByLabelText("消すタスクを完了にする"));

    // 完了済みを削除
    await user.click(screen.getByText("完了済みを削除"));

    expect(screen.getByText("残すタスク")).toBeInTheDocument();
    expect(screen.queryByText("消すタスク")).not.toBeInTheDocument();
  });
});`}</code>
        </pre>
      </section>

      {/* 演習3: E2Eテスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習3: E2Eテスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Playwrightを使って、TODOアプリの操作フロー全体をブラウザ上でテストします。
          実際のユーザー体験を再現するテストを書きましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// tests/todo-app.spec.ts
import { test, expect } from "@playwright/test";

test.describe("TODOアプリ E2Eテスト", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("ページタイトルが表示される", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "TODOアプリ" })
    ).toBeVisible();
  });

  test("タスクの追加から削除までの完全フロー", async ({ page }) => {
    const input = page.getByPlaceholder("新しいタスク");

    // ステップ1: タスクを3つ追加
    await input.fill("朝のランニング");
    await page.getByRole("button", { name: "追加" }).click();

    await input.fill("メールを確認");
    await page.getByRole("button", { name: "追加" }).click();

    await input.fill("レポートを書く");
    await input.press("Enter"); // Enterキーでも追加

    // 3つのタスクが表示されている
    await expect(page.getByTestId("todo-item")).toHaveCount(3);
    await expect(page.getByTestId("remaining-count"))
      .toHaveText("3件の未完了");

    // ステップ2: 1つのタスクを完了にする
    await page.getByLabel("朝のランニングを完了にする").check();
    await expect(page.getByTestId("remaining-count"))
      .toHaveText("2件の未完了");

    // ステップ3: フィルターを切り替え
    await page.getByRole("button", { name: "完了済み" }).click();
    await expect(page.getByTestId("todo-item")).toHaveCount(1);
    await expect(page.getByText("朝のランニング")).toBeVisible();

    await page.getByRole("button", { name: "未完了" }).click();
    await expect(page.getByTestId("todo-item")).toHaveCount(2);

    await page.getByRole("button", { name: "すべて" }).click();
    await expect(page.getByTestId("todo-item")).toHaveCount(3);

    // ステップ4: タスクを削除
    await page.getByLabel("メールを確認を削除").click();
    await expect(page.getByTestId("todo-item")).toHaveCount(2);
    await expect(page.getByText("メールを確認")).not.toBeVisible();

    // ステップ5: 完了済みを一括削除
    await page.getByRole("button", { name: "完了済みを削除" }).click();
    await expect(page.getByTestId("todo-item")).toHaveCount(1);
    await expect(page.getByText("レポートを書く")).toBeVisible();
  });

  test("空のタスクを追加できない", async ({ page }) => {
    await page.getByRole("button", { name: "追加" }).click();

    await expect(page.getByRole("alert")).toHaveText("タイトルは必須です");
    await expect(page.getByTestId("todo-item")).toHaveCount(0);
  });

  test("多数のタスクを管理できる", async ({ page }) => {
    const input = page.getByPlaceholder("新しいタスク");
    const tasks = ["タスクA", "タスクB", "タスクC", "タスクD", "タスクE"];

    // 5つのタスクを追加
    for (const task of tasks) {
      await input.fill(task);
      await input.press("Enter");
    }
    await expect(page.getByTestId("todo-item")).toHaveCount(5);

    // 奇数番目を完了にする
    await page.getByLabel("タスクAを完了にする").check();
    await page.getByLabel("タスクCを完了にする").check();
    await page.getByLabel("タスクEを完了にする").check();

    await expect(page.getByTestId("remaining-count"))
      .toHaveText("2件の未完了");

    // 完了済みを一括削除
    await page.getByRole("button", { name: "完了済みを削除" }).click();
    await expect(page.getByTestId("todo-item")).toHaveCount(2);
    await expect(page.getByText("タスクB")).toBeVisible();
    await expect(page.getByText("タスクD")).toBeVisible();
  });

  test("スクリーンショットを撮影する", async ({ page }) => {
    const input = page.getByPlaceholder("新しいタスク");

    await input.fill("スクリーンショット用タスク");
    await page.getByRole("button", { name: "追加" }).click();

    // ビジュアルリグレッションテスト
    await expect(page).toHaveScreenshot("todo-with-item.png");
  });
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ビジネスロジックを純粋関数として切り出すと、ユニットテストが格段に書きやすくなる</li>
          <li>テスト用ヘルパー関数（makeTodo等）を作ると、テストコードの重複を減らせる</li>
          <li>コンポーネントテストではユーザーの操作（入力、クリック）をシミュレートする</li>
          <li>aria-label を設定しておくと、テストでもアクセシビリティでも役立つ</li>
          <li>E2Eテストは重要なユーザーフローに絞り、ステップを明確に区切って書く</li>
          <li>テストピラミッドに従い、ユニットテストを多く、E2Eテストは重要なフローに限定する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="testing" lessonId="testing-exercise" color="pink" />
      <LessonNav lessons={TESTING_LESSONS} currentId="testing-exercise" basePath="/learn/testing" color="pink" />
    </div>
  );
}
