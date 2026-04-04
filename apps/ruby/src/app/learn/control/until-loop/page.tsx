import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function UntilLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">untilループ</h1>
        <p className="text-gray-400">条件が偽の間繰り返すuntilループを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">untilループとは</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-1 rounded text-cyan-300">until</code>は
          <code className="bg-gray-800 px-1 rounded">while !</code>と同等です。
          条件が<strong>偽</strong>の間ループを続け、条件が<strong>真</strong>になったら終了します。
          「〜になるまで繰り返す」という自然な英語表現に対応しています。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">until 条件 ... end</code> — 条件が偽の間繰り返す</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">begin ... end until 条件</code> — 最低1回実行</li>
          <li>後置until: <code className="bg-gray-800 px-1.5 py-0.5 rounded">式 until 条件</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なuntil</h2>
        <RubyEditor
          defaultCode={`# until: 条件が真になるまで繰り返す
count = 0
until count >= 5
  puts "カウント: #{count}"
  count += 1
end

puts "終了: count = #{count}"

# while ! と同等
n = 10
until n <= 0
  print "#{n} "
  n -= 2
end
puts "" # 改行`}
          expectedOutput={`カウント: 0
カウント: 1
カウント: 2
カウント: 3
カウント: 4
終了: count = 5
10 8 6 4 2 `}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 後置untilとbegin-until</h2>
        <RubyEditor
          defaultCode={`# 後置until
i = 0
i += 1 until i >= 5
puts "後置until: i = #{i}"

# begin-end until (最低1回実行)
value = 100
begin
  puts "value = #{value}"
  value -= 30
end until value <= 0

puts "終了: value = #{value}"

# 文字列処理
str = "hello world"
until str.empty?
  print str[0]
  str = str[1..]  # 先頭文字を削除
end
puts "" # 改行`}
          expectedOutput={`後置until: i = 5
value = 100
value = 70
value = 40
value = 10
終了: value = -20
hello world`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: スタックを使ったuntil</h2>
        <RubyEditor
          defaultCode={`# スタック処理
stack = [5, 3, 8, 1, 9, 2, 7]
sorted = []

until stack.empty?
  min = stack.min
  sorted << min
  stack.delete_at(stack.index(min))
end

puts "ソート結果: #{sorted.inspect}"

# ユーザー入力シミュレーション
inputs = ["", "  ", "hello"]
result = nil
idx = 0

until result && !result.strip.empty?
  result = inputs[idx]
  idx += 1
end

puts "入力値: '#{result.strip}'"`}
          expectedOutput={`ソート結果: [1, 2, 3, 5, 7, 8, 9]
入力値: 'hello'`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="until-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="until-loop" basePath="/learn/control" />
    </div>
  );
}
