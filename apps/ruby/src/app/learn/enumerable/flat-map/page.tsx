import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

export default function FlatMapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-teal-400">Enumerable</p>
        <h1 className="text-3xl font-bold text-gray-100">flat_map・zip</h1>
        <p className="text-gray-400">
          flat_map、zip、chunk、each_consなど配列を結合・変形するメソッドを学びます。ネストした構造の平坦化や複数コレクションの組み合わせを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">flat_map</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">flat_map</code> は map + flatten(1) と同等です。
          各要素を配列に変換してから1レベル平坦化します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`sentences = ["Hello World", "Ruby is great", "Enumerable rocks"]

# split してから flatten する（flat_map なし）
words_nested = sentences.map { |s| s.split }
puts words_nested.inspect

# flat_map で一度に
words = sentences.flat_map { |s| s.split }
puts words.inspect

# 実用例: タグの展開
posts = [
  { title: "Ruby basics", tags: ["ruby", "beginner"] },
  { title: "Rails guide", tags: ["rails", "web", "ruby"] },
  { title: "Testing", tags: ["testing", "minitest"] },
]

all_tags = posts.flat_map { |p| p[:tags] }
puts all_tags.inspect
puts all_tags.uniq.sort.inspect`}
        expectedOutput={`[["Hello", "World"], ["Ruby", "is", "great"], ["Enumerable", "rocks"]]
["Hello", "World", "Ruby", "is", "great", "Enumerable", "rocks"]
["ruby", "beginner", "rails", "web", "ruby", "testing", "minitest"]
["beginner", "minitest", "rails", "ruby", "testing", "web"]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">zip</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">zip</code> は複数の配列を対応する位置の要素でまとめます。
          Pythonのzipと同様の動作です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`names = ["Alice", "Bob", "Carol"]
ages  = [30, 25, 35]
cities = ["Tokyo", "Osaka", "Nagoya"]

# 2配列のzip
zipped = names.zip(ages)
puts zipped.inspect

# 3配列のzip
all = names.zip(ages, cities)
all.each do |name, age, city|
  puts "#{name} (#{age}歳) - #{city}"
end

# zipとmapの組み合わせ
scores_a = [80, 90, 75]
scores_b = [85, 88, 92]
averages = scores_a.zip(scores_b).map { |a, b| ((a + b) / 2.0).round(1) }
puts averages.inspect`}
        expectedOutput={`[["Alice", 30], ["Bob", 25], ["Carol", 35]]
Alice (30歳) - Tokyo
Bob (25歳) - Osaka
Carol (35歳) - Nagoya
[82.5, 89.0, 83.5]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">chunk</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">chunk</code> は連続する同じキーの要素をグループ化します。
          group_byと違い、隣接する要素のみグループ化します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# chunk: 連続する同じ値をグループ化
numbers = [1, 1, 2, 2, 2, 3, 1, 1, 4]
chunked = numbers.chunk { |n| n }.map { |key, arr| [key, arr.length] }
puts chunked.inspect

# ランレングス符号化（連続する文字を圧縮）
str = "aaabbbccddddee"
rle = str.chars.chunk { |c| c }.map { |char, arr| "#{arr.length}#{char}" }.join
puts rle

# 正負で連続グループ
data = [1, 2, -1, -2, -3, 4, 5, -1]
data.chunk { |n| n > 0 ? :positive : :negative }.each do |sign, vals|
  puts "#{sign}: #{vals.inspect}"
end`}
        expectedOutput={`[[1, 2], [2, 3], [3, 1], [1, 2], [4, 1]]
3a3b2c4d2e
positive: [1, 2]
negative: [-1, -2, -3]
positive: [4, 5]
negative: [-1]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="enumerable" lessonId="flat-map" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="flat-map"
        basePath="/learn/enumerable"
      />
    </div>
  );
}
