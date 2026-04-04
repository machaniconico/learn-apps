import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function MinitestBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Minitestの基本</h1>
        <p className="text-gray-400">Rubyの標準テストフレームワークMinitestの書き方と実行方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Minitest概要</h2>
        <p className="text-gray-300 mb-3">
          MinitestはRuby標準ライブラリに含まれるテストフレームワークです。シンプルで高速、
          Rubyの哲学に沿った設計が特徴です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">require 'minitest/autorun'</code> — 自動実行を有効化</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">class TestXxx &lt; Minitest::Test</code> — テストクラスを定義</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">def test_xxx</code> — test_で始まるメソッドがテストになる</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">setup / teardown</code> — 前後処理</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 最初のMinitestテスト</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

# テスト対象のクラス
class StringProcessor
  def capitalize_words(str)
    str.split.map(&:capitalize).join(' ')
  end

  def remove_spaces(str)
    str.gsub(/\s+/, '')
  end
end

# テストクラス
class TestStringProcessor < Minitest::Test
  def setup
    @processor = StringProcessor.new
  end

  def test_capitalize_words
    result = @processor.capitalize_words("hello world ruby")
    assert_equal "Hello World Ruby", result
  end

  def test_remove_spaces
    result = @processor.remove_spaces("hello world")
    assert_equal "helloworld", result
  end
end`}
          expectedOutput={`# Running:

..

2 runs, 2 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: setupとteardown</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class Counter
  attr_reader :count
  def initialize = @count = 0
  def increment  = @count += 1
  def decrement  = @count -= 1
  def reset      = @count = 0
end

class TestCounter < Minitest::Test
  def setup
    # 各テスト前に実行される
    @counter = Counter.new
    puts "setup: カウンターを初期化"
  end

  def teardown
    # 各テスト後に実行される
    puts "teardown: テスト終了"
  end

  def test_initial_count
    assert_equal 0, @counter.count
  end

  def test_increment
    @counter.increment
    @counter.increment
    assert_equal 2, @counter.count
  end

  def test_decrement
    @counter.increment
    @counter.decrement
    assert_equal 0, @counter.count
  end
end`}
          expectedOutput={`# Running:

setup: カウンターを初期化
teardown: テスト終了
setup: カウンターを初期化
teardown: テスト終了
setup: カウンターを初期化
teardown: テスト終了

3 runs, 3 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: テストの失敗と成功</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class Math
  def self.square(n) = n * n
  def self.cube(n)   = n * n * n
end

class TestMath < Minitest::Test
  def test_square
    assert_equal 9,  Math.square(3)
    assert_equal 16, Math.square(4)
    assert_equal 0,  Math.square(0)
  end

  def test_cube
    assert_equal 27,  Math.cube(3)
    assert_equal 125, Math.cube(5)
  end

  def test_square_is_positive
    assert Math.square(-3) > 0, "負数の二乗は正数"
  end
end`}
          expectedOutput={`# Running:

...

3 runs, 6 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="minitest-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="minitest-basics" basePath="/learn/testing" />
    </div>
  );
}
