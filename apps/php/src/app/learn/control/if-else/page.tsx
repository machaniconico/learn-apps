import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">条件分岐の基本であるif-else文の構文と使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if-else文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          if-else文は条件に応じて異なる処理を実行するための構文です。条件が<code className="text-green-300">true</code>の場合はifブロックが、<code className="text-green-300">false</code>の場合はelseブロックが実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>条件式は丸括弧<code className="text-green-300">( )</code>で囲む</li>
          <li>処理は波括弧<code className="text-green-300">{"{ }"}</code>で囲む（1文でも推奨）</li>
          <li>else節は省略可能</li>
          <li>条件式の結果がtruthyかどうかで判定される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なif-else</h2>
        <p className="text-gray-400 mb-4">条件が真のときにif内の処理が、偽のときにelse内の処理が実行されます。</p>
        <PhpEditor
          defaultCode={`<?php\n$temperature = 28;\n\nif ($temperature >= 30) {\n    echo "今日は暑いですね！\\n";\n} else {\n    echo "今日は過ごしやすいですね。\\n";\n}\n\n$score = 85;\nif ($score >= 60) {\n    echo "合格です！";\n} else {\n    echo "不合格です。再挑戦してください。";\n}`}
          expectedOutput={`今日は過ごしやすいですね。\n合格です！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の条件（複合条件）</h2>
        <p className="text-gray-400 mb-4"><code className="text-green-300">&amp;&amp;</code>（AND）や<code className="text-green-300">||</code>（OR）を使って複数の条件を組み合わせられます。</p>
        <PhpEditor
          defaultCode={`<?php\n$age = 20;\n$hasTicket = true;\n\nif ($age >= 18 && $hasTicket) {\n    echo "入場できます\\n";\n} else {\n    echo "入場できません\\n";\n}\n\n$isWeekend = false;\n$isHoliday = true;\n\nif ($isWeekend || $isHoliday) {\n    echo "今日はお休みです！";\n} else {\n    echo "今日は平日です。";\n}`}
          expectedOutput={`入場できます\n今日はお休みです！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">入れ子のif文</h2>
        <p className="text-gray-400 mb-4">if文の中にif文を書くことができます（ネスト）。ただし深くなりすぎると読みにくくなります。</p>
        <PhpEditor
          defaultCode={`<?php\n$member = true;\n$premium = true;\n\nif ($member) {\n    echo "会員ログイン済み\\n";\n    if ($premium) {\n        echo "プレミアム会員特典が利用できます\\n";\n    } else {\n        echo "通常会員サービスを利用できます\\n";\n    }\n} else {\n    echo "ゲストユーザーです。ログインしてください。";\n}`}
          expectedOutput={`会員ログイン済み\nプレミアム会員特典が利用できます`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
