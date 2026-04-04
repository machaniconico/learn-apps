import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">カウンタを使った繰り返し処理のforループを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">forループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          forループは回数が決まった繰り返し処理に使います。<code className="text-green-300">for (初期化; 条件; 更新)</code>の3つの部分で構成されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>初期化: ループ開始時に一度だけ実行（例: <code className="text-green-300">$i = 0</code>）</li>
          <li>条件: 各ループ前にチェック、trueの間ループ継続（例: <code className="text-green-300">$i &lt; 10</code>）</li>
          <li>更新: 各ループ後に実行（例: <code className="text-green-300">$i++</code>）</li>
          <li>3つの部分はすべて省略可能（無限ループに注意）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なforループ</h2>
        <p className="text-gray-400 mb-4">1から5まで数えてみましょう。<code className="text-green-300">$i</code>がカウンタ変数です。</p>
        <PhpEditor
          defaultCode={`<?php\n// 1から5まで出力\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i . "\\n";\n}\n\necho "---\\n";\n\n// 5から1まで逆順\nfor ($i = 5; $i >= 1; $i--) {\n    echo $i . "\\n";\n}`}
          expectedOutput={`1\n2\n3\n4\n5\n---\n5\n4\n3\n2\n1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">forループで合計・九九</h2>
        <p className="text-gray-400 mb-4">ループを使った数値計算と、ネストしたforループで九九を作ります。</p>
        <PhpEditor
          defaultCode={`<?php\n// 1から10の合計\n$sum = 0;\nfor ($i = 1; $i <= 10; $i++) {\n    $sum += $i;\n}\necho "1〜10の合計: {$sum}\\n\\n";\n\n// 九九（3の段のみ）\necho "3の段:\\n";\nfor ($i = 1; $i <= 9; $i++) {\n    echo "3 × {$i} = " . (3 * $i) . "\\n";\n}`}
          expectedOutput={`1〜10の合計: 55\n\n3の段:\n3 × 1 = 3\n3 × 2 = 6\n3 × 3 = 9\n3 × 4 = 12\n3 × 5 = 15\n3 × 6 = 18\n3 × 7 = 21\n3 × 8 = 24\n3 × 9 = 27`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列をforループで処理</h2>
        <p className="text-gray-400 mb-4">配列のインデックスをforループで操作することもできます。</p>
        <PhpEditor
          defaultCode={`<?php\n$fruits = ["りんご", "バナナ", "みかん", "ぶどう", "いちご"];\n$count = count($fruits);\n\nfor ($i = 0; $i < $count; $i++) {\n    echo ($i + 1) . "番目: " . $fruits[$i] . "\\n";\n}\n\necho "\\n合計: {$count}種類";`}
          expectedOutput={`1番目: りんご\n2番目: バナナ\n3番目: みかん\n4番目: ぶどう\n5番目: いちご\n\n合計: 5種類`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
