import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function TimesUptoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">times・upto・downto</h1>
        <p className="text-gray-400">回数指定ループのtimes・upto・downto・stepを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">数値メソッドによるループ</h2>
        <p className="text-gray-300 mb-4">
          Rubyでは数値オブジェクト自身がループメソッドを持っています。
          これがRubyらしい（イディオマティックな）繰り返し方法です。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">n.times</code> — 0からn-1まで繰り返す</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">n.upto(m)</code> — nからmまで増加しながら繰り返す</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">n.downto(m)</code> — nからmまで減少しながら繰り返す</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">n.step(m, step)</code> — stepずつ変化しながら繰り返す</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: times</h2>
        <RubyEditor
          defaultCode={`# 5回繰り返す
5.times do
  print "* "
end
puts ""

# インデックスあり (0始まり)
5.times do |i|
  puts "インデックス: #{i}"
end

# 配列を作る
squares = 5.times.map { |i| (i + 1) ** 2 }
puts squares.inspect`}
          expectedOutput={`* * * * *
インデックス: 0
インデックス: 1
インデックス: 2
インデックス: 3
インデックス: 4
[1, 4, 9, 16, 25]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: upto・downto</h2>
        <RubyEditor
          defaultCode={`# upto: 昇順
1.upto(5) do |i|
  print "#{i} "
end
puts ""

# downto: 降順
5.downto(1) do |i|
  print "#{i} "
end
puts ""

# カウントダウン
puts "発射まで:"
10.downto(1) do |i|
  puts "  #{i}..."
end
puts "発射！"`}
          expectedOutput={`1 2 3 4 5
5 4 3 2 1
発射まで:
  10...
  9...
  8...
  7...
  6...
  5...
  4...
  3...
  2...
  1...
発射！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: step</h2>
        <RubyEditor
          defaultCode={`# step: 任意の刻みで繰り返す
# 0から10まで2刻み
0.step(10, 2) do |i|
  print "#{i} "
end
puts ""

# 1.0から2.0まで0.25刻み
1.0.step(2.0, 0.25) do |f|
  print "#{f} "
end
puts ""

# 逆順step
10.step(0, -3) do |i|
  print "#{i} "
end
puts ""`}
          expectedOutput={`0 2 4 6 8 10
1.0 1.25 1.5 1.75 2.0
10 7 4 1 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="times-upto" />
      </div>
      <LessonNav lessons={lessons} currentId="times-upto" basePath="/learn/control" />
    </div>
  );
}
