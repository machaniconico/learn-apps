import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "strings")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フォーマット</h1>
        <p className="text-gray-400">式展開・sprintf・format による文字列フォーマットを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">フォーマットの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyには複数の文字列フォーマット方法があります。式展開は最もRubyらしく、sprintf/format は C言語スタイルで数値の桁数指定などに便利です。% 演算子も使えます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>式展開: <code className="text-purple-400">{"\"#{expression}\""}</code></li>
          <li>sprintf: <code className="text-purple-400">sprintf("%05d", 42)</code></li>
          <li>format: <code className="text-purple-400">format("%.2f", 3.14159)</code></li>
          <li>% 演算子: <code className="text-purple-400">"%s is %d" % ["x", 1]</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">式展開と sprintf</h2>
        <RubyEditor
          defaultCode={`# 式展開（最もRubyらしい）
name = "Alice"
score = 95.5
puts "#{name}のスコアは#{score}点です"
puts "2 + 2 = #{2 + 2}"

# sprintf で桁数指定
puts sprintf("%05d", 42)
puts sprintf("%-10s|%10s", "left", "right")
puts sprintf("%.3f", Math::PI)`}
          expectedOutput={`Aliceのスコアは95.5点です
2 + 2 = 4
00042
left      |     right
3.142`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">format と % 演算子</h2>
        <RubyEditor
          defaultCode={`# format メソッド（sprintf と同じ）
price = 1234567.89
puts format("¥%,.2f", price)
puts format("%08.2f", 3.14)

# % 演算子
template = "Hello, %s! You have %d messages."
puts template % ["Bob", 5]

# 複数の値をフォーマット
items = [["Apple", 150], ["Banana", 80], ["Cherry", 300]]
items.each do |name, price|
  puts format("%-10s: ¥%d", name, price)
end`}
          expectedOutput={`¥1234567.89
00003.14
Hello, Bob! You have 5 messages.
Apple     : ¥150
Banana    : ¥80
Cherry    : ¥300`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="formatting" />
      </div>
      <LessonNav lessons={lessons} currentId="formatting" basePath="/learn/strings" />
    </div>
  );
}
