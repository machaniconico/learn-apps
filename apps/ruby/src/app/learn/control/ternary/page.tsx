import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function TernaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">三項演算子</h1>
        <p className="text-gray-400">条件式を簡潔に書ける三項演算子と関連する短縮記法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子とは</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-1 rounded text-cyan-300">条件 ? 真の値 : 偽の値</code> という形式で、
          if-elseを1行に書ける演算子です。シンプルな条件分岐に向いています。
          複雑な条件にはif-elseを使いましょう。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">条件 ? 真 : 偽</code> — 三項演算子</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">値 || デフォルト</code> — nil/falseの場合のデフォルト</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">値 &amp;&amp; 処理</code> — 真の場合のみ処理</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 三項演算子の基本</h2>
        <RubyEditor
          defaultCode={`# 三項演算子: 条件 ? 真 : 偽
age = 20
status = age >= 18 ? "成人" : "未成年"
puts status

# 数値の絶対値
n = -7
abs = n >= 0 ? n : -n
puts abs

# 複数の三項演算子（ネストは非推奨）
score = 75
grade = score >= 90 ? "A" : score >= 70 ? "B" : "C"
puts grade

# 配列に使う
numbers = [1, -2, 3, -4, 5]
results = numbers.map { |n| n > 0 ? "正" : "負以下" }
puts results.inspect`}
          expectedOutput={`成人
7
B
["正", "負以下", "正", "負以下", "正"]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: || と && の活用</h2>
        <RubyEditor
          defaultCode={`# || : nil/falseの場合にデフォルト値
name = nil
display_name = name || "ゲスト"
puts display_name  # ゲスト

name = "Alice"
display_name = name || "ゲスト"
puts display_name  # Alice

# &&: 真の場合のみ評価
user = { name: "Bob", premium: true }
discount = user[:premium] && "10%割引"
puts discount  # 10%割引

user2 = { name: "Carol", premium: false }
discount2 = user2[:premium] && "10%割引"
puts discount2.inspect  # false`}
          expectedOutput={`ゲスト
Alice
10%割引
false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 実践的な使い方</h2>
        <RubyEditor
          defaultCode={`# メソッド内での三項演算子
def pluralize(count, singular, plural = nil)
  plural ||= singular + "s"
  "#{count} #{count == 1 ? singular : plural}"
end

puts pluralize(1, "apple")
puts pluralize(3, "apple")
puts pluralize(1, "child", "children")
puts pluralize(5, "child", "children")

# 配列操作での活用
items = ["ruby", "python", "javascript", "go"]
formatted = items.map.with_index do |lang, i|
  i.zero? ? lang.upcase : lang.capitalize
end
puts formatted.inspect`}
          expectedOutput={`1 apple
3 apples
1 child
5 children
["RUBY", "Python", "Javascript", "Go"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="ternary" />
      </div>
      <LessonNav lessons={lessons} currentId="ternary" basePath="/learn/control" />
    </div>
  );
}
