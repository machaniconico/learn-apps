import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">Rubyの変数の種類と使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数の種類</h2>
        <p className="text-gray-300 mb-4">Rubyには4種類の変数があり、先頭の文字で区別します。</p>
        <ul className="space-y-3 text-gray-400">
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">local_var</code>
            <span className="ml-2">— ローカル変数。小文字またはアンダースコアで始まる。最も一般的。</span>
          </li>
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">@instance_var</code>
            <span className="ml-2">— インスタンス変数。@で始まる。クラスのインスタンスに属する。</span>
          </li>
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">@@class_var</code>
            <span className="ml-2">— クラス変数。@@で始まる。クラス全体で共有される。</span>
          </li>
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">$global_var</code>
            <span className="ml-2">— グローバル変数。$で始まる。プログラム全体からアクセスできる。</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ローカル変数</h2>
        <RubyEditor
          defaultCode={`# ローカル変数
name = "Alice"
age = 30
height = 1.65

puts name
puts age
puts height

# 複数代入
x, y, z = 1, 2, 3
puts "x=#{x}, y=#{y}, z=#{z}"

# 変数の交換
a, b = 10, 20
a, b = b, a
puts "a=#{a}, b=#{b}"`}
          expectedOutput={`Alice
30
1.65
x=1, y=2, z=3
a=20, b=10`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: インスタンス変数とクラス変数</h2>
        <RubyEditor
          defaultCode={`class Counter
  @@count = 0  # クラス変数

  def initialize(name)
    @name = name   # インスタンス変数
    @@count += 1
  end

  def info
    "#{@name} (合計: #{@@count}個)"
  end
end

c1 = Counter.new("第1カウンター")
c2 = Counter.new("第2カウンター")
puts c1.info
puts c2.info`}
          expectedOutput={`第1カウンター (合計: 2個)
第2カウンター (合計: 2個)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: グローバル変数</h2>
        <RubyEditor
          defaultCode={`$app_name = "MyApp"  # グローバル変数

def show_header
  puts "=== #{$app_name} ==="
end

def show_footer
  puts "--- #{$app_name} ---"
end

show_header
puts "メインコンテンツ"
show_footer`}
          expectedOutput={`=== MyApp ===
メインコンテンツ
--- MyApp ---`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
