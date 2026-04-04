import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "numbers")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">数値と演算 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">範囲オブジェクト (Range)</h1>
        <p className="text-gray-400">Ruby の Range クラスを使った範囲表現と活用方法を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Range の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Range は始端と終端を持つ連続した値の集合を表すオブジェクトです。<code className="text-green-400">..</code> は終端を含む閉区間、<code className="text-green-400">...</code> は終端を含まない半開区間を作ります。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">1..10</code>: 1 以上 10 以下（終端含む）</li>
          <li><code className="text-green-400">1...10</code>: 1 以上 10 未満（終端含まない）</li>
          <li><code className="text-green-400">include?</code> / <code className="text-green-400">cover?</code>: 値が範囲内か判定</li>
          <li><code className="text-green-400">to_a</code>: 配列に変換</li>
          <li><code className="text-green-400">size</code> / <code className="text-green-400">count</code>: 要素数を取得</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Range の作成と基本操作</h2>
        <RubyEditor
          defaultCode={`# 閉区間（終端を含む）
r1 = 1..10
puts r1.include?(10)
puts r1.include?(11)

# 半開区間（終端を含まない）
r2 = 1...10
puts r2.include?(10)
puts r2.include?(9)

# to_a で配列に変換
puts (1..5).to_a.inspect

# size と first / last
r3 = 1..10
puts r3.size
puts r3.first
puts r3.last`}
          expectedOutput={`true
false
false
true
[1, 2, 3, 4, 5]
10
1
10`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">each・map・select での活用</h2>
        <RubyEditor
          defaultCode={`# each: 順に処理
(1..5).each { |n| print "#{n} " }
puts

# map: 変換
squares = (1..5).map { |n| n ** 2 }
puts squares.inspect

# select: フィルタリング
evens = (1..10).select(&:even?)
puts evens.inspect

# reduce: 集約
sum = (1..10).reduce(:+)
puts sum`}
          expectedOutput={`1 2 3 4 5
[1, 4, 9, 16, 25]
[2, 4, 6, 8, 10]
55`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">step メソッド</h2>
        <RubyEditor
          defaultCode={`# step: 刻み幅を指定して反復
(1..10).step(2) { |n| print "#{n} " }
puts

# Float の Range でも使える
(0.0..1.0).step(0.25) { |n| print "#{n} " }
puts

# step をブロックなしで呼ぶと Enumerator
enum = (1..10).step(3)
puts enum.to_a.inspect`}
          expectedOutput={`1 3 5 7 9
0.0 0.25 0.5 0.75 1.0
[1, 4, 7, 10]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">case/when での活用</h2>
        <RubyEditor
          defaultCode={`def grade(score)
  case score
  when 90..100 then "A"
  when 80...90 then "B"
  when 70...80 then "C"
  when 60...70 then "D"
  else              "F"
  end
end

puts grade(95)
puts grade(85)
puts grade(72)
puts grade(55)`}
          expectedOutput={`A
B
C
F`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">文字列 Range</h2>
        <RubyEditor
          defaultCode={`# 文字列の Range
puts ('a'..'e').to_a.inspect

# include? で文字の範囲チェック
puts ('a'..'z').include?('m')
puts ('a'..'z').include?('A')

# each で英字を走査
('a'..'f').each { |c| print "#{c} " }
puts`}
          expectedOutput={`["a", "b", "c", "d", "e"]
true
false
a b c d e f`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Endless Range・Beginless Range (Ruby 2.6+/2.7+)</h2>
        <RubyEditor
          defaultCode={`# Endless Range: 終端なし（Ruby 2.6+）
r = (1..)
puts r.include?(1000)

# Beginless Range: 始端なし（Ruby 2.7+）
r2 = (..5)
puts r2.include?(5)
puts r2.include?(6)

# case/when での活用
def classify(n)
  case n
  when (..0)   then "負またはゼロ"
  when (1..100) then "1〜100"
  when (101..)  then "101以上"
  end
end

puts classify(-3)
puts classify(50)
puts classify(200)`}
          expectedOutput={`true
true
false
負またはゼロ
1〜100
101以上`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="numbers" lessonId="ranges" />
      </div>
      <LessonNav lessons={lessons} currentId="ranges" basePath="/learn/numbers" />
    </div>
  );
}
