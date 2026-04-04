import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

export default function GroupSortPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-teal-400">Enumerable</p>
        <h1 className="text-3xl font-bold text-gray-100">group_by・sort_by</h1>
        <p className="text-gray-400">
          group_by、sort_by、min_by、max_byなどのグルーピングとソートメソッドを学びます。データ集計や並べ替えの実用的なパターンを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">group_by</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">group_by</code> はブロックの戻り値をキーとしてハッシュにグループ化します。
          分類・集計処理に非常に便利なメソッドです。
        </p>
      </div>

      <RubyEditor
        defaultCode={`people = [
  { name: "Alice", dept: "Engineering", salary: 90000 },
  { name: "Bob", dept: "Marketing", salary: 70000 },
  { name: "Carol", dept: "Engineering", salary: 95000 },
  { name: "Dave", dept: "HR", salary: 65000 },
  { name: "Eve", dept: "Marketing", salary: 75000 },
]

# 部門でグループ化
by_dept = people.group_by { |p| p[:dept] }
by_dept.each do |dept, members|
  names = members.map { |m| m[:name] }
  avg_salary = members.sum { |m| m[:salary] } / members.length
  puts "#{dept}: #{names.join(', ')} (平均給与: #{avg_salary})"
end`}
        expectedOutput={`Engineering: Alice, Carol (平均給与: 92500)
Marketing: Bob, Eve (平均給与: 72500)
HR: Dave (平均給与: 65000)`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">sort_by</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">sort_by</code> はブロックの戻り値を基準にソートします。
          複数キーでソートするには配列を返します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`students = [
  { name: "Alice", grade: "A", score: 95 },
  { name: "Bob", grade: "B", score: 82 },
  { name: "Carol", grade: "A", score: 91 },
  { name: "Dave", grade: "C", score: 74 },
  { name: "Eve", grade: "B", score: 88 },
]

# スコア順（降順）
by_score = students.sort_by { |s| -s[:score] }
puts "=== スコア降順 ==="
by_score.each { |s| puts "#{s[:name]}: #{s[:score]}" }

# グレード→スコア降順（複数キー）
puts "\n=== グレード→スコア ==="
by_grade_score = students.sort_by { |s| [s[:grade], -s[:score]] }
by_grade_score.each { |s| puts "#{s[:grade]} #{s[:name]}: #{s[:score]}" }`}
        expectedOutput={`=== スコア降順 ===
Alice: 95
Carol: 91
Eve: 88
Bob: 82
Dave: 74

=== グレード→スコア ===
A Alice: 95
A Carol: 91
B Eve: 88
B Bob: 82
C Dave: 74`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">min_by・max_by・minmax_by</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">min_by</code> と <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">max_by</code> は
          最小・最大の要素そのものを返します。<code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">minmax_by</code> は両方を一度に返します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`products = [
  { name: "Ruby Book", price: 3500 },
  { name: "Rails Guide", price: 4200 },
  { name: "Gem Tutorial", price: 2800 },
  { name: "Metaprogramming", price: 5000 },
]

cheapest = products.min_by { |p| p[:price] }
puts "最安値: #{cheapest[:name]} (¥#{cheapest[:price]})"

most_expensive = products.max_by { |p| p[:price] }
puts "最高値: #{most_expensive[:name]} (¥#{most_expensive[:price]})"

min_p, max_p = products.minmax_by { |p| p[:price] }
puts "価格帯: ¥#{min_p[:price]} 〜 ¥#{max_p[:price]}"

# 上位2件
top2 = products.sort_by { |p| -p[:price] }.first(2)
puts "高額TOP2: #{top2.map { |p| p[:name] }.inspect}"`}
        expectedOutput={`最安値: Gem Tutorial (¥2800)
最高値: Metaprogramming (¥5000)
価格帯: ¥2800 〜 ¥5000
高額TOP2: ["Metaprogramming", "Rails Guide"]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="enumerable" lessonId="group-sort" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="group-sort"
        basePath="/learn/enumerable"
      />
    </div>
  );
}
