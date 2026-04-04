import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPのif文の構文として正しいものはどれですか？",
    options: [
      "if ($x > 0) then { ... }",
      "if ($x > 0) { ... }",
      "if $x > 0 { ... }",
      "if ($x > 0): then ... endif",
    ],
    answer: 1,
    explanation: "PHPのif文は if (条件) { 処理 } という構文です。条件は丸括弧で囲みます。",
  },
  {
    question: "forループで1から5までを出力するコードとして正しいものはどれですか？",
    options: [
      "for ($i = 1; $i <= 5; $i++)",
      "for ($i = 1; $i < 5; $i++)",
      "for ($i = 0; $i <= 5; $i++)",
      "for ($i = 1; $i <= 5; $i--)",
    ],
    answer: 0,
    explanation: "$i = 1で開始し、$i <= 5の条件で5まで、$i++でインクリメントします。",
  },
  {
    question: "foreachループでの$key => $valueの意味は何ですか？",
    options: [
      "キーと値の両方を取得する",
      "値のみを取得する",
      "キーのみを取得する",
      "配列を逆順にする",
    ],
    answer: 0,
    explanation: "foreach ($array as $key => $value) はキーと値の両方を取得する構文です。",
  },
  {
    question: "PHP 8のmatch式の特徴として正しいものはどれですか？",
    options: [
      "fallthrough（フォールスルー）がある",
      "厳密な型比較を行う",
      "breakが必要",
      "switchと全く同じ動作をする",
    ],
    answer: 1,
    explanation: "match式は===による厳密な型比較を行います。switchは==（緩い比較）を使います。またmatch式はフォールスルーがなく、breakも不要です。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPプログラムの流れを制御する構文を学びましょう。条件分岐（if、switch、match）や繰り返し（for、while、foreach）など、プログラミングに欠かせない制御構造を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="green" categoryId="control" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">if</code>文を使って条件に応じた処理を実行します。条件が真（true）の場合のみブロック内のコードが実行されます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$score = 75;\n\nif ($score >= 90) {\n    echo "優秀\\n";\n} elseif ($score >= 70) {\n    echo "良い\\n";\n} elseif ($score >= 50) {\n    echo "普通\\n";\n} else {\n    echo "要努力\\n";\n}`}
          expectedOutput={`良い`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">for</code>ループや<code className="text-green-300">foreach</code>を使って繰り返し処理を実装します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$fruits = ["りんご", "バナナ", "みかん"];\n\nforeach ($fruits as $index => $fruit) {\n    echo ($index + 1) . ". " . $fruit . "\\n";\n}`}
          expectedOutput={`1. りんご\n2. バナナ\n3. みかん`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
