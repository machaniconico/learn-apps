import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function FormattingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列フォーマット</h1>
        <p className="text-gray-400 leading-relaxed">
          <code className="text-yellow-300">sprintf</code>・<code className="text-yellow-300">printf</code>・<code className="text-yellow-300">number_format</code>などを使って数値や文字列を見やすく整形する方法を学びます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-400 mb-3">sprintf のフォーマット指定子</h2>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-yellow-300">%s</code>: 文字列</li>
          <li><code className="text-yellow-300">%d</code>: 整数（10進数）</li>
          <li><code className="text-yellow-300">%f</code>: 浮動小数点数</li>
          <li><code className="text-yellow-300">%05d</code>: 5桁ゼロ埋め整数</li>
          <li><code className="text-yellow-300">%.2f</code>: 小数点以下2桁</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">sprintfの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">sprintf</code>はフォーマット文字列に値を埋め込んだ文字列を返します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$name  = "佐藤";\n$score = 92.5;\n$rank  = 3;\n\n$result = sprintf("氏名: %s, スコア: %.1f点, 順位: %d位", $name, $score, $rank);\necho $result . "\\n";\n\n// ゼロ埋め\nfor ($i = 1; $i <= 5; $i++) {\n    echo sprintf("ファイル%03d.txt\\n", $i);\n}`}
          expectedOutput={`氏名: 佐藤, スコア: 92.5点, 順位: 3位\nファイル001.txt\nファイル002.txt\nファイル003.txt\nファイル004.txt\nファイル005.txt`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">number_formatで数値を整形</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">number_format</code>は数値に桁区切りや小数点を追加して読みやすくします。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$price    = 1234567.89;\n$tax      = $price * 0.1;\n$total    = $price + $tax;\n\necho "本体価格: " . number_format($price, 0, ".", ",") . "円\\n";\necho "消費税:   " . number_format($tax, 2, ".", ",") . "円\\n";\necho "合計:     " . number_format($total, 0, ".", ",") . "円\\n";\n\n// 通貨表示\n$usd = 99.9;\necho "USD: $" . number_format($usd, 2);`}
          expectedOutput={`本体価格: 1,234,568円\n消費税:   123,456.79円\n合計:     1,358,025円\nUSD: $99.90`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">日付と時刻のフォーマット</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">date()</code>関数でタイムスタンプを書式化して表示します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$timestamp = mktime(14, 30, 0, 3, 15, 2024);\n\necho date("Y年m月d日", $timestamp) . "\\n";\necho date("Y/m/d H:i:s", $timestamp) . "\\n";\necho date("D, d M Y", $timestamp) . "\\n";\n\n// sprintf で複合フォーマット\n$year  = 2024;\n$month = 3;\n$day   = 15;\n$formatted = sprintf("%04d-%02d-%02d", $year, $month, $day);\necho $formatted;`}
          expectedOutput={`2024年03月15日\n2024/03/15 14:30:00\nFri, 15 Mar 2024\n2024-03-15`}
        />
      </section>

      <LessonCompleteButton categoryId="strings" lessonId="formatting" />
      <LessonNav lessons={lessons} currentId="formatting" basePath="/learn/strings" />
    </div>
  );
}
