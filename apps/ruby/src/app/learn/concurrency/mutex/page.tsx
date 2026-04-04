import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行・非同期処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Mutex</h1>
        <p className="text-gray-400">Mutex#synchronizeで共有リソースへの競合アクセスを防ぐ排他制御を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Mutexによる排他制御</h2>
        <p className="text-gray-300 mb-3">
          複数スレッドが同じリソースを同時に変更するとデータ競合が発生します。MutexはLockを使って排他制御します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Mutex.new</code> — ミューテックスの作成</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">mutex.synchronize {`{ }`}</code> — クリティカルセクションの保護</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">mutex.lock / mutex.unlock</code> — 手動ロック管理</li>
          <li>デッドロックを避けるためsynchronizeを推奨</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Mutexなしとありの比較</h2>
        <RubyEditor
          defaultCode={`# Mutexなし（競合が発生しうる）
counter_unsafe = 0
threads_unsafe = 10.times.map do
  Thread.new { 100.times { counter_unsafe += 1 } }
end
threads_unsafe.each(&:join)
puts "Mutexなし（期待値1000）: #{counter_unsafe}"

# Mutexあり（安全）
counter_safe = 0
mutex = Mutex.new
threads_safe = 10.times.map do
  Thread.new do
    100.times do
      mutex.synchronize { counter_safe += 1 }
    end
  end
end
threads_safe.each(&:join)
puts "Mutexあり（期待値1000）: #{counter_safe}"`}
          expectedOutput={`Mutexなし（期待値1000）: 1000
Mutexあり（期待値1000）: 1000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Mutexを使ったスレッドセーフなカウンター</h2>
        <RubyEditor
          defaultCode={`# スレッドセーフなカウンタークラス
class ThreadSafeCounter
  def initialize
    @count = 0
    @mutex = Mutex.new
  end

  def increment
    @mutex.synchronize { @count += 1 }
  end

  def decrement
    @mutex.synchronize { @count -= 1 }
  end

  def value
    @mutex.synchronize { @count }
  end
end

counter = ThreadSafeCounter.new

# 複数スレッドから同時アクセス
inc_threads = 5.times.map do
  Thread.new { 10.times { counter.increment } }
end

dec_threads = 2.times.map do
  Thread.new { 5.times { counter.decrement } }
end

(inc_threads + dec_threads).each(&:join)

puts "インクリメント: 5スレッド × 10回 = 50"
puts "デクリメント: 2スレッド × 5回 = 10"
puts "期待値: 40"
puts "実際の値: #{counter.value}"`}
          expectedOutput={`インクリメント: 5スレッド × 10回 = 50
デクリメント: 2スレッド × 5回 = 10
期待値: 40
実際の値: 40`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="mutex" />
      </div>
      <LessonNav lessons={lessons} currentId="mutex" basePath="/learn/concurrency" />
    </div>
  );
}
