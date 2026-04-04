import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">do-whileループ</h1>
        <p className="text-gray-400">少なくとも一度は実行されるdo-whileループの構文を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-whileループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          do-whileループは処理を先に実行し、その後で条件を評価します。そのため条件がfalseでも、必ず最低1回は処理が実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>処理を先に実行してから条件を評価する（後判定）</li>
          <li>条件がfalseでも最低1回は実行される</li>
          <li>最後のwhile条件の後にセミコロン<code className="text-green-300">;</code>が必要</li>
          <li>入力検証やメニュー処理に向いている</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">whileとdo-whileの違い</h2>
        <p className="text-gray-400 mb-4">条件が最初からfalseの場合、whileはループ内を実行しませんが、do-whileは1回実行します。</p>
        <PhpEditor
          defaultCode={`<?php\n$i = 10; // 条件は最初からfalse\n\n// whileループ: 一度も実行されない\necho "while:";  \nwhile ($i < 5) {\n    echo " {$i}";\n    $i++;\n}\necho " (実行なし)\\n";\n\n$j = 10;\n// do-whileループ: 必ず1回実行される\necho "do-while:";\ndo {\n    echo " {$j}";\n    $j++;\n} while ($j < 5);\necho " (1回実行)";`}
          expectedOutput={`while: (実行なし)\ndo-while: 10 (1回実行)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">do-whileでメニュー処理</h2>
        <p className="text-gray-400 mb-4">メニュー選択や入力検証など「少なくとも1回は実行する」処理に適しています。</p>
        <PhpEditor
          defaultCode={`<?php\n// 有効な選択肢が来るまで繰り返す（シミュレーション）\n$choices = [3, 7, 2]; // 入力シミュレーション\n$index = 0;\n\ndo {\n    $choice = $choices[$index++];\n    echo "選択: {$choice}\\n";\n    \n    if ($choice < 1 || $choice > 5) {\n        echo "1〜5の数字を入力してください\\n";\n    }\n} while ($choice < 1 || $choice > 5);\n\necho "有効な選択: {$choice}";`}
          expectedOutput={`選択: 3\n有効な選択: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値当てゲームのシミュレーション</h2>
        <p className="text-gray-400 mb-4">do-whileを使って、正解するまで繰り返すゲームのロジックを実装します。</p>
        <PhpEditor
          defaultCode={`<?php\n$secret = 42;\n$guesses = [10, 55, 42]; // 推測の順番\n$attempt = 0;\n\ndo {\n    $guess = $guesses[$attempt];\n    $attempt++;\n    \n    if ($guess < $secret) {\n        echo "試行{$attempt}: {$guess} → もっと大きい\\n";\n    } elseif ($guess > $secret) {\n        echo "試行{$attempt}: {$guess} → もっと小さい\\n";\n    } else {\n        echo "試行{$attempt}: {$guess} → 正解！\\n";\n    }\n} while ($guess !== $secret);\n\necho "{$attempt}回で当てました！";`}
          expectedOutput={`試行1: 10 → もっと大きい\n試行2: 55 → もっと小さい\n試行3: 42 → 正解！\n3回で当てました！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="do-while" />
      </div>
      <LessonNav lessons={lessons} currentId="do-while" basePath="/learn/control" />
    </div>
  );
}
