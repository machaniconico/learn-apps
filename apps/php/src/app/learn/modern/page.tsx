import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("modern");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHP 8.0で追加されたNullsafe演算子はどれですか？",
    options: ["??", "?->", "?:", "??="],
    answer: 1,
    explanation: "?->（Nullsafe演算子）はオブジェクトがnullの場合にnullを返し、メソッドチェーンを安全に続けられます。",
  },
  {
    question: "PHP 8.1で追加されたReadonlyプロパティの特徴はどれですか？",
    options: [
      "クラス外からのみ変更可能",
      "初期化後は変更不可",
      "staticプロパティのみに使える",
      "インターフェースでのみ使える",
    ],
    answer: 1,
    explanation: "readonlyプロパティは一度初期化された後は変更できません。コンストラクタで初期化するのが一般的です。",
  },
  {
    question: "PHP 8.0の名前付き引数の利点はどれですか？",
    options: [
      "引数の順序を省略できる",
      "引数名を指定して順序を気にせず渡せる",
      "型チェックを省略できる",
      "デフォルト値を上書きできる",
    ],
    answer: 1,
    explanation: "名前付き引数は引数名を明示することで、順序に関係なく引数を渡せます。コードの可読性も向上します。",
  },
  {
    question: "PHP 8.1のFiberの主な用途はどれですか？",
    options: [
      "マルチスレッド処理",
      "非同期I/O",
      "コルーチンによる軽量な並行処理",
      "プロセス間通信",
    ],
    answer: 2,
    explanation: "FiberはPHPでコルーチンを実現し、処理を一時停止・再開できる軽量な並行処理の仕組みです。",
  },
];

export default function ModernPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">モダンPHP</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHP 8.x系で追加された最新機能を学びます。名前付き引数、Fiber、Attribute、Readonlyプロパティ、強化されたEnum等、モダンなPHPコードを書くために必要な知識を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="modern" totalLessons={6} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/modern" color="violet" categoryId="modern" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHP 8.x の主要な新機能</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">match式</code>や<code className="text-violet-300">Nullsafe演算子</code>など、コードをより安全・簡潔に書けます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// match式（PHP 8.0）
$status = 2;
$label = match($status) {
    1 => '処理中',
    2 => '完了',
    3 => 'エラー',
    default => '不明',
};
echo "ステータス: $label\n";

// Nullsafe演算子（PHP 8.0）
class User {
    public ?Address $address = null;
}
class Address {
    public string $city = '東京';
}

$user = new User();
$city = $user?->address?->city ?? '不明';
echo "都市: $city\n";

// Union型（PHP 8.0）
function formatValue(int|float|string $value): string {
    return "値: $value";
}
echo formatValue(42) . "\n";
echo formatValue(3.14) . "\n";`}
          expectedOutput={`ステータス: 完了
都市: 不明
値: 42
値: 3.14`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">名前付き引数とReadonly</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">名前付き引数</code>で可読性を高め、<code className="text-violet-300">readonly</code>で不変性を表現できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 名前付き引数（PHP 8.0）
function createUser(string $name, int $age = 0, string $role = 'user'): string {
    return "$name ($age歳, $role)";
}

// 引数名を指定して順序を入れ替えられる
echo createUser(name: '田中', role: 'admin', age: 30) . "\n";
echo createUser(age: 25, name: '鈴木') . "\n";

// Readonlyプロパティ（PHP 8.1）
class Point {
    public function __construct(
        public readonly float $x,
        public readonly float $y,
    ) {}
}

$point = new Point(x: 3.0, y: 4.0);
echo "座標: ({$point->x}, {$point->y})\n";

// $point->x = 5.0; // エラー: readonlyプロパティは変更不可`}
          expectedOutput={`田中 (30歳, admin)
鈴木 (25歳, user)
座標: (3, 4)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
