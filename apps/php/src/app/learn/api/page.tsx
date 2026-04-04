import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("api");

const quizQuestions: QuizQuestion[] = [
  {
    question: "RESTful APIでリソースの取得に使うHTTPメソッドはどれですか？",
    options: ["POST", "PUT", "GET", "DELETE"],
    answer: 2,
    explanation: "GETメソッドはリソースの取得に使います。サーバーの状態を変更せず、冪等性があります。",
  },
  {
    question: "PHPでJSONレスポンスを返すときに設定するContent-Typeはどれですか？",
    options: ["text/html", "application/json", "application/xml", "text/plain"],
    answer: 1,
    explanation: "JSONデータを返す場合はContent-Typeヘッダーをapplication/jsonに設定します。",
  },
  {
    question: "PHPで配列をJSON文字列に変換する関数はどれですか？",
    options: ["json_decode()", "json_serialize()", "json_encode()", "json_stringify()"],
    answer: 2,
    explanation: "json_encode()はPHPの配列やオブジェクトをJSON文字列に変換します。",
  },
  {
    question: "APIのバージョン管理でよく使われるURLパターンはどれですか？",
    options: ["/api/latest/users", "/api/v1/users", "/api/users/version1", "/v1.0/api/users"],
    answer: 1,
    explanation: "/api/v1/usersのようにURLにバージョン番号を含めるのが一般的なAPIバージョン管理の方法です。",
  },
];

export default function ApiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">API開発</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPを使ったRESTful API開発の基礎から実践まで学びます。JSONレスポンス、ルーティング、ミドルウェア、認証、API設計のベストプラクティスを習得し、本格的なAPIを構築できるようになります。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="api" totalLessons={6} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/api" color="blue" categoryId="api" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなAPIエンドポイント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">header()</code>でContent-Typeを設定し、<code className="text-blue-300">json_encode()</code>でレスポンスを返します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// JSONレスポンスを返すシンプルなAPI
header('Content-Type: application/json');

$users = [
    ['id' => 1, 'name' => '田中太郎', 'email' => 'tanaka@example.com'],
    ['id' => 2, 'name' => '鈴木花子', 'email' => 'suzuki@example.com'],
];

$response = [
    'status' => 'success',
    'data' => $users,
    'count' => count($users),
];

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);`}
          expectedOutput={`{
    "status": "success",
    "data": [
        {
            "id": 1,
            "name": "田中太郎",
            "email": "tanaka@example.com"
        },
        {
            "id": 2,
            "name": "鈴木花子",
            "email": "suzuki@example.com"
        }
    ],
    "count": 2
}`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HTTPメソッドの判定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">$_SERVER['REQUEST_METHOD']</code>でHTTPメソッドを判定し、適切な処理を行います。
        </p>
        <PhpEditor
          defaultCode={`<?php
// HTTPメソッドによる処理の分岐
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        $result = ['action' => 'リソースを取得', 'method' => 'GET'];
        break;
    case 'POST':
        $result = ['action' => 'リソースを作成', 'method' => 'POST'];
        break;
    case 'PUT':
        $result = ['action' => 'リソースを更新', 'method' => 'PUT'];
        break;
    case 'DELETE':
        $result = ['action' => 'リソースを削除', 'method' => 'DELETE'];
        break;
    default:
        $result = ['error' => 'サポートされていないメソッド'];
}

echo "メソッド: " . $method . "\n";
echo "処理: " . $result['action'] . "\n";`}
          expectedOutput={`メソッド: GET
処理: リソースを取得`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
