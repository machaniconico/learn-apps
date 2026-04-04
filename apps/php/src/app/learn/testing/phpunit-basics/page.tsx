import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function PhpunitBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold">テスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">PHPUnit基礎</h1>
        <p className="text-gray-400">PHPUnitのインストールとテストクラスの基本的な書き方を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">PHPUnitとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          PHPUnitはPHPの標準的なユニットテストフレームワークです。
          コードの各部分が期待通りに動作することを自動的に検証します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-green-300">composer require --dev phpunit/phpunit</code> でインストール</li>
          <li>• テストクラスは<code className="text-green-300">TestCase</code>を継承する</li>
          <li>• テストメソッドは<code className="text-green-300">test</code>で始めるか<code className="text-green-300">#[Test]</code>属性を付ける</li>
          <li>• <code className="text-green-300">./vendor/bin/phpunit</code>でテストを実行</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">最初のテストクラス</h2>
        <p className="text-gray-400 mb-4">
          シンプルなテスト対象クラスとテストクラスの基本構造です。
        </p>
        <PhpEditor
          defaultCode={`<?php
// テスト対象クラス（src/StringHelper.php）
class StringHelper {
    public function capitalize(string $str): string {
        return ucfirst(strtolower($str));
    }

    public function truncate(string $str, int $length, string $suffix = '...'): string {
        if (mb_strlen($str) <= $length) {
            return $str;
        }
        return mb_substr($str, 0, $length) . $suffix;
    }

    public function isPalindrome(string $str): bool {
        $clean = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $str));
        return $clean === strrev($clean);
    }
}

// テストクラスのシミュレーション
// 実際はPHPUnit\\Framework\\TestCaseを継承
class StringHelperTest {
    private StringHelper $helper;

    public function setUp(): void {
        $this->helper = new StringHelper();
    }

    public function testCapitalize(): void {
        $result = $this->helper->capitalize('HELLO WORLD');
        assert($result === 'Hello world', "capitalize失敗: {$result}");
        echo "testCapitalize: PASS\\n";
    }

    public function testTruncate(): void {
        $result = $this->helper->truncate('Hello World', 5);
        assert($result === 'Hello...', "truncate失敗: {$result}");
        echo "testTruncate: PASS\\n";
    }

    public function testIsPalindrome(): void {
        assert($this->helper->isPalindrome('racecar') === true);
        assert($this->helper->isPalindrome('hello') === false);
        echo "testIsPalindrome: PASS\\n";
    }
}

$test = new StringHelperTest();
$test->setUp();
$test->testCapitalize();
$test->testTruncate();
$test->testIsPalindrome();
echo "\\n全テスト完了\\n";`}
          expectedOutput={`testCapitalize: PASS\ntestTruncate: PASS\ntestIsPalindrome: PASS\n\n全テスト完了`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">テストの構造（Arrange-Act-Assert）</h2>
        <p className="text-gray-400 mb-4">
          テストはAAA（準備・実行・検証）パターンで書くと読みやすくなります。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Calculator {
    public function add(float $a, float $b): float { return $a + $b; }
    public function subtract(float $a, float $b): float { return $a - $b; }
    public function multiply(float $a, float $b): float { return $a * $b; }
    public function divide(float $a, float $b): float {
        if ($b == 0) throw new DivisionByZeroError("0除算");
        return $a / $b;
    }
}

// AAA（Arrange-Act-Assert）パターン
function testAdd(): void {
    // Arrange（準備）
    $calc = new Calculator();
    $a = 10;
    $b = 5;

    // Act（実行）
    $result = $calc->add($a, $b);

    // Assert（検証）
    assert($result === 15.0, "期待: 15, 実際: {$result}");
    echo "testAdd(10, 5) = {$result}: PASS\\n";
}

function testDivideByZero(): void {
    $calc = new Calculator();
    try {
        $calc->divide(10, 0);
        echo "testDivideByZero: FAIL（例外なし）\\n";
    } catch (DivisionByZeroError $e) {
        echo "testDivideByZero: PASS（{$e->getMessage()}）\\n";
    }
}

testAdd();
testDivideByZero();`}
          expectedOutput={`testAdd(10, 5) = 15: PASS\ntestDivideByZero: PASS（0除算）`}
        />
      </section>
      <LessonCompleteButton lessonId="phpunit-basics" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="phpunit-basics" basePath="/learn/testing" />
    </div>
  );
}
