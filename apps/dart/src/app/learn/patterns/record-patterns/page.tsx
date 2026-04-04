import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function RecordPatternsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold uppercase tracking-wide">パターンマッチング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">レコードパターン</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dart 3の<strong className="text-pink-300">レコード型</strong>は軽量な不変データ構造です。
            <code className="text-pink-300">(value1, value2)</code>や<code className="text-pink-300">(name: value)</code>の形で作成し、
            パターンマッチングで効率よく分解できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">レコード型の基本</h2>
        <p className="text-gray-400 mb-4">
          レコードは位置フィールドと名前付きフィールドを持てます。パターンで簡単に分解できます。
        </p>
        <DartEditor
          defaultCode={`// レコード型の定義と使用
typedef Point = (double x, double y);
typedef NamedPoint = ({double x, double y, String label});

double distance(Point p1, Point p2) {
  final (x1, y1) = p1;
  final (x2, y2) = p2;
  final dx = x2 - x1;
  final dy = y2 - y1;
  return (dx * dx + dy * dy);  // 距離の二乗
}

void main() {
  // 位置レコード
  final p1 = (3.0, 4.0);
  final (x, y) = p1;
  print('点: (\$x, \$y)');

  // 名前付きレコード
  final np = (x: 1.0, y: 2.0, label: '原点付近');
  print('ラベル: \${np.label}, x=\${np.x}, y=\${np.y}');

  // パターンマッチングで分解
  final points = <Point>[(0, 0), (3, 4), (1, 1), (5, 12)];
  for (final p in points) {
    final d = distance((0, 0), p);
    final (px, py) = p;
    print('(\$px, \$py) 原点からの距離の二乗: \$d');
  }
}`}
          expectedOutput={`点: (3.0, 4.0)
ラベル: 原点付近, x=1.0, y=2.0
(0.0, 0.0) 原点からの距離の二乗: 0.0
(3.0, 4.0) 原点からの距離の二乗: 25.0
(1.0, 1.0) 原点からの距離の二乗: 2.0
(5.0, 12.0) 原点からの距離の二乗: 169.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">レコードパターンとswitch</h2>
        <p className="text-gray-400 mb-4">
          switch式とレコードパターンを組み合わせて、複合的な条件分岐を簡潔に書けます。
        </p>
        <DartEditor
          defaultCode={`typedef HttpResult = (int statusCode, String body);

String handleResponse(HttpResult result) => switch (result) {
  (200, var body)              => '成功: \$body',
  (201, var body)              => '作成: \$body',
  (400, var msg)               => 'クライアントエラー: \$msg',
  (401, _)                     => '認証エラー',
  (403, _)                     => 'アクセス禁止',
  (404, var path)              => 'Not Found: \$path',
  (int s, var msg) when s >= 500 => 'サーバーエラー(\$s): \$msg',
  (int s, _)                   => '不明なステータス: \$s',
};

void main() {
  final responses = <HttpResult>[
    (200, '{"users": [...]}'),
    (201, '{"id": 42}'),
    (404, '/api/missing'),
    (401, ''),
    (500, 'Internal Server Error'),
  ];

  for (final r in responses) {
    print(handleResponse(r));
  }
}`}
          expectedOutput={`成功: {"users": [...]}
作成: {"id": 42}
Not Found: /api/missing
認証エラー
サーバーエラー(500): Internal Server Error`}
        />
      </section>

      <LessonCompleteButton lessonId="record-patterns" categoryId="patterns" />
      <LessonNav lessons={lessons} currentId="record-patterns" basePath="/learn/patterns" />
    </div>
  );
}
