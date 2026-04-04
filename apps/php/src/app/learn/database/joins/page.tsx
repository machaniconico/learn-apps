import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function JoinsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">JOIN</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">JOIN</strong>は複数のテーブルを結合してデータを取得する操作です。
            INNER JOIN（両方に存在するもの）、LEFT JOIN（左テーブルを基準に全件）、
            RIGHT JOIN（右テーブルを基準に全件）などがあります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">INNER JOIN</h2>
        <p className="text-gray-400 mb-4">
          INNER JOINは両方のテーブルに一致するレコードのみ返します。最もよく使われるJOINです。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// テーブルデータ\n$users = [\n    ['id' => 1, 'name' => '田中太郎'],\n    ['id' => 2, 'name' => '鈴木花子'],\n    ['id' => 3, 'name' => '佐藤次郎'],\n];\n\n$orders = [\n    ['id' => 1, 'user_id' => 1, 'product' => 'PHP入門書',    'price' => 2800],\n    ['id' => 2, 'user_id' => 1, 'product' => 'MySQLガイド',   'price' => 3200],\n    ['id' => 3, 'user_id' => 2, 'product' => 'Webデザイン本', 'price' => 2500],\n];\n// user_id=3の注文なし\n\n// INNER JOIN: 両方に存在するレコードのみ\n$results = [];\nforeach ($orders as $order) {\n    foreach ($users as $user) {\n        if ($user['id'] === $order['user_id']) {\n            $results[] = [\n                'user_name' => $user['name'],\n                'product'   => $order['product'],\n                'price'     => $order['price'],\n            ];\n        }\n    }\n}\n\n/*\nSQLで書くと:\nSELECT u.name, o.product, o.price\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\n*/\n\necho "INNER JOIN結果（注文のあるユーザーのみ）:\\n";\nforeach ($results as $row) {\n    echo "  {$row['user_name']}: {$row['product']} (" . number_format($row['price']) . "円)\\n";\n}\necho "\\n注文なしの佐藤次郎は含まれない";`}
          expectedOutput={`INNER JOIN結果（注文のあるユーザーのみ）:\n  田中太郎: PHP入門書 (2,800円)\n  田中太郎: MySQLガイド (3,200円)\n  鈴木花子: Webデザイン本 (2,500円)\n\n注文なしの佐藤次郎は含まれない`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">LEFT JOIN</h2>
        <p className="text-gray-400 mb-4">
          LEFT JOINは左テーブルの全件を返し、右テーブルに一致しない場合はNULLになります。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$users = [\n    ['id' => 1, 'name' => '田中太郎'],\n    ['id' => 2, 'name' => '鈴木花子'],\n    ['id' => 3, 'name' => '佐藤次郎'],\n];\n\n$orders = [\n    ['id' => 1, 'user_id' => 1, 'product' => 'PHP入門書'],\n    ['id' => 2, 'user_id' => 2, 'product' => 'Webデザイン本'],\n];\n\n// LEFT JOIN: usersを基準に全件\n$results = [];\nforeach ($users as $user) {\n    $userOrders = array_filter($orders, fn($o) => $o['user_id'] === $user['id']);\n    if (empty($userOrders)) {\n        $results[] = ['name' => $user['name'], 'product' => null];\n    } else {\n        foreach ($userOrders as $order) {\n            $results[] = ['name' => $user['name'], 'product' => $order['product']];\n        }\n    }\n}\n\n/*\nSQLで書くと:\nSELECT u.name, o.product\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\n*/\n\necho "LEFT JOIN結果（全ユーザー）:\\n";\nforeach ($results as $row) {\n    $product = $row['product'] ?? 'NULL（注文なし）';\n    echo "  {$row['name']}: {$product}\\n";\n}`}
          expectedOutput={`LEFT JOIN結果（全ユーザー）:\n  田中太郎: PHP入門書\n  鈴木花子: Webデザイン本\n  佐藤次郎: NULL（注文なし）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">集計とGROUP BY</h2>
        <p className="text-gray-400 mb-4">
          JOINとGROUP BYを組み合わせてユーザーごとの集計ができます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$users = [\n    ['id' => 1, 'name' => '田中太郎'],\n    ['id' => 2, 'name' => '鈴木花子'],\n    ['id' => 3, 'name' => '佐藤次郎'],\n];\n\n$orders = [\n    ['user_id' => 1, 'price' => 2800],\n    ['user_id' => 1, 'price' => 3200],\n    ['user_id' => 1, 'price' => 1500],\n    ['user_id' => 2, 'price' => 4000],\n];\n\n/*\nSQLで書くと:\nSELECT u.name, COUNT(o.id) AS order_count, SUM(o.price) AS total\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nORDER BY total DESC\n*/\n\n$summary = [];\nforeach ($users as $user) {\n    $userOrders = array_filter($orders, fn($o) => $o['user_id'] === $user['id']);\n    $prices     = array_column(iterator_to_array($userOrders, false), 'price');\n    $summary[]  = [\n        'name'  => $user['name'],\n        'count' => count($prices),\n        'total' => array_sum($prices),\n    ];\n}\n\nusort($summary, fn($a, $b) => $b['total'] - $a['total']);\n\necho "ユーザー別注文集計:\\n";\nprintf("  %-12s %5s %10s\\n", "名前", "件数", "合計金額");\necho "  " . str_repeat("-", 30) . "\\n";\nforeach ($summary as $row) {\n    printf("  %-12s %5d %10s\\n", $row['name'], $row['count'], number_format($row['total']) . "円");\n}`}
          expectedOutput={`ユーザー別注文集計:\n  名前          件数     合計金額\n  ------------------------------\n  田中太郎          3      7,500円\n  鈴木花子          1      4,000円\n  佐藤次郎          0          0円`}
        />
      </section>

      <LessonCompleteButton lessonId="joins" categoryId="database" />
      <LessonNav lessons={lessons} currentId="joins" basePath="/learn/database" />
    </div>
  );
}
