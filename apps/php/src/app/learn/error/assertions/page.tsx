import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function AssertionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">アサーション</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">assert()</strong>関数は事前条件・事後条件・不変条件を確認するためのデバッグツールです。
            開発中に想定外の状態を早期に検出できます。PHP 8.0以降ではassert()は常に評価されるため、
            本番環境では条件チェックに例外を使う方が一般的です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">assert()の基本</h2>
        <p className="text-gray-400 mb-4">
          assert()に渡した式がfalseの場合にエラーが発生します。デバッグや契約プログラミングに使います。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction divide(float $a, float $b): float {\n    // 事前条件チェック\n    assert($b !== 0.0, "除数はゼロであってはなりません");\n    return $a / $b;\n}\n\nfunction calculateAverage(array $numbers): float {\n    // 事前条件チェック\n    assert(count($numbers) > 0, "配列は空であってはなりません");\n\n    $sum = array_sum($numbers);\n    $avg = $sum / count($numbers);\n\n    // 事後条件チェック\n    assert(is_float($avg) || is_int($avg), "平均は数値でなければなりません");\n\n    return $avg;\n}\n\necho divide(10, 3) . "\\n";\necho calculateAverage([1, 2, 3, 4, 5]) . "\\n";\necho "アサーション通過";`}
          expectedOutput={`3.3333333333333\n3\nアサーション通過`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">契約プログラミングのパターン</h2>
        <p className="text-gray-400 mb-4">
          関数の事前条件・事後条件・不変条件を明示することで、バグを早期に発見できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass BankAccount {\n    private float $balance;\n\n    public function __construct(float $initialBalance) {\n        assert($initialBalance >= 0, "初期残高は0以上でなければなりません");\n        $this->balance = $initialBalance;\n        $this->checkInvariant();\n    }\n\n    public function deposit(float $amount): void {\n        assert($amount > 0, "入金額は正の値でなければなりません");\n        $oldBalance = $this->balance;\n        $this->balance += $amount;\n        assert($this->balance === $oldBalance + $amount, "残高が正しく更新されていません");\n        $this->checkInvariant();\n    }\n\n    public function getBalance(): float {\n        return $this->balance;\n    }\n\n    private function checkInvariant(): void {\n        assert($this->balance >= 0, "残高が負になっています（不変条件違反）");\n    }\n}\n\n$account = new BankAccount(1000);\n$account->deposit(500);\necho "残高: " . $account->getBalance() . "円\\n";\n$account->deposit(200);\necho "残高: " . $account->getBalance() . "円";`}
          expectedOutput={`残高: 1500円\n残高: 1700円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外を使った防衛的プログラミング</h2>
        <p className="text-gray-400 mb-4">
          本番環境では例外を使った明示的なバリデーションが推奨されます。assertより確実にエラーを処理できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction createUser(string $name, string $email, int $age): array {\n    // バリデーション（例外で明示的に処理）\n    if (empty(trim($name))) {\n        throw new InvalidArgumentException("名前は必須です");\n    }\n    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n        throw new InvalidArgumentException("メールアドレスが無効です: {$email}");\n    }\n    if ($age < 18 || $age > 120) {\n        throw new RangeException("年齢は18〜120の範囲でなければなりません: {$age}");\n    }\n\n    return ['name' => $name, 'email' => $email, 'age' => $age];\n}\n\n$testCases = [\n    ['田中太郎', 'tanaka@example.com', 30],\n    ['', 'test@example.com', 25],\n    ['山田花子', 'invalid-email', 28],\n];\n\nforeach ($testCases as [$name, $email, $age]) {\n    try {\n        $user = createUser($name, $email, $age);\n        echo "作成成功: {$user['name']} ({$user['email']})\\n";\n    } catch (InvalidArgumentException | RangeException $e) {\n        echo "エラー: " . $e->getMessage() . "\\n";\n    }\n}`}
          expectedOutput={`作成成功: 田中太郎 (tanaka@example.com)\nエラー: 名前は必須です\nエラー: メールアドレスが無効です: invalid-email`}
        />
      </section>

      <LessonCompleteButton lessonId="assertions" categoryId="error" />
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/error" />
    </div>
  );
}
