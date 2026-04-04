import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesConstructorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンストラクタ</h1>
        <p className="text-gray-400">__constructメソッドを使った初期化処理の書き方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コンストラクタ（<code className="text-orange-300">__construct</code>）はインスタンス生成時に自動で呼び出される特別なメソッドです。PHP 8.0以降ではコンストラクタプロモーションで定義を短く書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>__constructでインスタンス生成時の初期化を行う</li>
          <li>newに引数を渡すとコンストラクタに届く</li>
          <li>PHP 8.0+: コンストラクタプロモーション（引数に修飾子を付ける）で簡潔に書ける</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタの基本</h2>
        <p className="text-gray-400 mb-4">__constructでプロパティを初期化する方法です。</p>
        <PhpEditor
          defaultCode={`<?php
class Product {
    public string $name;
    public float $price;
    public int $stock;

    public function __construct(string $name, float $price, int $stock = 0) {
        $this->name = $name;
        $this->price = $price;
        $this->stock = $stock;
        echo "{$name}を登録しました\\n";
    }

    public function getInfo(): string {
        return "{$this->name}: {$this->price}円（在庫{$this->stock}個）";
    }
}

$apple = new Product("りんご", 150.0, 100);
$banana = new Product("バナナ", 80.0);
$grape = new Product("ぶどう", 350.0, 50);

echo $apple->getInfo() . "\\n";
echo $banana->getInfo() . "\\n";
echo $grape->getInfo() . "\\n";`}
          expectedOutput={`りんごを登録しました
バナナを登録しました
ぶどうを登録しました
りんご: 150円（在庫100個）
バナナ: 80円（在庫0個）
ぶどう: 350円（在庫50個）`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタプロモーション（PHP 8.0+）</h2>
        <p className="text-gray-400 mb-4">引数に修飾子を付けると、プロパティ宣言と代入を省略できます。</p>
        <PhpEditor
          defaultCode={`<?php
class Point {
    public function __construct(
        public readonly float $x,
        public readonly float $y,
        public readonly float $z = 0.0
    ) {}

    public function distanceTo(Point $other): float {
        return sqrt(
            ($this->x - $other->x) ** 2 +
            ($this->y - $other->y) ** 2 +
            ($this->z - $other->z) ** 2
        );
    }

    public function __toString(): string {
        return "({$this->x}, {$this->y}, {$this->z})";
    }
}

$origin = new Point(0, 0);
$p1 = new Point(3, 4);
$p2 = new Point(1, 2, 3);

echo "原点: {$origin}\\n";
echo "P1: {$p1}\\n";
echo "P2: {$p2}\\n";
echo "原点からP1の距離: " . $origin->distanceTo($p1) . "\\n";`}
          expectedOutput={`原点: (0, 0, 0)
P1: (3, 4, 0)
P2: (1, 2, 3)
原点からP1の距離: 5`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="constructors" />
      </div>
      <LessonNav lessons={lessons} currentId="constructors" basePath="/learn/classes" />
    </div>
  );
}
