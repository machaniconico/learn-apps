import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループを中断するbreakとスキップするcontinueを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">breakとcontinueとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ループの実行を制御するための文です。<code className="text-green-300">break</code>はループを完全に終了し、<code className="text-green-300">continue</code>は現在の繰り返しをスキップして次の繰り返しに進みます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">break</code>: ループ全体を終了（switch文でも使用）</li>
          <li><code className="text-green-300">continue</code>: 現在の繰り返しをスキップして次へ</li>
          <li><code className="text-green-300">break 2</code>: 数値指定でネストしたループを複数抜けられる</li>
          <li>for、while、foreach、do-whileすべてで使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">breakでループを終了</h2>
        <p className="text-gray-400 mb-4">条件に一致したらループを終了します。配列から値を検索する場合などに使います。</p>
        <PhpEditor
          defaultCode={`<?php\n$numbers = [3, 7, 2, 9, 4, 6, 1, 8];\n$target = 9;\n$found = false;\n\nforeach ($numbers as $index => $num) {\n    echo "チェック中: {$num}\\n";\n    if ($num === $target) {\n        $found = true;\n        echo "{$target}を{$index}番目に発見！\\n";\n        break; // 見つかったのでループ終了\n    }\n}\n\nif (!$found) {\n    echo "{$target}は見つかりませんでした";\n}`}
          expectedOutput={`チェック中: 3\nチェック中: 7\nチェック中: 2\nチェック中: 9\n9を3番目に発見！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">continueで繰り返しをスキップ</h2>
        <p className="text-gray-400 mb-4">特定の条件の要素をスキップして処理を続けます。</p>
        <PhpEditor
          defaultCode={`<?php\n// 偶数のみ出力（奇数をスキップ）\necho "偶数: ";\nfor ($i = 1; $i <= 10; $i++) {\n    if ($i % 2 !== 0) {\n        continue; // 奇数はスキップ\n    }\n    echo $i . " ";\n}\necho "\\n";\n\n// 負の数をスキップして合計\n$values = [5, -3, 8, -1, 4, -2, 7];\n$sum = 0;\nforeach ($values as $v) {\n    if ($v < 0) continue;\n    $sum += $v;\n}\necho "正の数の合計: {$sum}";`}
          expectedOutput={`偶数: 2 4 6 8 10 \n正の数の合計: 24`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたループでのbreak 2</h2>
        <p className="text-gray-400 mb-4"><code className="text-green-300">break 2</code>で内側と外側のループを一度に抜けられます。</p>
        <PhpEditor
          defaultCode={`<?php\n$matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n];\n$target = 5;\n$found = false;\n\nforeach ($matrix as $row => $cols) {\n    foreach ($cols as $col => $val) {\n        if ($val === $target) {\n            echo "{$target}は[{$row}][{$col}]にあります\\n";\n            $found = true;\n            break 2; // 両方のループを終了\n        }\n    }\n}\n\necho $found ? "検索完了" : "見つかりません";`}
          expectedOutput={`5は[1][1]にあります\n検索完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
