import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("api");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">API開発 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">REST API基礎</h1>
        <p className="text-gray-400">RESTの原則とHTTPメソッドの使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RESTとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          REST（Representational State Transfer）はWebサービスの設計原則です。リソースをURLで表し、HTTPメソッドで操作を表現します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">GET</code> - リソースの取得（冪等・安全）</li>
          <li><code className="text-blue-300">POST</code> - リソースの作成</li>
          <li><code className="text-blue-300">PUT/PATCH</code> - リソースの更新</li>
          <li><code className="text-blue-300">DELETE</code> - リソースの削除</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HTTPステータスコードの使い分け</h2>
        <p className="text-gray-400 mb-4">RESTful APIでは適切なHTTPステータスコードを返すことが重要です。</p>
        <PhpEditor
          defaultCode={`<?php
// HTTPステータスコードとその意味
$statusCodes = [
    200 => 'OK - リクエスト成功',
    201 => 'Created - リソース作成成功',
    204 => 'No Content - 成功（レスポンスボディなし）',
    400 => 'Bad Request - リクエストが不正',
    401 => 'Unauthorized - 認証が必要',
    403 => 'Forbidden - アクセス禁止',
    404 => 'Not Found - リソースが存在しない',
    422 => 'Unprocessable Entity - バリデーションエラー',
    500 => 'Internal Server Error - サーバーエラー',
];

foreach ($statusCodes as $code => $description) {
    $category = match(true) {
        $code >= 500 => 'サーバーエラー',
        $code >= 400 => 'クライアントエラー',
        $code >= 200 => '成功',
        default => 'その他',
    };
    echo "[$category] $code: $description\n";
}`}
          expectedOutput={`[成功] 200: OK - リクエスト成功
[成功] 201: Created - リソース作成成功
[成功] 204: No Content - 成功（レスポンスボディなし）
[クライアントエラー] 400: Bad Request - リクエストが不正
[クライアントエラー] 401: Unauthorized - 認証が必要
[クライアントエラー] 403: Forbidden - アクセス禁止
[クライアントエラー] 404: Not Found - リソースが存在しない
[クライアントエラー] 422: Unprocessable Entity - バリデーションエラー
[サーバーエラー] 500: Internal Server Error - サーバーエラー`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RESTfulなURL設計</h2>
        <p className="text-gray-400 mb-4">リソースを名詞で表し、操作をHTTPメソッドで表現するURL設計を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
// RESTfulなエンドポイント設計
$endpoints = [
    ['GET',    '/api/users',        'ユーザー一覧取得'],
    ['POST',   '/api/users',        'ユーザー作成'],
    ['GET',    '/api/users/{id}',   '特定ユーザー取得'],
    ['PUT',    '/api/users/{id}',   'ユーザー全体更新'],
    ['PATCH',  '/api/users/{id}',   'ユーザー部分更新'],
    ['DELETE', '/api/users/{id}',   'ユーザー削除'],
    ['GET',    '/api/users/{id}/posts', 'ユーザーの投稿一覧'],
];

echo str_pad('メソッド', 10) . str_pad('エンドポイント', 30) . "説明\n";
echo str_repeat('-', 60) . "\n";
foreach ($endpoints as [$method, $path, $desc]) {
    echo str_pad($method, 10) . str_pad($path, 30) . "$desc\n";
}`}
          expectedOutput={`メソッド    エンドポイント                 説明
------------------------------------------------------------
GET       /api/users                    ユーザー一覧取得
POST      /api/users                    ユーザー作成
GET       /api/users/{id}               特定ユーザー取得
PUT       /api/users/{id}               ユーザー全体更新
PATCH     /api/users/{id}               ユーザー部分更新
DELETE    /api/users/{id}               ユーザー削除
GET       /api/users/{id}/posts         ユーザーの投稿一覧`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="api" lessonId="rest-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="rest-basics" basePath="/learn/api" />
    </div>
  );
}
