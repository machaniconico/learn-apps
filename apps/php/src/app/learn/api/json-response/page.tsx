import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("api");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">API開発 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSONレスポンス</h1>
        <p className="text-gray-400">json_encodeとヘッダー設定によるJSONレスポンスの返し方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JSONレスポンスの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPでJSONレスポンスを返すには、Content-Typeヘッダーをapplication/jsonに設定し、json_encode()でデータを変換します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">json_encode()</code> - 配列やオブジェクトをJSON文字列に変換</li>
          <li><code className="text-blue-300">JSON_PRETTY_PRINT</code> - 読みやすい形式で出力</li>
          <li><code className="text-blue-300">JSON_UNESCAPED_UNICODE</code> - 日本語をエスケープしない</li>
          <li><code className="text-blue-300">JSON_THROW_ON_ERROR</code> - エラー時に例外を投げる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">json_encodeのオプション</h2>
        <p className="text-gray-400 mb-4">json_encodeには様々なオプションフラグがあり、出力形式を細かく制御できます。</p>
        <PhpEditor
          defaultCode={`<?php
$data = [
    'name' => '田中太郎',
    'age' => 30,
    'url' => 'https://example.com/user?id=1&type=admin',
    'scores' => [85, 92, 78],
    'address' => null,
];

// デフォルト出力
echo "=== デフォルト ===\n";
echo json_encode($data) . "\n\n";

// 日本語・スラッシュをエスケープしない
echo "=== UNESCAPED ===\n";
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n\n";

// 整形出力
echo "=== PRETTY_PRINT ===\n";
echo json_encode(['status' => 'ok', 'count' => 2], JSON_PRETTY_PRINT) . "\n";`}
          expectedOutput={`=== デフォルト ===
{"name":"\u7530\u4e2d\u592a\u90ce","age":30,"url":"https:\/\/example.com\/user?id=1&type=admin","scores":[85,92,78],"address":null}

=== UNESCAPED ===
{"name":"田中太郎","age":30,"url":"https://example.com/user?id=1&type=admin","scores":[85,92,78],"address":null}

=== PRETTY_PRINT ===
{
    "status": "ok",
    "count": 2
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">統一レスポンス形式の設計</h2>
        <p className="text-gray-400 mb-4">APIレスポンスを統一した形式にすることで、クライアント側の処理が簡単になります。</p>
        <PhpEditor
          defaultCode={`<?php
// 統一レスポンスクラス
class ApiResponse {
    public static function success(mixed $data, string $message = 'Success', int $code = 200): string {
        return json_encode([
            'success' => true,
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    public static function error(string $message, int $code = 400, array $errors = []): string {
        $response = [
            'success' => false,
            'code' => $code,
            'message' => $message,
        ];
        if (!empty($errors)) {
            $response['errors'] = $errors;
        }
        return json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}

// 成功レスポンス
echo ApiResponse::success(['id' => 1, 'name' => '田中太郎'], 'ユーザー取得成功') . "\n\n";

// エラーレスポンス
echo ApiResponse::error('バリデーションエラー', 422, [
    'email' => 'メールアドレスの形式が正しくありません',
    'age' => '年齢は1以上200以下で入力してください',
]);`}
          expectedOutput={`{
    "success": true,
    "code": 200,
    "message": "ユーザー取得成功",
    "data": {
        "id": 1,
        "name": "田中太郎"
    }
}

{
    "success": false,
    "code": 422,
    "message": "バリデーションエラー",
    "errors": {
        "email": "メールアドレスの形式が正しくありません",
        "age": "年齢は1以上200以下で入力してください"
    }
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="api" lessonId="json-response" />
      </div>
      <LessonNav lessons={lessons} currentId="json-response" basePath="/learn/api" />
    </div>
  );
}
