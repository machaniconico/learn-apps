import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "strings")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基礎</h1>
        <p className="text-gray-400">Rubyのミュータブルな String オブジェクトの基本を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyの文字列はミュータブル（変更可能）なオブジェクトです。ダブルクォートはエスケープシーケンスと式展開をサポートし、シングルクォートはリテラルに近い動作をします。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>ダブルクォート: <code className="text-purple-400">"hello\nworld"</code>（エスケープ・式展開あり）</li>
          <li>シングルクォート: <code className="text-purple-400">{'\'hello\\nworld\''}</code>（リテラル）</li>
          <li>文字列連結: <code className="text-purple-400">str1 + str2</code> または <code className="text-purple-400">str1 &lt;&lt; str2</code></li>
          <li>繰り返し: <code className="text-purple-400">"ab" * 3</code> → <code className="text-purple-400">"ababab"</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本操作</h2>
        <RubyEditor
          defaultCode={`# ダブルクォートとシングルクォート
name = "Ruby"
puts "Hello, #{name}!"
puts 'Hello, #{name}!'

# 文字列の長さとアクセス
str = "Hello"
puts str.length
puts str[0]
puts str[-1]
puts str[1..3]`}
          expectedOutput={`Hello, Ruby!
Hello, #{name}!
5
H
o
ell`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">文字列の変更と連結</h2>
        <RubyEditor
          defaultCode={`# 連結（新しい文字列を返す）
s1 = "Hello"
s2 = " World"
s3 = s1 + s2
puts s3

# << は破壊的に追加（ミュータブル）
s4 = "Hello"
s4 << " Ruby"
puts s4

# 繰り返し
puts "ha" * 3
puts "-" * 20

# 大文字・小文字変換
puts "hello WORLD".upcase
puts "hello WORLD".downcase
puts "hello world".capitalize`}
          expectedOutput={`Hello World
Hello Ruby
hahaha
--------------------
HELLO WORLD
hello world
Hello world`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/strings" />
    </div>
  );
}
