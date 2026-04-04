import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPで変数を宣言するときに使う記号はどれですか？",
    options: ["@", "$", "#", "&"],
    answer: 1,
    explanation: "PHPでは変数名の前に$記号を付けます。例：$name = 'PHP';",
  },
  {
    question: "PHPファイルの開始タグとして正しいものはどれですか？",
    options: ["<php>", "<?php", "<script php>", "<%php"],
    answer: 1,
    explanation: "PHPコードは<?phpタグで始まります。これはPHPパーサーに処理を開始する位置を伝えます。",
  },
  {
    question: "echoとprintの違いとして正しいものはどれですか？",
    options: [
      "echoは複数の引数を取れるが、printは1つのみ",
      "printはechoより高速",
      "echoはHTMLのみ出力できる",
      "printは数値のみ出力できる",
    ],
    answer: 0,
    explanation: "echoはカンマ区切りで複数の値を出力できます。printは1つの引数のみで、戻り値として1を返します。",
  },
  {
    question: "PHPでの定数定義に使うキーワードはどれですか？",
    options: ["var", "let", "const", "static"],
    answer: 2,
    explanation: "PHPではconstキーワードまたはdefine()関数を使って定数を定義します。定数は一度設定すると変更できません。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">PHP基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPプログラミングの基礎を学びましょう。変数、データ型、演算子、入出力など、PHPを書き始めるために必要な基本的な概念を網羅しています。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のPHPプログラム</h2>
        <p className="text-gray-400 mb-4">
          PHPは<code className="text-blue-300">&lt;?php</code>タグで始まります。<code className="text-blue-300">echo</code>を使って画面に文字を出力してみましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\necho "Hello, World!";\necho "\\n";\necho "PHPへようこそ！";`}
          expectedOutput={`Hello, World!\nPHPへようこそ！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数とデータ型</h2>
        <p className="text-gray-400 mb-4">
          PHPでは<code className="text-blue-300">$</code>記号を使って変数を宣言します。型は自動的に判断されます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$name = "田中太郎";\n$age = 25;\n$height = 175.5;\n$isStudent = true;\n\necho "名前: " . $name . "\\n";\necho "年齢: " . $age . "\\n";\necho "身長: " . $height . "cm\\n";\necho "学生: " . ($isStudent ? "はい" : "いいえ");`}
          expectedOutput={`名前: 田中太郎\n年齢: 25\n身長: 175.5cm\n学生: はい`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
