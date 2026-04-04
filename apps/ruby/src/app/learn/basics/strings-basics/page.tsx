import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">Rubyの文字列（String）の作成・操作・メソッドを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列リテラル</h2>
        <p className="text-gray-300 mb-4">
          Rubyの文字列はダブルクォート<code className="bg-gray-800 px-1 rounded">{'"'}</code>またはシングルクォート<code className="bg-gray-800 px-1 rounded">{"'"}</code>で囲みます。
          主な違いは式展開とエスケープシーケンスの扱いです。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">{'"...'}{'"'}</code> — 式展開 <code>#{'{'}{'{'}...{'}'}</code> と<code>\n</code>などのエスケープが有効</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">{"'...'"}</code> — 式展開なし。<code>\\</code>と<code>{"\\'"}</code>のみエスケープ可</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 文字列の作成と結合</h2>
        <RubyEditor
          defaultCode={`# ダブルクォートとシングルクォート
name = "Alice"
double_q = "Hello, #{name}!"  # 式展開あり
single_q = 'Hello, #{name}!'  # 式展開なし
puts double_q  # Hello, Alice!
puts single_q  # Hello, #{name}!

# 文字列の結合
str1 = "Hello"
str2 = "World"
puts str1 + ", " + str2 + "!"  # 結合
puts "#{str1}, #{str2}!"       # 式展開（推奨）

# <<演算子で破壊的に追加
str = "Hello"
str << ", Ruby"
puts str  # Hello, Ruby`}
          expectedOutput={`Hello, Alice!
Hello, #{name}!
Hello, World!
Hello, World!
Hello, Ruby`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 文字列メソッド</h2>
        <RubyEditor
          defaultCode={`str = "Hello, Ruby!"

puts str.length        # 12
puts str.upcase        # HELLO, RUBY!
puts str.downcase      # hello, ruby!
puts str.reverse       # !ybuR ,olleH
puts str.include?("Ruby")  # true
puts str.start_with?("Hello")  # true
puts str.gsub("Ruby", "World") # Hello, World!

# 分割と結合
words = "apple,banana,cherry".split(",")
puts words.inspect     # ["apple", "banana", "cherry"]
puts words.join(" - ") # apple - banana - cherry`}
          expectedOutput={`12
HELLO, RUBY!
hello, ruby!
!ybuR ,olleH
true
true
Hello, World!
["apple", "banana", "cherry"]
apple - banana - cherry`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 文字列のスライスとトリム</h2>
        <RubyEditor
          defaultCode={`str = "  Hello, Ruby!  "

# 空白除去
puts str.strip   # "Hello, Ruby!"
puts str.lstrip  # "Hello, Ruby!  "
puts str.rstrip  # "  Hello, Ruby!"

# スライス
s = "Hello, Ruby!"
puts s[0]       # H
puts s[0, 5]    # Hello  (位置0から5文字)
puts s[7..]     # Ruby!  (7番目以降)
puts s[-5..]    # Ruby!  (後ろから5文字)`}
          expectedOutput={`Hello, Ruby!
Hello, Ruby!
  Hello, Ruby!
H
Hello
Ruby!
Ruby!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
