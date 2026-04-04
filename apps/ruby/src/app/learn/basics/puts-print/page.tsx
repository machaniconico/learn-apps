import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function PutsPrintPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">出力メソッド</h1>
        <p className="text-gray-400">puts・print・p・ppの違いと使い分けを完全に理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">4つの出力メソッド</h2>
        <div className="space-y-3 text-gray-400">
          <div className="flex gap-3">
            <code className="bg-gray-800 px-2 py-0.5 rounded text-blue-300 shrink-0">puts</code>
            <span>to_sで変換して出力 + 改行。配列は1要素1行。</span>
          </div>
          <div className="flex gap-3">
            <code className="bg-gray-800 px-2 py-0.5 rounded text-blue-300 shrink-0">print</code>
            <span>to_sで変換して出力。改行なし。</span>
          </div>
          <div className="flex gap-3">
            <code className="bg-gray-800 px-2 py-0.5 rounded text-blue-300 shrink-0">p</code>
            <span>inspectで変換して出力 + 改行。デバッグ用。戻り値はオブジェクト自身。</span>
          </div>
          <div className="flex gap-3">
            <code className="bg-gray-800 px-2 py-0.5 rounded text-blue-300 shrink-0">pp</code>
            <span>pretty_printで整形出力。複雑なオブジェクトを見やすく表示。</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: puts vs print</h2>
        <RubyEditor
          defaultCode={`# puts: 改行付き出力
puts "Hello"
puts "World"
puts           # 空行

# print: 改行なし
print "Hello"
print ", "
print "World"
print "\n"    # 手動で改行

# putsの配列処理
puts [1, 2, 3]  # 各要素を1行ずつ

# printは配列をそのまま
print [1, 2, 3]
print "\n"`}
          expectedOutput={`Hello
World

Hello, World
1
2
3
[1, 2, 3]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: p と pp</h2>
        <RubyEditor
          defaultCode={`# p: inspectで出力 (型情報保持)
p "hello"       # "hello" (クォートあり)
p 42            # 42
p nil           # nil
p [1, "two", :three]  # [1, "two", :three]

# puts と p の違い
str = "  空白あり  "
puts str  # 空白あり (見た目通り)
p str     # "  空白あり  " (型情報あり)

# p は戻り値がオブジェクト自身
result = p 42   # 42 を出力
puts result + 1 # 43 (戻り値を使える)`}
          expectedOutput={`"hello"
42
nil
[1, "two", :three]
  空白あり
"  空白あり  "
42
43`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 実用的な使い分け</h2>
        <RubyEditor
          defaultCode={`# ユーザー向け出力 -> puts
name = "Alice"
age = 30
puts "名前: #{name}"
puts "年齢: #{age}歳"

# デバッグ用 -> p
data = { users: ["Alice", "Bob"], count: 2 }
p data  # ハッシュを確認

# 複数値のデバッグ
x, y = 10, 20
p x, y  # 複数引数OK

# $stderr への出力 (エラーストリーム)
$stderr.puts "警告: この操作は危険です"`}
          expectedOutput={`名前: Alice
年齢: 30歳
{:users=>["Alice", "Bob"], :count=>2}
10
20
警告: この操作は危険です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="puts-print" />
      </div>
      <LessonNav lessons={lessons} currentId="puts-print" basePath="/learn/basics" />
    </div>
  );
}
