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
        <span className="text-red-400 text-sm font-semibold">ハッシュ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト値</h1>
        <p className="text-gray-400">Hash.new とデフォルト値の設定方法を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値の設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常のハッシュは存在しないキーへのアクセスで nil を返しますが、Hash.new を使うとデフォルト値やデフォルト処理を定義できます。カウント集計や自動初期化に非常に便利です。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-red-400">Hash.new(0)</code>: デフォルト値0（共有オブジェクト注意）</li>
          <li><code className="text-red-400">{"Hash.new { |h, k| h[k] = [] }"}</code>: キーごとに新しい配列</li>
          <li><code className="text-red-400">hash.default</code>: デフォルト値の確認</li>
          <li><code className="text-red-400">hash.default = value</code>: 後からデフォルト値を設定</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Hash.new でカウント集計</h2>
        <RubyEditor
          defaultCode={`# デフォルト値0でカウント集計
word_count = Hash.new(0)
sentence = "the quick brown fox jumps over the lazy dog the"

sentence.split.each do |word|
  word_count[word] += 1
end

# 出現回数でソートして表示
word_count.sort_by { |_, count| -count }.first(3).each do |word, count|
  puts "#{word}: #{count}回"
end`}
          expectedOutput={`the: 3回
quick: 1回
brown: 1回`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ブロックでデフォルト処理</h2>
        <RubyEditor
          defaultCode={`# ブロックでキーごとに新しい配列を自動生成
groups = Hash.new { |h, k| h[k] = [] }

people = [
  { name: "Alice", dept: "Engineering" },
  { name: "Bob", dept: "Sales" },
  { name: "Carol", dept: "Engineering" },
  { name: "Dave", dept: "Sales" },
  { name: "Eve", dept: "HR" }
]

people.each { |p| groups[p[:dept]] << p[:name] }

groups.each do |dept, members|
  puts "#{dept}: #{members.join(', ')}"
end`}
          expectedOutput={`Engineering: Alice, Carol
Sales: Bob, Dave
HR: Eve`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="hashes" lessonId="default-values" />
      </div>
      <LessonNav lessons={lessons} currentId="default-values" basePath="/learn/hashes" />
    </div>
  );
}
