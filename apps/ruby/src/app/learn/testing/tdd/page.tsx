import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function TddPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テスト駆動開発</h1>
        <p className="text-gray-400">Red→Green→RefactorのTDDサイクルを使った開発手法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TDDとは</h2>
        <p className="text-gray-300 mb-3">
          TDD（テスト駆動開発）はテストを先に書いてからプロダクションコードを書く開発手法です。
          小さなサイクルを繰り返すことで品質の高いコードを段階的に作り上げます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><strong className="text-red-400">Red</strong> — まず失敗するテストを書く</li>
          <li><strong className="text-green-400">Green</strong> — テストを通す最小限のコードを書く</li>
          <li><strong className="text-blue-400">Refactor</strong> — テストを維持しながらコードを改善する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: TDDでFizzBuzzを実装</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

# Step 1 (Red): テストを先に書く
# Step 2 (Green): テストを通す実装を書く
# Step 3 (Refactor): きれいにする

class FizzBuzz
  def self.convert(n)
    if n % 15 == 0
      "FizzBuzz"
    elsif n % 3 == 0
      "Fizz"
    elsif n % 5 == 0
      "Buzz"
    else
      n.to_s
    end
  end

  def self.run(limit)
    (1..limit).map { |n| convert(n) }
  end
end

class TestFizzBuzz < Minitest::Test
  def test_regular_number
    assert_equal "1", FizzBuzz.convert(1)
    assert_equal "7", FizzBuzz.convert(7)
  end

  def test_fizz
    assert_equal "Fizz", FizzBuzz.convert(3)
    assert_equal "Fizz", FizzBuzz.convert(6)
  end

  def test_buzz
    assert_equal "Buzz", FizzBuzz.convert(5)
    assert_equal "Buzz", FizzBuzz.convert(10)
  end

  def test_fizzbuzz
    assert_equal "FizzBuzz", FizzBuzz.convert(15)
    assert_equal "FizzBuzz", FizzBuzz.convert(30)
  end

  def test_run_sequence
    result = FizzBuzz.run(15)
    assert_equal "Fizz", result[2]     # index 2 = 3
    assert_equal "Buzz", result[4]     # index 4 = 5
    assert_equal "FizzBuzz", result[14] # index 14 = 15
  end
end`}
          expectedOutput={`# Running:

.....

5 runs, 9 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: TDDで電卓を段階的に実装</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

# TDDサイクルで機能を1つずつ追加していく

class Calculator
  def add(a, b) = a + b
  def subtract(a, b) = a - b
  def multiply(a, b) = a * b

  def divide(a, b)
    raise ZeroDivisionError, "ゼロ除算不可" if b == 0
    a.to_f / b
  end

  def power(base, exp)
    return 1 if exp == 0
    base ** exp
  end
end

class TestCalculator < Minitest::Test
  def setup = @calc = Calculator.new

  # Red→Green: addを最初に実装
  def test_add
    assert_equal 5, @calc.add(2, 3)
    assert_equal 0, @calc.add(-1, 1)
  end

  # Red→Green: subtractを実装
  def test_subtract
    assert_equal 1, @calc.subtract(3, 2)
    assert_equal(-5, @calc.subtract(0, 5))
  end

  # Red→Green: multiplyを実装
  def test_multiply
    assert_equal 12, @calc.multiply(3, 4)
    assert_equal 0,  @calc.multiply(0, 100)
  end

  # Red→Green: divideを実装（エラーケースも）
  def test_divide
    assert_in_delta 2.5, @calc.divide(5, 2), 0.001
    assert_raises(ZeroDivisionError) { @calc.divide(5, 0) }
  end

  # Red→Green: powerを実装
  def test_power
    assert_equal 8, @calc.power(2, 3)
    assert_equal 1, @calc.power(5, 0)
  end
end`}
          expectedOutput={`# Running:

.....

5 runs, 8 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: TDDでコレクションクラスを実装</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class UniqueList
  def initialize
    @items = []
  end

  def add(item)
    @items << item unless @items.include?(item)
    self
  end

  def remove(item)
    @items.delete(item)
    self
  end

  def include?(item) = @items.include?(item)
  def size           = @items.size
  def empty?         = @items.empty?
  def to_a           = @items.dup
end

class TestUniqueList < Minitest::Test
  def setup = @list = UniqueList.new

  def test_starts_empty
    assert @list.empty?
    assert_equal 0, @list.size
  end

  def test_add_item
    @list.add("apple")
    assert @list.include?("apple")
    assert_equal 1, @list.size
  end

  def test_no_duplicates
    @list.add("apple").add("apple").add("apple")
    assert_equal 1, @list.size
  end

  def test_remove_item
    @list.add("apple").add("banana")
    @list.remove("apple")
    refute @list.include?("apple")
    assert @list.include?("banana")
  end

  def test_chaining
    result = @list.add("a").add("b").add("c")
    assert_equal @list, result
    assert_equal 3, @list.size
  end
end`}
          expectedOutput={`# Running:

.....

5 runs, 9 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="tdd" />
      </div>
      <LessonNav lessons={lessons} currentId="tdd" basePath="/learn/testing" />
    </div>
  );
}
