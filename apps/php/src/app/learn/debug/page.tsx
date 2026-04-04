import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

const quizQuestions: QuizQuestion[] = [
  {
    question: "変数の型と値を詳細に表示するPHP関数はどれですか？",
    options: ["print_r()", "echo()", "var_dump()", "display()"],
    answer: 2,
    explanation: "var_dump()は変数の型、値、構造を詳細に表示します。配列やオブジェクトのネスト構造も確認できます。",
  },
  {
    question: "PHPのエラーログにメッセージを書き込む関数はどれですか？",
    options: ["log_error()", "write_log()", "error_log()", "debug_log()"],
    answer: 2,
    explanation: "error_log()はPHPのエラーログや指定したファイルにメッセージを書き込む関数です。",
  },
  {
    question: "Xdebugの主な機能に含まれないものはどれですか？",
    options: ["ステップ実行", "変数ウォッチ", "コードカバレッジ", "自動コード修正"],
    answer: 3,
    explanation: "Xdebugはデバッグ、プロファイリング、コードカバレッジを提供しますが、自動コード修正は行いません。",
  },
  {
    question: "スタックトレースで確認できる情報はどれですか？",
    options: [
      "メモリ使用量",
      "関数呼び出しの順序とファイル・行番号",
      "データベースのクエリ",
      "HTTPリクエストのヘッダー",
    ],
    answer: 1,
    explanation: "スタックトレースはエラーが発生するまでの関数呼び出しの順序、ファイル名、行番号を表示します。",
  },
];

export default function DebugPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">デバッグ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPアプリケーションのデバッグ技術を学びます。var_dump、Xdebug、ログ出力、プロファイリング、エラー追跡など、バグを効率的に発見・修正するための実践的なスキルを身につけます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="debug" totalLessons={5} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/debug" color="orange" categoryId="debug" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグ出力関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">var_dump()</code>、<code className="text-orange-300">print_r()</code>、<code className="text-orange-300">var_export()</code>の違いを理解しましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php
$data = [
    'name' => '田中太郎',
    'age' => 30,
    'scores' => [85, 92, 78],
    'active' => true,
];

// var_dump: 型情報も表示
echo "=== var_dump ===\n";
var_dump($data['age']);
var_dump($data['active']);

// print_r: 読みやすい形式
echo "\n=== print_r ===\n";
print_r($data['scores']);

// var_export: PHPコードとして出力
echo "\n=== var_export ===\n";
var_export(['a' => 1, 'b' => 2]);
echo "\n";`}
          expectedOutput={`=== var_dump ===
int(30)
bool(true)

=== print_r ===
Array
(
    [0] => 85
    [1] => 92
    [2] => 78
)

=== var_export ===
array (
  'a' => 1,
  'b' => 2,
)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーハンドリングとログ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">try-catch</code>と<code className="text-orange-300">error_log()</code>を組み合わせてエラーを適切に記録します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// カスタムエラーハンドラー
function debugLog(string $level, string $message, array $context = []): void {
    $timestamp = date('Y-m-d H:i:s');
    $contextStr = empty($context) ? '' : ' ' . json_encode($context);
    echo "[$timestamp] [$level] $message$contextStr\n";
}

// 使用例
debugLog('INFO', 'アプリケーション起動');
debugLog('DEBUG', 'ユーザー取得', ['id' => 42]);

try {
    $result = 10 / 0;
} catch (\DivisionByZeroError $e) {
    debugLog('ERROR', 'ゼロ除算エラー', ['message' => $e->getMessage()]);
}

debugLog('INFO', '処理完了');`}
          expectedOutput={`[2024-01-01 00:00:00] [INFO] アプリケーション起動
[2024-01-01 00:00:00] [DEBUG] ユーザー取得 {"id":42}
[2024-01-01 00:00:00] [ERROR] ゼロ除算エラー {"message":"Division by zero"}
[2024-01-01 00:00:00] [INFO] 処理完了`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
