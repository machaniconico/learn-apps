import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function RspecBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RSpecの基本</h1>
        <p className="text-gray-400">BDDスタイルのテストフレームワークRSpecのdescribe・it・expectを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RSpecとは</h2>
        <p className="text-gray-300 mb-3">
          RSpecはBDD（振る舞い駆動開発）スタイルのテストフレームワークです。
          自然言語に近い記法でテストを書けるため、仕様の文書化にもなります。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">describe</code> — テスト対象のクラス・メソッドを記述</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">context</code> — 特定の状況を記述（describeのエイリアス）</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">it</code> — 個別のテストケース（example）</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">expect(x).to eq(y)</code> — マッチャーで検証</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">before / after</code> — セットアップ・後処理</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: RSpecの基本構造</h2>
        <RubyEditor
          defaultCode={`# RSpec形式のテスト（実行にはgem install rspecが必要）
# 以下は構造の説明用コードです

=begin
require 'rspec'

class Stack
  def initialize
    @data = []
  end

  def push(item)
    @data.push(item)
    self
  end

  def pop
    @data.pop
  end

  def peek
    @data.last
  end

  def empty?
    @data.empty?
  end

  def size
    @data.size
  end
end

RSpec.describe Stack do
  let(:stack) { Stack.new }

  describe '#push' do
    it 'adds an item to the stack' do
      stack.push(1)
      expect(stack.size).to eq(1)
    end

    it 'returns the stack itself' do
      result = stack.push(1)
      expect(result).to be(stack)
    end
  end

  describe '#pop' do
    context 'when stack has items' do
      before { stack.push(1).push(2).push(3) }

      it 'removes and returns the last item' do
        expect(stack.pop).to eq(3)
        expect(stack.size).to eq(2)
      end
    end

    context 'when stack is empty' do
      it 'returns nil' do
        expect(stack.pop).to be_nil
      end
    end
  end

  describe '#empty?' do
    it 'returns true for new stack' do
      expect(stack).to be_empty
    end

    it 'returns false after push' do
      stack.push(1)
      expect(stack).not_to be_empty
    end
  end
end
=end

# Minitestで同等のテストを実行
require 'minitest/autorun'

class Stack
  def initialize = @data = []
  def push(item) = (@data.push(item); self)
  def pop        = @data.pop
  def peek       = @data.last
  def empty?     = @data.empty?
  def size       = @data.size
end

class TestStack < Minitest::Test
  def setup = @stack = Stack.new

  def test_push_adds_item
    @stack.push(1)
    assert_equal 1, @stack.size
  end

  def test_pop_returns_last
    @stack.push(1).push(2).push(3)
    assert_equal 3, @stack.pop
    assert_equal 2, @stack.size
  end

  def test_empty_on_new_stack
    assert @stack.empty?
  end
end`}
          expectedOutput={`# Running:

...

3 runs, 4 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: RSpecのマッチャー一覧</h2>
        <RubyEditor
          defaultCode={`# RSpecのマッチャー対照表（Minitestで実演）
require 'minitest/autorun'

class TestMatchers < Minitest::Test
  # RSpec: expect(x).to eq(y)
  # Minitest: assert_equal y, x
  def test_equality
    assert_equal 42, 6 * 7
    assert_equal "ruby", "RUBY".downcase
  end

  # RSpec: expect(x).to be_nil
  # Minitest: assert_nil x
  def test_nil
    assert_nil nil
    refute_nil "not nil"
  end

  # RSpec: expect(x).to be_truthy / be_falsy
  # Minitest: assert x / refute x
  def test_truthy_falsy
    assert 1         # truthyな値
    assert "hello"   # truthyな値
    refute nil       # falsyな値
    refute false     # falsyな値
  end

  # RSpec: expect(x).to include(y)
  # Minitest: assert_includes x, y
  def test_includes
    assert_includes [1, 2, 3], 2
    assert_includes "hello world", "world"
  end

  # RSpec: expect(x).to be > 5
  # Minitest: assert x > 5
  def test_comparison
    assert 10 > 5
    assert 3.14.between?(3, 4)
  end
end`}
          expectedOutput={`# Running:

.....

5 runs, 10 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: before/afterとlet相当のパターン</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class UserAccount
  attr_reader :username, :balance, :active

  def initialize(username, balance = 0)
    @username = username
    @balance  = balance
    @active   = true
  end

  def deposit(amount)
    raise ArgumentError, "金額は正の値" if amount <= 0
    @balance += amount
  end

  def withdraw(amount)
    raise ArgumentError, "残高不足" if amount > @balance
    @balance -= amount
  end

  def deactivate = @active = false
end

class TestUserAccount < Minitest::Test
  # RSpecのlet { }相当
  def setup
    @account = UserAccount.new("alice", 1000)
  end

  # RSpecのcontext "when depositing" 相当
  def test_deposit_increases_balance
    @account.deposit(500)
    assert_equal 1500, @account.balance
  end

  def test_deposit_rejects_negative
    assert_raises(ArgumentError) { @account.deposit(-100) }
  end

  def test_withdraw_decreases_balance
    @account.withdraw(300)
    assert_equal 700, @account.balance
  end

  def test_withdraw_rejects_overdraft
    err = assert_raises(ArgumentError) { @account.withdraw(2000) }
    assert_equal "残高不足", err.message
  end
end`}
          expectedOutput={`# Running:

....

4 runs, 5 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="rspec-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="rspec-basics" basePath="/learn/testing" />
    </div>
  );
}
