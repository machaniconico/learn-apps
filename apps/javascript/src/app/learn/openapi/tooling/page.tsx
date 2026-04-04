import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { OPENAPI_LESSONS } from "@/lib/lessons-data";

export default function OpenAPIToolingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">OpenAPI レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-4 mb-2">ツールと自動生成</h1>
        <p className="text-gray-400">Swagger UI、コード生成、バリデーションツールを活用しよう</p>
      </div>

      {/* Swagger UI */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swagger UIでAPIドキュメントを公開する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Swagger UI</strong>は、OpenAPI仕様書から
          インタラクティブなAPIドキュメントを自動生成するツールです。
          ブラウザ上でAPIを試すこともできます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# Swagger UI のセットアップ（Express + swagger-ui-express）

# 1. パッケージをインストール
npm install swagger-ui-express yamljs
npm install -D @types/swagger-ui-express @types/yamljs

# 2. Express アプリに組み込む`}</code>
        </pre>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mt-4">
          <code className="text-gray-300">{`// src/app.ts
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

// OpenAPI仕様書を読み込む
const swaggerDocument = YAML.load("./openapi.yaml");

// Swagger UI をマウント
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Todo API Documentation",
  })
);

// APIルート
app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("Server: http://localhost:3000");
  console.log("API Docs: http://localhost:3000/api-docs");
});`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">http://localhost:3000/api-docs</code>にアクセスすると、
          OpenAPI仕様書に基づいたインタラクティブなドキュメントが表示されます。
          「Try it out」ボタンでAPIを直接実行することもできます。
        </p>
      </section>

      {/* Swagger Editor */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swagger Editorで仕様書を編集する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Swagger Editor</strong>は、
          ブラウザ上でOpenAPI仕様書を編集できるオンラインエディタです。
          リアルタイムでバリデーションとプレビューが表示されます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# Swagger Editor の使い方

# オンライン版（ブラウザで即座に使える）
# https://editor.swagger.io/

# ローカル版（Docker で起動）
docker run -p 8080:8080 swaggerapi/swagger-editor

# ローカル版（npm で起動）
npm install -g swagger-editor
swagger-editor

# === Swagger Editor の機能 ===
#
# 左ペイン: YAMLエディタ
#   - シンタックスハイライト
#   - リアルタイムバリデーション（エラーがあれば即表示）
#   - 自動補完
#
# 右ペイン: プレビュー
#   - Swagger UI と同じ表示
#   - エンドポイント一覧
#   - スキーマの構造表示
#
# メニュー:
#   - File > Import URL: 既存の仕様書を読み込み
#   - Generate Server: サーバーコードを自動生成
#   - Generate Client: クライアントSDKを自動生成

# === VS Code 拡張機能 ===
# "OpenAPI (Swagger) Editor" 拡張機能をインストールすると
# VS Code内でもプレビューとバリデーションが使えます
#
# 拡張機能ID: 42Crunch.vscode-openapi`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          チーム開発では、VS Codeの拡張機能を使ってローカルで編集し、
          Gitで変更を管理するのがおすすめです。
        </p>
      </section>

      {/* コード自動生成（openapi-generator） */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コード自動生成（openapi-generator）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">openapi-generator</strong>は、
          OpenAPI仕様書からクライアントSDKやサーバースタブを自動生成するツールです。
          TypeScript、Python、Java、Go など50以上の言語/フレームワークに対応しています。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# openapi-generator のインストール
npm install -g @openapitools/openapi-generator-cli

# === TypeScript クライアントの生成 ===
openapi-generator-cli generate \\
  -i openapi.yaml \\
  -g typescript-axios \\
  -o ./generated/client

# 生成されるファイル:
# generated/client/
#   api.ts            # API呼び出し関数
#   configuration.ts  # 設定クラス
#   models/           # 型定義（Todo, Error等）
#     todo.ts
#     create-todo-request.ts
#     error.ts`}</code>
        </pre>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mt-4">
          <code className="text-gray-300">{`// 生成されたクライアントの使用例
import { TodosApi, Configuration } from "./generated/client";

const config = new Configuration({
  basePath: "http://localhost:3000/api/v1",
});

const todosApi = new TodosApi(config);

// 型安全にAPIを呼び出せる
async function main() {
  // GET /todos - 一覧取得
  const { data: todos } = await todosApi.getTodos({
    status: "todo",
    limit: 10,
  });

  // POST /todos - 作成
  const { data: newTodo } = await todosApi.createTodo({
    title: "牛乳を買う",
    priority: "high",
  });

  // PUT /todos/{todoId} - 更新
  const { data: updated } = await todosApi.updateTodo(
    newTodo.id,
    { status: "done" }
  );

  // DELETE /todos/{todoId} - 削除
  await todosApi.deleteTodo(newTodo.id);
}`}</code>
        </pre>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mt-4">
          <code className="text-gray-300">{`# === サーバースタブの生成 ===
openapi-generator-cli generate \\
  -i openapi.yaml \\
  -g nodejs-express-server \\
  -o ./generated/server

# === よく使うジェネレーター ===
# クライアント:
#   typescript-axios    → Axios ベースの TypeScript クライアント
#   typescript-fetch    → Fetch API ベースの TypeScript クライアント
#   swift5              → iOS アプリ用
#   kotlin              → Android アプリ用
#
# サーバー:
#   nodejs-express-server → Express サーバー
#   spring               → Java Spring Boot
#   go-server            → Go サーバー

# === package.json に組み込む ===
# {
#   "scripts": {
#     "generate:client": "openapi-generator-cli generate -i openapi.yaml -g typescript-axios -o ./src/generated/api",
#     "generate:server": "openapi-generator-cli generate -i openapi.yaml -g nodejs-express-server -o ./generated/server"
#   }
# }`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          仕様書を更新したら
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">npm run generate:client</code>で
          クライアントコードを再生成するだけで、型定義が自動的に最新化されます。
        </p>
      </section>

      {/* express-openapi-validator でリクエストバリデーション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リクエストバリデーション（express-openapi-validator）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">express-openapi-validator</strong>は、
          OpenAPI仕様書に基づいてリクエスト/レスポンスを自動的にバリデーションするミドルウェアです。
          仕様書と実装の乖離を防ぎます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# インストール
npm install express-openapi-validator`}</code>
        </pre>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mt-4">
          <code className="text-gray-300">{`// src/app.ts
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();
app.use(express.json());

// OpenAPI バリデーションミドルウェアを追加
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true,   // リクエストを検証
    validateResponses: true,  // レスポンスも検証（開発時のみ推奨）
  })
);

// API ルート（仕様書に定義されたパスと一致させる）
app.get("/api/v1/todos", (req, res) => {
  // req.query.status は仕様書の enum に基づいて検証済み
  // 不正な値（例: status=invalid）は自動的に 400 エラーになる
  res.json([
    { id: 1, title: "牛乳を買う", status: "todo", createdAt: "2025-01-15T10:30:00Z" },
  ]);
});

app.post("/api/v1/todos", (req, res) => {
  // req.body は仕様書のスキーマに基づいて検証済み
  // title が欠けていれば自動的に 400 エラーになる
  const { title, description, priority } = req.body;
  res.status(201).json({
    id: 2,
    title,
    description: description ?? null,
    status: "todo",
    createdAt: new Date().toISOString(),
  });
});

// バリデーションエラーのハンドリング
app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).json({
      code: "VALIDATION_ERROR",
      message: err.message,
      details: err.errors, // どのフィールドが不正かの詳細
    });
  } else {
    res.status(err.status || 500).json({
      code: "INTERNAL_ERROR",
      message: "予期しないエラーが発生しました",
    });
  }
});`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          バリデーションミドルウェアを入れると、仕様書に書いていないパラメータや
          型が合わないリクエストは自動的にリジェクトされます。
          「仕様書と実装が合っていない」問題を根本的に防げます。
        </p>
      </section>

      {/* Redoc と Expressへの統合 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Redoc と実践的な統合</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Redoc</strong>は、Swagger UIの代替となる
          APIドキュメント生成ツールです。3カラムレイアウトで見やすく、
          カスタマイズ性が高いのが特徴です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# Redoc のセットアップ

# 方法1: CDNで静的HTMLとして公開
# docs/index.html を作成`}</code>
        </pre>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mt-4">
          <code className="text-gray-300">{`<!-- docs/index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Todo API Documentation</title>
  <meta charset="utf-8"/>
  <link
    href="https://fonts.googleapis.com/css?family=Noto+Sans+JP"
    rel="stylesheet"
  />
</head>
<body>
  <redoc spec-url="./openapi.yaml"></redoc>
  <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
</body>
</html>`}</code>
        </pre>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mt-4">
          <code className="text-gray-300">{`# 方法2: Express に redoc-express を組み込む
npm install redoc-express`}</code>
        </pre>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mt-4">
          <code className="text-gray-300">{`// src/app.ts - Swagger UI + Redoc + Validator の統合例
import express from "express";
import swaggerUi from "swagger-ui-express";
import redoc from "redoc-express";
import * as OpenApiValidator from "express-openapi-validator";
import YAML from "yamljs";

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load("./openapi.yaml");

// --- ドキュメント ---
// Swagger UI（インタラクティブ）
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redoc（読みやすいドキュメント）
app.get("/docs", redoc({
  title: "Todo API",
  specUrl: "/openapi.json",
}));

// OpenAPI仕様書をJSONで配信（Redoc用）
app.get("/openapi.json", (req, res) => {
  res.json(swaggerDocument);
});

// --- バリデーション ---
app.use(OpenApiValidator.middleware({
  apiSpec: "./openapi.yaml",
  validateRequests: true,
  validateResponses: process.env.NODE_ENV !== "production",
}));

// --- APIルート ---
app.use("/api/v1", apiRouter);

// --- エラーハンドリング ---
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    code: status === 400 ? "VALIDATION_ERROR" : "INTERNAL_ERROR",
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("Server:      http://localhost:3000");
  console.log("Swagger UI:  http://localhost:3000/api-docs");
  console.log("Redoc:       http://localhost:3000/docs");
});`}</code>
        </pre>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">Swagger UI</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; 「Try it out」でAPIを直接実行可能</li>
              <li>&#8226; 開発者がAPIをテストするのに便利</li>
              <li>&#8226; 内部ツール向け</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">Redoc</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; 3カラムで見やすいレイアウト</li>
              <li>&#8226; カスタマイズ性が高い</li>
              <li>&#8226; 外部公開用ドキュメント向け</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Swagger UI</code>でインタラクティブなAPIドキュメントを公開できる</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Swagger Editor</code>でリアルタイムに仕様書を編集・プレビューできる</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">openapi-generator</code>で型安全なクライアント/サーバーコードを自動生成できる</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">express-openapi-validator</code>で仕様書に基づくリクエスト/レスポンスの自動検証ができる</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Redoc</code>で外部公開向けの見やすいドキュメントを生成できる</li>
          <li>これらのツールを組み合わせることで、仕様書と実装の一貫性を保てる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="openapi" lessonId="tooling" color="green" />
      <LessonNav lessons={OPENAPI_LESSONS} currentId="tooling" basePath="/learn/openapi" color="green" />
    </div>
  );
}
