import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "regex")!;

export default function ScanGrepPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-pink-400">正規表現</p>
        <h1 className="text-3xl font-bold text-gray-100">scan・grep</h1>
        <p className="text-gray-400">
          scanで文字列から全マッチを取得し、grepで配列をフィルタリングする方法を学びます。テキスト解析やデータ抽出の実用的なパターンを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">scan で全マッチを取得</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">String#scan(pattern)</code> はパターンにマッチした全ての文字列を配列で返します。
          キャプチャグループがある場合はキャプチャの配列の配列になります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`text = "Prices: $1.50, $2.75, $10.00, $0.99 (discounted: $0.50)"

# キャプチャなし: マッチした文字列の配列
all_prices = text.scan(/\$\d+\.\d+/)
puts all_prices.inspect

# キャプチャあり: キャプチャの配列の配列
price_values = text.scan(/\$(\d+)\.(\d+)/)
puts price_values.inspect

# 合計金額を計算
total = text.scan(/\$(\d+\.\d+)/).flatten.sum(&:to_f)
puts "合計: $#{total.round(2)}"

# 単語の抽出
sentence = "The quick-brown fox jumps over the lazy-dog"
words = sentence.scan(/\b\w+\b/)
puts "単語数: #{words.length}"
puts words.inspect`}
        expectedOutput={`["$1.50", "$2.75", "$10.00", "$0.99", "$0.50"]
[["1", "50"], ["2", "75"], ["10", "00"], ["0", "99"], ["0", "50"]]
合計: $15.74
単語数: 9
["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">scan とブロック</h2>
        <p className="text-gray-400 text-sm">
          scanにブロックを渡すと各マッチに対してブロックが実行されます。大きなテキストを逐次処理する際に便利です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`html = <<~HTML
  <h1>Ruby Programming</h1>
  <p>Learn <strong>Ruby</strong> step by step.</p>
  <a href="https://ruby-lang.org">Ruby Official</a>
  <img src="ruby.png" alt="Ruby logo">
HTML

# タグの抽出
tags = html.scan(/<(\w+)/)
puts "タグ一覧: #{tags.flatten.uniq.sort.inspect}"

# リンクの抽出
links = html.scan(/href="([^"]+)"/)
puts "リンク: #{links.flatten.inspect}"

# ブロック形式でHTMLタグと内容を処理
html.scan(/<(\w+)[^>]*>([^<]+)<\/\\1>/) do |tag, content|
  puts "#{tag}: #{content.strip}"
end`}
        expectedOutput={`タグ一覧: ["a", "h1", "img", "p", "strong"]
リンク: ["https://ruby-lang.org"]
h1: Ruby Programming
strong: Ruby
a: Ruby Official`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">grep で配列をフィルタリング</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">Array#grep(pattern)</code> は正規表現にマッチする要素を返します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">grep_v</code> はマッチしない要素を返します（Ruby 2.3+）。
        </p>
      </div>

      <RubyEditor
        defaultCode={`files = [
  "main.rb", "utils.rb", "config.yml", "README.md",
  "test_main.rb", "test_utils.rb", "Gemfile", "Gemfile.lock",
  "app.js", "style.css", "schema.sql"
]

# Rubyファイルのみ
ruby_files = files.grep(/\.rb$/)
puts "Rubyファイル: #{ruby_files.inspect}"

# テストファイルを除外
non_test = files.grep_v(/^test_/)
puts "テスト除外: #{non_test.inspect}"

# grepにブロックを渡す（マッチした要素を変換）
upcase_ruby = files.grep(/\.rb$/) { |f| f.upcase }
puts "大文字: #{upcase_ruby.inspect}"

# メソッド名のフィルタリング
methods = [:map, :select, :find, :each, :sort, :flatten, :find_all, :detect]
find_methods = methods.grep(/find/)
puts "find系: #{find_methods.inspect}"`}
        expectedOutput={`Rubyファイル: ["main.rb", "utils.rb", "test_main.rb", "test_utils.rb"]
テスト除外: ["main.rb", "utils.rb", "config.yml", "README.md", "Gemfile", "Gemfile.lock", "app.js", "style.css", "schema.sql"]
大文字: ["MAIN.RB", "UTILS.RB", "TEST_MAIN.RB", "TEST_UTILS.RB"]
find系: [:find, :find_all]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="regex" lessonId="scan-grep" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="scan-grep"
        basePath="/learn/regex"
      />
    </div>
  );
}
