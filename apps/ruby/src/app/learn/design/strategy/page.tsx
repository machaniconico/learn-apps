import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "design")!.lessons;

export default function StrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">設計パターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ストラテジー</h1>
        <p className="text-gray-400">アルゴリズムを動的に切り替えるストラテジーパターンをProc/Lambdaで実装する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターンとは</h2>
        <p className="text-gray-300 mb-3">
          ストラテジーパターンはアルゴリズムをカプセル化し、実行時に切り替え可能にするパターンです。
          RubyではProc/Lambdaをストラテジーとして渡すことで、クラスを作らずに実現できます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>継承ではなく委譲でアルゴリズムを分離する</li>
          <li>RubyのProc/Lambdaで軽量に実装できる</li>
          <li>開放/閉鎖原則（新機能追加時に既存コードを変更しない）を実現</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Proc/Lambdaをストラテジーとして使う</h2>
        <RubyEditor
          defaultCode={`class DataExporter
  STRATEGIES = {
    csv:  ->(data) {
      lines = ["name,value"] + data.map { |k, v| "#{k},#{v}" }
      lines.join("\n")
    },
    json: ->(data) {
      pairs = data.map { |k, v| "  \"#{k}\": #{v.inspect}" }
      "{\n#{pairs.join(",\n")}\n}"
    },
    text: ->(data) {
      data.map { |k, v| "#{k}: #{v}" }.join("\n")
    },
  }

  def initialize(format)
    @strategy = STRATEGIES[format] || raise(ArgumentError, "未知のフォーマット: #{format}")
  end

  def export(data)
    @strategy.call(data)
  end

  def self.export_as(format, data)
    new(format).export(data)
  end
end

data = { name: "Ruby", year: 1995, version: "3.2" }

puts "=== CSV ==="
puts DataExporter.export_as(:csv, data)

puts "\n=== JSON ==="
puts DataExporter.export_as(:json, data)

puts "\n=== TEXT ==="
puts DataExporter.export_as(:text, data)`}
          expectedOutput={`=== CSV ===
name,value
name,Ruby
year,1995
version,3.2

=== JSON ===
{
  "name": "Ruby",
  "year": 1995,
  "version": "3.2"
}

=== TEXT ===
name: Ruby
year: 1995
version: 3.2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: バリデーションストラテジー</h2>
        <RubyEditor
          defaultCode={`class Validator
  def initialize(*strategies)
    @strategies = strategies
  end

  def valid?(value)
    errors = @strategies.filter_map { |s| s.call(value) }
    errors.empty? ? { valid: true } : { valid: false, errors: errors }
  end
end

# ストラテジーをLambdaで定義
not_empty   = ->(v) { "空にできません" if v.nil? || v.to_s.strip.empty? }
min_length  = ->(n) { ->(v) { "#{n}文字以上必要です" if v.to_s.length < n } }
max_length  = ->(n) { ->(v) { "#{n}文字以下にしてください" if v.to_s.length > n } }
email_format = ->(v) { "メール形式が正しくありません" unless v.to_s.match?(/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i) }

email_validator = Validator.new(not_empty, email_format)
name_validator  = Validator.new(not_empty, min_length.(2), max_length.(20))

test_cases = [
  ["alice@example.com", email_validator, "有効なメール"],
  ["not-an-email",      email_validator, "無効なメール"],
  ["Alice",             name_validator,  "有効な名前"],
  ["A",                 name_validator,  "短すぎる名前"],
  ["",                  name_validator,  "空の名前"],
]

test_cases.each do |value, validator, desc|
  result = validator.valid?(value)
  status = result[:valid] ? "OK" : "NG: #{result[:errors].join(', ')}"
  puts "#{desc.ljust(15)} => #{status}"
end`}
          expectedOutput={`有効なメール      => OK
無効なメール      => NG: メール形式が正しくありません
有効な名前        => OK
短すぎる名前      => NG: 2文字以上必要です
空の名前          => NG: 空にできません`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ソートストラテジー</h2>
        <RubyEditor
          defaultCode={`class ProductSorter
  STRATEGIES = {
    price_asc:    ->(products) { products.sort_by { |p| p[:price] } },
    price_desc:   ->(products) { products.sort_by { |p| -p[:price] } },
    name_asc:     ->(products) { products.sort_by { |p| p[:name] } },
    rating_desc:  ->(products) { products.sort_by { |p| -p[:rating] } },
    newest_first: ->(products) { products.sort_by { |p| -p[:year] } },
  }

  def initialize(strategy_key = :price_asc)
    @strategy = STRATEGIES[strategy_key] || raise(ArgumentError, "未知のソート方法")
  end

  def sort(products) = @strategy.call(products)
end

products = [
  { name: "Ruby本",     price: 3000, rating: 4.8, year: 2023 },
  { name: "Rails本",    price: 4500, rating: 4.5, year: 2022 },
  { name: "アルゴリズム本", price: 2500, rating: 4.9, year: 2021 },
  { name: "デザパタ本",  price: 5000, rating: 4.7, year: 2020 },
]

[:price_asc, :rating_desc].each do |strategy|
  puts "\n#{strategy}:"
  sorter = ProductSorter.new(strategy)
  sorter.sort(products).each do |p|
    puts "  #{p[:name].ljust(15)} #{p[:price]}円 ★#{p[:rating]}"
  end
end`}
          expectedOutput={`
price_asc:
  アルゴリズム本    2500円 ★4.9
  Ruby本          3000円 ★4.8
  Rails本         4500円 ★4.5
  デザパタ本       5000円 ★4.7

rating_desc:
  アルゴリズム本    2500円 ★4.9
  Ruby本          3000円 ★4.8
  デザパタ本       5000円 ★4.7
  Rails本         4500円 ★4.5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/design" />
    </div>
  );
}
