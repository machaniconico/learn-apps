import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileループの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whileループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          whileループは条件が<code className="text-green-300">true</code>である間、処理を繰り返します。繰り返し回数が事前に分からない場合に特に有用です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ループ前に条件を評価する（前判定）</li>
          <li>条件がfalseなら最初からループ内の処理は実行されない</li>
          <li>ループ内で条件を変化させないと無限ループになる</li>
          <li>forループより柔軟な繰り返し条件を書ける</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なwhileループ</h2>
        <p className="text-gray-400 mb-4">カウンタを使ったシンプルなwhileループの例です。</p>
        <PhpEditor
          defaultCode={`<?php\n$count = 1;\n\nwhile ($count <= 5) {\n    echo "カウント: {$count}\\n";\n    $count++;\n}\n\necho "完了！";`}
          expectedOutput={`カウント: 1\nカウント: 2\nカウント: 3\nカウント: 4\nカウント: 5\n完了！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件が変化するwhileループ</h2>
        <p className="text-gray-400 mb-4">繰り返し回数が事前に不明な処理にwhileループが適しています。</p>
        <PhpEditor
          defaultCode={`<?php\n// 2の累乗で1000を超えるまで計算\n$value = 1;\n$step = 0;\n\nwhile ($value < 1000) {\n    $value *= 2;\n    $step++;\n}\n\necho "{$step}回の倍増で{$value}になりました\\n";\n\n// コラッツ予想（27から始める）\n$n = 27;\n$steps = 0;\nwhile ($n !== 1) {\n    $n = ($n % 2 === 0) ? $n / 2 : $n * 3 + 1;\n    $steps++;\n}\necho "27から1になるまで{$steps}ステップ";`}
          expectedOutput={`10回の倍増で1024になりました\n27から1になるまで111ステップ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列処理のwhileループ</h2>
        <p className="text-gray-400 mb-4">文字列を1文字ずつ処理する例です。</p>
        <PhpEditor
          defaultCode={`<?php\n$text = "Hello PHP";\n$length = strlen($text);\n$i = 0;\n$vowels = 0;\n\nwhile ($i < $length) {\n    $char = strtolower($text[$i]);\n    if (in_array($char, ["a", "e", "i", "o", "u"])) {\n        $vowels++;\n    }\n    $i++;\n}\n\necho "文字列: {$text}\\n";\necho "文字数: {$length}\\n";\necho "母音の数: {$vowels}";`}
          expectedOutput={`文字列: Hello PHP\n文字数: 9\n母音の数: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
