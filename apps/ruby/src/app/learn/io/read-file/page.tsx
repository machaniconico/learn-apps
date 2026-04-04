import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "io")!;

export default function ReadFilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-400">ファイルI/O</p>
        <h1 className="text-3xl font-bold text-gray-100">ファイル読み込み</h1>
        <p className="text-gray-400">
          File.read、File.open、File.readlinesを使ったファイル読み込みの方法を学びます。ブロック形式を使って安全にファイルを扱う手法も習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">File.read と File.readlines</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">File.read(path)</code> はファイル全体を文字列として読み込みます。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">File.readlines(path)</code> は行の配列として読み込みます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# File.read のシミュレーション
content = "Line 1: Hello\nLine 2: World\nLine 3: Ruby"

# 全体を文字列として処理
puts "=== 全内容 ==="
puts content

# readlines のシミュレーション（改行区切りで配列化）
lines = content.split("\n")
puts "\n=== 行数: #{lines.length} ==="
lines.each_with_index do |line, i|
  puts "#{i + 1}: #{line}"
end

# 特定の行を取得
puts "\n最初の行: #{lines.first}"
puts "最後の行: #{lines.last}"`}
        expectedOutput={`=== 全内容 ===
Line 1: Hello
Line 2: World
Line 3: Ruby

=== 行数: 3 ===
1: Line 1: Hello
2: Line 2: World
3: Line 3: Ruby

最初の行: Line 1: Hello
最後の行: Line 3: Ruby`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">File.open とブロック形式</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">File.open(path) do |f| ... end</code> のブロック形式では、
          ブロック終了時に自動的にファイルがクローズされます。リソースリークを防ぐ推奨パターンです。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# File.open ブロック形式のシミュレーション
class SimulatedFile
  def initialize(content)
    @lines = content.split("\n")
    @closed = false
  end

  def each_line
    @lines.each { |l| yield l + "\n" }
  end

  def read
    @lines.join("\n")
  end

  def close
    @closed = true
    puts "(ファイルをクローズしました)"
  end
end

def with_file(content)
  f = SimulatedFile.new(content)
  begin
    yield f
  ensure
    f.close
  end
end

data = "Alice,30\nBob,25\nCarol,35"

with_file(data) do |f|
  f.each_line do |line|
    name, age = line.chomp.split(",")
    puts "#{name} (#{age}歳)"
  end
end`}
        expectedOutput={`Alice (30歳)
Bob (25歳)
Carol (35歳)
(ファイルをクローズしました)`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">エンコーディング指定</h2>
        <p className="text-gray-400 text-sm">
          日本語ファイルを読む際は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">encoding:</code> オプションでUTF-8を指定します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">File.read(path, encoding: "UTF-8")</code>
        </p>
      </div>

      <RubyEditor
        defaultCode={`# エンコーディングと文字列処理
lines = [
  "名前,年齢,都市",
  "田中太郎,30,東京",
  "佐藤花子,25,大阪",
  "鈴木一郎,35,名古屋",
]

# CSVライクな処理
header, *data = lines.map { |l| l.split(",") }

puts "ヘッダー: #{header.inspect}"
puts "---"
data.each do |row|
  name, age, city = row
  puts "#{name} | #{age}歳 | #{city}"
end

puts "---"
puts "エンコーディング: #{lines.first.encoding}"`}
        expectedOutput={`ヘッダー: ["名前", "年齢", "都市"]
---
田中太郎 | 30歳 | 東京
佐藤花子 | 25歳 | 大阪
鈴木一郎 | 35歳 | 名古屋
---
エンコーディング: UTF-8`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="io" lessonId="read-file" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="read-file"
        basePath="/learn/io"
      />
    </div>
  );
}
