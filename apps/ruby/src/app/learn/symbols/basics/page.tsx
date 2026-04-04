import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "symbols")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">シンボル レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シンボルの基本</h1>
        <p className="text-gray-400">コロン付きの識別子・シンボルの基礎を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">シンボルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シンボルはコロン(:)で始まる識別子で、名前を表す軽量なオブジェクトです。同じ名前のシンボルは常に同一のオブジェクト（同じ object_id）を持ち、イミュータブルです。ハッシュキーやメソッド名の参照に広く使われます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>作成: <code className="text-indigo-400">:name</code>、<code className="text-indigo-400">:hello_world</code></li>
          <li>文字列から: <code className="text-indigo-400">"name".to_sym</code></li>
          <li>シンボルから文字列: <code className="text-indigo-400">:name.to_s</code></li>
          <li>全シンボル一覧: <code className="text-indigo-400">Symbol.all_symbols</code></li>
          <li>クラス: <code className="text-indigo-400">:name.class</code> → <code className="text-indigo-400">Symbol</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">シンボルの同一性</h2>
        <RubyEditor
          defaultCode={`# シンボルの基本
sym = :hello
puts sym
puts sym.class
puts sym.inspect

# 同じ名前は同じオブジェクト
puts :hello.object_id == :hello.object_id
puts :hello.equal?(:hello)

# 文字列との相互変換
puts :ruby.to_s
puts :ruby.to_s.class
puts "symbol".to_sym
puts "symbol".to_sym.class`}
          expectedOutput={`hello
Symbol
:hello
true
true
ruby
String
symbol
Symbol`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">シンボルのメソッド</h2>
        <RubyEditor
          defaultCode={`sym = :hello_world

# 大文字小文字変換
puts sym.upcase
puts sym.length

# 文字列同様のメソッド
puts :ruby.to_s.capitalize.to_sym.inspect

# シンボルの配列
methods = %i[push pop shift unshift]
puts methods.inspect
puts methods.map(&:to_s).inspect`}
          expectedOutput={`HELLO_WORLD
11
:Ruby
[:push, :pop, :shift, :unshift]
["push", "pop", "shift", "unshift"]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="symbols" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/symbols" />
    </div>
  );
}
