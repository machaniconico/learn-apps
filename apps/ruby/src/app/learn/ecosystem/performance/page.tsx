import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Rubyエコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パフォーマンス</h1>
        <p className="text-gray-400">Benchmark、memory_profiler、stackprofを使ったプロファイリングと最適化を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パフォーマンス計測ツール</h2>
        <p className="text-gray-300 mb-3">
          パフォーマンスの問題を解決するには、まず計測することが重要です。推測より計測が原則です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-green-300">Benchmark</code> — 標準ライブラリの実行時間計測</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">memory_profiler</code> — メモリ使用量のプロファイリング</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">stackprof</code> — CPUプロファイラ</li>
          <li>GCチューニング、オブジェクト生成の削減</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Benchmarkモジュールで処理時間比較</h2>
        <RubyEditor
          defaultCode={`require 'benchmark'

N = 100_000

Benchmark.bm(20) do |x|
  # 文字列結合の比較
  x.report("String +=:") do
    s = ""
    N.times { s += "x" }
  end

  x.report("String <<:") do
    s = ""
    N.times { s << "x" }
  end

  x.report("Array join:") do
    parts = []
    N.times { parts << "x" }
    parts.join
  end
end

# measureで単体計測
puts "\n単体計測:"
result = Benchmark.measure do
  (1..N).sum
end
puts "  (1..#{N}).sum: #{result.real.round(4)}秒"

# realtimeで簡易計測
time = Benchmark.realtime do
  (1..N).inject(0, :+)
end
puts "  inject: #{time.round(4)}秒"`}
          expectedOutput={`                           user     system      total        real
String +=:             0.120000   0.010000   0.130000 (  0.125432)
String <<:             0.005000   0.000000   0.005000 (  0.004876)
Array join:            0.008000   0.001000   0.009000 (  0.008234)

単体計測:
  (1..100000).sum: 0.0001秒
  inject: 0.0045秒`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Rubyパフォーマンス最適化のテクニック</h2>
        <RubyEditor
          defaultCode={`require 'benchmark'

# 最適化テクニック集

# 1. frozen_string_literal
# # frozen_string_literal: true
str1 = "hello".freeze  # 文字列をfrozenに
str2 = "hello".freeze
puts "同じオブジェクト: #{str1.equal?(str2)}"

# 2. map vs each_with_object
data = (1..1000).to_a

t1 = Benchmark.realtime { data.map { |x| x * 2 } }
t2 = Benchmark.realtime { data.each_with_object([]) { |x, a| a << x * 2 } }
puts "\nmap: #{(t1 * 1000).round(3)}ms"
puts "each_with_object: #{(t2 * 1000).round(3)}ms"

# 3. ハッシュのキーはシンボルが高速
hash_str = { "key" => "value" }
hash_sym = { key: "value" }

t3 = Benchmark.realtime { 100_000.times { hash_str["key"] } }
t4 = Benchmark.realtime { 100_000.times { hash_sym[:key] } }
puts "\n文字列キー: #{(t3 * 1000).round(3)}ms"
puts "シンボルキー: #{(t4 * 1000).round(3)}ms"

# 4. lazy評価で無限シーケンス
result = (1..Float::INFINITY).lazy.select { |n| n.odd? }.first(5)
puts "\nlazy評価: #{result.inspect}"`}
          expectedOutput={`同じオブジェクト: true

map: 0.045ms
each_with_object: 0.052ms

文字列キー: 8.234ms
シンボルキー: 6.123ms

lazy評価: [1, 3, 5, 7, 9]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="performance" />
      </div>
      <LessonNav lessons={lessons} currentId="performance" basePath="/learn/ecosystem" />
    </div>
  );
}
