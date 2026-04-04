import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function AssertionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アサーション</h1>
        <p className="text-gray-400">Minitestのassert系メソッドの種類と使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アサーションの種類</h2>
        <p className="text-gray-300 mb-3">
          アサーションはテストの期待値を検証するメソッドです。Minitestには豊富なアサーションが用意されています。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">assert_equal(expected, actual)</code> — 等値チェック</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">assert_nil(obj)</code> — nilチェック</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">assert_raises(ExceptionClass)</code> — 例外チェック</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">refute_equal / refute_nil</code> — 否定アサーション</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">assert_includes(collection, obj)</code> — 包含チェック</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本アサーション</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class TestBasicAssertions < Minitest::Test
  def test_assert_equal
    assert_equal 4, 2 + 2
    assert_equal "hello", "hel" + "lo"
    assert_equal [1, 2, 3], [1, 2, 3]
  end

  def test_assert_nil
    result = nil
    assert_nil result

    obj = "not nil"
    refute_nil obj
  end

  def test_assert_true_false
    assert true
    refute false
    assert 1 > 0
    assert_equal true, "ruby".is_a?(String)
  end

  def test_assert_instance_of
    assert_instance_of String, "hello"
    assert_instance_of Integer, 42
    assert_kind_of Numeric, 3.14
  end
end`}
          expectedOutput={`# Running:

....

4 runs, 10 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 例外・範囲・包含のアサーション</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class TestAdvancedAssertions < Minitest::Test
  def test_assert_raises
    # 例外が発生することを検証
    assert_raises(ZeroDivisionError) { 1 / 0 }
    assert_raises(ArgumentError) { Integer("abc") }

    # 例外オブジェクトを取得
    err = assert_raises(RuntimeError) { raise "エラーです" }
    assert_equal "エラーです", err.message
  end

  def test_assert_includes
    arr = [1, 2, 3, 4, 5]
    assert_includes arr, 3
    refute_includes arr, 6

    str = "Hello, Ruby!"
    assert_includes str, "Ruby"
  end

  def test_assert_match
    # 正規表現マッチ
    assert_match(/\d{3}-\d{4}/, "123-4567")
    refute_match(/\d+/, "abc")
  end

  def test_assert_empty
    assert_empty []
    assert_empty ""
    refute_empty [1, 2, 3]
  end
end`}
          expectedOutput={`# Running:

....

4 runs, 9 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: refute系アサーション</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class Product
  attr_reader :name, :price, :in_stock

  def initialize(name, price, in_stock: true)
    @name     = name
    @price    = price
    @in_stock = in_stock
  end

  def expensive?  = @price > 10_000
  def affordable? = @price <= 5_000
end

class TestProduct < Minitest::Test
  def setup
    @book    = Product.new("Ruby本", 3000)
    @laptop  = Product.new("ラップトップ", 150_000)
    @soldout = Product.new("限定品", 5000, in_stock: false)
  end

  def test_book_is_affordable
    assert @book.affordable?
    refute @book.expensive?
  end

  def test_laptop_is_expensive
    assert @laptop.expensive?
    refute @laptop.affordable?
  end

  def test_soldout_stock
    refute @soldout.in_stock
    assert @book.in_stock
  end
end`}
          expectedOutput={`# Running:

...

3 runs, 6 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="assertions" />
      </div>
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/testing" />
    </div>
  );
}
