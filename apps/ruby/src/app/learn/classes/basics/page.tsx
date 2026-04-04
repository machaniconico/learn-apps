import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "basics";

export default function ClassesBasicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">クラスの基本</h1>
          <p className="text-gray-400">
            class キーワードでクラスを定義し、new メソッドでインスタンスを作成します。
            Ruby のすべてのオブジェクトはクラスのインスタンスです。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">クラス定義の基本</h2>
          <p className="text-gray-400 text-sm mb-4">
            クラス名はキャメルケース（PascalCase）で書きます。
            <code className="text-violet-400 bg-gray-800 px-1 rounded mx-1">ClassName.new</code> でインスタンスを生成します。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>class キーワードで定義</li>
            <li>クラス名は大文字始まり（PascalCase）</li>
            <li>.new でインスタンスを生成</li>
            <li>def でインスタンスメソッドを定義</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`# クラスの定義
class Dog
  def bark
    "ワン！"
  end

  def fetch(item)
    "#{item}を取ってきました！"
  end
end

# インスタンスの生成
pochi = Dog.new
puts pochi.bark
puts pochi.fetch("ボール")

# クラスとインスタンスの確認
puts pochi.class         # => Dog
puts pochi.is_a?(Dog)    # => true
puts Dog.instance_methods(false).inspect`}
          expectedOutput={`ワン！
ボールを取ってきました！
Dog
true
[:bark, :fetch]`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">Rubyはすべてオブジェクト</h2>
          <p className="text-gray-400 text-sm">
            Ruby では整数・文字列・nil・true・false を含むすべてがオブジェクトです。
            すべてのオブジェクトはいずれかのクラスのインスタンスです。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# すべてがオブジェクト
puts 42.class          # => Integer
puts 3.14.class        # => Float
puts "hello".class     # => String
puts true.class        # => TrueClass
puts nil.class         # => NilClass
puts [].class          # => Array
puts {}.class          # => Hash
puts :sym.class        # => Symbol

# メソッドもオブジェクト
puts method(:puts).class  # => Method`}
          expectedOutput={`Integer
Float
String
TrueClass
NilClass
Array
Hash
Symbol
Method`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
