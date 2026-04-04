import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function CaseWhenPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">case-when文</h1>
        <p className="text-gray-400">Rubyのcase-when文でパターンマッチ的な条件分岐を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">case-when文とは</h2>
        <p className="text-gray-300 mb-4">
          Rubyの<code className="bg-gray-800 px-1 rounded text-cyan-300">case-when</code>は、
          内部で<code className="bg-gray-800 px-1 rounded">===</code>演算子を使って比較します。
          これにより、値だけでなく範囲・クラス・正規表現にもマッチできます。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li>値との比較: <code className="bg-gray-800 px-1.5 py-0.5 rounded">when 1, 2, 3</code></li>
          <li>範囲との比較: <code className="bg-gray-800 px-1.5 py-0.5 rounded">when 1..10</code></li>
          <li>クラスチェック: <code className="bg-gray-800 px-1.5 py-0.5 rounded">when String</code></li>
          <li>正規表現: <code className="bg-gray-800 px-1.5 py-0.5 rounded">when /pattern/</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なcase-when</h2>
        <RubyEditor
          defaultCode={`day = "Monday"

case day
when "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  puts "平日です"
when "Saturday", "Sunday"
  puts "週末です"
else
  puts "不明な曜日"
end

# 数値での分岐
num = 7
case num
when 1
  puts "one"
when 2, 3
  puts "two or three"
when 4..6
  puts "four to six"
else
  puts "seven or more"
end`}
          expectedOutput={`平日です
seven or more`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 範囲・クラスでのマッチ</h2>
        <RubyEditor
          defaultCode={`# 範囲でのマッチ
def bmi_category(bmi)
  case bmi
  when 0...18.5
    "低体重"
  when 18.5...25.0
    "普通体重"
  when 25.0...30.0
    "過体重"
  else
    "肥満"
  end
end

[17.0, 22.5, 27.3, 32.0].each do |bmi|
  puts "BMI #{bmi}: #{bmi_category(bmi)}"
end

# クラスでのマッチ
def type_of(val)
  case val
  when Integer then "整数"
  when Float   then "浮動小数点"
  when String  then "文字列"
  when Array   then "配列"
  when NilClass then "nil"
  end
end

[1, 3.14, "hi", [], nil].each { |v| puts type_of(v) }`}
          expectedOutput={`BMI 17.0: 低体重
BMI 22.5: 普通体重
BMI 27.3: 過体重
BMI 32.0: 肥満
整数
浮動小数点
文字列
配列
nil`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 正規表現・条件なしcase</h2>
        <RubyEditor
          defaultCode={`# 正規表現でのマッチ
def classify_string(str)
  case str
  when /\A\d+\z/
    "数字のみ"
  when /\A[a-zA-Z]+\z/
    "英字のみ"
  when /\A[a-zA-Z0-9]+\z/
    "英数字"
  else
    "その他"
  end
end

["12345", "hello", "abc123", "hello!"].each do |s|
  puts "'#{s}': #{classify_string(s)}"
end

# 条件なしcase (複数条件のif-elsif代替)
age = 25
status = case
         when age < 13 then "子供"
         when age < 20 then "ティーン"
         when age < 65 then "成人"
         else               "シニア"
         end
puts "#{age}歳: #{status}"`}
          expectedOutput={`'12345': 数字のみ
'hello': 英字のみ
'abc123': 英数字
'hello!': その他
25歳: 成人`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="case-when" />
      </div>
      <LessonNav lessons={lessons} currentId="case-when" basePath="/learn/control" />
    </div>
  );
}
