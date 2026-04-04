import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">単一行コメント・複数行コメント・マジックコメントを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの種類</h2>
        <ul className="space-y-3 text-gray-400">
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300"># コメント</code>
            <span className="ml-2">— 単一行コメント。行末まで無視される。</span>
          </li>
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">=begin ... =end</code>
            <span className="ml-2">— 複数行コメント。行頭に=begin/=endを書く。</span>
          </li>
          <li>
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300"># frozen_string_literal: true</code>
            <span className="ml-2">— マジックコメント。ファイル先頭に書き動作を変更。</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 単一行コメント</h2>
        <RubyEditor
          defaultCode={`# これはコメントです
puts "Hello" # 行末コメントも可能

# 複数の単一行コメントで
# 複数行のコメントブロックを作る
# ことが一般的です

name = "Ruby" # 変数に代入
puts name`}
          expectedOutput={`Hello
Ruby`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数行コメント</h2>
        <RubyEditor
          defaultCode={`=begin
これは複数行コメントです。
=begin と =end は行頭に書く必要があります。
インデントするとコメントになりません。

主にドキュメントやコードブロックの
一時的な無効化に使われます。
=end

puts "複数行コメントの後"

# RDocスタイルのドキュメントコメント
# @param name [String] 名前
# @return [String] 挨拶文字列
def greet(name)
  "こんにちは、#{name}！"
end

puts greet("Ruby")`}
          expectedOutput={`複数行コメントの後
こんにちは、Ruby！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: マジックコメント</h2>
        <RubyEditor
          defaultCode={`# frozen_string_literal: true
# encoding: UTF-8
# これらはファイル先頭に書くマジックコメント

# frozen_string_literal: true を有効にすると
# 文字列リテラルが自動的にfreezeされる
str = "hello"
puts str.frozen?  # true (マジックコメントがある場合)

# __END__ : ファイルの実質的な終端
# __END__以降はRubyコードとして解釈されない
puts "プログラムの終わり"

__END__
この部分はコードとして実行されません。
DATAオブジェクトでアクセスできます。`}
          expectedOutput={`true
プログラムの終わり`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
