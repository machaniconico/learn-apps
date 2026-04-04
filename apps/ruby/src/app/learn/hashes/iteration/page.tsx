import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "hashes")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ハッシュ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">走査</h1>
        <p className="text-gray-400">each・map・select でハッシュを走査・変換する方法を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュの走査メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ハッシュは Enumerable モジュールを含むため、配列と同様のイテレーションメソッドが使えます。each はキーと値の両方を受け取れます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-red-400">each</code>: キー・値のペアで走査</li>
          <li><code className="text-red-400">each_key</code>: キーのみ走査</li>
          <li><code className="text-red-400">each_value</code>: 値のみ走査</li>
          <li><code className="text-red-400">map</code>: 各ペアを変換した配列を返す</li>
          <li><code className="text-red-400">select</code>: 条件に一致するペアのハッシュを返す</li>
          <li><code className="text-red-400">reject</code>: 条件に一致しないペアのハッシュを返す</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">each での走査</h2>
        <RubyEditor
          defaultCode={`scores = { Alice: 90, Bob: 75, Charlie: 88, Diana: 95 }

# each でキーと値を取得
scores.each do |name, score|
  puts "#{name}: #{score}点"
end

puts "---"

# each_key
scores.each_key { |k| print "#{k} " }
puts

# each_value
total = 0
scores.each_value { |v| total += v }
puts "平均: #{total / scores.size}点"`}
          expectedOutput={`Alice: 90点
Bob: 75点
Charlie: 88点
Diana: 95点
---
Alice Bob Charlie Diana
平均: 87点`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">select と map</h2>
        <RubyEditor
          defaultCode={`scores = { Alice: 90, Bob: 75, Charlie: 88, Diana: 95 }

# select: 80点以上
high_scorers = scores.select { |_, v| v >= 80 }
puts high_scorers.inspect

# reject: 80点未満を除外（同じ結果）
also_high = scores.reject { |_, v| v < 80 }
puts also_high.inspect

# map: ハッシュから配列に変換
summary = scores.map { |name, score| "#{name}=#{score}" }
puts summary.inspect`}
          expectedOutput={`{Alice: 90, Charlie: 88, Diana: 95}
{Alice: 90, Charlie: 88, Diana: 95}
["Alice=90", "Bob=75", "Charlie=88", "Diana=95"]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="hashes" lessonId="iteration" />
      </div>
      <LessonNav lessons={lessons} currentId="iteration" basePath="/learn/hashes" />
    </div>
  );
}
