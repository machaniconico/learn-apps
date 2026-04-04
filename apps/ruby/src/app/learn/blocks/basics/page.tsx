import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "blocks")!;
const lessonId = "basics";

export default function BlocksBasicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ブロック・Proc・Lambda</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">ブロックの基本</h1>
          <p className="text-gray-400">
            Rubyのブロックは do...end または {} で記述するコードのまとまりです。
            メソッドに渡して処理の一部をカスタマイズできます。
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">do...end と {"{}"} の違い</h2>
          <p className="text-gray-400 text-sm mb-4">
            ブロックは2種類の記法があります。複数行は <code className="text-pink-400 bg-gray-800 px-1 rounded">do...end</code>、
            1行は <code className="text-pink-400 bg-gray-800 px-1 rounded">{"{}"}</code> が慣例です。
            優先順位が異なりますが、通常のメソッド呼び出しでは同じ動作をします。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>do...end は複数行ブロックに適している</li>
            <li>{"{}"} は1行ブロックに適している</li>
            <li>ブロックパラメータは | | で囲む</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`# do...end 記法（複数行）
[1, 2, 3].each do |n|
  puts "数値: #{n}"
  puts "2倍: #{n * 2}"
end

# {} 記法（1行）
[1, 2, 3].each { |n| puts n * 3 }

# ブロックパラメータなし
3.times do
  puts "Hello!"
end`}
          expectedOutput={`数値: 1
2倍: 2
数値: 2
2倍: 4
数値: 3
2倍: 6
3
6
9
Hello!
Hello!
Hello!`}
        />

        {/* Section 2 */}
        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">ブロックパラメータ</h2>
          <p className="text-gray-400 text-sm mb-4">
            ブロックは <code className="text-pink-400 bg-gray-800 px-1 rounded">|変数名|</code> で引数を受け取れます。
            複数の引数もカンマで区切って指定できます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# 複数のブロックパラメータ
{ a: 1, b: 2, c: 3 }.each do |key, value|
  puts "#{key} => #{value}"
end

# each_with_index
%w[Ruby Python Go].each_with_index do |lang, i|
  puts "#{i + 1}. #{lang}"
end

# mapでブロックの戻り値を使う
squares = [1, 2, 3, 4, 5].map { |n| n ** 2 }
puts squares.inspect`}
          expectedOutput={`a => 1
b => 2
c => 3
1. Ruby
2. Python
3. Go
[1, 4, 9, 16, 25]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="blocks" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/blocks" />
      </div>
    </div>
  );
}
