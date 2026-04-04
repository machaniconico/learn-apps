import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("api");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">API開発 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">API設計</h1>
        <p className="text-gray-400">バージョニング、エラーレスポンス、レート制限などAPI設計の原則を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">良いAPI設計の原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          使いやすく維持しやすいAPIを設計するための原則を学びます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>一貫したURL命名規則（複数形の名詞）</li>
          <li>適切なHTTPステータスコードの使用</li>
          <li>バージョニングによる後方互換性の確保</li>
          <li>わかりやすいエラーメッセージ</li>
          <li>ページネーションによる大量データの分割</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ページネーションの実装</h2>
        <p className="text-gray-400 mb-4">大量のデータを分割して返すページネーションはAPIの必須機能です。</p>
        <PhpEditor
          defaultCode={`<?php
function paginate(array $items, int $page, int $perPage): array {
    $total = count($items);
    $totalPages = (int)ceil($total / $perPage);
    $page = max(1, min($page, $totalPages));
    $offset = ($page - 1) * $perPage;
    $data = array_slice($items, $offset, $perPage);

    return [
        'data' => $data,
        'meta' => [
            'current_page' => $page,
            'per_page' => $perPage,
            'total' => $total,
            'total_pages' => $totalPages,
            'has_next' => $page < $totalPages,
            'has_prev' => $page > 1,
        ],
        'links' => [
            'first' => "/api/items?page=1&per_page=$perPage",
            'last'  => "/api/items?page=$totalPages&per_page=$perPage",
            'next'  => $page < $totalPages ? "/api/items?page=" . ($page + 1) . "&per_page=$perPage" : null,
            'prev'  => $page > 1 ? "/api/items?page=" . ($page - 1) . "&per_page=$perPage" : null,
        ],
    ];
}

$items = range(1, 25); // 25件のデータ
$result = paginate($items, page: 2, perPage: 10);

echo "データ: " . implode(', ', $result['data']) . "\n";
$meta = $result['meta'];
echo "ページ: {$meta['current_page']} / {$meta['total_pages']}\n";
echo "総件数: {$meta['total']}\n";
echo "次のページ: " . ($result['links']['next'] ?? 'なし') . "\n";`}
          expectedOutput={`データ: 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
ページ: 2 / 3
総件数: 25
次のページ: /api/items?page=3&per_page=10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーレスポンスの標準化</h2>
        <p className="text-gray-400 mb-4">RFC 7807（Problem Details）に基づいた標準的なエラーレスポンス形式を実装します。</p>
        <PhpEditor
          defaultCode={`<?php
// RFC 7807 Problem Details for HTTP APIs
class ProblemDetail {
    public static function create(
        string $type,
        string $title,
        int $status,
        string $detail,
        array $extra = []
    ): array {
        return array_merge([
            'type' => $type,
            'title' => $title,
            'status' => $status,
            'detail' => $detail,
        ], $extra);
    }
}

// バリデーションエラー
$validationError = ProblemDetail::create(
    type: 'https://api.example.com/errors/validation',
    title: 'バリデーションエラー',
    status: 422,
    detail: '送信されたデータに問題があります',
    extra: [
        'errors' => [
            ['field' => 'email', 'message' => '有効なメールアドレスを入力してください'],
            ['field' => 'age', 'message' => '年齢は18以上で入力してください'],
        ]
    ]
);

echo json_encode($validationError, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";`}
          expectedOutput={`{
    "type": "https:\/\/api.example.com\/errors\/validation",
    "title": "バリデーションエラー",
    "status": 422,
    "detail": "送信されたデータに問題があります",
    "errors": [
        {
            "field": "email",
            "message": "有効なメールアドレスを入力してください"
        },
        {
            "field": "age",
            "message": "年齢は18以上で入力してください"
        }
    ]
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="api" lessonId="api-design" />
      </div>
      <LessonNav lessons={lessons} currentId="api-design" basePath="/learn/api" />
    </div>
  );
}
