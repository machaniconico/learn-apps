import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "inheritance")!;
const lessonId = "super-keyword";

export default function SuperKeywordPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-orange-400 text-sm font-medium mb-2">継承</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">super</h1>
          <p className="text-gray-400">
            super キーワードを使うと親クラスの同名メソッドを呼び出せます。
            引数の渡し方によって動作が変わります。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">super の3つの使い方</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div>
              <code className="text-orange-400 bg-gray-800 px-2 py-0.5 rounded">super</code>
              <span className="ml-2">— 現在のメソッドと同じ引数を親に渡す</span>
            </div>
            <div>
              <code className="text-orange-400 bg-gray-800 px-2 py-0.5 rounded">super(arg1, arg2)</code>
              <span className="ml-2">— 指定した引数を親に渡す</span>
            </div>
            <div>
              <code className="text-orange-400 bg-gray-800 px-2 py-0.5 rounded">super()</code>
              <span className="ml-2">— 引数なしで親を呼ぶ</span>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`class Logger
  def log(message)
    puts "[LOG] #{message}"
  end
end

class TimestampLogger < Logger
  def log(message)
    # superで親のlogを呼びつつ、前後に処理を追加
    super("[#{Time.now.strftime('%H:%M:%S')}] #{message}")
  end
end

class PrefixLogger < Logger
  def initialize(prefix)
    @prefix = prefix
  end

  def log(message)
    super("#{@prefix}: #{message}")  # 引数を変えてsuperを呼ぶ
  end
end

TimestampLogger.new.log("起動")
PrefixLogger.new("ERROR").log("ファイルが見つかりません")`}
          expectedOutput={`[LOG] [00:00:00] 起動
[LOG] ERROR: ファイルが見つかりません`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">initialize での super</h2>
          <p className="text-gray-400 text-sm">
            子クラスの initialize で super を呼ぶことで親クラスの初期化処理を再利用できます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Shape
  attr_reader :color

  def initialize(color: "black")
    @color = color
  end

  def area = 0
  def to_s = "#{self.class.name}(color=#{color}, area=#{area})"
end

class Rectangle < Shape
  attr_reader :width, :height

  def initialize(width, height, color: "black")
    super(color: color)  # 親のinitializeを呼ぶ
    @width  = width
    @height = height
  end

  def area = width * height
end

class Square < Rectangle
  def initialize(side, color: "black")
    super(side, side, color: color)  # Rectangleのinitializeを呼ぶ
  end
end

r = Rectangle.new(5, 3, color: "red")
s = Square.new(4)
puts r
puts s`}
          expectedOutput={`Rectangle(color=red, area=15)
Square(color=black, area=16)`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="inheritance" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/inheritance" />
      </div>
    </div>
  );
}
