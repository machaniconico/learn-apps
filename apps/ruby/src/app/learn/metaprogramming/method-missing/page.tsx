import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "metaprogramming")!.lessons;

export default function MethodMissingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">メタプログラミング レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">method_missing</h1>
        <p className="text-gray-400">存在しないメソッドが呼ばれたときの処理をカスタマイズする方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">method_missingとは</h2>
        <p className="text-gray-300 mb-3">
          Rubyでは、定義されていないメソッドが呼ばれると通常<code className="bg-gray-800 px-1.5 py-0.5 rounded text-violet-300">NoMethodError</code>が発生します。
          しかし<code className="bg-gray-800 px-1.5 py-0.5 rounded text-violet-300">method_missing</code>を定義すると、その呼び出しをフックして動的に処理できます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">method_missing(name, *args, &block)</code> — 存在しないメソッド呼び出しをキャッチ</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">respond_to_missing?</code> — respond_to?との整合性を保つ</li>
          <li>処理できない場合は必ず<code className="bg-gray-800 px-1 rounded text-violet-300">super</code>を呼んでエラーを伝播させる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なmethod_missing</h2>
        <RubyEditor
          defaultCode={`class Ghost
  def method_missing(name, *args)
    puts "#{name}というメソッドは存在しませんが処理しました"
    puts "引数: #{args.inspect}"
  end

  def respond_to_missing?(name, include_private = false)
    true
  end
end

g = Ghost.new
g.hello
g.greet("Alice", "Bob")
puts g.respond_to?(:anything)`}
          expectedOutput={`helloというメソッドは存在しませんが処理しました
引数: []
greetというメソッドは存在しませんが処理しました
引数: ["Alice", "Bob"]
true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: プレフィックスを使った動的メソッド</h2>
        <RubyEditor
          defaultCode={`class FlexibleLogger
  LEVELS = %w[debug info warn error]

  def method_missing(name, *args)
    level = name.to_s
    if LEVELS.include?(level)
      puts "[#{level.upcase}] #{args.first}"
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    LEVELS.include?(name.to_s) || super
  end
end

logger = FlexibleLogger.new
logger.info("アプリケーション起動")
logger.warn("メモリ使用量が高い")
logger.error("接続タイムアウト")
puts logger.respond_to?(:debug)`}
          expectedOutput={`[INFO] アプリケーション起動
[WARN] メモリ使用量が高い
[ERROR] 接続タイムアウト
true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: DSL風のインターフェース</h2>
        <RubyEditor
          defaultCode={`class HtmlBuilder
  def initialize
    @html = ""
  end

  def method_missing(tag, content = nil, **attrs, &block)
    attr_str = attrs.map { |k, v| " #{k}=\"#{v}\"" }.join
    if block
      @html += "<#{tag}#{attr_str}>"
      instance_eval(&block)
      @html += "</#{tag}>"
    else
      @html += "<#{tag}#{attr_str}>#{content}</#{tag}>"
    end
    self
  end

  def respond_to_missing?(name, include_private = false)
    true
  end

  def to_s = @html
end

builder = HtmlBuilder.new
builder.h1("Hello, Ruby!")
builder.p("メタプログラミング", class: "intro")
puts builder.to_s`}
          expectedOutput={`<h1>Hello, Ruby!</h1><p class="intro">メタプログラミング</p>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="metaprogramming" lessonId="method-missing" />
      </div>
      <LessonNav lessons={lessons} currentId="method-missing" basePath="/learn/metaprogramming" />
    </div>
  );
}
