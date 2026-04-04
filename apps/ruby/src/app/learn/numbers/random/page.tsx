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
        <span className="text-green-400 text-sm font-semibold">数値と演算 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">乱数</h1>
        <p className="text-gray-400">rand・Random・SecureRandom による乱数生成を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">乱数生成の方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyには用途に応じた3つの乱数生成方法があります。<code className="text-green-400">rand</code> は手軽に使えるグローバル関数、<code className="text-green-400">Random</code> はシード固定による再現可能な乱数、<code className="text-green-400">SecureRandom</code> はセキュリティ用途に使います。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">rand</code>: 0.0〜1.0 の Float</li>
          <li><code className="text-green-400">rand(n)</code>: 0〜n-1 の Integer</li>
          <li><code className="text-green-400">rand(a..b)</code>: 範囲内の乱数</li>
          <li><code className="text-green-400">Random.new(seed)</code>: シード固定</li>
          <li><code className="text-green-400">SecureRandom.hex(n)</code>: セキュアなランダム文字列</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">rand の使い方</h2>
        <RubyEditor
          defaultCode={`# 固定シードで再現可能な乱数を生成
srand(42)

# 0.0 〜 1.0 の Float
puts rand.round(4)

# 0 〜 n-1 の Integer
puts rand(10)

# 範囲指定
puts rand(1..6)
puts rand(1..6)

# 配列のシャッフル
arr = [1, 2, 3, 4, 5]
srand(42)
puts arr.shuffle.inspect

# sample: ランダムに要素を取り出す
puts arr.sample(3).inspect`}
          expectedOutput={`0.4967
1
6
5
[2, 5, 4, 1, 3]
[3, 2, 5]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Random クラスと SecureRandom</h2>
        <RubyEditor
          defaultCode={`# Random クラス: シード固定で再現可能
rng = Random.new(12345)
puts rng.rand(100)
puts rng.rand(100)

# 同じシードで同じ結果
rng2 = Random.new(12345)
puts rng2.rand(100)

require 'securerandom'

# SecureRandom: セキュリティ用途
puts SecureRandom.hex(8).length
puts SecureRandom.uuid.length`}
          expectedOutput={`44
51
44
16
36`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="numbers" lessonId="random" />
      </div>
      <LessonNav lessons={lessons} currentId="random" basePath="/learn/numbers" />
    </div>
  );
}
