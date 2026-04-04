import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function ElsifPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">elsif</h1>
        <p className="text-gray-400">複数の条件を順番にチェックするelsifの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">elsifとは</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-1 rounded text-cyan-300">elsif</code>（else ifではなく、eが1つ）を使うと
          複数の条件を順番にチェックできます。最初に真になった条件のブロックだけが実行されます。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li>条件は上から順に評価される</li>
          <li>最初に真になった条件のブロックが実行される</li>
          <li>どれも真でない場合はelseブロックが実行される</li>
          <li>elsifはいくつでも追加できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 成績判定</h2>
        <RubyEditor
          defaultCode={`def grade(score)
  if score >= 90
    "S - 優秀"
  elsif score >= 80
    "A - 良"
  elsif score >= 70
    "B - 可"
  elsif score >= 60
    "C - 合格"
  else
    "D - 不合格"
  end
end

[95, 83, 71, 62, 45].each do |score|
  puts "#{score}点: #{grade(score)}"
end`}
          expectedOutput={`95点: S - 優秀
83点: A - 良
71点: B - 可
62点: C - 合格
45点: D - 不合格`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 時間帯の挨拶</h2>
        <RubyEditor
          defaultCode={`def greeting(hour)
  if hour < 0 || hour > 23
    "無効な時間です"
  elsif hour < 6
    "深夜です。お休みなさい。"
  elsif hour < 12
    "おはようございます！"
  elsif hour < 18
    "こんにちは！"
  elsif hour < 21
    "こんばんは！"
  else
    "夜遅いですね。"
  end
end

[3, 7, 14, 19, 22].each do |h|
  puts "#{h}時: #{greeting(h)}"
end`}
          expectedOutput={`3時: 深夜です。お休みなさい。
7時: おはようございます！
14時: こんにちは！
19時: こんばんは！
22時: 夜遅いですね。`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 型チェックパターン</h2>
        <RubyEditor
          defaultCode={`def describe(value)
  if value.is_a?(Integer)
    "整数: #{value}"
  elsif value.is_a?(Float)
    "浮動小数点: #{value}"
  elsif value.is_a?(String)
    "文字列: '#{value}' (#{value.length}文字)"
  elsif value.is_a?(Array)
    "配列: #{value.length}要素"
  elsif value.nil?
    "nil値"
  else
    "その他: #{value.class}"
  end
end

[42, 3.14, "hello", [1,2,3], nil, :symbol].each do |v|
  puts describe(v)
end`}
          expectedOutput={`整数: 42
浮動小数点: 3.14
文字列: 'hello' (5文字)
配列: 3要素
nil値
その他: Symbol`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="elsif" />
      </div>
      <LessonNav lessons={lessons} currentId="elsif" basePath="/learn/control" />
    </div>
  );
}
