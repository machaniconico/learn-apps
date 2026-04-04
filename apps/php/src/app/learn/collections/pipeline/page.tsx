import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コレクション操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パイプライン</h1>
        <p className="text-gray-400">配列操作をチェーンするパイプラインパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パイプラインパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パイプラインパターンはデータを複数のステージを順に通して変換する設計パターンです。各ステージは独立した処理単位で、組み合わせることで複雑な変換フローを構築できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>各ステージはシンプルな単一責任の処理</li>
          <li>ステージを自由に追加・入れ替え可能</li>
          <li>ジェネレータで遅延評価のパイプラインも構築可能</li>
          <li>Laravelのコレクション・パイプラインも同パターン</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なパイプライン実装</h2>
        <p className="text-gray-400 mb-4">処理をステージとして登録し、データを順番に通していくパイプラインを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
class Pipeline {
    private array $stages = [];

    public function pipe(callable $stage): static {
        $clone = clone $this;
        $clone->stages[] = $stage;
        return $clone;
    }

    public function process(mixed $payload): mixed {
        return array_reduce(
            $this->stages,
            fn($carry, $stage) => $stage($carry),
            $payload
        );
    }
}

// テキスト処理パイプライン
$textPipeline = (new Pipeline())
    ->pipe(fn($s) => trim($s))
    ->pipe(fn($s) => strtolower($s))
    ->pipe(fn($s) => preg_replace('/\s+/', ' ', $s))
    ->pipe(fn($s) => ucwords($s));

$texts = [
    '  hello   world  ',
    'PHP  IS   AWESOME',
    '  TOKYO    JAPAN  ',
];

foreach ($texts as $text) {
    echo "'" . $textPipeline->process($text) . "'\n";
}

// 数値変換パイプライン
$numberPipeline = (new Pipeline())
    ->pipe(fn($n) => $n * 2)
    ->pipe(fn($n) => $n + 10)
    ->pipe(fn($n) => $n ** 2);

foreach ([1, 2, 3, 4, 5] as $n) {
    echo "$n → " . $numberPipeline->process($n) . "\n";
}`}
          expectedOutput={`'Hello World'
'Php Is Awesome'
'Tokyo Japan'
1 → 144
2 → 196
3 → 256
4 → 324
5 → 400`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネレータパイプライン</h2>
        <p className="text-gray-400 mb-4">ジェネレータを組み合わせたパイプラインで、大量データを省メモリで変換処理できます。</p>
        <PhpEditor
          defaultCode={`<?php
// ジェネレータベースのパイプライン
function map(iterable $source, callable $fn): Generator {
    foreach ($source as $key => $item) {
        yield $key => $fn($item);
    }
}

function filter(iterable $source, callable $fn): Generator {
    foreach ($source as $key => $item) {
        if ($fn($item)) yield $key => $item;
    }
}

function take(iterable $source, int $n): Generator {
    $count = 0;
    foreach ($source as $item) {
        if ($count++ >= $n) break;
        yield $item;
    }
}

// 注文データのパイプライン処理
$orders = (function() {
    for ($i = 1; $i <= 100; $i++) {
        yield ['id' => $i, 'amount' => rand(100, 10000), 'status' => $i % 3 === 0 ? 'cancelled' : 'completed'];
    }
})();

$pipeline = take(
    map(
        filter($orders, fn($o) => $o['status'] === 'completed'),
        fn($o) => ['id' => $o['id'], 'total' => $o['amount'] * 1.1]
    ),
    5
);

foreach ($pipeline as $order) {
    echo "注文{$order['id']}: " . number_format($order['total']) . "円(税込)\n";
}`}
          expectedOutput={`注文1: 5,511円(税込)
注文2: 3,828円(税込)
注文4: 8,591円(税込)
注文5: 2,937円(税込)
注文7: 1,210円(税込)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="pipeline" />
      </div>
      <LessonNav lessons={lessons} currentId="pipeline" basePath="/learn/collections" />
    </div>
  );
}
