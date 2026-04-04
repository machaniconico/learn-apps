import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数の基本</h1>
        <p className="text-gray-400">functionキーワードを使った関数の定義と呼び出しの基本を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数はコードをひとまとめにして名前を付け、繰り返し呼び出せるようにした仕組みです。PHPでは<code className="text-purple-300">function</code>キーワードで定義します。同じ処理を何度も書かずに済み、コードの読みやすさと再利用性が向上します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>functionキーワードで関数を定義する</li>
          <li>関数名は小文字スネークケースが慣習（例：get_user_name）</li>
          <li>関数は定義より前でも後でも呼び出せる</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初の関数</h2>
        <p className="text-gray-400 mb-4">引数なし・戻り値なしの最も単純な関数から始めましょう。</p>
        <PhpEditor
          defaultCode={`<?php
// 関数の定義
function sayHello(): void {
    echo "こんにちは、PHP！\\n";
}

function showSeparator(): void {
    echo "-------------------\\n";
}

// 関数の呼び出し
sayHello();
showSeparator();
sayHello();
showSeparator();

// 関数は何度でも呼び出せる
echo "関数を3回呼び出します:\\n";
sayHello();
sayHello();
sayHello();`}
          expectedOutput={`こんにちは、PHP！
-------------------
こんにちは、PHP！
-------------------
関数を3回呼び出します:
こんにちは、PHP！
こんにちは、PHP！
こんにちは、PHP！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">引数を受け取る関数</h2>
        <p className="text-gray-400 mb-4">関数に値を渡すには引数（パラメータ）を使います。型宣言をつけると安全です。</p>
        <PhpEditor
          defaultCode={`<?php
function greet(string $name): void {
    echo "こんにちは、{$name}さん！\\n";
}

function add(int $a, int $b): void {
    $result = $a + $b;
    echo "{$a} + {$b} = {$result}\\n";
}

function printInfo(string $item, int $count, float $price): void {
    $total = $count * $price;
    echo "{$item}: {$count}個 × {$price}円 = {$total}円\\n";
}

greet("田中");
greet("鈴木");
add(3, 5);
add(100, 200);
printInfo("りんご", 3, 150.0);
printInfo("みかん", 5, 80.0);`}
          expectedOutput={`こんにちは、田中さん！
こんにちは、鈴木さん！
3 + 5 = 8
100 + 200 = 300
りんご: 3個 × 150円 = 450円
みかん: 5個 × 80円 = 400円`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値を返す関数</h2>
        <p className="text-gray-400 mb-4">returnキーワードで関数から値を返すことができます。</p>
        <PhpEditor
          defaultCode={`<?php
function multiply(int $a, int $b): int {
    return $a * $b;
}

function getFullName(string $firstName, string $lastName): string {
    return $lastName . " " . $firstName;
}

function isEven(int $n): bool {
    return $n % 2 === 0;
}

$result = multiply(4, 7);
echo "4 × 7 = {$result}\\n";

$name = getFullName("太郎", "田中");
echo "氏名: {$name}\\n";

echo isEven(4) ? "4は偶数\\n" : "4は奇数\\n";
echo isEven(7) ? "7は偶数\\n" : "7は奇数\\n";`}
          expectedOutput={`4 × 7 = 28
氏名: 田中 太郎
4は偶数
7は奇数`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
