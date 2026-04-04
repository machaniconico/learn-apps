import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHPエコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">PHPバージョン</h1>
        <p className="text-gray-400">PHP 7.x〜8.xの主要な変更点とバージョンアップの指針を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPのバージョン変遷</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP 7.0（2015年）以降、毎年メジャーアップデートが行われ、パフォーマンスと型安全性が大幅に向上しました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">PHP 7.4</code> - Arrow functions、型付きプロパティ、FFI</li>
          <li><code className="text-indigo-300">PHP 8.0</code> - JIT、match式、Named args、Union型、Nullsafe</li>
          <li><code className="text-indigo-300">PHP 8.1</code> - Enum、Fiber、readonly、Intersection型</li>
          <li><code className="text-indigo-300">PHP 8.2</code> - readonly class、DNF型、true/false/null型</li>
          <li><code className="text-indigo-300">PHP 8.3</code> - 型付き定数、json_validate()、動的クラス定数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バージョン別の主要機能</h2>
        <p className="text-gray-400 mb-4">PHP 7.4から8.3までの主要な新機能をコードで確認します。</p>
        <PhpEditor
          defaultCode={`<?php
// PHP 7.4: Arrow functions & typed properties
class TypedProduct {
    public int $id;
    public string $name;
    public float $price;

    public function __construct(int $id, string $name, float $price) {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
    }
}

$products = [
    new TypedProduct(1, 'PHP本', 3500.0),
    new TypedProduct(2, 'JS本', 2800.0),
    new TypedProduct(3, 'Go本', 3200.0),
];

// PHP 7.4: Arrow function
$expensive = array_filter($products, fn($p) => $p->price >= 3000);
$names = array_map(fn($p) => "{$p->name}({$p->price}円)", $expensive);
echo "3000円以上: " . implode(', ', $names) . "\n\n";

// PHP 8.0: match式
foreach ($products as $p) {
    $category = match(true) {
        $p->price >= 3500 => 'プレミアム',
        $p->price >= 3000 => 'スタンダード',
        default => 'お手頃',
    };
    echo "{$p->name}: $category\n";
}

echo "\n";

// PHP 8.1: Enum
enum BookCategory: string {
    case Programming = 'programming';
    case Design = 'design';
    case Business = 'business';

    public function label(): string {
        return match($this) {
            self::Programming => 'プログラミング',
            self::Design => 'デザイン',
            self::Business => 'ビジネス',
        };
    }
}

foreach (BookCategory::cases() as $cat) {
    echo "{$cat->value}: {$cat->label()}\n";
}`}
          expectedOutput={`3000円以上: PHP本(3500円), Go本(3200円)

PHP本: プレミアム
JS本: お手頃
Go本: スタンダード

programming: プログラミング
design: デザイン
business: ビジネス`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バージョンアップの移行ガイド</h2>
        <p className="text-gray-400 mb-4">PHP 7.xから8.xへの移行で注意すべき破壊的変更と対処法を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
// PHP 8.0の破壊的変更: 厳密な型比較
// PHP 7.x: 0 == "foo" は true（型の緩い比較）
// PHP 8.0: 0 == "foo" は false（数値と文字列の比較が厳密化）

$values = [0, '', '0', 'foo', null, false];
echo "PHP 8.0の比較:\n";
foreach ($values as $v) {
    $result = $v == 'foo' ? 'true' : 'false';
    $type = gettype($v);
    $display = var_export($v, true);
    echo "  $display ($type) == 'foo': $result\n";
}

echo "\n";

// PHP 8.0: str_contains/str_starts_with/str_ends_with
$haystack = 'Hello, PHP World!';
echo "str_contains: " . (str_contains($haystack, 'PHP') ? 'true' : 'false') . "\n";
echo "str_starts_with: " . (str_starts_with($haystack, 'Hello') ? 'true' : 'false') . "\n";
echo "str_ends_with: " . (str_ends_with($haystack, 'World!') ? 'true' : 'false') . "\n";

echo "\n";

// PHP 8.3: json_validate()
$jsons = ['{"name":"田中"}', '{invalid}', '"just a string"', '123'];
foreach ($jsons as $json) {
    $valid = json_validate($json) ? '有効' : '無効';
    echo "  $json: $valid\n";
}`}
          expectedOutput={`PHP 8.0の比較:
  0 (integer) == 'foo': false
  '' (string) == 'foo': false
  '0' (string) == 'foo': false
  'foo' (string) == 'foo': true
  NULL (NULL) == 'foo': false
  false (boolean) == 'foo': false

str_contains: true
str_starts_with: true
str_ends_with: true

  {"name":"田中"}: 有効
  {invalid}: 無効
  "just a string": 有効
  123: 有効`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="php-versions" />
      </div>
      <LessonNav lessons={lessons} currentId="php-versions" basePath="/learn/ecosystem" />
    </div>
  );
}
