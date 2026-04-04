import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("modern");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">モダンPHP レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Fiber</h1>
        <p className="text-gray-400">PHP 8.1のFiberを使った軽量な並行処理の基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Fiberとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Fiber（PHP 8.1）はコルーチンの実装で、処理を任意の箇所で一時停止・再開できる軽量な並行処理の仕組みです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">Fiber::suspend()</code> - Fiberの処理を一時停止</li>
          <li><code className="text-violet-300">$fiber-&gt;start()</code> - Fiberの実行を開始</li>
          <li><code className="text-violet-300">$fiber-&gt;resume()</code> - 停止したFiberを再開</li>
          <li><code className="text-violet-300">$fiber-&gt;getReturn()</code> - Fiberの戻り値を取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Fiberの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">Fiberは処理を中断してメインコードに制御を戻し、後から再開できます。</p>
        <PhpEditor
          defaultCode={`<?php
// 基本的なFiberの使い方
$fiber = new Fiber(function(): string {
    echo "Fiber: 開始\n";

    $value = Fiber::suspend('最初の一時停止');
    echo "Fiber: 再開 (受け取った値: $value)\n";

    $value2 = Fiber::suspend('2回目の一時停止');
    echo "Fiber: 再開2 (受け取った値: $value2)\n";

    return 'Fiber完了';
});

// Fiberを開始（最初のsuspendまで実行）
$result = $fiber->start();
echo "メイン: Fiberが停止 (受け取った値: $result)\n";

// Fiberを再開（次のsuspendまで実行）
$result = $fiber->resume('値A');
echo "メイン: Fiberが再び停止 (受け取った値: $result)\n";

// Fiberを再開（終了まで実行）
$fiber->resume('値B');
echo "メイン: Fiber終了\n";
echo "戻り値: " . $fiber->getReturn() . "\n";`}
          expectedOutput={`Fiber: 開始
メイン: Fiberが停止 (受け取った値: 最初の一時停止)
Fiber: 再開 (受け取った値: 値A)
メイン: Fiberが再び停止 (受け取った値: 2回目の一時停止)
Fiber: 再開2 (受け取った値: 値B)
メイン: Fiber終了
戻り値: Fiber完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数Fiberの協調処理</h2>
        <p className="text-gray-400 mb-4">複数のFiberを切り替えることで、単一スレッドでの協調マルチタスクを実現できます。</p>
        <PhpEditor
          defaultCode={`<?php
function makeTask(string $name, int $steps): Fiber {
    return new Fiber(function() use ($name, $steps): void {
        for ($i = 1; $i <= $steps; $i++) {
            echo "$name: ステップ $i/$steps\n";
            if ($i < $steps) {
                Fiber::suspend();
            }
        }
        echo "$name: 完了！\n";
    });
}

$tasks = [
    makeTask('タスクA', 3),
    makeTask('タスクB', 2),
    makeTask('タスクC', 4),
];

// 全タスクを開始
foreach ($tasks as $task) {
    $task->start();
}

// ラウンドロビンで実行
$running = true;
while ($running) {
    $running = false;
    foreach ($tasks as $task) {
        if (!$task->isTerminated()) {
            $running = true;
            $task->resume();
        }
    }
}`}
          expectedOutput={`タスクA: ステップ 1/3
タスクB: ステップ 1/2
タスクC: ステップ 1/4
タスクA: ステップ 2/3
タスクB: ステップ 2/2
タスクC: ステップ 2/4
タスクA: ステップ 3/3
タスクB: 完了！
タスクC: ステップ 3/4
タスクA: 完了！
タスクC: ステップ 4/4
タスクC: 完了！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="modern" lessonId="fibers" />
      </div>
      <LessonNav lessons={lessons} currentId="fibers" basePath="/learn/modern" />
    </div>
  );
}
