import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行・非同期処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Fiber</h1>
        <p className="text-gray-400">Fiber.new、Fiber.yield、resume、協調的並行処理の仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Fiberとは</h2>
        <p className="text-gray-300 mb-3">
          FiberはThreadより軽量な実行コンテキストです。明示的にresumeとFiber.yieldで制御を切り替える協調的マルチタスクです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Fiber.new {`{ }`}</code> — Fiberを作成（まだ実行しない）</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">fiber.resume</code> — Fiberを実行（または再開）</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Fiber.yield(value)</code> — 呼び出し元に値を返して一時停止</li>
          <li>ジェネレータやコルーチンの実装に適している</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Fiberの基本動作</h2>
        <RubyEditor
          defaultCode={`# Fiberの基本
fiber = Fiber.new do
  puts "Fiber: ステップ1"
  Fiber.yield "first"

  puts "Fiber: ステップ2"
  Fiber.yield "second"

  puts "Fiber: ステップ3"
  "third"  # 最後の戻り値
end

puts "メイン: Fiber開始前"
result1 = fiber.resume
puts "メイン: #{result1}を受け取った"

result2 = fiber.resume
puts "メイン: #{result2}を受け取った"

result3 = fiber.resume
puts "メイン: #{result3}を受け取った"

puts "メイン: Fiber完了"`}
          expectedOutput={`メイン: Fiber開始前
Fiber: ステップ1
メイン: firstを受け取った
Fiber: ステップ2
メイン: secondを受け取った
Fiber: ステップ3
メイン: thirdを受け取った
メイン: Fiber完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Fiberでジェネレータを実装</h2>
        <RubyEditor
          defaultCode={`# 無限フィボナッチジェネレータ
fib_gen = Fiber.new do
  a, b = 0, 1
  loop do
    Fiber.yield a
    a, b = b, a + b
  end
end

puts "フィボナッチ数列（最初の10項）:"
10.times do |i|
  print "#{fib_gen.resume}"
  print i < 9 ? ", " : "\n"
end

# 範囲ジェネレータ
range_gen = Fiber.new do
  (1..5).each { |n| Fiber.yield n }
  nil
end

puts "\n範囲ジェネレータ:"
while (val = range_gen.resume)
  puts "  値: #{val}"
end`}
          expectedOutput={`フィボナッチ数列（最初の10項）:
0, 1, 1, 2, 3, 5, 8, 13, 21, 34

範囲ジェネレータ:
  値: 1
  値: 2
  値: 3
  値: 4
  値: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="fibers" />
      </div>
      <LessonNav lessons={lessons} currentId="fibers" basePath="/learn/concurrency" />
    </div>
  );
}
