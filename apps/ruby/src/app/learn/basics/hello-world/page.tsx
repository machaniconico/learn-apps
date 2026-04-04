import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello World</h1>
        <p className="text-gray-400">最初のRubyプログラムを書いて、出力メソッドの基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">putsメソッド</h2>
        <p className="text-gray-300 mb-3">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">puts</code> は
          「put string」の略で、文字列を出力して改行を追加します。Rubyで最もよく使う出力メソッドです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">puts</code> — 出力後に改行を付ける</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">print</code> — 改行なしで出力する</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">p</code> — オブジェクトをデバッグ表示する（inspectを使用）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なHello World</h2>
        <RubyEditor
          defaultCode={`# 最初のRubyプログラム
puts "Hello, World!"
puts "こんにちは、Ruby！"`}
          expectedOutput={`Hello, World!
こんにちは、Ruby！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 式展開（文字列補間）</h2>
        <RubyEditor
          defaultCode={`name = "Ruby"
version = 3.2

# #{}で変数を文字列に埋め込む
puts "#{name}へようこそ！"
puts "バージョン: #{version}"
puts "1 + 1 = #{1 + 1}"`}
          expectedOutput={`Rubyへようこそ！
バージョン: 3.2
1 + 1 = 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: puts・print・pの違い</h2>
        <RubyEditor
          defaultCode={`# puts: 改行あり
puts "apple"
puts "banana"

# print: 改行なし
print "Hello"
print ", "
print "World\n"

# p: inspectで表示（デバッグ用）
p "hello"     # => "hello" (クォートあり)
p 42          # => 42
p [1, 2, 3]   # => [1, 2, 3]`}
          expectedOutput={`apple
banana
Hello, World
"hello"
42
[1, 2, 3]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
