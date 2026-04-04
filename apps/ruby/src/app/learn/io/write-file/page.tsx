import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "io")!;

export default function WriteFilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-400">ファイルI/O</p>
        <h1 className="text-3xl font-bold text-gray-100">ファイル書き込み</h1>
        <p className="text-gray-400">
          File.writeとFile.openを使ったファイル書き込みを学びます。上書きモード、追記モードの使い分けと、安全な書き込みパターンを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">File.write と書き込みモード</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">File.write(path, content)</code> はファイルを上書きします。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">File.open(path, "w")</code> も同様に上書きです。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">"a"</code> モードで追記になります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 書き込みモードの違いをシミュレーション
class MockFile
  @@files = {}

  def self.write(path, content)
    @@files[path] = content
    puts "書き込み完了: #{path} (#{content.bytesize} bytes)"
    content.bytesize
  end

  def self.append(path, content)
    @@files[path] = (@@files[path] || "") + content
    puts "追記完了: #{path}"
  end

  def self.read(path)
    @@files[path] || "(空)"
  end
end

# 上書き書き込み
MockFile.write("output.txt", "Hello, Ruby!\n")
MockFile.write("output.txt", "上書きされました\n")
puts MockFile.read("output.txt")

# 追記
MockFile.write("log.txt", "1行目\n")
MockFile.append("log.txt", "2行目\n")
MockFile.append("log.txt", "3行目\n")
puts MockFile.read("log.txt")`}
        expectedOutput={`書き込み完了: output.txt (14 bytes)
書き込み完了: output.txt (19 bytes)
上書きされました

追記完了: log.txt
追記完了: log.txt
1行目
2行目
3行目`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">File.open ブロックで書き込み</h2>
        <p className="text-gray-400 text-sm">
          ブロック形式では書き込み後に自動でファイルがクローズされます。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">f.puts</code> や
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">f.write</code> でデータを書き込みます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# File.open("path", "w") do |f| ... end のシミュレーション
output = []

# 書き込みシミュレーター
def simulate_write_file
  buffer = []
  yield buffer
  buffer.join
end

content = simulate_write_file do |f|
  f << "# Rubyレポート\n"
  f << "生成日時: #{Time.now.strftime('%Y-%m-%d') rescue '2024-01-15'}\n"
  f << "\n"

  data = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 87 },
    { name: "Carol", score: 92 },
  ]

  data.each do |d|
    f << "#{d[:name]}: #{d[:score]}点\n"
  end

  avg = data.sum { |d| d[:score] } / data.length.to_f
  f << "\n平均点: #{avg.round(1)}点\n"
end

puts content`}
        expectedOutput={`# Rubyレポート
生成日時: 2024-01-15

Alice: 95点
Bob: 87点
Carol: 92点

平均点: 91.3点`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">アトミックな書き込み</h2>
        <p className="text-gray-400 text-sm">
          重要なファイルを更新するときは一時ファイルに書き込んでからリネームする手法が安全です。
          書き込み失敗時に元のファイルが壊れません。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# アトミック書き込みパターン
def atomic_write(path, content)
  tmp_path = "#{path}.tmp"
  # File.write(tmp_path, content)
  # File.rename(tmp_path, path)
  puts "一時ファイルに書き込み: #{tmp_path}"
  puts "リネーム: #{tmp_path} → #{path}"
  puts "書き込み内容:\n#{content}"
end

report = <<~TEXT
  売上レポート
  ----------
  商品A: 100,000円
  商品B: 85,000円
  合計: 185,000円
TEXT

atomic_write("report.txt", report)`}
        expectedOutput={`一時ファイルに書き込み: report.txt.tmp
リネーム: report.txt.tmp → report.txt
書き込み内容:
売上レポート
----------
商品A: 100,000円
商品B: 85,000円
合計: 185,000円`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="io" lessonId="write-file" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="write-file"
        basePath="/learn/io"
      />
    </div>
  );
}
