import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コレクション操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネレータ</h1>
        <p className="text-gray-400">yieldキーワードを使った遅延評価のジェネレータ関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネレータとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネレータ関数はyieldキーワードを含む特殊な関数で、呼び出すとGeneratorオブジェクトを返します。値を一つずつ遅延生成するため、大量データの処理でメモリを節約できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">yield 値</code> - 値を生成して一時停止</li>
          <li><code className="text-cyan-300">yield キー =&gt; 値</code> - キー付きで生成</li>
          <li><code className="text-cyan-300">yield from</code> - 別のジェネレータに委譲</li>
          <li>通常の配列より大幅にメモリ使用量を削減</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネレータの基本</h2>
        <p className="text-gray-400 mb-4">yieldを使うと、関数が値を一つずつ生成する遅延評価が可能になります。</p>
        <PhpEditor
          defaultCode={`<?php
// 基本的なジェネレータ
function countdown(int $from): Generator {
    while ($from > 0) {
        yield $from;
        $from--;
    }
    yield '発射！';
}

foreach (countdown(5) as $value) {
    echo "$value\n";
}

echo "\n";

// キー付きyield
function indexedColors(): Generator {
    yield 'red' => '赤';
    yield 'green' => '緑';
    yield 'blue' => '青';
}

foreach (indexedColors() as $key => $label) {
    echo "$key: $label\n";
}

echo "\n";

// yield fromによる委譲
function inner(): Generator {
    yield 1;
    yield 2;
    return '内部完了';
}

function outer(): Generator {
    yield 0;
    $result = yield from inner();
    echo "inner戻り値: $result\n";
    yield 3;
}

foreach (outer() as $val) {
    echo "$val\n";
}`}
          expectedOutput={`5
4
3
2
1
発射！

red: 赤
green: 緑
blue: 青

0
1
2
inner戻り値: 内部完了
3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネレータによる大量データ処理</h2>
        <p className="text-gray-400 mb-4">ジェネレータを使うと、大きなファイルや無限シーケンスもメモリ効率よく処理できます。</p>
        <PhpEditor
          defaultCode={`<?php
// 大量データのストリーム処理
function generateLargeData(int $count): Generator {
    for ($i = 1; $i <= $count; $i++) {
        yield [
            'id' => $i,
            'value' => $i * $i,
            'label' => "item_$i",
        ];
    }
}

// パイプライン処理（ジェネレータチェーン）
function filterEven(Generator $source): Generator {
    foreach ($source as $item) {
        if ($item['id'] % 2 === 0) {
            yield $item;
        }
    }
}

function takeFirst(Generator $source, int $n): Generator {
    $count = 0;
    foreach ($source as $item) {
        if ($count >= $n) break;
        yield $item;
        $count++;
    }
}

// 1000件のデータから偶数IDのものを最初の5件だけ処理
$pipeline = takeFirst(filterEven(generateLargeData(1000)), 5);

foreach ($pipeline as $item) {
    echo "ID={$item['id']}: {$item['value']} ({$item['label']})\n";
}

echo "\nメモリ使用量: " . number_format(memory_get_usage()) . " bytes\n";`}
          expectedOutput={`ID=2: 4 (item_2)
ID=4: 16 (item_4)
ID=6: 36 (item_6)
ID=8: 64 (item_8)
ID=10: 100 (item_10)

メモリ使用量: 524288 bytes`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="generators" />
      </div>
      <LessonNav lessons={lessons} currentId="generators" basePath="/learn/collections" />
    </div>
  );
}
