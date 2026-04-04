import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "comparison";

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">オブジェクトの比較</h1>
          <p className="text-gray-400">
            Ruby には == / eql? / equal? / &lt;=&gt; という異なる比較メソッドがあります。
            それぞれが何を比較するのかを理解することが重要です。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">比較メソッドの違い</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">==</code>
              <span>値が等しいか（意味的な等価性）。サブクラスでオーバーライドして定義する。</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">eql?</code>
              <span>== と同様だが Hash のキー比較に使われる。型も一致する必要がある。</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">equal?</code>
              <span>同一オブジェクトか（object_id が等しいか）。オーバーライドすべきでない。</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">{"<=>"}</code>
              <span>大小比較。-1/0/1 または nil を返す。Comparable で活用される。</span>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`# == vs eql? vs equal?
a = "hello"
b = "hello"
c = a

puts a == b      # => true  (値が等しい)
puts a.eql?(b)   # => true  (値と型が等しい)
puts a.equal?(b) # => false (別オブジェクト)
puts a.equal?(c) # => true  (同じオブジェクト)

# 数値での違い
puts 1 == 1.0      # => true  (== は型変換あり)
puts 1.eql?(1.0)   # => false (eql? は型も見る)

puts 1.object_id == 2.object_id  # => false`}
          expectedOutput={`true
true
false
true
true
false
false`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">カスタムクラスでの == の実装</h2>
          <p className="text-gray-400 text-sm">
            独自クラスでは == をオーバーライドして値ベースの等価性を定義します。
            eql? と hash もセットで実装するのがベストプラクティスです。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Vector2D
  attr_reader :x, :y

  def initialize(x, y)
    @x = x.to_f
    @y = y.to_f
  end

  def ==(other)
    other.is_a?(Vector2D) && x == other.x && y == other.y
  end

  def eql?(other)
    self == other
  end

  def hash
    [x, y].hash
  end

  def <=>(other)
    magnitude <=> other.magnitude
  end

  def magnitude
    Math.sqrt(x**2 + y**2).round(4)
  end

  def to_s = "(#{x}, #{y})"
end

v1 = Vector2D.new(3, 4)
v2 = Vector2D.new(3, 4)
v3 = Vector2D.new(1, 1)

puts v1 == v2          # => true
puts v1.equal?(v2)     # => false
puts (v1 <=> v3)       # => 1 (v1の方が大きい)
puts v1.magnitude      # => 5.0`}
          expectedOutput={`true
false
1
5.0`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
