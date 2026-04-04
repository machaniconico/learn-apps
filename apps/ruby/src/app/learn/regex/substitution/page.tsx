import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "regex")!;

export default function SubstitutionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-pink-400">正規表現</p>
        <h1 className="text-3xl font-bold text-gray-100">置換</h1>
        <p className="text-gray-400">
          sub・gsubを使った文字列の置換を学びます。文字列置換・ブロック置換・後方参照を使った置換パターンを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">sub と gsub の基本</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">sub</code> は最初のマッチのみ置換、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">gsub</code> は全マッチを置換します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">sub!</code>/<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">gsub!</code> で破壊的変更になります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`str = "The quick brown fox jumps over the lazy dog"

# sub: 最初のマッチのみ置換
puts str.sub(/the/, "a")

# gsub: 全マッチを置換（大小文字無視フラグ付き）
puts str.gsub(/the/i, "a")

# 単語の置換
puts str.gsub(/\b(fox|dog)\b/, "cat")

# 空白の正規化
messy = "Hello    World   Ruby"
normalized = messy.gsub(/\s+/, " ")
puts normalized`}
        expectedOutput={`The quick brown fox jumps over a lazy dog
a quick brown fox jumps over a lazy dog
The quick brown cat jumps over the lazy cat
Hello World Ruby`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">gsub とブロック</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">gsub(pattern) {"{ |match| ... }"}</code> の形でブロックを使うと、
          マッチした文字列を動的に変換できます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# ブロックで動的置換
prices = "Apple: $1.50, Banana: $0.80, Cherry: $3.00"
in_yen = prices.gsub(/\$(\d+\.\d+)/) do |match|
  rate = 150  # 1ドル = 150円
  dollars = match.delete("$").to_f
  "¥#{(dollars * rate).round}"
end
puts in_yen

# スネークケース → キャメルケース変換
def to_camel_case(str)
  str.gsub(/_([a-z])/) { $1.upcase }
end

puts to_camel_case("hello_world")
puts to_camel_case("user_first_name")
puts to_camel_case("get_all_records")

# HTMLエスケープ
def html_escape(str)
  str.gsub(/[&<>"']/) do |char|
    { "&" => "&amp;", "<" => "&lt;", ">" => "&gt;",
      '"' => "&quot;", "'" => "&#39;" }[char]
  end
end

puts html_escape('<script>alert("XSS")</script>')`}
        expectedOutput={`Apple: ¥225, Banana: ¥120, Cherry: ¥450
helloWorld
userFirstName
getAllRecords
&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">後方参照を使った置換</h2>
        <p className="text-gray-400 text-sm">
          置換文字列内で <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">\1</code>、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">\2</code> または
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">\k&lt;name&gt;</code> でキャプチャを参照できます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 後方参照で日付フォーマット変換
date = "2024-01-15"
formatted = date.sub(/(\d{4})-(\d{2})-(\d{2})/, '\\3/\\2/\\1')
puts formatted  # DD/MM/YYYY

# 名前の並び替え（姓名 → 名姓）
names = ["Tanaka Taro", "Sato Hanako", "Suzuki Ichiro"]
swapped = names.map { |name| name.sub(/(\w+) (\w+)/, '\\2 \\1') }
puts swapped.inspect

# 電話番号のフォーマット統一
phones = ["09012345678", "0901-234-5678", "090-1234-5678"]
normalized = phones.map do |p|
  digits = p.gsub(/\D/, "")
  digits.sub(/(\d{3})(\d{4})(\d{4})/, '\\1-\\2-\\3')
end
puts normalized.inspect`}
        expectedOutput={`15/01/2024
["Taro Tanaka", "Hanako Sato", "Ichiro Suzuki"]
["090-1234-5678", "090-1234-5678", "090-1234-5678"]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="regex" lessonId="substitution" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="substitution"
        basePath="/learn/regex"
      />
    </div>
  );
}
