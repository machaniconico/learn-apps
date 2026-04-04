import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPでシングルクォートとダブルクォートの違いはどれですか？",
    options: [
      "ダブルクォートは変数展開とエスケープシーケンスを処理する",
      "シングルクォートは変数展開を処理する",
      "どちらも全く同じ動作をする",
      "ダブルクォートは数値のみ使用できる",
    ],
    answer: 0,
    explanation: "ダブルクォートでは \"$name\" や \"\\n\" のような変数展開・エスケープが処理されます。シングルクォートは文字通りの文字列です。",
  },
  {
    question: "文字列の長さを取得する関数はどれですか？",
    options: [
      "strlen()",
      "strsize()",
      "count()",
      "length()",
    ],
    answer: 0,
    explanation: "strlen() が文字列のバイト数を返します。マルチバイト文字には mb_strlen() を使います。",
  },
  {
    question: "str_replace('a', 'b', $str) の動作として正しいものはどれですか？",
    options: [
      "$str の中の 'b' を 'a' に置換する",
      "$str の中の 'a' を 'b' に置換する",
      "$str から 'a' を削除する",
      "最初の 'a' だけを 'b' に置換する",
    ],
    answer: 1,
    explanation: "str_replace(検索文字, 置換文字, 対象文字列) の順です。$str内の全ての 'a' が 'b' に置換されます。",
  },
  {
    question: "ヒアドキュメント（Heredoc）の特徴として正しいものはどれですか？",
    options: [
      "変数展開を行わない",
      "複数行の文字列を書けて変数展開も行う",
      "シングルクォートと同じ動作をする",
      "HTMLタグを使えない",
    ],
    answer: 1,
    explanation: "ヒアドキュメントは <<<EOT から EOT; で囲まれた複数行文字列で、ダブルクォートと同様に変数展開が行われます。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPの文字列操作を徹底的に学びましょう。基本操作から豊富な組み込み関数、正規表現、ヒアドキュメント、マルチバイト文字の扱いまでをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="yellow" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="yellow" categoryId="strings" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本</h2>
        <p className="text-gray-400 mb-4">
          PHPの文字列はシングルクォート・ダブルクォートで定義できます。ダブルクォートでは変数展開が使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$name = "山田太郎";\n$age = 30;\n\n// ダブルクォート: 変数展開あり\necho "名前: $name、年齢: {$age}歳\\n";\n\n// 文字列連結\necho "こんにちは、" . $name . "さん！\\n";\n\n// strlen と mb_strlen\n$str = "PHP";\necho "長さ: " . strlen($str);`}
          expectedOutput={`名前: 山田太郎、年齢: 30歳\nこんにちは、山田太郎さん！\n長さ: 3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">便利な文字列関数</h2>
        <p className="text-gray-400 mb-4">
          PHPには<code className="text-yellow-300">strtoupper</code>、<code className="text-yellow-300">str_replace</code>、<code className="text-yellow-300">substr</code>など多彩な文字列操作関数が揃っています。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$text = "Hello, PHP World!";\n\necho strtoupper($text) . "\\n";\necho strtolower($text) . "\\n";\necho str_replace("PHP", "Modern PHP", $text) . "\\n";\necho substr($text, 7, 3) . "\\n";\necho str_contains($text, "PHP") ? "PHPを含む" : "含まない";`}
          expectedOutput={`HELLO, PHP WORLD!\nhello, php world!\nHello, Modern PHP World!\nPHP\nPHPを含む`}
        />
      </section>
      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
