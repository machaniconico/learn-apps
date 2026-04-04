import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コレクション操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SPLデータ構造</h1>
        <p className="text-gray-400">SplStack、SplQueue、SplHeapなどSPLデータ構造を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SPL（Standard PHP Library）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SPLはPHPの標準ライブラリで、データ構造、イテレータ、例外クラスなどを提供します。配列では非効率な操作を専用データ構造で効率化できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">SplStack</code> - LIFO（後入れ先出し）スタック</li>
          <li><code className="text-cyan-300">SplQueue</code> - FIFO（先入れ先出し）キュー</li>
          <li><code className="text-cyan-300">SplMinHeap/SplMaxHeap</code> - 優先度付きヒープ</li>
          <li><code className="text-cyan-300">SplDoublyLinkedList</code> - 双方向連結リスト</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SplStackとSplQueue</h2>
        <p className="text-gray-400 mb-4">スタックはLIFO、キューはFIFOの順序でデータを処理します。それぞれ異なるユースケースに適しています。</p>
        <PhpEditor
          defaultCode={`<?php
// SplStack: LIFO（後入れ先出し）
echo "=== SplStack（LIFO） ===\n";
$stack = new SplStack();
$stack->push('最初');
$stack->push('2番目');
$stack->push('3番目');

echo "サイズ: " . $stack->count() . "\n";
while (!$stack->isEmpty()) {
    echo $stack->pop() . "\n";
}

// SplQueue: FIFO（先入れ先出し）
echo "\n=== SplQueue（FIFO） ===\n";
$queue = new SplQueue();
$queue->enqueue('タスク1');
$queue->enqueue('タスク2');
$queue->enqueue('タスク3');

echo "サイズ: " . $queue->count() . "\n";
while (!$queue->isEmpty()) {
    echo $queue->dequeue() . "\n";
}

// 実用例: 幅優先探索
echo "\n=== BFS（幅優先探索） ===\n";
$graph = [
    'A' => ['B', 'C'],
    'B' => ['D', 'E'],
    'C' => ['F'],
    'D' => [], 'E' => [], 'F' => [],
];

$queue = new SplQueue();
$queue->enqueue('A');
$visited = [];

while (!$queue->isEmpty()) {
    $node = $queue->dequeue();
    if (in_array($node, $visited)) continue;
    $visited[] = $node;
    echo "$node ";
    foreach ($graph[$node] as $neighbor) {
        $queue->enqueue($neighbor);
    }
}
echo "\n";`}
          expectedOutput={`=== SplStack（LIFO） ===
サイズ: 3
3番目
2番目
最初

=== SplQueue（FIFO） ===
サイズ: 3
タスク1
タスク2
タスク3

=== BFS（幅優先探索） ===
A B C D E F `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SplMinHeapとSplMaxHeap</h2>
        <p className="text-gray-400 mb-4">ヒープは常に最小値または最大値を効率的に取り出せる優先度付きデータ構造です。</p>
        <PhpEditor
          defaultCode={`<?php
// SplMinHeap: 最小値を先に取り出す
echo "=== SplMinHeap ===\n";
$heap = new SplMinHeap();
foreach ([5, 2, 8, 1, 9, 3] as $n) {
    $heap->insert($n);
}
while (!$heap->isEmpty()) {
    echo $heap->extract() . " ";
}
echo "\n";

// SplMaxHeap: 最大値を先に取り出す
echo "\n=== SplMaxHeap ===\n";
$heap = new SplMaxHeap();
foreach ([5, 2, 8, 1, 9, 3] as $n) {
    $heap->insert($n);
}
while (!$heap->isEmpty()) {
    echo $heap->extract() . " ";
}
echo "\n";

// 優先度付きキュー（タスクスケジューリング）
echo "\n=== 優先度付きタスク ===\n";
$tasks = new SplMinHeap();
$tasks->insert([1, 'システム更新']);  // 優先度1（最高）
$tasks->insert([3, 'レポート作成']);  // 優先度3（低）
$tasks->insert([2, 'バグ修正']);      // 優先度2（中）
$tasks->insert([1, '障害対応']);      // 優先度1（最高）

while (!$tasks->isEmpty()) {
    [$priority, $name] = $tasks->extract();
    echo "優先度$priority: $name\n";
}`}
          expectedOutput={`=== SplMinHeap ===
1 2 3 5 8 9

=== SplMaxHeap ===
9 8 5 3 2 1

=== 優先度付きタスク ===
優先度1: システム更新
優先度1: 障害対応
優先度2: バグ修正
優先度3: レポート作成`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="spl-data" />
      </div>
      <LessonNav lessons={lessons} currentId="spl-data" basePath="/learn/collections" />
    </div>
  );
}
