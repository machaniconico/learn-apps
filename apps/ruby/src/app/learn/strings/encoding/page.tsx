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
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エンコーディング</h1>
        <p className="text-gray-400">Rubyの文字エンコーディングの仕組みと扱いを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">エンコーディングとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Ruby 1.9以降、各文字列はエンコーディング情報を持ちます。Ruby 3ではデフォルトが UTF-8 です。マジックコメント <code className="text-purple-400"># encoding: utf-8</code> でファイルのエンコーディングを指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-purple-400">str.encoding</code>: エンコーディング確認</li>
          <li><code className="text-purple-400">str.encode("UTF-8")</code>: エンコード変換</li>
          <li><code className="text-purple-400">str.bytesize</code>: バイト数</li>
          <li><code className="text-purple-400">str.length</code>: 文字数（マルチバイト対応）</li>
          <li><code className="text-purple-400">str.chars</code>: 文字の配列</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">エンコーディングの確認</h2>
        <RubyEditor
          defaultCode={`# エンコーディングの確認
str = "Hello, Ruby!"
puts str.encoding

# 日本語文字列
jpn = "こんにちは"
puts jpn.encoding
puts jpn.length
puts jpn.bytesize

# chars で文字に分割
puts jpn.chars.inspect`}
          expectedOutput={`UTF-8
UTF-8
5
15
["こ", "ん", "に", "ち", "は"]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">バイト操作と変換</h2>
        <RubyEditor
          defaultCode={`# bytes: バイト配列
str = "ABC"
puts str.bytes.inspect

# each_char で文字ごとに処理
"Ruby".each_char { |c| print c + "-" }
puts

# ord と chr の変換
puts "A".ord
puts 65.chr

# scrub: 不正バイトの修復
invalid = "Hello \xFF World"
puts invalid.scrub("?")
puts invalid.scrub { |b| b.unpack1("H*") }`}
          expectedOutput={`[65, 66, 67]
R-u-b-y-
65
A
Hello ? World
Hello ff World`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="encoding" />
      </div>
      <LessonNav lessons={lessons} currentId="encoding" basePath="/learn/strings" />
    </div>
  );
}
