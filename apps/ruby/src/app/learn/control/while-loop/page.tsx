import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileループを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whileループとは</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-1 rounded text-cyan-300">while</code>は条件が真の間、
          ブロックを繰り返し実行します。条件はループの先頭で評価されます。
          無限ループになる可能性があるため、必ず終了条件を確認しましょう。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">while 条件 ... end</code> — 条件が真の間繰り返す</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">begin ... end while 条件</code> — 最低1回実行（do-while相当）</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">loop do ... end</code> — 無限ループ（breakで脱出）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なwhileループ</h2>
        <RubyEditor
          defaultCode={`# 基本的なwhileループ
count = 1
while count <= 5
  puts "カウント: #{count}"
  count += 1
end

# 合計計算
sum = 0
n = 1
while n <= 10
  sum += n
  n += 1
end
puts "1〜10の合計: #{sum}"`}
          expectedOutput={`カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5
1〜10の合計: 55`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: begin-end while (do-while相当)</h2>
        <RubyEditor
          defaultCode={`# begin-end while: 最低1回実行する
attempts = 0
begin
  attempts += 1
  puts "試行 #{attempts}回目"
  # 実際の処理はここに書く
end while attempts < 3

puts "完了: #{attempts}回試行しました"

# loop で無限ループ
counter = 0
loop do
  counter += 1
  break if counter >= 5  # breakで脱出
  next if counter == 3   # nextでスキップ
  puts "loop: #{counter}"
end
puts "loopを抜けた。counter=#{counter}"`}
          expectedOutput={`試行 1回目
試行 2回目
試行 3回目
完了: 3回試行しました
loop: 1
loop: 2
loop: 4
loopを抜けた。counter=5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 実用的なwhileの例</h2>
        <RubyEditor
          defaultCode={`# 二分探索
def binary_search(arr, target)
  low = 0
  high = arr.length - 1

  while low <= high
    mid = (low + high) / 2
    if arr[mid] == target
      return mid
    elsif arr[mid] < target
      low = mid + 1
    else
      high = mid - 1
    end
  end
  -1  # 見つからない
end

sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
puts binary_search(sorted, 23)  # 5 (インデックス)
puts binary_search(sorted, 50)  # -1 (見つからない)`}
          expectedOutput={`5
-1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
