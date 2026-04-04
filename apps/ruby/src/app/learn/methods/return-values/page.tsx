import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function ReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">Rubyの暗黙的・明示的な戻り値と複数戻り値を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyの戻り値</h2>
        <p className="text-gray-300 mb-4">
          Rubyのメソッドは最後に評価された式を自動的に返します（暗黙の戻り値）。
          <code className="bg-gray-800 px-1 rounded text-teal-300">return</code>は
          明示的な早期リターンに使います。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li>最後に評価された式が戻り値になる</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">return</code>で早期リターン可能</li>
          <li>複数値は配列として返す（多重代入で受け取れる）</li>
          <li>値を返さない場合は<code className="bg-gray-800 px-1.5 py-0.5 rounded">nil</code>が返る</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 暗黙の戻り値</h2>
        <RubyEditor
          defaultCode={`# 暗黙の戻り値 (最後の式)
def square(n)
  n * n  # return不要
end

def max(a, b)
  if a > b
    a  # aが大きければa
  else
    b  # そうでなければb
  end
end

puts square(5)    # 25
puts max(3, 7)    # 7
puts max(10, 4)   # 10

# 式はすべて値を返す
def classify(n)
  label = if n > 0
    "正"
  elsif n < 0
    "負"
  else
    "ゼロ"
  end
  "#{n}は#{label}の数"
end

puts classify(5)
puts classify(-3)
puts classify(0)`}
          expectedOutput={`25
7
10
5は正の数
-3は負の数
0はゼロの数`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 明示的なreturn</h2>
        <RubyEditor
          defaultCode={`# 早期リターンによるガード節パターン
def divide(a, b)
  return "ゼロ除算エラー" if b.zero?
  a.to_f / b
end

puts divide(10, 2)   # 5.0
puts divide(10, 0)   # ゼロ除算エラー

# 複数のreturn
def grade(score)
  return "無効なスコア" unless (0..100).include?(score)
  return "S" if score >= 90
  return "A" if score >= 80
  return "B" if score >= 70
  return "C" if score >= 60
  "D"
end

[95, 83, 72, 65, 45, -1].each do |s|
  puts "#{s}: #{grade(s)}"
end`}
          expectedOutput={`5.0
ゼロ除算エラー
95: S
83: A
72: B
65: C
45: D
-1: 無効なスコア`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数の戻り値</h2>
        <RubyEditor
          defaultCode={`# 複数値を配列で返す
def stats(numbers)
  sorted = numbers.sort
  min = sorted.first
  max = sorted.last
  avg = numbers.sum.to_f / numbers.length
  [min, max, avg.round(2)]
end

data = [5, 2, 8, 1, 9, 3, 7]
min, max, avg = stats(data)
puts "最小: #{min}"
puts "最大: #{max}"
puts "平均: #{avg}"

# ハッシュで返す（名前付き戻り値）
def parse_name(full_name)
  parts = full_name.split(" ", 2)
  { first: parts[0], last: parts[1] }
end

name = parse_name("Alice Smith")
puts "名: #{name[:first]}"
puts "姓: #{name[:last]}"`}
          expectedOutput={`最小: 1
最大: 9
平均: 5.0
名: Alice
姓: Smith`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/methods" />
    </div>
  );
}
