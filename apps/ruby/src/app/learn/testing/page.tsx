import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "testing")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Minitestのテストクラスが継承すべきクラスはどれですか？",
    options: [
      "Minitest::Base",
      "Minitest::Test",
      "Minitest::Unit",
      "Minitest::Runner",
    ],
    answer: 1,
    explanation: "Minitestのテストクラスはclass TestFoo < Minitest::Testのように継承します。",
  },
  {
    question: "assert_equalの引数の順序として正しいものはどれですか？",
    options: [
      "assert_equal(実際の値, 期待値)",
      "assert_equal(期待値, 実際の値)",
      "順序はどちらでもよい",
      "assert_equal(実際の値)",
    ],
    answer: 1,
    explanation: "assert_equal(expected, actual)の順序が正しいです。期待値を先に書きます。",
  },
  {
    question: "RSpecでexpect(x).to eq(y)が検証することは？",
    options: [
      "xがyより大きいこと",
      "xとyが同じオブジェクトであること",
      "xとyが等しい値であること",
      "xがyのインスタンスであること",
    ],
    answer: 2,
    explanation: "eq(y)はxとyが==で等しいことを検証します。同一オブジェクトはequal()を使います。",
  },
  {
    question: "TDDのサイクルの正しい順序はどれですか？",
    options: [
      "Green → Red → Refactor",
      "Red → Refactor → Green",
      "Red → Green → Refactor",
      "Refactor → Red → Green",
    ],
    answer: 2,
    explanation: "TDDはRed（失敗するテストを書く）→Green（テストを通す）→Refactor（コードを改善する）の順で進めます。",
  },
];

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">テスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyのテスト手法を学びましょう。Minitest・RSpec・モック・スタブ・TDDサイクルまで、
          品質の高いコードを書くためのテスト技術を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="testing" totalLessons={6} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/testing" color="indigo" categoryId="testing" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: Minitestの基本</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class Calculator
  def add(a, b) = a + b
  def multiply(a, b) = a * b
end

class TestCalculator < Minitest::Test
  def setup
    @calc = Calculator.new
  end

  def test_add
    assert_equal 5, @calc.add(2, 3)
    assert_equal 0, @calc.add(-1, 1)
  end

  def test_multiply
    assert_equal 6, @calc.multiply(2, 3)
    assert_equal 0, @calc.multiply(0, 5)
  end

  def test_add_returns_integer
    result = @calc.add(1, 2)
    assert_instance_of Integer, result
  end
end`}
          expectedOutput={`# Running:

...

3 runs, 5 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: アサーションの種類</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class TestAssertions < Minitest::Test
  def test_various_assertions
    # 基本的な等価チェック
    assert_equal "hello", "hello"

    # nilチェック
    assert_nil nil

    # 真偽値チェック
    assert true
    refute false

    # 例外チェック
    assert_raises(ZeroDivisionError) { 1 / 0 }

    # 包含チェック
    assert_includes [1, 2, 3], 2

    puts "All assertions passed!"
  end
end`}
          expectedOutput={`# Running:

.
All assertions passed!

1 runs, 7 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
