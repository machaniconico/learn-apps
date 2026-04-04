import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TESTING_LESSONS } from "@/lib/lessons-data";

export default function UnitTestPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">テスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ユニットテスト</h1>
        <p className="text-gray-400">Jest / Vitestで関数やモジュールを単体テストしよう</p>
      </div>

      {/* セットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Jest / Vitest のセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ユニットテストを始めるには、まずテストフレームワークをインストールします。
          JestとVitestはAPIがほぼ同じなので、どちらを学んでも知識は応用できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Vitest のセットアップ（推奨）
npm install -D vitest

# package.json にスクリプトを追加
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}

# Jest のセットアップ
npm install -D jest @types/jest ts-jest
npx ts-jest config:init`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          テストファイルは通常、テスト対象のファイルと同じディレクトリに配置するか、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">__tests__</code> ディレクトリにまとめます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# ファイル構成の例
src/
  utils/
    math.ts           # テスト対象
    math.test.ts      # テストファイル（同じディレクトリ）
  __tests__/
    math.test.ts      # テストファイル（別ディレクトリ）`}</code>
        </pre>
      </section>

      {/* test / describe / expect */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">test / describe / expect の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テストの基本構造は3つの要素で構成されます。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">describe</code>でグループ化し、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">test</code>（または<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">it</code>）で個別のテストを定義し、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">expect</code>で結果を検証します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// math.ts - テスト対象の関数
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error("0で割ることはできません");
  return a / b;
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// math.test.ts - テストファイル
import { describe, test, expect } from "vitest";
import { add, multiply, divide } from "./math";

// describe でテストをグループ化
describe("add 関数", () => {
  // test（または it）で個別のテストケースを定義
  test("2つの正の数を足せる", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("負の数も正しく足せる", () => {
    expect(add(-1, 1)).toBe(0);
    expect(add(-2, -3)).toBe(-5);
  });

  test("0を足しても値が変わらない", () => {
    expect(add(5, 0)).toBe(5);
  });
});

describe("multiply 関数", () => {
  test("2つの数を掛けられる", () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test("0を掛けると0になる", () => {
    expect(multiply(100, 0)).toBe(0);
  });
});

describe("divide 関数", () => {
  test("正常に割り算できる", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("0で割るとエラーが発生する", () => {
    expect(() => divide(10, 0)).toThrow("0で割ることはできません");
  });
});`}</code>
        </pre>
      </section>

      {/* マッチャー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">主要なマッチャー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">expect()</code>の後に続くメソッドを「マッチャー」と呼びます。
          値の種類や検証内容に応じて適切なマッチャーを選びましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === 等値チェック ===
expect(1 + 1).toBe(2);           // プリミティブ値の厳密比較（===）
expect({ a: 1 }).toEqual({ a: 1 }); // オブジェクト・配列の深い比較

// === 真偽値チェック ===
expect(true).toBeTruthy();       // truthy な値か
expect(0).toBeFalsy();           // falsy な値か
expect(null).toBeNull();         // null か
expect(undefined).toBeUndefined(); // undefined か
expect("hello").toBeDefined();   // undefined でないか

// === 数値チェック ===
expect(10).toBeGreaterThan(5);        // より大きい
expect(10).toBeGreaterThanOrEqual(10); // 以上
expect(5).toBeLessThan(10);           // より小さい
expect(0.1 + 0.2).toBeCloseTo(0.3);  // 浮動小数点の近似比較

// === 文字列チェック ===
expect("Hello World").toContain("World");   // 部分文字列を含む
expect("Hello").toMatch(/^Hell/);           // 正規表現マッチ

// === 配列・オブジェクトチェック ===
expect([1, 2, 3]).toContain(2);             // 配列に含まれる
expect([1, 2, 3]).toHaveLength(3);          // 長さチェック
expect({ name: "太郎", age: 20 })
  .toHaveProperty("name", "太郎");          // プロパティチェック

// === 例外チェック ===
expect(() => { throw new Error("失敗"); }).toThrow();           // エラーが投げられる
expect(() => { throw new Error("失敗"); }).toThrow("失敗");     // メッセージも一致
expect(() => { throw new Error("失敗"); }).toThrow(Error);      // エラー型も一致

// === 否定 ===
expect(5).not.toBe(3);                      // not で否定できる
expect([1, 2]).not.toContain(5);`}</code>
        </pre>
      </section>

      {/* モック */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">モック（Mock）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          モックは、外部依存（API呼び出し、データベース、タイマーなど）を偽の実装に置き換えるテクニックです。
          これにより、テスト対象の関数だけを純粋にテストできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`import { describe, test, expect, vi } from "vitest";
// Jestの場合は vi の代わりに jest を使う

// === vi.fn() / jest.fn() - モック関数の作成 ===
test("コールバック関数が正しく呼ばれる", () => {
  const callback = vi.fn();

  // モック関数を使用
  [1, 2, 3].forEach(callback);

  // 呼び出し回数を検証
  expect(callback).toHaveBeenCalledTimes(3);

  // 引数を検証
  expect(callback).toHaveBeenCalledWith(1, 0, [1, 2, 3]);

  // 特定の呼び出しの引数
  expect(callback.mock.calls[0][0]).toBe(1);
  expect(callback.mock.calls[1][0]).toBe(2);
});

// === モック関数の戻り値を設定 ===
test("モック関数の戻り値を制御する", () => {
  const getPrice = vi.fn();

  // 戻り値を設定
  getPrice.mockReturnValue(100);
  expect(getPrice()).toBe(100);

  // 1回だけ別の値を返す
  getPrice.mockReturnValueOnce(200);
  expect(getPrice()).toBe(200); // 200
  expect(getPrice()).toBe(100); // 元の100に戻る
});`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === vi.mock() / jest.mock() - モジュールのモック ===
import { fetchUser } from "./api";
import { getUserName } from "./user-service";

// apiモジュール全体をモック化
vi.mock("./api", () => ({
  fetchUser: vi.fn(),
}));

describe("getUserName", () => {
  test("APIから取得したユーザー名を返す", async () => {
    // モックの戻り値を設定
    (fetchUser as any).mockResolvedValue({
      id: 1,
      name: "田中太郎",
    });

    const name = await getUserName(1);
    expect(name).toBe("田中太郎");
    expect(fetchUser).toHaveBeenCalledWith(1);
  });

  test("APIエラー時にデフォルト名を返す", async () => {
    (fetchUser as any).mockRejectedValue(new Error("API Error"));

    const name = await getUserName(1);
    expect(name).toBe("名無し");
  });
});`}</code>
        </pre>
      </section>

      {/* 純粋関数のテスト / 非同期テスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">純粋関数と非同期テスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          純粋関数（同じ入力に対して常に同じ出力を返す関数）はテストが最も簡単です。
          非同期関数のテストでは <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">async/await</code> を使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// --- 純粋関数のテスト ---
// utils.ts
export function formatPrice(price: number): string {
  return \`¥\${price.toLocaleString()}\`;
}

export function filterAdults(users: { name: string; age: number }[]) {
  return users.filter((user) => user.age >= 18);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// utils.test.ts
describe("formatPrice", () => {
  test("数値を日本円フォーマットに変換する", () => {
    expect(formatPrice(1000)).toBe("¥1,000");
    expect(formatPrice(0)).toBe("¥0");
    expect(formatPrice(1234567)).toBe("¥1,234,567");
  });
});

describe("filterAdults", () => {
  test("18歳以上のユーザーだけを返す", () => {
    const users = [
      { name: "太郎", age: 20 },
      { name: "花子", age: 15 },
      { name: "次郎", age: 18 },
    ];
    const result = filterAdults(users);
    expect(result).toHaveLength(2);
    expect(result.map((u) => u.name)).toEqual(["太郎", "次郎"]);
  });

  test("空配列を渡すと空配列を返す", () => {
    expect(filterAdults([])).toEqual([]);
  });
});`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// --- 非同期関数のテスト ---
// async-utils.ts
export async function fetchData(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP Error: \${res.status}\`);
  return res.json();
}

// async-utils.test.ts
describe("fetchData", () => {
  // async/await を使ったテスト
  test("正常なレスポンスを返す", async () => {
    // fetch をモック
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "テスト" }),
    });

    const result = await fetchData("https://api.example.com/data");
    expect(result).toEqual({ data: "テスト" });
  });

  test("HTTPエラーで例外を投げる", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    // 非同期エラーのテスト
    await expect(fetchData("https://api.example.com/data"))
      .rejects.toThrow("HTTP Error: 404");
  });
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Jest / Vitest は APIが互換で、どちらを学んでも応用可能</li>
          <li>describe でグループ化、test で個別テスト、expect で検証する</li>
          <li>toBe（厳密比較）、toEqual（深い比較）、toThrow（例外）など豊富なマッチャーがある</li>
          <li>vi.fn() / jest.fn() でモック関数を作り、外部依存を切り離してテストする</li>
          <li>純粋関数はテストしやすいので、ロジックをできるだけ純粋関数に切り出すと良い</li>
          <li>非同期テストでは async/await と rejects マッチャーを使う</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="testing" lessonId="unit" color="pink" />
      <LessonNav lessons={TESTING_LESSONS} currentId="unit" basePath="/learn/testing" color="pink" />
    </div>
  );
}
