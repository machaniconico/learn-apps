import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">to_i・to_f・to_s・to_aなど、Rubyの型変換メソッドを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換メソッド</h2>
        <p className="text-gray-300 mb-4">
          Rubyでは型変換に専用のメソッドを使います。<code className="bg-gray-800 px-1 rounded">to_*</code>形式のメソッドは
          緩やかな変換（失敗しても値を返す）、<code className="bg-gray-800 px-1 rounded">Integer()</code>などの関数形式は
          厳格な変換（失敗すると例外）です。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">to_i</code> — 整数に変換</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">to_f</code> — 浮動小数点数に変換</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">to_s</code> — 文字列に変換</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">to_a</code> — 配列に変換</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">to_r</code> — 有理数に変換</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 文字列から数値への変換</h2>
        <RubyEditor
          defaultCode={`# to_i: 文字列 -> 整数
puts "42".to_i        # 42
puts "3.14".to_i      # 3 (小数点以下切り捨て)
puts "10abc".to_i     # 10 (数字部分のみ)
puts "abc".to_i       # 0  (変換できない場合)

# to_f: 文字列 -> 浮動小数点数
puts "3.14".to_f      # 3.14
puts "1e3".to_f       # 1000.0

# 厳格な変換（失敗すると例外）
puts Integer("42")    # 42
begin
  Integer("abc")
rescue ArgumentError => e
  puts "エラー: #{e.message}"
end`}
          expectedOutput={`42
3
10
0
3.14
1000.0
42
エラー: invalid value for Integer(): "abc"`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 数値から文字列への変換</h2>
        <RubyEditor
          defaultCode={`# to_s: 数値 -> 文字列
num = 255
puts num.to_s     # "255" (10進数)
puts num.to_s(2)  # "11111111" (2進数)
puts num.to_s(8)  # "377" (8進数)
puts num.to_s(16) # "ff" (16進数)

# sprintf / format
puts sprintf("%.2f", 3.14159)  # 3.14
puts format("%05d", 42)        # 00042
puts "%s は %d 歳" % ["Alice", 30]  # Alice は 30 歳`}
          expectedOutput={`255
11111111
377
ff
3.14
00042
Alice は 30 歳`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 配列・ハッシュの変換</h2>
        <RubyEditor
          defaultCode={`# to_a: 変換
puts (1..5).to_a.inspect        # [1, 2, 3, 4, 5]
puts {a: 1, b: 2}.to_a.inspect  # [[:a, 1], [:b, 2]]

# Array()関数
puts Array(nil).inspect         # []
puts Array([1, 2]).inspect      # [1, 2]
puts Array(1..3).inspect        # [1, 2, 3]

# Hash[]
pairs = [[:name, "Alice"], [:age, 30]]
puts Hash[pairs].inspect        # {:name=>"Alice", :age=>30}`}
          expectedOutput={`[1, 2, 3, 4, 5]
[[:a, 1], [:b, 2]]
[]
[1, 2]
[1, 2, 3]
{:name=>"Alice", :age=>30}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}
