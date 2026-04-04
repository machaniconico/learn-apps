import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsArrowPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アロー関数</h1>
        <p className="text-gray-400">fn構文を使った簡潔なアロー関数の書き方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP 7.4で追加されたアロー関数は、<code className="text-purple-300">fn</code>キーワードで書く短縮構文です。外部スコープの変数を自動的にキャプチャし、単一式の結果を暗黙的に返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>fn(引数) =&gt; 式 の形式で書く</li>
          <li>外部変数をuseなしで自動キャプチャする（値渡しのみ）</li>
          <li>単一式のみ書ける（複数行の処理には無名関数を使う）</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アロー関数の基本構文</h2>
        <p className="text-gray-400 mb-4">無名関数とアロー関数の比較です。</p>
        <PhpEditor
          defaultCode={`<?php
// 無名関数（従来の書き方）
$triple = function(int $n): int {
    return $n * 3;
};

// アロー関数（PHP 7.4+）
$tripleArrow = fn(int $n): int => $n * 3;

$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// array_mapで活用
$tripled = array_map(fn($n) => $n * 3, $numbers);
$evens = array_filter($numbers, fn($n) => $n % 2 === 0);
$squares = array_map(fn($n) => $n ** 2, $numbers);

echo implode(", ", $tripled) . "\\n";
echo implode(", ", $evens) . "\\n";
echo implode(", ", $squares) . "\\n";`}
          expectedOutput={`3, 6, 9, 12, 15, 18, 21, 24, 27, 30
2, 4, 6, 8, 10
1, 4, 9, 16, 25, 36, 49, 64, 81, 100`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">外部変数の自動キャプチャ</h2>
        <p className="text-gray-400 mb-4">アロー関数はuseなしで外部変数を使えます。</p>
        <PhpEditor
          defaultCode={`<?php
$multiplier = 5;
$offset = 10;

// useなしで外部変数を参照
$transform = fn(int $n): int => $n * $multiplier + $offset;

$data = [1, 2, 3, 4, 5];
$result = array_map($transform, $data);
echo implode(", ", $result) . "\\n";

// ネストしたアロー関数
$makeAdder = fn(int $x) => fn(int $y) => $x + $y;
$add5 = $makeAdder(5);
$add10 = $makeAdder(10);

echo $add5(3) . "\\n";
echo $add10(7) . "\\n";

// usort でアロー関数を使う
$people = [
    ["name" => "田中", "age" => 30],
    ["name" => "鈴木", "age" => 25],
    ["name" => "佐藤", "age" => 35],
];
usort($people, fn($a, $b) => $a["age"] - $b["age"]);
foreach ($people as $p) {
    echo "{$p['name']}: {$p['age']}歳\\n";
}`}
          expectedOutput={`15, 20, 25, 30, 35
8
17
鈴木: 25歳
田中: 30歳
佐藤: 35歳`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="arrow" />
      </div>
      <LessonNav lessons={lessons} currentId="arrow" basePath="/learn/functions" />
    </div>
  );
}
