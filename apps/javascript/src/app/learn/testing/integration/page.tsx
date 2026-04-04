import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TESTING_LESSONS } from "@/lib/lessons-data";

export default function IntegrationTestPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">テスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">統合テスト</h1>
        <p className="text-gray-400">APIエンドポイントやReactコンポーネントの結合テストを学ぼう</p>
      </div>

      {/* 統合テストとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">統合テストとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          統合テスト（インテグレーションテスト）は、複数のモジュールやコンポーネントを
          組み合わせた状態での動作を検証します。ユニットテストでは個々の部品が正しく動くことを確認しますが、
          統合テストでは「部品同士が正しく連携するか」を確認します。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">ユニットテストとの違い</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>複数のモジュールを結合してテスト</li>
              <li>外部依存を部分的にモック化</li>
              <li>ユーザーに近い視点で検証</li>
              <li>実行時間はユニットテストより長い</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">統合テストの例</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>APIルートにHTTPリクエストを送る</li>
              <li>Reactコンポーネントを描画して操作</li>
              <li>フォーム入力から送信までの流れ</li>
              <li>データ取得と画面表示の連携</li>
            </ul>
          </div>
        </div>
      </section>

      {/* supertest によるAPIテスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">supertest によるAPIテスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">supertest</code>は
          Express等のHTTPサーバーに対してリクエストを送り、レスポンスを検証するライブラリです。
          実際にサーバーを起動せずにテストできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# インストール
npm install -D supertest @types/supertest`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// app.ts - Expressアプリ
import express from "express";

const app = express();
app.use(express.json());

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextId = 1;

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "タイトルは必須です" });
  }
  const todo: Todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "見つかりません" });
  Object.assign(todo, req.body);
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "見つかりません" });
  todos.splice(index, 1);
  res.status(204).send();
});

export default app;`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app.test.ts - APIの統合テスト
import request from "supertest";
import app from "./app";

describe("TODO API", () => {
  // テスト前にデータをリセット
  beforeEach(() => {
    // テスト間の独立性を保つ
  });

  describe("GET /api/todos", () => {
    test("空の配列を返す", async () => {
      const res = await request(app).get("/api/todos");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("POST /api/todos", () => {
    test("新しいTODOを作成できる", async () => {
      const res = await request(app)
        .post("/api/todos")
        .send({ title: "テストを書く" })
        .expect(201); // ステータスコードのアサーション

      expect(res.body).toMatchObject({
        title: "テストを書く",
        completed: false,
      });
      expect(res.body.id).toBeDefined();
    });

    test("タイトルなしで400エラーを返す", async () => {
      const res = await request(app)
        .post("/api/todos")
        .send({})
        .expect(400);

      expect(res.body.error).toBe("タイトルは必須です");
    });
  });

  describe("PATCH /api/todos/:id", () => {
    test("TODOを更新できる", async () => {
      // まずTODOを作成
      const created = await request(app)
        .post("/api/todos")
        .send({ title: "買い物" });

      // 更新
      const res = await request(app)
        .patch(\`/api/todos/\${created.body.id}\`)
        .send({ completed: true })
        .expect(200);

      expect(res.body.completed).toBe(true);
      expect(res.body.title).toBe("買い物");
    });

    test("存在しないIDで404エラーを返す", async () => {
      await request(app)
        .patch("/api/todos/9999")
        .send({ completed: true })
        .expect(404);
    });
  });
});`}</code>
        </pre>
      </section>

      {/* Testing Library の基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">React Testing Library の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          React Testing Libraryは「ユーザーが実際にアプリを使う方法」でテストを書くことを推奨しています。
          DOM要素の内部構造ではなく、画面に表示されるテキストやアクセシブルな属性でテスト対象を探します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# インストール
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D jsdom  # Vitest の場合`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// vitest.config.ts（Vitestの場合）
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
  },
});

// src/test-setup.ts
import "@testing-library/jest-dom";`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 主要なAPI
import { render, screen } from "@testing-library/react";

// render - コンポーネントを描画
render(<MyComponent />);

// screen - 描画結果から要素を取得
screen.getByText("こんにちは");       // テキストで検索
screen.getByRole("button");           // ロール（役割）で検索
screen.getByPlaceholderText("検索…"); // プレースホルダーで検索
screen.getByLabelText("メール");      // ラベルで検索
screen.getByTestId("submit-btn");     // data-testid で検索

// getBy  → 見つからなければエラー（要素が必ずあるとき）
// queryBy → 見つからなければ null（要素がないことを確認）
// findBy  → Promiseを返す（非同期で表示される要素）`}</code>
        </pre>
      </section>

      {/* コンポーネントテストの実践 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">コンポーネントテストの実践</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際のReactコンポーネントをテストしてみましょう。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">render</code>、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">screen</code>、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">fireEvent</code>、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">waitFor</code>を使った具体例です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// Counter.tsx - テスト対象コンポーネント
import { useState } from "react";

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
      <button onClick={() => setCount(count - 1)}>減らす</button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// Counter.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter コンポーネント", () => {
  test("初期値が表示される", () => {
    render(<Counter />);
    expect(screen.getByText("カウント: 0")).toBeInTheDocument();
  });

  test("initialCount propsが反映される", () => {
    render(<Counter initialCount={10} />);
    expect(screen.getByText("カウント: 10")).toBeInTheDocument();
  });

  test("増やすボタンでカウントが1増える", () => {
    render(<Counter />);

    fireEvent.click(screen.getByText("増やす"));
    expect(screen.getByText("カウント: 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("増やす"));
    expect(screen.getByText("カウント: 2")).toBeInTheDocument();
  });

  test("減らすボタンでカウントが1減る", () => {
    render(<Counter initialCount={5} />);

    fireEvent.click(screen.getByText("減らす"));
    expect(screen.getByText("カウント: 4")).toBeInTheDocument();
  });

  test("リセットボタンでカウントが0に戻る", () => {
    render(<Counter initialCount={5} />);

    fireEvent.click(screen.getByText("増やす"));
    fireEvent.click(screen.getByText("リセット"));
    expect(screen.getByText("カウント: 0")).toBeInTheDocument();
  });
});`}</code>
        </pre>
      </section>

      {/* ユーザー操作と非同期コンポーネント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ユーザー操作と非同期テスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フォーム入力やAPI呼び出しを含むコンポーネントのテストでは、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">userEvent</code>と
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">waitFor</code>を活用します。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">userEvent</code>は
          fireEventよりも実際のユーザー操作に近い動作をシミュレートします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// SearchForm.tsx - 検索フォームコンポーネント
import { useState } from "react";

interface Props {
  onSearch: (query: string) => Promise<string[]>;
}

export function SearchForm({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const data = await onSearch(query);
      setResults(data);
    } catch {
      setError("検索に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="検索キーワード"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>
      {loading && <p>読み込み中...</p>}
      {error && <p role="alert">{error}</p>}
      <ul>
        {results.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// SearchForm.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  test("検索結果が表示される", async () => {
    const user = userEvent.setup();
    const mockSearch = vi.fn().mockResolvedValue(["React", "Redux"]);

    render(<SearchForm onSearch={mockSearch} />);

    // userEvent でテキスト入力
    await user.type(
      screen.getByPlaceholderText("検索キーワード"),
      "React"
    );

    // ボタンをクリック
    await user.click(screen.getByText("検索"));

    // 非同期の結果を待つ
    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Redux")).toBeInTheDocument();
    });

    // モック関数が正しく呼ばれたか確認
    expect(mockSearch).toHaveBeenCalledWith("React");
  });

  test("エラー時にメッセージが表示される", async () => {
    const user = userEvent.setup();
    const mockSearch = vi.fn().mockRejectedValue(new Error("Network Error"));

    render(<SearchForm onSearch={mockSearch} />);

    await user.type(
      screen.getByPlaceholderText("検索キーワード"),
      "test"
    );
    await user.click(screen.getByText("検索"));

    // エラーメッセージを待つ
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "検索に失敗しました"
      );
    });
  });

  test("読み込み中の表示が出る", async () => {
    const user = userEvent.setup();
    // resolve を遅延させる
    const mockSearch = vi.fn(
      () => new Promise((resolve) => setTimeout(() => resolve(["結果"]), 100))
    );

    render(<SearchForm onSearch={mockSearch} />);

    await user.type(
      screen.getByPlaceholderText("検索キーワード"),
      "test"
    );
    await user.click(screen.getByText("検索"));

    // 読み込み中が表示される
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();

    // 結果表示後に読み込み中が消える
    await waitFor(() => {
      expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
    });
  });
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>統合テストは複数のモジュールやコンポーネントの連携を検証する</li>
          <li>supertest を使えば、Express APIをサーバー起動なしにテストできる</li>
          <li>React Testing Library は「ユーザー視点」でコンポーネントをテストする</li>
          <li>getByText、getByRole でアクセシブルな方法で要素を取得する</li>
          <li>userEvent は fireEvent より実際のユーザー操作に近い</li>
          <li>waitFor で非同期の状態変化を待ってからアサーションする</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="testing" lessonId="integration" color="pink" />
      <LessonNav lessons={TESTING_LESSONS} currentId="integration" basePath="/learn/testing" color="pink" />
    </div>
  );
}
