import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "exceptions")!;

export default function ExceptionHierarchyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-orange-400">例外処理</p>
        <h1 className="text-3xl font-bold text-gray-100">例外の階層</h1>
        <p className="text-gray-400">
          RubyのException階層を理解します。StandardErrorとExceptionの違いを知り、適切な例外をキャッチする設計ができるようになりましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">例外クラスの階層構造</h2>
        <p className="text-gray-400 text-sm">
          Rubyの例外は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">Exception</code> を頂点とする階層構造を持ちます。
          通常のアプリケーションエラーは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">StandardError</code> の子クラスです。
        </p>
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1">
          <p>Exception</p>
          <p className="pl-4">├─ StandardError</p>
          <p className="pl-8">├─ RuntimeError（raiseのデフォルト）</p>
          <p className="pl-8">├─ ArgumentError</p>
          <p className="pl-8">├─ TypeError</p>
          <p className="pl-8">├─ NameError</p>
          <p className="pl-12">└─ NoMethodError</p>
          <p className="pl-8">├─ ZeroDivisionError</p>
          <p className="pl-8">├─ IOError</p>
          <p className="pl-8">└─ IndexError</p>
          <p className="pl-4">├─ ScriptError</p>
          <p className="pl-8">└─ SyntaxError, LoadError, NotImplementedError</p>
          <p className="pl-4">├─ SignalException（Interrupt含む）</p>
          <p className="pl-4">└─ SystemExit</p>
        </div>
      </div>

      <RubyEditor
        defaultCode={`# 継承関係の確認
puts RuntimeError.ancestors.first(5).inspect
puts ArgumentError.superclass
puts NoMethodError.superclass
puts NoMethodError.ancestors.first(4).inspect

# is_a? で階層確認
begin
  raise NoMethodError, "undefined method"
rescue StandardError => e
  puts "StandardErrorとしてキャッチ"
  puts "is_a?(StandardError): #{e.is_a?(StandardError)}"
  puts "is_a?(Exception): #{e.is_a?(Exception)}"
  puts "クラス: #{e.class}"
end`}
        expectedOutput={`[RuntimeError, StandardError, Exception, Object, Kernel]
StandardError
NameError
[NoMethodError, NameError, StandardError, Exception]
StandardErrorとしてキャッチ
is_a?(StandardError): true
is_a?(Exception): true
クラス: NoMethodError`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">StandardError vs Exception</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue Exception</code> はSignalExceptionやSystemExitまでキャッチしてしまうため危険です。
          通常は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue StandardError</code>（または省略形の <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue</code>）を使います。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 一般的な例外をキャッチ
def safe_operation
  begin
    yield
  rescue StandardError => e
    puts "StandardErrorをキャッチ: #{e.class} - #{e.message}"
  end
end

safe_operation { raise RuntimeError, "実行時エラー" }
safe_operation { raise ArgumentError, "引数エラー" }
safe_operation { Integer("abc") }
safe_operation { [1,2,3].fetch(99) }

# 各例外クラスのデフォルトメッセージ
[ZeroDivisionError, TypeError, NameError].each do |klass|
  puts "#{klass}: superclass = #{klass.superclass}"
end`}
        expectedOutput={`StandardErrorをキャッチ: RuntimeError - 実行時エラー
StandardErrorをキャッチ: ArgumentError - 引数エラー
StandardErrorをキャッチ: ArgumentError - invalid value for Integer(): "abc"
StandardErrorをキャッチ: IndexError - index 99 outside of array bounds: -3...3
ZeroDivisionError: superclass = StandardError
TypeError: superclass = StandardError
NameError: superclass = StandardError`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">特定例外の優先キャッチ</h2>
        <p className="text-gray-400 text-sm">
          複数のrescue節はシリアルに評価され、最初にマッチしたものが実行されます。より具体的な例外クラスを先に書きます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`def classify_error(error_class)
  begin
    raise error_class, "テストエラー"
  rescue NoMethodError => e
    puts "NoMethodError（最も具体的）: #{e.class}"
  rescue NameError => e
    puts "NameError（親クラス）: #{e.class}"
  rescue StandardError => e
    puts "StandardError（汎用）: #{e.class}"
  end
end

classify_error(NoMethodError)
classify_error(NameError)
classify_error(ArgumentError)
classify_error(ZeroDivisionError)`}
        expectedOutput={`NoMethodError（最も具体的）: NoMethodError
NameError（親クラス）: NameError
StandardError（汎用）: ArgumentError
StandardError（汎用）: ZeroDivisionError`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="exceptions" lessonId="exception-hierarchy" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="exception-hierarchy"
        basePath="/learn/exceptions"
      />
    </div>
  );
}
