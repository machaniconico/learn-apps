import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "design")!.lessons;

export default function TemplateMethodPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">設計パターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テンプレートメソッド</h1>
        <p className="text-gray-400">処理の骨格を基底クラスで定義し、詳細をサブクラスに委ねるテンプレートメソッドパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートメソッドパターンとは</h2>
        <p className="text-gray-300 mb-3">
          テンプレートメソッドパターンはアルゴリズムの骨格を基底クラスで定義し、
          具体的な処理の実装をサブクラスに任せるパターンです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>共通の処理フローを基底クラスの<strong className="text-white">テンプレートメソッド</strong>に定義</li>
          <li>変化する部分は<strong className="text-white">フックメソッド</strong>としてサブクラスでオーバーライド</li>
          <li>DRY原則を守りながら振る舞いをカスタマイズできる</li>
          <li>Rubyでは<code className="bg-gray-800 px-1 rounded text-purple-300">raise NotImplementedError</code>で抽象メソッドを表現</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: データ処理パイプラインのテンプレート</h2>
        <RubyEditor
          defaultCode={`class DataProcessor
  # テンプレートメソッド: 処理の骨格を定義
  def process(data)
    puts "=== #{self.class.name} 開始 ==="
    validated = validate(data)
    transformed = transform(validated)
    result = save(transformed)
    on_complete(result)
    result
  end

  private

  # フックメソッド: サブクラスで実装（必須）
  def validate(data)
    raise NotImplementedError, "validateを実装してください"
  end

  def transform(data)
    raise NotImplementedError, "transformを実装してください"
  end

  def save(data)
    raise NotImplementedError, "saveを実装してください"
  end

  # フックメソッド: サブクラスで実装（任意）
  def on_complete(result)
    puts "処理完了: #{result.inspect}"
  end
end

class UserDataProcessor < DataProcessor
  private

  def validate(data)
    raise ArgumentError, "nameが必要です" unless data[:name]
    puts "  検証OK: #{data[:name]}"
    data
  end

  def transform(data)
    transformed = data.merge(
      name: data[:name].strip.capitalize,
      email: data[:email]&.downcase,
      processed_at: "2024-01-15"
    )
    puts "  変換完了: #{transformed[:name]}"
    transformed
  end

  def save(data)
    puts "  DBに保存: #{data[:name]}"
    { id: rand(100..999), **data }
  end
end

processor = UserDataProcessor.new
processor.process({ name: "  alice  ", email: "ALICE@EXAMPLE.COM" })`}
          expectedOutput={`=== UserDataProcessor 開始 ===
  検証OK:   alice
  変換完了: Alice
  DBに保存: Alice
処理完了: {:id=>xxx, :name=>"Alice", :email=>"alice@example.com", :processed_at=>"2024-01-15"}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: レポート生成のテンプレート</h2>
        <RubyEditor
          defaultCode={`class ReportGenerator
  def generate(data)
    output = []
    output << header
    output << render_title(data[:title])
    output << render_body(data[:items])
    output << render_summary(data[:items])
    output << footer
    output.join("\n")
  end

  private

  def header = raise NotImplementedError
  def footer = raise NotImplementedError
  def render_title(title) = raise NotImplementedError
  def render_body(items)  = raise NotImplementedError

  # デフォルト実装あり（オーバーライド任意）
  def render_summary(items)
    "合計: #{items.sum { |i| i[:value] }}"
  end
end

class TextReport < ReportGenerator
  private
  def header        = "=" * 40
  def footer        = "=" * 40
  def render_title(t) = "  #{t}"
  def render_body(items)
    items.map { |i| "  - #{i[:name]}: #{i[:value]}" }.join("\n")
  end
end

class MarkdownReport < ReportGenerator
  private
  def header        = ""
  def footer        = "---"
  def render_title(t) = "## #{t}"
  def render_body(items)
    items.map { |i| "- **#{i[:name]}**: #{i[:value]}" }.join("\n")
  end
  def render_summary(items)
    "**合計: #{items.sum { |i| i[:value] }}**"
  end
end

data = {
  title: "月次売上レポート",
  items: [
    { name: "商品A", value: 150_000 },
    { name: "商品B", value: 230_000 },
    { name: "商品C", value: 95_000  },
  ]
}

puts TextReport.new.generate(data)
puts "\n"
puts MarkdownReport.new.generate(data)`}
          expectedOutput={`========================================
  月次売上レポート
  - 商品A: 150000
  - 商品B: 230000
  - 商品C: 95000
合計: 475000
========================================


## 月次売上レポート
- **商品A**: 150000
- **商品B**: 230000
- **商品C**: 95000
**合計: 475000**
---`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Webスクレイパーのテンプレート</h2>
        <RubyEditor
          defaultCode={`class WebScraper
  # テンプレートメソッド
  def scrape(url)
    puts "スクレイピング開始: #{url}"
    raw_data = fetch(url)
    return nil unless pre_process_check(raw_data)
    parsed = parse(raw_data)
    filtered = filter(parsed)
    post_process(filtered)
  end

  private

  def fetch(url)
    # 実際はHTTPリクエスト
    "模擬HTMLデータ from #{url}"
  end

  def pre_process_check(data)
    valid = !data.nil? && !data.empty?
    puts valid ? "  データ取得OK" : "  データ取得失敗"
    valid
  end

  def parse(raw)     = raise NotImplementedError
  def filter(data)   = data  # デフォルト: そのまま返す
  def post_process(data) = data
end

class NewsScraper < WebScraper
  private

  def parse(raw)
    puts "  HTMLを解析中..."
    # 実際はNokogiriでパース
    [
      { title: "Ruby 3.4リリース",   date: "2024-01-15" },
      { title: "Rails 8.0が登場",    date: "2024-01-10" },
      { title: "Rubyコミュニティ",    date: "2024-01-05" },
    ]
  end

  def filter(articles)
    recent = articles.select { |a| a[:date] >= "2024-01-10" }
    puts "  #{articles.length}件から#{recent.length}件にフィルタ"
    recent
  end

  def post_process(articles)
    puts "  処理完了:"
    articles.each { |a| puts "    - #{a[:title]} (#{a[:date]})" }
    articles
  end
end

scraper = NewsScraper.new
scraper.scrape("https://ruby-news.example.com")`}
          expectedOutput={`スクレイピング開始: https://ruby-news.example.com
  データ取得OK
  HTMLを解析中...
  3件から2件にフィルタ
  処理完了:
    - Ruby 3.4リリース (2024-01-15)
    - Rails 8.0が登場 (2024-01-10)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="template-method" />
      </div>
      <LessonNav lessons={lessons} currentId="template-method" basePath="/learn/design" />
    </div>
  );
}
