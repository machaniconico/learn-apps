import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">Rubyの基本的なデータ型を理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyの主なデータ型</h2>
        <p className="text-gray-300 mb-4">
          Rubyでは全てがオブジェクトです。基本的なデータ型も例外ではありません。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Integer</code> — 整数 (1, -5, 1_000_000)</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Float</code> — 浮動小数点数 (3.14, -0.5)</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">String</code> — 文字列 ("hello", 'world')</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Symbol</code> — シンボル (:name, :age)</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Array</code> — 配列 ([1, 2, 3])</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Hash</code> — ハッシュ ({"{"}key: value{"}"})</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">true / false</code> — 真偽値</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">nil</code> — 値なし</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 数値・文字列・シンボル</h2>
        <RubyEditor
          defaultCode={`# Integer と Float
num_int = 42
num_float = 3.14
puts num_int.class    # Integer
puts num_float.class  # Float

# String
str = "Hello, Ruby!"
puts str.class        # String
puts str.length       # 12

# Symbol
sym = :username
puts sym.class        # Symbol
puts sym.to_s         # username`}
          expectedOutput={`Integer
Float
String
12
Symbol
username`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 配列とハッシュ</h2>
        <RubyEditor
          defaultCode={`# Array
fruits = ["apple", "banana", "cherry"]
puts fruits.class     # Array
puts fruits.length    # 3
puts fruits[0]        # apple
puts fruits.last      # cherry

# Hash
user = { name: "Alice", age: 30, admin: false }
puts user.class       # Hash
puts user[:name]      # Alice
puts user[:age]       # 30`}
          expectedOutput={`Array
3
apple
cherry
Hash
Alice
30`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 真偽値とnil</h2>
        <RubyEditor
          defaultCode={`# true と false
t = true
f = false
puts t.class  # TrueClass
puts f.class  # FalseClass

# nil
nothing = nil
puts nothing.class  # NilClass
puts nothing.nil?   # true

# Rubyでは nil と false だけが偽
puts "nilは偽" if !nil
puts "falseは偽" if !false
puts "0は真!" if 0       # 0は真（他言語と異なる）
puts "空文字も真!" if "" # 空文字も真`}
          expectedOutput={`TrueClass
FalseClass
NilClass
true
nilは偽
falseは偽
0は真!
空文字も真!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}
