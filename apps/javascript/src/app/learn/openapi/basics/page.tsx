import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { OPENAPI_LESSONS } from "@/lib/lessons-data";

export default function OpenAPIBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">OpenAPI レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-4 mb-2">API仕様書の基本</h1>
        <p className="text-gray-400">OpenAPIとは何か、なぜAPI仕様書が必要なのかを理解しよう</p>
      </div>

      {/* OpenAPI / Swagger とは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">OpenAPI / Swagger とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">OpenAPI Specification（OAS）</strong>は、
          REST APIのインターフェースを記述するための業界標準仕様です。
          もともとSmartBear社が開発した<strong className="text-green-400">Swagger</strong>仕様が元になっており、
          2016年にOpenAPI Initiativeに移管されました。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          現在、「Swagger」はツール群（Swagger UI、Swagger Editor等）のブランド名として使われ、
          仕様自体は「OpenAPI Specification」と呼ばれています。最新バージョンは
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">OpenAPI 3.1</code>です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# Swagger と OpenAPI の関係
#
# Swagger 1.x → Swagger 2.0 → OpenAPI 3.0 → OpenAPI 3.1
#   (2011)        (2014)         (2017)        (2021)
#
# Swagger 2.0 以降、仕様は OpenAPI Specification に改名
# Swagger はツール群のブランド名として残っている
#
# 主な Swagger ツール:
#   - Swagger UI        → APIドキュメントのビジュアル表示
#   - Swagger Editor    → ブラウザベースの仕様書エディタ
#   - Swagger Codegen   → コード自動生成（後継: openapi-generator）`}</code>
        </pre>
      </section>

      {/* なぜAPI仕様書が必要か */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜAPI仕様書が必要か？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          API仕様書がないと、フロントエンドとバックエンドの開発者間で認識のずれが生じ、
          手戻りやバグの原因になります。仕様書があることで以下のメリットが得られます。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">仕様書がない場合</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; Slackで「このAPIのレスポンス何？」とやり取り</li>
              <li>&#8226; 実装を見ないと仕様がわからない</li>
              <li>&#8226; フロントとバックで型が合わずバグ発生</li>
              <li>&#8226; APIの変更が伝わらず既存機能が壊れる</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">仕様書がある場合</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>&#8226; 仕様書を見れば即座にAPIの使い方がわかる</li>
              <li>&#8226; フロントとバックで並行開発が可能</li>
              <li>&#8226; 型安全なクライアントコードを自動生成</li>
              <li>&#8226; 変更履歴がバージョン管理で追跡可能</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# 仕様書がない開発フロー（問題が起きやすい）
#
# バックエンド: API実装 → フロントエンドに口頭で説明
# フロントエンド: 「えっ、レスポンスの形変わった？」
# → 手戻り、バグ、コミュニケーションコスト増大
#
# 仕様書がある開発フロー（API-first）
#
# 1. チームで仕様書を合意
# 2. バックエンド: 仕様書どおりに実装
# 3. フロントエンド: 仕様書をもとにモック→実装
# 4. 結合テスト: 仕様書どおりか自動検証
# → 並行開発が可能、認識のずれが起きにくい`}</code>
        </pre>
      </section>

      {/* API-first 開発 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">API-first 開発とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">API-first 開発</strong>とは、
          実装を始める前にまずAPI仕様書を設計・合意するアプローチです。
          「コードを書いてからドキュメントを書く」のではなく、
          「ドキュメント（仕様書）を書いてからコードを書く」という考え方です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# API-first 開発の流れ
#
# Step 1: API設計
#   - エンドポイント、リクエスト/レスポンスの形を決める
#   - OpenAPI仕様書としてYAMLで記述する
#
# Step 2: レビュー・合意
#   - フロント/バック/QAチームで仕様をレビュー
#   - Pull Request で変更を管理
#
# Step 3: 並行開発
#   - バックエンド: 仕様書に従ってAPI実装
#   - フロントエンド: 仕様書からモックサーバーを生成して開発
#   - QA: 仕様書からテストケースを作成
#
# Step 4: 結合・検証
#   - 実装が仕様書に準拠しているか自動検証
#   - express-openapi-validator などで自動チェック`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          API-first開発は、マイクロサービスやフロントエンド/バックエンド分離の
          プロジェクトで特に効果を発揮します。
        </p>
      </section>

      {/* OpenAPI仕様書の構造 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">OpenAPI仕様書の構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          OpenAPI仕様書は、いくつかの主要なセクションで構成されています。
          全体の構造を把握しておきましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# OpenAPI 3.0 仕様書の基本構造

openapi: "3.0.3"          # OpenAPIのバージョン（必須）

info:                      # APIのメタ情報（必須）
  title: Todo API
  version: "1.0.0"
  description: TODOアプリのREST API
  contact:
    name: API Support
    email: support@example.com

servers:                   # APIサーバーのURL
  - url: https://api.example.com/v1
    description: 本番環境
  - url: http://localhost:3000/v1
    description: 開発環境

paths:                     # エンドポイント定義（必須）
  /todos:
    get:
      summary: TODO一覧を取得
      # ... 詳細は次のレッスンで
    post:
      summary: TODOを作成
      # ...

components:                # 再利用可能なスキーマ定義
  schemas:
    Todo:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
  securitySchemes:         # 認証方式の定義
    bearerAuth:
      type: http
      scheme: bearer

security:                  # グローバルな認証設定
  - bearerAuth: []

tags:                      # エンドポイントのグループ化
  - name: todos
    description: TODO関連のAPI`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">openapi</code>、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">info</code>、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">paths</code>が必須フィールドです。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">components</code>は
          スキーマの再利用に不可欠なので、実質的に必ず使います。
        </p>
      </section>

      {/* YAMLの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">YAMLの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          OpenAPI仕様書は通常<strong className="text-green-400">YAML</strong>で記述します。
          JSONでも書けますが、YAMLの方が可読性が高く、コメントも書けるため広く使われています。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# YAML の基本文法

# キーと値（文字列）
title: "Todo API"
version: "1.0.0"

# ネスト（インデントはスペース2つ）
info:
  title: "Todo API"
  contact:
    name: "API Support"

# 配列
servers:
  - url: https://api.example.com
    description: 本番
  - url: http://localhost:3000
    description: 開発

# 真偽値
required: true
nullable: false

# 複数行の文字列
description: |
  これは複数行の
  説明文です。
  改行が保持されます。

# --- JSON との比較 ---

# YAML:
# paths:
#   /todos:
#     get:
#       summary: TODO一覧取得

# JSON:
# {
#   "paths": {
#     "/todos": {
#       "get": {
#         "summary": "TODO一覧取得"
#       }
#     }
#   }
# }

# YAML のメリット:
#   - コメントが書ける（# で始まる行）
#   - 波括弧やカンマが不要で読みやすい
#   - インデントで構造を表現`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          YAMLではインデントに<strong>タブは使えません</strong>。
          必ずスペースを使い、同じ階層は同じインデント数にしてください。
        </p>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>OpenAPI SpecificationはREST APIの仕様を記述する業界標準フォーマット</li>
          <li>SwaggerはOpenAPIのツール群のブランド名（Swagger UI、Swagger Editor等）</li>
          <li>API仕様書があることで、チーム間の認識ずれを防ぎ並行開発が可能になる</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">API-first開発</code>では、実装の前にまず仕様書を設計・合意する</li>
          <li>OpenAPI仕様書は<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">openapi</code>、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">info</code>、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">paths</code>、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">components</code>で構成される</li>
          <li>YAMLはコメントが書けて可読性が高く、OpenAPI仕様書の記述に最適</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="openapi" lessonId="basics" color="green" />
      <LessonNav lessons={OPENAPI_LESSONS} currentId="basics" basePath="/learn/openapi" color="green" />
    </div>
  );
}
