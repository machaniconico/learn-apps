import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("modern");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">モダンPHP レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">PHP 8.x新機能</h1>
        <p className="text-gray-400">Named arguments、Nullsafe operator、Fiberなど最新の機能を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHP 8.x系の主要な進化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP 8.0（2020年）、8.1（2021年）、8.2（2022年）、8.3（2023年）と毎年メジャーアップデートが続いています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">PHP 8.0</code> - JIT、match式、名前付き引数、Union型、Nullsafe演算子</li>
          <li><code className="text-violet-300">PHP 8.1</code> - Enum、Fiber、readonly、Intersection型、never型</li>
          <li><code className="text-violet-300">PHP 8.2</code> - readonlyクラス、DNF型、true/false/null単独型</li>
          <li><code className="text-violet-300">PHP 8.3</code> - 型付き定数、json_validate()、動的クラス定数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHP 8.0の新機能</h2>
        <p className="text-gray-400 mb-4">match式、Nullsafe演算子、コンストラクタプロモーションなどコードを大幅に簡潔にできます。</p>
        <PhpEditor
          defaultCode={`<?php
// match式: switchより厳密で式として使える
$httpCode = 404;
$message = match($httpCode) {
    200, 201 => '成功',
    301, 302 => 'リダイレクト',
    400 => 'リクエストエラー',
    401, 403 => '認証・認可エラー',
    404 => 'リソースが見つかりません',
    500 => 'サーバーエラー',
    default => '不明なステータス',
};
echo "HTTP $httpCode: $message\n";

// コンストラクタプロモーション
class Product {
    public function __construct(
        public readonly int $id,
        public string $name,
        public float $price,
        public int $stock = 0,
    ) {}

    public function isAvailable(): bool {
        return $this->stock > 0;
    }
}

$product = new Product(id: 1, name: 'PHPの本', price: 3500.0, stock: 10);
echo "{$product->name}: {$product->price}円 ";
echo ($product->isAvailable() ? "在庫あり" : "在庫なし") . "\n";

// Nullsafe演算子
class Order {
    public ?Product $item = null;
}
$order = new Order();
$price = $order?->item?->price ?? 0;
echo "注文金額: {$price}円\n";`}
          expectedOutput={`HTTP 404: リソースが見つかりません
PHPの本: 3500円 在庫あり
注文金額: 0円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHP 8.1・8.2の新機能</h2>
        <p className="text-gray-400 mb-4">Enum、readonly、Intersection型など型安全性を高める機能が追加されました。</p>
        <PhpEditor
          defaultCode={`<?php
// PHP 8.1: Backed Enum
enum Color: string {
    case Red = 'red';
    case Green = 'green';
    case Blue = 'blue';

    public function label(): string {
        return match($this) {
            Color::Red => '赤',
            Color::Green => '緑',
            Color::Blue => '青',
        };
    }
}

foreach (Color::cases() as $color) {
    echo "{$color->name}: {$color->value} ({$color->label()})\n";
}

// PHP 8.1: never型（関数が必ず例外かexitで終わる）
function throwError(string $msg): never {
    throw new RuntimeException($msg);
}

// PHP 8.2: readonly class
readonly class Money {
    public function __construct(
        public int $amount,
        public string $currency,
    ) {}

    public function add(Money $other): Money {
        if ($this->currency !== $other->currency) {
            throwError('通貨が異なります');
        }
        return new Money($this->amount + $other->amount, $this->currency);
    }
}

$price = new Money(1000, 'JPY');
$tax = new Money(100, 'JPY');
$total = $price->add($tax);
echo "合計: {$total->amount}{$total->currency}\n";`}
          expectedOutput={`Red: red (赤)
Green: green (緑)
Blue: blue (青)
合計: 1100JPY`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="modern" lessonId="php8-features" />
      </div>
      <LessonNav lessons={lessons} currentId="php8-features" basePath="/learn/modern" />
    </div>
  );
}
