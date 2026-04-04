import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行・非同期処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Thread</h1>
        <p className="text-gray-400">Thread.new、join、value、Thread.currentを使ったスレッド基本操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyのスレッド</h2>
        <p className="text-gray-300 mb-3">
          RubyはネイティブOSスレッドを使用しますが、GIL（Global Interpreter Lock）により同時実行はI/O待ちのみです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Thread.new {`{ }`}</code> — 新しいスレッドを作成</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">thread.join</code> — スレッドの完了を待つ</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">thread.value</code> — スレッドの戻り値を取得</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Thread.current</code> — 現在のスレッドを参照</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Thread.newとjoin</h2>
        <RubyEditor
          defaultCode={`# スレッドの基本
puts "メインスレッド開始: #{Thread.current.object_id}"

t1 = Thread.new do
  puts "スレッド1: 処理開始"
  sum = (1..100).sum
  puts "スレッド1: 合計 = #{sum}"
  sum
end

t2 = Thread.new do
  puts "スレッド2: 処理開始"
  product = [1, 2, 3, 4, 5].reduce(:*)
  puts "スレッド2: 積 = #{product}"
  product
end

# 両スレッドの完了を待つ
t1.join
t2.join

puts "スレッド1の戻り値: #{t1.value}"
puts "スレッド2の戻り値: #{t2.value}"
puts "メインスレッド終了"`}
          expectedOutput={`メインスレッド開始: 70240
スレッド1: 処理開始
スレッド1: 合計 = 5050
スレッド2: 処理開始
スレッド2: 積 = 120
スレッド1の戻り値: 5050
スレッド2の戻り値: 120
メインスレッド終了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: スレッドローカル変数</h2>
        <RubyEditor
          defaultCode={`# Thread.currentでスレッドローカル変数を使う
threads = 3.times.map do |i|
  Thread.new do
    # スレッドローカル変数の設定
    Thread.current[:name] = "Worker-#{i}"
    Thread.current[:result] = i ** 2

    puts "#{Thread.current[:name]}: #{i}^2 = #{Thread.current[:result]}"
    Thread.current[:result]
  end
end

results = threads.map(&:value)
puts "\n全スレッドの結果: #{results.inspect}"
puts "合計: #{results.sum}"

# スレッドの状態確認
t = Thread.new { sleep 0.001; 42 }
puts "\nスレッド状態: #{t.status || 'dead (完了)'}"
t.join
puts "join後の状態: #{t.status.inspect} (nil=正常終了)"`}
          expectedOutput={`Worker-0: 0^2 = 0
Worker-1: 1^2 = 1
Worker-2: 2^2 = 4

全スレッドの結果: [0, 1, 4]
合計: 5

スレッド状態: dead (完了)
join後の状態: nil (nil=正常終了)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="threads" />
      </div>
      <LessonNav lessons={lessons} currentId="threads" basePath="/learn/concurrency" />
    </div>
  );
}
