import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPで正規表現によるマッチングに使う関数はどれですか？",
    options: ["regex_match()", "preg_match()", "str_match()", "match_pattern()"],
    answer: 1,
    explanation: "preg_match()はPCRE（Perl互換正規表現）を使ってパターンマッチングを行うPHPの標準関数です。",
  },
  {
    question: "正規表現で「0回以上の繰り返し」を表す量指定子はどれですか？",
    options: ["+", "?", "*", "{0}"],
    answer: 2,
    explanation: "*は直前の要素の0回以上の繰り返しを表します。+は1回以上、?は0回または1回です。",
  },
  {
    question: "正規表現のキャプチャグループを表す構文はどれですか？",
    options: ["[...]", "{...}", "(...)", "<...>"],
    answer: 2,
    explanation: "(...)で囲まれた部分がキャプチャグループになり、マッチした内容を後から参照できます。",
  },
  {
    question: "preg_replace_callback()の特徴はどれですか？",
    options: [
      "マッチした文字列を固定の文字列に置換する",
      "マッチした文字列をコールバック関数で動的に置換する",
      "すべての文字列を削除する",
      "正規表現を文字列に変換する",
    ],
    answer: 1,
    explanation: "preg_replace_callback()はマッチした部分にコールバック関数を適用し、動的な置換処理ができます。",
  },
];

export default function RegexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">正規表現</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPの正規表現（PCRE）を基礎から実践まで学びます。パターンマッチング、置換、先読み・後読みアサーション、メール・URL・電話番号など実用的なパターンを習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="regex" totalLessons={5} color="yellow" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/regex" color="yellow" categoryId="regex" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なパターンマッチング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">preg_match()</code>でパターンに一致するか確認し、<code className="text-yellow-300">preg_match_all()</code>で全マッチを取得します。
        </p>
        <PhpEditor
          defaultCode={`<?php
$text = "PHPは1994年に作られ、PHP 8.3は2023年にリリースされました。";

// 数字のマッチング
preg_match_all('/\d+/', $text, $matches);
echo "数字: " . implode(', ', $matches[0]) . "\n";

// メールアドレスのバリデーション
$emails = ['user@example.com', 'invalid-email', 'test@domain.co.jp'];
foreach ($emails as $email) {
    $valid = preg_match('/^[\w.+-]+@[\w-]+\.[\w.]+$/', $email);
    echo "$email: " . ($valid ? "有効" : "無効") . "\n";
}`}
          expectedOutput={`数字: 1994, 8, 3, 2023
user@example.com: 有効
invalid-email: 無効
test@domain.co.jp: 有効`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パターンによる置換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">preg_replace()</code>でパターンに一致する部分を置換し、<code className="text-yellow-300">preg_replace_callback()</code>で動的な置換ができます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 基本的な置換
$text = "今日は2024-01-15です。明日は2024-01-16です。";
$result = preg_replace('/(\d{4})-(\d{2})-(\d{2})/', '$1年$2月$3日', $text);
echo $result . "\n";

// コールバックによる動的置換
$prices = "りんご: 100円, みかん: 80円, ぶどう: 250円";
$result = preg_replace_callback('/(\d+)円/', function($matches) {
    $taxed = (int)$matches[1] * 1.1;
    return round($taxed) . "円(税込)";
}, $prices);
echo $result . "\n";`}
          expectedOutput={`今日は2024年01月15日です。明日は2024年01月16日です。
りんご: 110円(税込), みかん: 88円(税込), ぶどう: 275円(税込)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
