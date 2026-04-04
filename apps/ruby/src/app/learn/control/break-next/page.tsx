import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function BreakNextPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・next</h1>
        <p className="text-gray-400">ループを制御するbreak・next・redoの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ループ制御キーワード</h2>
        <ul className="space-y-3 text-gray-400">
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">break</code>
            <span className="ml-2">— ループを即座に終了する。値を返すこともできる。</span>
          </li>
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">next</code>
            <span className="ml-2">— 現在のイテレーションをスキップして次へ進む。</span>
          </li>
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">redo</code>
            <span className="ml-2">— 現在のイテレーションを最初からやり直す（稀に使用）。</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: break</h2>
        <RubyEditor
          defaultCode={`# break: ループを終了する
(1..10).each do |i|
  break if i > 5
  puts i
end

puts "---"

# break で値を返す
result = (1..100).each do |i|
  break i if i * i > 50
end
puts "二乗が50を超える最小の整数: #{result}"

# loopとbreak
counter = 0
loop do
  counter += 1
  break if counter >= 5
end
puts "counter: #{counter}"`}
          expectedOutput={`1
2
3
4
5
---
二乗が50を超える最小の整数: 8
counter: 5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: next</h2>
        <RubyEditor
          defaultCode={`# next: 現在のイテレーションをスキップ
(1..10).each do |i|
  next if i.even?  # 偶数をスキップ
  puts i
end

puts "---"

# FizzBuzzのnext版
(1..15).each do |n|
  next puts "FizzBuzz" if (n % 15).zero?
  next puts "Fizz" if (n % 3).zero?
  next puts "Buzz" if (n % 5).zero?
  puts n
end`}
          expectedOutput={`1
3
5
7
9
---
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 実践的な組み合わせ</h2>
        <RubyEditor
          defaultCode={`# 特定条件で処理を切り替える
data = [3, -1, 7, 0, -5, 2, 8, -3, 4]
positives = []

data.each do |n|
  next if n <= 0        # 0以下はスキップ
  break if positives.length >= 4  # 4つ集まったら終了
  positives << n
end

puts "最初の4つの正数: #{positives.inspect}"

# ネストしたループのbreak
found = nil
matrix = [[1,2,3],[4,5,6],[7,8,9]]

matrix.each do |row|
  row.each do |val|
    if val == 5
      found = val
      break
    end
  end
  break if found
end

puts "見つかった値: #{found}"`}
          expectedOutput={`最初の4つの正数: [3, 7, 2, 8]
見つかった値: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-next" />
      </div>
      <LessonNav lessons={lessons} currentId="break-next" basePath="/learn/control" />
    </div>
  );
}
