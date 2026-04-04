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
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列メソッド</h1>
        <p className="text-gray-400">split・join・gsub・sub・strip など頻出メソッドを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">頻出文字列メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyの String クラスは100以上のメソッドを持ちます。split/join はよく組み合わせて使い、gsub は正規表現と組み合わせることで強力な置換が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-purple-400">split(sep)</code>: 文字列を分割して配列に</li>
          <li><code className="text-purple-400">strip</code> / <code className="text-purple-400">lstrip</code> / <code className="text-purple-400">rstrip</code>: 空白除去</li>
          <li><code className="text-purple-400">gsub(pattern, replacement)</code>: 全置換</li>
          <li><code className="text-purple-400">sub(pattern, replacement)</code>: 最初のみ置換</li>
          <li><code className="text-purple-400">include?(str)</code>: 含むか確認</li>
          <li><code className="text-purple-400">start_with?</code> / <code className="text-purple-400">end_with?</code>: 前後確認</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">split・join・strip</h2>
        <RubyEditor
          defaultCode={`# split: 分割
csv = "Alice,30,Tokyo"
parts = csv.split(",")
puts parts.inspect

# join: 結合
puts parts.join(" | ")

# strip: 空白除去
padded = "  hello world  "
puts padded.strip.inspect
puts padded.lstrip.inspect

# include?
puts "Hello Ruby".include?("Ruby")
puts "Hello Ruby".start_with?("Hello")`}
          expectedOutput={`["Alice", "30", "Tokyo"]
Alice | 30 | Tokyo
"hello world"
"hello world  "
true
true`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">gsub と sub</h2>
        <RubyEditor
          defaultCode={`text = "the cat sat on the mat"

# gsub: 全置換
puts text.gsub("at", "ot")

# sub: 最初のみ置換
puts text.sub("the", "a")

# gsub と正規表現
puts "Hello World 123".gsub(/[0-9]+/, "NUM")

# gsub にブロック
puts "hello world".gsub(/\w+/) { |w| w.capitalize }`}
          expectedOutput={`the cot sot on the mot
a cat sat on the mat
Hello World NUM
Hello World`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="methods-overview" />
      </div>
      <LessonNav lessons={lessons} currentId="methods-overview" basePath="/learn/strings" />
    </div>
  );
}
