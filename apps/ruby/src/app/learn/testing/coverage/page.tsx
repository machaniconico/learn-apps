import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function CoveragePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カバレッジ</h1>
        <p className="text-gray-400">SimpleCovでコードカバレッジを計測し、テストの網羅性を確認する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コードカバレッジとは</h2>
        <p className="text-gray-300 mb-3">
          コードカバレッジはテストがソースコードのどのくらいを実行したかを示す指標です。
          SimpleCovはRubyで最もよく使われるカバレッジ計測ライブラリです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><strong className="text-white">行カバレッジ</strong> — 実行された行の割合</li>
          <li><strong className="text-white">分岐カバレッジ</strong> — 実行された条件分岐の割合</li>
          <li>100%カバレッジが目標だが、意味のあるテストが重要</li>
          <li>SimpleCovはHTMLレポートを自動生成する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: SimpleCovの基本セットアップ</h2>
        <RubyEditor
          defaultCode={`# SimpleCovの使い方（実際のプロジェクト）
# Gemfile: gem 'simplecov', require: false, group: :test

# test_helper.rb の先頭に記述
=begin
require 'simplecov'
SimpleCov.start do
  add_filter '/test/'      # テストファイルは除外
  add_filter '/vendor/'    # vendorは除外
  minimum_coverage 90      # 90%未満でfail
end
=end

# Rubyの標準Coverage（gem不要）で同様の計測
require 'coverage'
require 'minitest/autorun'

Coverage.start

class Discount
  def calculate(price, member: false, coupon: nil)
    discount = 0
    discount += price * 0.1 if member
    discount += coupon       if coupon
    [price - discount, 0].max
  end

  def tier(price)
    if price >= 10_000
      :gold
    elsif price >= 5_000
      :silver
    else
      :standard
    end
  end
end

class TestDiscount < Minitest::Test
  def setup = @d = Discount.new

  def test_no_discount
    assert_equal 1000, @d.calculate(1000)
  end

  def test_member_discount
    assert_equal 900, @d.calculate(1000, member: true)
  end

  def test_coupon_discount
    assert_equal 800, @d.calculate(1000, coupon: 200)
  end

  def test_tier_gold
    assert_equal :gold, @d.tier(15_000)
  end

  def test_tier_silver
    assert_equal :silver, @d.tier(7_000)
  end

  def test_tier_standard
    assert_equal :standard, @d.tier(3_000)
  end
end`}
          expectedOutput={`# Running:

......

6 runs, 6 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カバレッジが低いケースと改善</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class FileProcessor
  def process(path)
    return { error: "パスが空です" } if path.nil? || path.empty?

    ext = File.extname(path).downcase

    case ext
    when '.txt'
      { type: :text, content: "テキスト処理" }
    when '.csv'
      { type: :csv, content: "CSV処理" }
    when '.json'
      { type: :json, content: "JSON処理" }
    else
      { error: "未対応の拡張子: #{ext}" }
    end
  end
end

# カバレッジが低いテスト（一部のケースのみ）
class TestFileProcessorLow < Minitest::Test
  def setup = @processor = FileProcessor.new

  def test_txt_only
    result = @processor.process("data.txt")
    assert_equal :text, result[:type]
  end
end

# カバレッジが高いテスト（すべてのケースをカバー）
class TestFileProcessorHigh < Minitest::Test
  def setup = @processor = FileProcessor.new

  def test_nil_path
    result = @processor.process(nil)
    assert_equal "パスが空です", result[:error]
  end

  def test_empty_path
    result = @processor.process("")
    assert_equal "パスが空です", result[:error]
  end

  def test_txt
    assert_equal :text, @processor.process("file.txt")[:type]
  end

  def test_csv
    assert_equal :csv, @processor.process("data.csv")[:type]
  end

  def test_json
    assert_equal :json, @processor.process("config.json")[:type]
  end

  def test_unknown
    result = @processor.process("image.png")
    assert result[:error].include?(".png")
  end
end`}
          expectedOutput={`# Running:

.......

7 runs, 7 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: カバレッジのベストプラクティス</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

# カバレッジ100%より意味のあるテストが重要
class PaymentProcessor
  VALID_METHODS = %w[credit_card bank_transfer crypto].freeze

  def process(amount:, method:, currency: "JPY")
    validate_amount!(amount)
    validate_method!(method)

    fee = calculate_fee(amount, method)
    total = amount + fee

    {
      amount: amount,
      fee: fee,
      total: total,
      method: method,
      currency: currency,
      status: :success
    }
  end

  private

  def validate_amount!(amount)
    raise ArgumentError, "金額は正の数" unless amount.is_a?(Numeric) && amount > 0
  end

  def validate_method!(method)
    raise ArgumentError, "不正な支払い方法" unless VALID_METHODS.include?(method)
  end

  def calculate_fee(amount, method)
    rate = case method
           when "credit_card" then 0.033
           when "bank_transfer" then 0.005
           when "crypto" then 0.01
           end
    (amount * rate).ceil
  end
end

class TestPaymentProcessor < Minitest::Test
  def setup = @processor = PaymentProcessor.new

  def test_credit_card_payment
    result = @processor.process(amount: 10_000, method: "credit_card")
    assert_equal :success, result[:status]
    assert_equal 330, result[:fee]
    assert_equal 10_330, result[:total]
  end

  def test_bank_transfer_payment
    result = @processor.process(amount: 10_000, method: "bank_transfer")
    assert_equal 50, result[:fee]
  end

  def test_invalid_amount
    assert_raises(ArgumentError) { @processor.process(amount: -100, method: "credit_card") }
    assert_raises(ArgumentError) { @processor.process(amount: 0, method: "credit_card") }
  end

  def test_invalid_method
    assert_raises(ArgumentError) { @processor.process(amount: 1000, method: "cash") }
  end
end`}
          expectedOutput={`# Running:

....

4 runs, 6 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="coverage" />
      </div>
      <LessonNav lessons={lessons} currentId="coverage" basePath="/learn/testing" />
    </div>
  );
}
