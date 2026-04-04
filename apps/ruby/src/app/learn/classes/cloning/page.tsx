import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "cloning";

export default function CloningPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">オブジェクトの複製</h1>
          <p className="text-gray-400">
            Ruby では dup と clone でオブジェクトをシャローコピーできます。
            ネストしたオブジェクトを含む場合はディープコピーが必要です。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">dup と clone の違い</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">dup</code>
              <span>シャローコピー。frozen 状態はコピーされない。特異メソッドはコピーされない。</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">clone</code>
              <span>シャローコピー。frozen 状態もコピーされる。特異メソッドもコピーされる。</span>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`# dup と clone の基本
str = "hello"
str.freeze

dup_str   = str.dup
clone_str = str.clone

puts dup_str.frozen?   # => false (dupはfrozenをコピーしない)
puts clone_str.frozen? # => true  (cloneはfrozenをコピーする)

# シャローコピーの注意点
original = { name: "Alice", scores: [90, 85, 95] }
copied   = original.dup

copied[:name] = "Bob"      # プリミティブは独立
copied[:scores] << 100     # ネストは共有される！

puts original[:name]        # => Alice (変わらない)
puts original[:scores].inspect # => [90, 85, 95, 100] (影響を受ける)`}
          expectedOutput={`false
true
Alice
[90, 85, 95, 100]`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">ディープコピーの実装</h2>
          <p className="text-gray-400 text-sm">
            Marshal を使うとディープコピーができます。ただし Marshal.dump できないオブジェクト（IOなど）には使えません。
            initialize_copy をオーバーライドして独自のコピーロジックを実装することも一般的です。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# Marshal を使ったディープコピー
original = { name: "Alice", scores: [90, 85, 95] }
deep_copy = Marshal.load(Marshal.dump(original))

deep_copy[:scores] << 100

puts original[:scores].inspect   # => [90, 85, 95] (影響なし)
puts deep_copy[:scores].inspect  # => [90, 85, 95, 100]

# initialize_copyで独自コピー
class Config
  attr_accessor :settings

  def initialize(settings = {})
    @settings = settings
  end

  def initialize_copy(original)
    super
    @settings = original.settings.dup
  end
end

c1 = Config.new({ debug: true, timeout: 30 })
c2 = c1.dup
c2.settings[:timeout] = 60

puts c1.settings[:timeout]  # => 30
puts c2.settings[:timeout]  # => 60`}
          expectedOutput={`[90, 85, 95]
[90, 85, 95, 100]
30
60`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
