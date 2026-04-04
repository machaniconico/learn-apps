import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { TESTING_LESSONS } from "@/lib/lessons-data";

export default function E2ETestPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">テスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">E2Eテスト</h1>
        <p className="text-gray-400">Playwrightでブラウザを操作してアプリ全体をテストしよう</p>
      </div>

      {/* E2Eテストとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">E2Eテストとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          E2E（End-to-End）テストは、実際のブラウザを使ってユーザーと同じ操作を自動的に行い、
          アプリケーション全体が正しく動作するかを検証します。
          フロントエンド、バックエンド、データベースまで含めた統合的なテストです。
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">メリット</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>ユーザー体験に最も近い</li>
              <li>全レイヤーを一度にテスト</li>
              <li>クリティカルパスの保証</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">デメリット</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>実行速度が遅い</li>
              <li>壊れやすい（Flaky Test）</li>
              <li>デバッグが難しい</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">いつ使う？</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>ログインフロー</li>
              <li>購入・決済フロー</li>
              <li>重要なユーザー導線</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Playwright セットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Playwright のセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Playwrightは Microsoft が開発したE2Eテストフレームワークです。
          Chromium、Firefox、WebKitの3つのブラウザエンジンに対応しています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# 初期セットアップ（対話形式で設定）
npm init playwright@latest

# または手動インストール
npm install -D @playwright/test
npx playwright install

# テストの実行
npx playwright test

# UIモードで実行（デバッグに便利）
npx playwright test --ui

# 特定のファイルだけ実行
npx playwright test tests/login.spec.ts

# ブラウザを表示して実行（ヘッドフルモード）
npx playwright test --headed`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// playwright.config.ts - 基本設定
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // テストのタイムアウト（30秒）
  timeout: 30000,
  // 各テストのリトライ回数
  retries: process.env.CI ? 2 : 0,
  // テストレポートの形式
  reporter: "html",

  use: {
    // テスト対象のURL
    baseURL: "http://localhost:3000",
    // 失敗時にスクリーンショットを撮る
    screenshot: "only-on-failure",
    // 操作のトレースを記録
    trace: "on-first-retry",
  },

  // 複数ブラウザでテスト
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // モバイルブラウザ
    { name: "mobile", use: { ...devices["iPhone 14"] } },
  ],

  // テスト前にサーバーを起動
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});`}</code>
        </pre>
      </section>

      {/* 基本的なE2Eテストの書き方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">E2Eテストの書き方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Playwrightでは <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">page</code> オブジェクトを通して
          ブラウザを操作します。主要なメソッドを見ていきましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// tests/home.spec.ts
import { test, expect } from "@playwright/test";

test.describe("ホームページ", () => {
  test("タイトルが表示される", async ({ page }) => {
    // ページに移動
    await page.goto("/");

    // タイトルを確認
    await expect(page).toHaveTitle(/My App/);

    // 見出しが表示されていることを確認
    await expect(
      page.getByRole("heading", { name: "ようこそ" })
    ).toBeVisible();
  });

  test("ナビゲーションリンクが機能する", async ({ page }) => {
    await page.goto("/");

    // リンクをクリック
    await page.getByRole("link", { name: "概要" }).click();

    // URLが変わったことを確認
    await expect(page).toHaveURL("/about");

    // ページ内容を確認
    await expect(
      page.getByText("このアプリについて")
    ).toBeVisible();
  });
});

// === 主要なページ操作メソッド ===
test("基本的な操作", async ({ page }) => {
  // ページ遷移
  await page.goto("https://example.com");

  // クリック
  await page.getByRole("button", { name: "送信" }).click();

  // テキスト入力
  await page.getByPlaceholder("メールアドレス").fill("test@example.com");

  // セレクトボックス
  await page.getByLabel("都道府県").selectOption("東京都");

  // チェックボックス
  await page.getByLabel("利用規約に同意").check();

  // キーボード操作
  await page.keyboard.press("Enter");

  // 要素の待機
  await page.waitForSelector(".loading-complete");

  // スクリーンショット
  await page.screenshot({ path: "screenshot.png" });
});`}</code>
        </pre>
      </section>

      {/* アサーションとロケーター */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アサーションとロケーター</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Playwrightのアサーション（expect）は自動的にリトライしてくれるため、
          非同期の表示変更にも対応できます。ロケーターで要素を特定する方法も多彩です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === ロケーター（要素の特定方法） ===
// ロールベース（推奨）
page.getByRole("button", { name: "送信" });
page.getByRole("heading", { level: 1 });
page.getByRole("link", { name: "ホーム" });

// テキストベース
page.getByText("こんにちは");
page.getByText("こんにちは", { exact: true }); // 完全一致

// フォーム要素
page.getByLabel("ユーザー名");
page.getByPlaceholder("検索...");

// テストID
page.getByTestId("submit-button");

// CSSセレクター（最終手段）
page.locator(".my-class");
page.locator("#my-id");

// === アサーション ===
// 要素の表示
await expect(page.getByText("成功")).toBeVisible();
await expect(page.getByText("エラー")).not.toBeVisible();

// テキスト内容
await expect(page.getByTestId("count")).toHaveText("5");
await expect(page.getByTestId("count")).toContainText("5");

// 属性
await expect(page.getByRole("button")).toBeEnabled();
await expect(page.getByRole("button")).toBeDisabled();
await expect(page.getByLabel("同意")).toBeChecked();

// URL・タイトル
await expect(page).toHaveURL("/dashboard");
await expect(page).toHaveTitle("ダッシュボード");

// 要素数
await expect(page.getByRole("listitem")).toHaveCount(3);`}</code>
        </pre>
      </section>

      {/* ユーザーフローのテスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ユーザーフローのテスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          E2Eテストの真価は、ユーザーが実際に行う操作フロー全体をテストすることにあります。
          ログインからタスク作成までの一連の流れをテストしてみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// tests/todo-flow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("TODOアプリの操作フロー", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/todos");
  });

  test("TODOの作成→完了→削除の一連フロー", async ({ page }) => {
    // ステップ1: TODOを追加
    await page.getByPlaceholder("新しいタスク").fill("Playwrightを学ぶ");
    await page.getByRole("button", { name: "追加" }).click();

    // 追加されたことを確認
    await expect(page.getByText("Playwrightを学ぶ")).toBeVisible();
    await expect(page.getByTestId("todo-count")).toHaveText("1件");

    // ステップ2: もう一つ追加
    await page.getByPlaceholder("新しいタスク").fill("テストを書く");
    await page.getByRole("button", { name: "追加" }).click();
    await expect(page.getByTestId("todo-count")).toHaveText("2件");

    // ステップ3: 1つ目を完了にする
    await page.getByText("Playwrightを学ぶ")
      .locator("..") // 親要素
      .getByRole("checkbox")
      .check();

    // 完了状態を確認（取り消し線など）
    await expect(
      page.getByText("Playwrightを学ぶ")
    ).toHaveCSS("text-decoration-line", "line-through");

    // ステップ4: 完了したTODOを削除
    await page.getByText("Playwrightを学ぶ")
      .locator("..")
      .getByRole("button", { name: "削除" })
      .click();

    // 削除されたことを確認
    await expect(page.getByText("Playwrightを学ぶ")).not.toBeVisible();
    await expect(page.getByTestId("todo-count")).toHaveText("1件");
  });

  test("空のタスクは追加できない", async ({ page }) => {
    // 空のまま追加ボタンを押す
    await page.getByRole("button", { name: "追加" }).click();

    // エラーメッセージが表示される
    await expect(
      page.getByText("タスク名を入力してください")
    ).toBeVisible();
  });
});`}</code>
        </pre>
      </section>

      {/* スクリーンショットとCI */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スクリーンショットとCI統合</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Playwrightはスクリーンショットの比較テスト（Visual Regression Test）や、
          CI/CDパイプラインへの組み込みも簡単です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// === スクリーンショットテスト ===
test("ホームページのスクリーンショット", async ({ page }) => {
  await page.goto("/");

  // ページ全体のスクリーンショットを比較
  await expect(page).toHaveScreenshot("homepage.png");

  // 特定の要素だけスクリーンショット
  await expect(
    page.getByTestId("hero-section")
  ).toHaveScreenshot("hero.png");

  // 許容誤差を設定（ピクセル単位）
  await expect(page).toHaveScreenshot("homepage.png", {
    maxDiffPixels: 100,
  });
});

// === スクリーンショットの保存 ===
test("デバッグ用スクリーンショット", async ({ page }) => {
  await page.goto("/dashboard");

  // 任意のタイミングで保存
  await page.screenshot({
    path: "screenshots/dashboard.png",
    fullPage: true, // ページ全体をキャプチャ
  });
});`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# === GitHub Actions での CI 設定 ===
# .github/workflows/e2e.yml

name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>E2Eテストは実際のブラウザで操作し、ユーザー体験に最も近いテストを実現する</li>
          <li>Playwrightは Chromium / Firefox / WebKit の3エンジンに対応</li>
          <li>page.goto、click、fill などでブラウザ操作をプログラムで記述する</li>
          <li>getByRole、getByText でアクセシブルなロケーターを使う</li>
          <li>expect は自動リトライ付きで、非同期の表示変更にも対応</li>
          <li>スクリーンショット比較テストでビジュアルの回帰をチェックできる</li>
          <li>GitHub Actionsなどに組み込んで、プルリクエストごとに自動テストを実行する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="testing" lessonId="e2e" color="pink" />
      <LessonNav lessons={TESTING_LESSONS} currentId="e2e" basePath="/learn/testing" color="pink" />
    </div>
  );
}
