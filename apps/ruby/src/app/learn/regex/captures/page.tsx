import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "regex")!;

export default function CapturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-pink-400">正規表現</p>
        <h1 className="text-3xl font-bold text-gray-100">キャプチャ</h1>
        <p className="text-gray-400">
          括弧によるキャプチャグループと後方参照を学びます。$1/$2やMatchData#capturesを使ってマッチした部分を取り出す方法を習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">キャプチャグループ ()</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">(pattern)</code> でキャプチャグループを作ります。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">m[1]</code>、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">m[2]</code>、
          または <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">$1</code>、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">$2</code> でアクセスします。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 日付のパース
dates = ["2024-01-15", "2023-12-31", "2022-06-01"]

dates.each do |date|
  if m = date.match(/(\\d{4})-(\\d{2})-(\\d{2})/)
    year, month, day = m[1], m[2], m[3]
    puts "年: #{year}, 月: #{month}, 日: #{day}"
  end
end

puts "---"

# captures メソッド（全キャプチャを配列で）
m = "Ruby 3.2.0".match(/(\\w+) (\\d+)\\.(\\d+)\\.(\\d+)/)
puts m.captures.inspect

# 構造化された取り出し
lang, major, minor, patch = m.captures
puts "言語: #{lang}, バージョン: #{major}.#{minor}.#{patch}"`}
        expectedOutput={`年: 2024, 月: 01, 日: 15
年: 2023, 月: 12, 日: 31
年: 2022, 月: 06, 日: 01
---
["Ruby", "3", "2", "0"]
言語: Ruby, バージョン: 3.2.0`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">非キャプチャグループ (?:)</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">(?:pattern)</code> はグループ化するがキャプチャしません。
          キャプチャ番号を消費せずにグループ化したいときに使います。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# キャプチャあり vs なし
str = "2024年1月15日"

# キャプチャグループ（番号を消費する）
m1 = str.match(/(\\d+)年(\\d+)月(\\d+)日/)
puts "キャプチャ: #{m1.captures.inspect}"

# 非キャプチャグループ
m2 = str.match(/(?:\\d+)年(\\d+)月(\\d+)日/)
puts "非キャプチャ1個目: #{m2.captures.inspect}"

# 後方参照: \\1, \\2 — 同じ文字の繰り返しにマッチ
doubles = ["aabbcc", "abcabc", "xxyyzz", "hello"]
doubles.each do |s|
  if s.match?(/(.)\\\\1/)
    puts "#{s}: 連続した文字あり"
  end
end`}
        expectedOutput={`キャプチャ: ["2024", "1", "15"]
非キャプチャ1個目: ["1", "15"]
aabbcc: 連続した文字あり
xxyyzz: 連続した文字あり`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">MatchData の活用</h2>
        <p className="text-gray-400 text-sm">
          MatchDataは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">begin</code>、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">end</code>、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">pre_match</code>、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">post_match</code> など詳細な情報を持ちます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`log_line = "[2024-01-15 10:30:45] ERROR: Database connection failed (code: 503)"

pattern = /\\[(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2})\\] (\\w+): (.+) \\(code: (\\d+)\\)/
m = log_line.match(pattern)

if m
  date, time, level, message, code = m.captures
  puts "日付: #{date}"
  puts "時刻: #{time}"
  puts "レベル: #{level}"
  puts "メッセージ: #{message}"
  puts "コード: #{code}"

  # 位置情報
  puts "レベルの開始位置: #{m.begin(3)}"
  puts "全マッチ長: #{m[0].length}"
end`}
        expectedOutput={`日付: 2024-01-15
時刻: 10:30:45
レベル: ERROR
メッセージ: Database connection failed
コード: 503
レベルの開始位置: 22
全マッチ長: 64`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="regex" lessonId="captures" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="captures"
        basePath="/learn/regex"
      />
    </div>
  );
}
