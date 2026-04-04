import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function StrategyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ストラテジー</h1>
        <p className="text-gray-400">アルゴリズムをカプセル化して実行時に切り替え可能にするストラテジーパターンを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ストラテジーパターンは、アルゴリズムのファミリーを定義し、それぞれをカプセル化して交換可能にするパターンです。
          アルゴリズムをクライアントとは独立して変更できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <span className="text-pink-300">Context：</span>ストラテジーを保持し、処理を委譲するクラス</li>
          <li>• <span className="text-pink-300">Strategy：</span>アルゴリズムを定義するインターフェース</li>
          <li>• <span className="text-pink-300">ConcreteStrategy：</span>具体的なアルゴリズムの実装</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">割引計算のストラテジー</h2>
        <p className="text-gray-400 mb-4">
          異なる割引アルゴリズムをストラテジーとして実装し、実行時に切り替えます。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface DiscountStrategy {
    public function calculate(float $price): float;
    public function description(): string;
}

class NoDiscount implements DiscountStrategy {
    public function calculate(float $price): float { return $price; }
    public function description(): string { return "割引なし"; }
}

class PercentageDiscount implements DiscountStrategy {
    public function __construct(private float $percent) {}
    public function calculate(float $price): float {
        return $price * (1 - $this->percent / 100);
    }
    public function description(): string { return "{$this->percent}%割引"; }
}

class FixedDiscount implements DiscountStrategy {
    public function __construct(private float $amount) {}
    public function calculate(float $price): float {
        return max(0, $price - $this->amount);
    }
    public function description(): string { return "{$this->amount}円引き"; }
}

class ShoppingCart {
    private DiscountStrategy $strategy;

    public function __construct() {
        $this->strategy = new NoDiscount();
    }

    public function setStrategy(DiscountStrategy $strategy): void {
        $this->strategy = $strategy;
    }

    public function checkout(float $price): void {
        $discounted = $this->strategy->calculate($price);
        echo $this->strategy->description() . ": {$price}円 → " . round($discounted) . "円\\n";
    }
}

$cart = new ShoppingCart();
$cart->checkout(10000);

$cart->setStrategy(new PercentageDiscount(20));
$cart->checkout(10000);

$cart->setStrategy(new FixedDiscount(1500));
$cart->checkout(10000);`}
          expectedOutput={`割引なし: 10000円 → 10000円\n20%割引: 10000円 → 8000円\n1500円引き: 10000円 → 8500円`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムのストラテジー</h2>
        <p className="text-gray-400 mb-4">
          異なるソートアルゴリズムをストラテジーとして実装します。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface SortStrategy {
    public function sort(array $data): array;
    public function name(): string;
}

class AscendingSort implements SortStrategy {
    public function sort(array $data): array {
        sort($data);
        return $data;
    }
    public function name(): string { return "昇順"; }
}

class DescendingSort implements SortStrategy {
    public function sort(array $data): array {
        rsort($data);
        return $data;
    }
    public function name(): string { return "降順"; }
}

class ShuffleSort implements SortStrategy {
    public function sort(array $data): array {
        shuffle($data);
        return $data;
    }
    public function name(): string { return "ランダム"; }
}

class DataList {
    private SortStrategy $strategy;

    public function __construct(SortStrategy $strategy) {
        $this->strategy = $strategy;
    }

    public function setStrategy(SortStrategy $strategy): void {
        $this->strategy = $strategy;
    }

    public function display(array $data): void {
        $sorted = $this->strategy->sort($data);
        echo $this->strategy->name() . ": " . implode(", ", $sorted) . "\\n";
    }
}

$data = [5, 2, 8, 1, 9, 3];
$list = new DataList(new AscendingSort());
$list->display($data);

$list->setStrategy(new DescendingSort());
$list->display($data);`}
          expectedOutput={`昇順: 1, 2, 3, 5, 8, 9\n降順: 9, 8, 5, 3, 2, 1`}
        />
      </section>
      <LessonCompleteButton lessonId="strategy" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/oop-advanced" />
    </div>
  );
}
