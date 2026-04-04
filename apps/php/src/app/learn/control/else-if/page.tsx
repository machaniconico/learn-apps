import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">elseif</h1>
        <p className="text-gray-400">複数条件を扱うelseifチェーンの書き方と活用方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">elseifとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">elseif</code>（または<code className="text-green-300">else if</code>）は複数の条件を順番にチェックするための構文です。最初に真になった条件のブロックだけが実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>条件は上から順番に評価される</li>
          <li>最初にtrueになった条件のブロックのみ実行</li>
          <li><code className="text-green-300">elseif</code>（1語）と<code className="text-green-300">else if</code>（2語）はどちらも使える</li>
          <li>最後のelseは省略可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">成績判定のelseifチェーン</h2>
        <p className="text-gray-400 mb-4">複数の条件範囲をelseifで処理します。条件は上から順に評価されます。</p>
        <PhpEditor
          defaultCode={`<?php\n$score = 72;\n\nif ($score >= 90) {\n    $grade = "A";\n    $comment = "優秀";\n} elseif ($score >= 80) {\n    $grade = "B";\n    $comment = "良い";\n} elseif ($score >= 70) {\n    $grade = "C";\n    $comment = "普通";\n} elseif ($score >= 60) {\n    $grade = "D";\n    $comment = "やや不足";\n} else {\n    $grade = "F";\n    $comment = "不合格";\n}\n\necho "スコア: {$score}点\\n";\necho "評価: {$grade} ({$comment})";`}
          expectedOutput={`スコア: 72点\n評価: C (普通)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">時間帯による挨拶</h2>
        <p className="text-gray-400 mb-4">現在の時間帯に応じて異なる挨拶を表示する例です。</p>
        <PhpEditor
          defaultCode={`<?php\n$hour = 14; // 14時（午後2時）\n\nif ($hour >= 5 && $hour < 10) {\n    $greeting = "おはようございます！";\n} elseif ($hour >= 10 && $hour < 17) {\n    $greeting = "こんにちは！";\n} elseif ($hour >= 17 && $hour < 21) {\n    $greeting = "こんばんは！";\n} else {\n    $greeting = "夜遅いですね。お疲れ様です！";\n}\n\necho "{$hour}時: {$greeting}";`}
          expectedOutput={`14時: こんにちは！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BMI判定</h2>
        <p className="text-gray-400 mb-4">複数の数値範囲をelseifで判定する実践例です。</p>
        <PhpEditor
          defaultCode={`<?php\n$weight = 65; // kg\n$height = 1.70; // m\n\n$bmi = $weight / ($height ** 2);\n$bmi = round($bmi, 1);\n\nif ($bmi < 18.5) {\n    $category = "低体重";\n} elseif ($bmi < 25.0) {\n    $category = "普通体重";\n} elseif ($bmi < 30.0) {\n    $category = "肥満（1度）";\n} else {\n    $category = "肥満（2度以上）";\n}\n\necho "BMI: {$bmi}\\n";\necho "判定: {$category}";`}
          expectedOutput={`BMI: 22.5\n判定: 普通体重`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
