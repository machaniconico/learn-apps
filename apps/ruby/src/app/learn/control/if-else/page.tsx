import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">Rubyの条件分岐の基本であるif-else文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if文の構文</h2>
        <p className="text-gray-300 mb-4">
          Rubyのif文はendで終了します。条件式に括弧は不要です（書いてもOK）。
          if文は値を返す式でもあります。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li>条件が真のとき: <code className="bg-gray-800 px-1.5 py-0.5 rounded">if</code> ブロックを実行</li>
          <li>条件が偽のとき: <code className="bg-gray-800 px-1.5 py-0.5 rounded">else</code> ブロックを実行</li>
          <li>後置if: <code className="bg-gray-800 px-1.5 py-0.5 rounded">式 if 条件</code> で1行に書ける</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なif-else</h2>
        <RubyEditor
          defaultCode={`age = 20

if age >= 18
  puts "成人です"
else
  puts "未成年です"
end

# 後置if (one-liner)
puts "偶数です" if age.even?
puts "奇数です" if age.odd?

# if は値を返す
category = if age >= 65
  "シニア"
elsif age >= 18
  "成人"
else
  "未成年"
end
puts category`}
          expectedOutput={`成人です
偶数です
成人`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数条件</h2>
        <RubyEditor
          defaultCode={`score = 78

result = if score >= 90
  "A"
elsif score >= 80
  "B"
elsif score >= 70
  "C"
elsif score >= 60
  "D"
else
  "F"
end

puts "成績: #{result}"

# 論理演算子を組み合わせる
temperature = 25
weather = "sunny"

if temperature > 20 && weather == "sunny"
  puts "公園日和です！"
elsif temperature > 20 || weather == "sunny"
  puts "まあまあ良い天気です"
else
  puts "家にいましょう"
end`}
          expectedOutput={`成績: C
公園日和です！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: if文の高度な使い方</h2>
        <RubyEditor
          defaultCode={`# 文字列・範囲を条件に
name = "Alice"
if name.start_with?("A")
  puts "Aから始まる名前です"
end

# 範囲での比較
num = 42
if (1..50).include?(num)
  puts "#{num}は1〜50の範囲内"
end

# 代入と判定を同時に (慣用パターン)
if (match = "hello123".match(/\d+/))
  puts "数字部分: #{match[0]}"
end`}
          expectedOutput={`Aから始まる名前です
42は1〜50の範囲内
数字部分: 123`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
