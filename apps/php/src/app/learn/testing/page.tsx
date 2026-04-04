import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPUnitでテストクラスが継承すべき基底クラスはどれですか？",
    options: [
      "PHPUnit\\Framework\\Test",
      "PHPUnit\\Framework\\TestCase",
      "PHPUnit\\Framework\\Assert",
      "PHPUnit\\TestBase",
    ],
    answer: 1,
    explanation: "PHPUnitのテストクラスはPHPUnit\\Framework\\TestCaseを継承します。テストメソッドはtest_で始めるか@testアノテーションを付けます。",
  },
  {
    question: "assertEquals(5, $result)とassertSame(5, $result)の違いは何ですか？",
    options: [
      "まったく同じ動作をする",
      "assertSameは型も含めて厳密に比較する",
      "assertEqualsは数値のみ対応",
      "assertSameは文字列のみ対応",
    ],
    answer: 1,
    explanation: "assertSameは===（型も含めた厳密な比較）を使います。assertEqualsは==（値の比較）を使うため、5と\"5\"は等しいと判断されます。",
  },
  {
    question: "モックオブジェクトの主な用途は何ですか？",
    options: [
      "本番環境のテスト",
      "依存クラスを偽物に差し替えてテストを独立させる",
      "データベースの速度向上",
      "コードを自動生成する",
    ],
    answer: 1,
    explanation: "モックはテスト対象クラスの依存オブジェクトを偽物に差し替え、外部依存なしにテストを独立して実行できるようにします。",
  },
  {
    question: "TDDのサイクルとして正しい順序はどれですか？",
    options: [
      "実装 → テスト → リファクタリング",
      "テスト → 実装 → リファクタリング",
      "リファクタリング → テスト → 実装",
      "テスト → リファクタリング → 実装",
    ],
    answer: 1,
    explanation: "TDD（テスト駆動開発）はRed（失敗するテストを書く）→ Green（テストが通る最小実装）→ Refactor（コードを改善）のサイクルです。",
  },
];

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">テスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPのテスト技術を学びましょう。PHPUnitの基本からアサーション・モック・データプロバイダー・コードカバレッジ・TDD（テスト駆動開発）まで、品質の高いコードを書くためのテスト技法を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="testing" totalLessons={6} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/testing" color="green" categoryId="testing" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PHPUnitの基本的なテスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">TestCase</code>を継承してテストクラスを作り、<code className="text-green-300">assert</code>メソッドで期待値を検証します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// テスト対象クラス
class Calculator {
    public function add(int $a, int $b): int {
        return $a + $b;
    }

    public function divide(int $a, int $b): float {
        if ($b === 0) {
            throw new InvalidArgumentException("0で割ることはできません");
        }
        return $a / $b;
    }
}

// PHPUnitテストの構造（シミュレーション）
function runTests(): void {
    $calc = new Calculator();

    // assertEquals相当のチェック
    $result = $calc->add(3, 5);
    echo "add(3, 5) = {$result}: " . ($result === 8 ? "PASS" : "FAIL") . "\\n";

    $result2 = $calc->divide(10, 2);
    echo "divide(10, 2) = {$result2}: " . ($result2 === 5.0 ? "PASS" : "FAIL") . "\\n";

    // 例外のテスト
    try {
        $calc->divide(5, 0);
        echo "例外テスト: FAIL（例外が発生しなかった）\\n";
    } catch (InvalidArgumentException $e) {
        echo "例外テスト: PASS（{$e->getMessage()}）\\n";
    }
}

runTests();`}
          expectedOutput={`add(3, 5) = 8: PASS\ndivide(10, 2) = 5: PASS\n例外テスト: PASS（0で割ることはできません）`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データプロバイダーのパターン</h2>
        <p className="text-gray-400 mb-4">
          複数のテストケースを配列で定義し、同じテストを繰り返し実行するデータプロバイダーのパターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
function isValidEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// データプロバイダーパターン（PHPUnit @dataProviderの概念）
$testCases = [
    ["valid@example.com", true],
    ["user.name+tag@domain.co.jp", true],
    ["invalid-email", false],
    ["@nodomain.com", false],
    ["no@tld", false],
];

echo "メールバリデーションテスト:\\n";
foreach ($testCases as [$email, $expected]) {
    $result = isValidEmail($email);
    $status = ($result === $expected) ? "PASS" : "FAIL";
    echo "  {$email}: {$status}\\n";
}`}
          expectedOutput={`メールバリデーションテスト:\n  valid@example.com: PASS\n  user.name+tag@domain.co.jp: PASS\n  invalid-email: PASS\n  @nodomain.com: PASS\n  no@tld: PASS`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
