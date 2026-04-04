import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { MONITORING_LESSONS } from "@/lib/lessons-data";

export default function ErrorTrackingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">モニタリング レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラー監視（Sentry）</h1>
        <p className="text-gray-400">Sentryによるエラー検知、ブレッドクラム、ソースマップ、リリース追跡を学ぼう</p>
      </div>

      {/* Sentryとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Sentryとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Sentry</strong>は、アプリケーションで発生するエラーを
          リアルタイムで検知・収集・分析するエラー監視プラットフォームです。
          スタックトレース、ユーザー情報、発生環境などを自動で収集し、
          障害の根本原因を素早く特定できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`Sentryの主な機能:

1. リアルタイムエラー検知
   - 未処理の例外を自動キャッチ
   - エラー発生時に即座に通知

2. エラーグルーピング
   - 同じ原因のエラーを自動で集約
   - 影響を受けたユーザー数を表示

3. コンテキスト情報
   - スタックトレース（ソースマップ対応）
   - ブレッドクラム（エラー前の操作履歴）
   - ユーザー情報、OS、ブラウザ情報

4. アラート・通知
   - Slack、メール、PagerDutyと連携
   - 条件ベースのアラート設定`}</code>
        </pre>
      </section>

      {/* Node.jsでのセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Node.js（Express）でのセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ExpressアプリケーションにSentryを導入する手順です。
          <strong className="text-teal-400">SDKを初期化</strong>するだけで、未処理の例外が自動的にキャプチャされます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install @sentry/node

import * as Sentry from "@sentry/node";
import express from "express";

const app = express();

// Sentry初期化（アプリ起動時に最初に実行）
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: "my-api@1.2.3",  // リリースバージョン
  tracesSampleRate: 0.1,     // パフォーマンス監視（10%サンプリング）
  integrations: [
    // Express統合を有効化
    new Sentry.Integrations.Express({ app }),
  ],
});

// Sentryのリクエストハンドラー（ルーティングの前に配置）
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ルーティング
app.get("/api/users/:id", async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) {
    throw new Error("User not found"); // Sentryに自動送信される
  }
  res.json(user);
});

// Sentryのエラーハンドラー（ルーティングの後、エラーハンドラーの前に配置）
app.use(Sentry.Handlers.errorHandler());

// 独自のエラーハンドラー
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
});`}</code>
        </pre>
      </section>

      {/* Reactでのセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">React でのセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フロントエンドでもSentryを導入することで、ユーザーのブラウザで発生するJavaScriptエラーを
          キャッチできます。<strong className="text-teal-400">Error Boundary</strong>と組み合わせて使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install @sentry/react

import * as Sentry from "@sentry/react";

// アプリ起動時に初期化
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: "my-app@1.2.3",
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,  // セッションリプレイ
  replaysOnErrorSampleRate: 1.0,  // エラー時は100%記録
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
});

// Error Boundary でUIエラーをキャッチ
function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error }) => (
        <div>
          <h2>エラーが発生しました</h2>
          <p>問題を自動的に報告しました。</p>
        </div>
      )}
    >
      <MyApp />
    </Sentry.ErrorBoundary>
  );
}

// 手動でエラーをキャプチャ
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: "checkout" },
    extra: { orderId: "ord-12345" },
  });
}`}</code>
        </pre>
      </section>

      {/* ブレッドクラム */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ブレッドクラム（Breadcrumbs）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">ブレッドクラム</strong>は、エラー発生前にユーザーが行った操作の履歴です。
          Sentryは自動的にブレッドクラムを収集しますが、手動で追加することもできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 自動収集されるブレッドクラム:
// - コンソール出力（console.log等）
// - HTTPリクエスト（fetch/XHR）
// - DOMイベント（click等）
// - ページ遷移

// 手動でブレッドクラムを追加
Sentry.addBreadcrumb({
  category: "auth",
  message: "User clicked login button",
  level: "info",
});

Sentry.addBreadcrumb({
  category: "cart",
  message: "Added item to cart",
  level: "info",
  data: {
    productId: "prod-123",
    quantity: 2,
  },
});

// エラー発生時、Sentryダッシュボードに表示:
// 10:30:00 [info] auth: User clicked login button
// 10:30:01 [info] http: POST /api/login → 200
// 10:30:02 [info] navigation: /dashboard
// 10:30:03 [info] cart: Added item to cart
// 10:30:04 [error] TypeError: Cannot read property 'price' of undefined`}</code>
        </pre>
      </section>

      {/* ソースマップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ソースマップの設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          本番環境のJavaScriptはミニファイされているため、スタックトレースが読みにくくなります。
          <strong className="text-teal-400">ソースマップ</strong>をSentryにアップロードすることで、
          元のソースコードの行番号が表示されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install @sentry/cli

// .sentryclirc
[auth]
token=your-auth-token

[defaults]
org=your-org
project=your-project

// package.json のビルドスクリプト
{
  "scripts": {
    "build": "next build",
    "sentry:sourcemaps": "sentry-cli sourcemaps inject --org your-org --project your-project ./build && sentry-cli sourcemaps upload --org your-org --project your-project --release my-app@1.2.3 ./build"
  }
}

// CI/CDパイプラインでの使用例
// 1. ビルド
// 2. ソースマップをSentryにアップロード
// 3. デプロイ

// ソースマップなし:
// TypeError: Cannot read property 'x' of undefined
//   at e.exports (app.min.js:1:2345)    ← 読めない

// ソースマップあり:
// TypeError: Cannot read property 'x' of undefined
//   at calculateTotal (cart.ts:45:12)    ← 元のコードが分かる!`}</code>
        </pre>
      </section>

      {/* リリース追跡とアラート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リリース追跡とアラート設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">リリース追跡</strong>により、どのバージョンでエラーが増えたかを把握できます。
          アラートと組み合わせてデプロイ後の問題を素早く検知しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// リリース情報の設定
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: "my-app@" + process.env.npm_package_version,
  environment: process.env.NODE_ENV,
});

// デプロイ通知（CI/CDで実行）
// sentry-cli releases new my-app@1.2.3
// sentry-cli releases set-commits my-app@1.2.3 --auto
// sentry-cli releases finalize my-app@1.2.3
// sentry-cli releases deploys my-app@1.2.3 new -e production

// アラート設定の例（Sentry管理画面で設定）:
//
// 条件1: 新しいエラーが発生した場合
//   → Slackに通知
//
// 条件2: エラー率が5%を超えた場合
//   → PagerDutyに通知（オンコール担当に連絡）
//
// 条件3: 特定リリース後にエラーが急増した場合
//   → メールで全チームに通知

// ユーザーコンテキストの追加（誰に影響があったか把握）
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
});

// タグの追加（フィルタリングに使用）
Sentry.setTag("feature", "payment");
Sentry.setTag("plan", "premium");`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Sentryはリアルタイムでエラーを検知・収集・分析できるプラットフォーム</li>
          <li>Node.js（Express）とReact両方にSDKを導入して全レイヤーを監視する</li>
          <li>ブレッドクラムでエラー発生前のユーザー操作を追跡できる</li>
          <li>ソースマップをアップロードして、ミニファイされたコードの元の行番号を表示する</li>
          <li>リリース追跡でバージョンごとのエラー傾向を把握する</li>
          <li>アラートを適切に設定し、重要なエラーだけを通知する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="monitoring" lessonId="error-tracking" color="teal" />
      <LessonNav lessons={MONITORING_LESSONS} currentId="error-tracking" basePath="/learn/monitoring" color="teal" />
    </div>
  );
}
