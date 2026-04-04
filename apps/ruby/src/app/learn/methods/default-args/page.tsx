import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function DefaultArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト引数</h1>
        <p className="text-gray-400">引数に初期値を設定するデフォルト引数の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数とは</h2>
        <p className="text-gray-300 mb-4">
          デフォルト引数を設定すると、呼び出し時に省略できる引数を定義できます。
          省略された場合はデフォルト値が使われます。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(x, y = 10)</code> — yのデフォルトは10</li>
          <li>デフォルト引数は通常引数の後に置く（中間に置くことも可能）</li>
          <li>デフォルト値には式や他の引数も使える</li>
          <li>nil以外の任意の値をデフォルトにできる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なデフォルト引数</h2>
        <RubyEditor
          defaultCode={`# デフォルト引数
def greet(name, greeting = "こんにちは")
  "#{greeting}、#{name}！"
end

puts greet("Alice")              # デフォルト使用
puts greet("Bob", "おはよう")    # 上書き
puts greet("Carol", "こんばんは") # 上書き

# 数値のデフォルト
def power(base, exponent = 2)
  base ** exponent
end

puts power(3)     # 9 (3²)
puts power(2, 8)  # 256 (2⁸)
puts power(10, 3) # 1000 (10³)`}
          expectedOutput={`こんにちは、Alice！
おはよう、Bob！
こんばんは、Carol！
9
256
1000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 式をデフォルト値に</h2>
        <RubyEditor
          defaultCode={`# デフォルト値に式を使う
def repeat(str, times = str.length)
  str * times
end

puts repeat("ab")    # ababab (lengthは2、2回繰り返し)
puts repeat("abc", 3) # abcabcabc

# デフォルト値に他の引数を使う
def create_list(items, separator = ", ", prefix = "")
  items.map { |i| "#{prefix}#{i}" }.join(separator)
end

puts create_list(["apple", "banana", "cherry"])
puts create_list(["apple", "banana", "cherry"], " | ")
puts create_list(["apple", "banana", "cherry"], ", ", "- ")`}
          expectedOutput={`ababab
abcabcabc
apple, banana, cherry
apple | banana | cherry
- apple, - banana, - cherry`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数のデフォルト引数</h2>
        <RubyEditor
          defaultCode={`# 複数のデフォルト引数
def format_number(n, decimals = 2, separator = ",")
  integer_part = n.to_i.to_s.reverse.scan(/.{1,3}/).join(separator).reverse
  decimal_part = (n - n.to_i).round(decimals).to_s[1..]
  "#{integer_part}#{decimal_part}"
end

puts format_number(1234567.891)       # 1,234,567.89
puts format_number(9999.5, 0)         # 9,999
puts format_number(1234567.5, 2, "_") # 1_234_567.5

# HTTP リクエスト風の例
def send_request(url, method = "GET", headers = {}, timeout = 30)
  "#{method} #{url} (timeout: #{timeout}s, headers: #{headers.length}個)"
end

puts send_request("https://example.com")
puts send_request("https://example.com/api", "POST")
puts send_request("https://example.com/api", "POST", { "Content-Type" => "application/json" })`}
          expectedOutput={`1,234,567.89
9,999
1_234_567.5
GET https://example.com (timeout: 30s, headers: 0個)
POST https://example.com/api (timeout: 30s, headers: 0個)
POST https://example.com/api (timeout: 30s, headers: 1個)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="default-args" />
      </div>
      <LessonNav lessons={lessons} currentId="default-args" basePath="/learn/methods" />
    </div>
  );
}
