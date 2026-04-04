import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function AssertionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold">テスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">アサーション</h1>
        <p className="text-gray-400">assertEquals、assertTrueなど主要なPHPUnitアサーションメソッドを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">よく使うアサーション</h2>
        <p className="text-gray-400 leading-relaxed mb-3">PHPUnitの主要なアサーションメソッドです。</p>
        <div className="grid grid-cols-1 gap-1 text-sm text-gray-400">
          <div><code className="text-green-300">assertEquals($e, $a)</code> — 値が等しい（==）</div>
          <div><code className="text-green-300">assertSame($e, $a)</code> — 値と型が等しい（===）</div>
          <div><code className="text-green-300">assertTrue($condition)</code> — trueである</div>
          <div><code className="text-green-300">assertFalse($condition)</code> — falseである</div>
          <div><code className="text-green-300">assertNull($value)</code> — nullである</div>
          <div><code className="text-green-300">assertNotNull($value)</code> — nullでない</div>
          <div><code className="text-green-300">assertCount($n, $array)</code> — 配列の件数</div>
          <div><code className="text-green-300">assertContains($needle, $haystack)</code> — 含む</div>
          <div><code className="text-green-300">assertThrows(ExClass, callable)</code> — 例外を投げる</div>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">各アサーションの使い方</h2>
        <p className="text-gray-400 mb-4">
          様々なアサーションメソッドの使い方を実例で確認します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// PHPUnitアサーションのシミュレーション
function assertEquals(mixed $expected, mixed $actual, string $label): void {
    $pass = $expected == $actual;
    echo "  {$label}: " . ($pass ? "PASS" : "FAIL (expected={$expected}, actual={$actual})") . "\\n";
}

function assertSame(mixed $expected, mixed $actual, string $label): void {
    $pass = $expected === $actual;
    echo "  {$label}: " . ($pass ? "PASS" : "FAIL (型不一致)") . "\\n";
}

function assertCount(int $expected, array $array, string $label): void {
    $actual = count($array);
    $pass = $expected === $actual;
    echo "  {$label}: " . ($pass ? "PASS" : "FAIL (expected={$expected}, actual={$actual})") . "\\n";
}

function assertContains(mixed $needle, array $haystack, string $label): void {
    $pass = in_array($needle, $haystack);
    echo "  {$label}: " . ($pass ? "PASS" : "FAIL") . "\\n";
}

echo "=== assertEquals vs assertSame ===\\n";
assertEquals(5, "5", 'assertEquals(5, "5")');   // 通る（==）
assertSame(5, "5", 'assertSame(5, "5")');        // 失敗（===）
assertSame(5, 5, 'assertSame(5, 5)');            // 通る

echo "\\n=== 配列のアサーション ===\\n";
$fruits = ['apple', 'banana', 'orange'];
assertCount(3, $fruits, 'assertCount(3)');
assertContains('banana', $fruits, 'assertContains("banana")');
assertContains('grape', $fruits, 'assertContains("grape")');`}
          expectedOutput={`=== assertEquals vs assertSame ===\n  assertEquals(5, "5"): PASS\n  assertSame(5, "5"): FAIL (型不一致)\n  assertSame(5, 5): PASS\n\n=== 配列のアサーション ===\n  assertCount(3): PASS\n  assertContains("banana"): PASS\n  assertContains("grape"): FAIL`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外とエラーのアサーション</h2>
        <p className="text-gray-400 mb-4">
          例外が正しく投げられることをテストします。
        </p>
        <PhpEditor
          defaultCode={`<?php
class UserService {
    public function createUser(string $name, string $email): array {
        if (empty($name)) {
            throw new InvalidArgumentException("名前は必須です");
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("無効なメールアドレスです: {$email}");
        }
        return ['id' => rand(1, 100), 'name' => $name, 'email' => $email];
    }
}

// 例外テストのパターン
function testExpectException(string $label, callable $fn, string $expectedClass): void {
    try {
        $fn();
        echo "  {$label}: FAIL（例外なし）\\n";
    } catch (Throwable $e) {
        if ($e instanceof $expectedClass) {
            echo "  {$label}: PASS（{$e->getMessage()}）\\n";
        } else {
            echo "  {$label}: FAIL（" . get_class($e) . "）\\n";
        }
    }
}

$service = new UserService();

echo "=== 例外のテスト ===\\n";
testExpectException(
    "空の名前",
    fn() => $service->createUser("", "test@example.com"),
    InvalidArgumentException::class
);

testExpectException(
    "無効なメール",
    fn() => $service->createUser("田中", "not-an-email"),
    InvalidArgumentException::class
);

// 正常系のテスト
$user = $service->createUser("田中太郎", "tanaka@example.com");
echo "\\n正常系: " . $user['name'] . " (" . $user['email'] . "): PASS\\n";`}
          expectedOutput={`=== 例外のテスト ===\n  空の名前: PASS（名前は必須です）\n  無効なメール: PASS（無効なメールアドレスです: not-an-email）\n\n正常系: 田中太郎 (tanaka@example.com): PASS`}
        />
      </section>
      <LessonCompleteButton lessonId="assertions" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/testing" />
    </div>
  );
}
