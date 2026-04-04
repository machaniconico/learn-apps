import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPのジェネレータ関数で値を生成するキーワードはどれですか？",
    options: ["return", "yield", "emit", "produce"],
    answer: 1,
    explanation: "yieldキーワードを使うとジェネレータ関数になり、値を一つずつ遅延して生成できます。",
  },
  {
    question: "Iteratorインターフェースで必須のメソッドに含まれないものはどれですか？",
    options: ["current()", "next()", "rewind()", "push()"],
    answer: 3,
    explanation: "Iteratorインターフェースはcurrent()、key()、next()、rewind()、valid()の5メソッドが必須です。push()は含まれません。",
  },
  {
    question: "SPLのスタック実装クラスはどれですか？",
    options: ["SplArray", "SplStack", "SplList", "SplVector"],
    answer: 1,
    explanation: "SplStackはSPL（Standard PHP Library）が提供するスタック（LIFO）データ構造の実装です。",
  },
  {
    question: "パイプラインパターンの主な利点はどれですか？",
    options: [
      "メモリ使用量を削減できる",
      "処理をチェーンして可読性を高められる",
      "並列処理が可能になる",
      "型安全性が向上する",
    ],
    answer: 1,
    explanation: "パイプラインパターンは複数の処理をチェーンして記述でき、データの変換フローが読みやすくなります。",
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">コレクション操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPのイテレータ、ジェネレータ、SPLデータ構造を学びます。大量データの効率的な処理、カスタムコレクション実装、パイプラインパターンなど高度なデータ操作技術を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="collections" totalLessons={5} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/collections" color="cyan" categoryId="collections" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネレータによる遅延評価</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">yield</code>を使うと、大きなデータセットをメモリ効率よく処理できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// ジェネレータ関数
function fibonacci(): Generator {
    [$a, $b] = [0, 1];
    while (true) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}

// 最初の10個のフィボナッチ数を取得
$fib = fibonacci();
$results = [];
for ($i = 0; $i < 10; $i++) {
    $results[] = $fib->current();
    $fib->next();
}

echo implode(', ', $results) . "\n";

// 範囲ジェネレータ
function xrange(int $start, int $end, int $step = 1): Generator {
    for ($i = $start; $i <= $end; $i += $step) {
        yield $i;
    }
}

$sum = 0;
foreach (xrange(1, 100) as $n) {
    $sum += $n;
}
echo "1から100の合計: $sum\n";`}
          expectedOutput={`0, 1, 1, 2, 3, 5, 8, 13, 21, 34
1から100の合計: 5050`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムイテレータ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">Iterator</code>インターフェースを実装してカスタムコレクションを作成できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
class NumberRange implements Iterator {
    private int $current;

    public function __construct(
        private int $start,
        private int $end
    ) {
        $this->current = $start;
    }

    public function current(): int { return $this->current; }
    public function key(): int { return $this->current - $this->start; }
    public function next(): void { $this->current++; }
    public function rewind(): void { $this->current = $this->start; }
    public function valid(): bool { return $this->current <= $this->end; }
}

$range = new NumberRange(1, 5);
foreach ($range as $key => $value) {
    echo "[$key] => $value\n";
}

// 再利用可能
$squares = [];
foreach ($range as $n) {
    $squares[] = $n * $n;
}
echo "二乗: " . implode(', ', $squares) . "\n";`}
          expectedOutput={`[0] => 1
[1] => 2
[2] => 3
[3] => 4
[4] => 5
二乗: 1, 4, 9, 16, 25`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
