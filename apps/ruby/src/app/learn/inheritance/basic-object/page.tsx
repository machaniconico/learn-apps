import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "inheritance")!;
const lessonId = "basic-object";

export default function BasicObjectPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-orange-400 text-sm font-medium mb-2">継承</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">BasicObject</h1>
          <p className="text-gray-400">
            Ruby のオブジェクト階層の頂点は BasicObject です。
            BasicObject → Kernel（モジュール） → Object という構造を理解しましょう。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">オブジェクト階層</h2>
          <div className="font-mono text-sm text-gray-300 space-y-1">
            <p className="text-orange-400">BasicObject</p>
            <p className="pl-4 text-gray-400">↑ (Kernel モジュールが include される)</p>
            <p className="pl-4">Object</p>
            <p className="pl-8 text-gray-400">↑ ほぼすべてのクラスはここから継承</p>
            <p className="pl-8">Integer / String / Array / Hash / ...</p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <p><span className="text-orange-400">BasicObject</span> — 最小限のメソッドのみ（==, !, __send__ など）</p>
            <p><span className="text-orange-400">Kernel</span> — puts, p, require などの基本メソッドを提供するモジュール</p>
            <p><span className="text-orange-400">Object</span> — 一般的なクラスの基底。Kernel をインクルード済み</p>
          </div>
        </div>

        <RubyEditor
          defaultCode={`# オブジェクト階層の確認
puts Integer.ancestors.inspect
puts String.superclass
puts Object.superclass
puts BasicObject.superclass.inspect  # => nil（頂点）

# BasicObjectが持つメソッドは最小限
puts BasicObject.instance_methods(false).sort.inspect

# ObjectはKernelのメソッドを持つ
puts Object.include?(Kernel)  # => true`}
          expectedOutput={`[Integer, Numeric, Comparable, Object, Kernel, BasicObject]
Object
BasicObject
nil
[:!, :!=, :==, :__id__, :__send__, :equal?, :instance_eval, :instance_exec]
true`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">BasicObject を直接継承する使い方</h2>
          <p className="text-gray-400 text-sm">
            BasicObject を直接継承すると Object のメソッド（puts, class, nil? など）を持たない
            クリーンなオブジェクトを作れます。プロキシや DSL の実装に使われます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# BasicObjectを継承したプロキシ
class BlankSlate < BasicObject
  def initialize(target)
    @target = target
  end

  def method_missing(name, *args, &block)
    ::Kernel.puts "メソッド呼び出し: #{name}(#{args.join(', ')})"
    @target.__send__(name, *args, &block)
  end
end

proxy = BlankSlate.new([1, 2, 3])
proxy.push(4)
proxy.length`}
          expectedOutput={`メソッド呼び出し: push(4)
メソッド呼び出し: length`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="inheritance" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/inheritance" />
      </div>
    </div>
  );
}
