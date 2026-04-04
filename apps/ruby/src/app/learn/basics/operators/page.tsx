import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・論理・ビット演算子など、Rubyの演算子を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyの演算子</h2>
        <p className="text-gray-300 mb-4">
          Rubyの演算子の多くはメソッドとして実装されているため、オーバーライドや再定義が可能です。
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <p className="text-gray-200 font-semibold mb-1">算術演算子</p>
            <p>+ - * / % ** (べき乗)</p>
          </div>
          <div>
            <p className="text-gray-200 font-semibold mb-1">比較演算子</p>
            <p>== != &lt; &gt; &lt;= &gt;= &lt;=&gt;</p>
          </div>
          <div>
            <p className="text-gray-200 font-semibold mb-1">論理演算子</p>
            <p>&amp;&amp; || ! and or not</p>
          </div>
          <div>
            <p className="text-gray-200 font-semibold mb-1">代入演算子</p>
            <p>= += -= *= /= %= **=</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 算術・比較演算子</h2>
        <RubyEditor
          defaultCode={`# 算術演算子
puts 10 + 3    # 13
puts 10 - 3    # 7
puts 10 * 3    # 30
puts 10 / 3    # 3  (整数÷整数 = 整数)
puts 10.0 / 3  # 3.3333...
puts 10 % 3    # 1  (剰余)
puts 2 ** 8    # 256 (べき乗)

# 比較演算子
puts 5 == 5   # true
puts 5 != 4   # true
puts 5 > 3    # true
puts 5 <= 5   # true

# 宇宙船演算子 <=>
puts (3 <=> 5)   # -1 (左が小さい)
puts (5 <=> 5)   # 0  (等しい)
puts (7 <=> 5)   # 1  (左が大きい)`}
          expectedOutput={`13
7
30
3
3.3333333333333335
1
256
true
true
true
true
-1
0
1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 論理・代入演算子</h2>
        <RubyEditor
          defaultCode={`# 論理演算子
puts true && false  # false
puts true || false  # true
puts !true          # false

# 短絡評価
def check(label)
  puts "#{label}を評価"
  true
end

# &&は左が偽なら右を評価しない
false && check("右辺")   # 右辺を評価しない
true || check("右辺")    # 右辺を評価しない

# 複合代入演算子
x = 10
x += 5   ; puts x  # 15
x -= 3   ; puts x  # 12
x *= 2   ; puts x  # 24
x **= 2  ; puts x  # 576`}
          expectedOutput={`false
true
false
15
12
24
576`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Rubyらしい演算子</h2>
        <RubyEditor
          defaultCode={`# === (case等価演算子)
puts (1..10) === 5    # true (範囲内か)
puts String === "hi"  # true (クラスか)
puts /\d+/ === "42"   # true (マッチするか)

# .. と ... (範囲演算子)
puts (1..5).to_a.inspect   # [1, 2, 3, 4, 5] (終端含む)
puts (1...5).to_a.inspect  # [1, 2, 3, 4]   (終端含まない)

# defined? 演算子
name = "Alice"
puts defined?(name)         # local-variable
puts defined?(undefined_v)  # nil (未定義)`}
          expectedOutput={`true
true
true
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
local-variable
nil`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}
