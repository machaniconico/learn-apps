import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "initialize";

export default function InitializePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">コンストラクタ</h1>
          <p className="text-gray-400">
            initialize メソッドはインスタンス生成時に自動的に呼ばれるコンストラクタです。
            new に渡した引数がそのまま initialize に渡されます。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">initialize の特徴</h2>
          <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
            <li>ClassName.new を呼ぶと自動実行される</li>
            <li>戻り値は無視される（常に新しいインスタンスが返る）</li>
            <li>private メソッドとして定義される</li>
            <li>デフォルト引数・キーワード引数・可変長引数すべて使える</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`class Circle
  attr_reader :radius, :color

  def initialize(radius, color: "red")
    raise ArgumentError, "半径は正の数" unless radius > 0
    @radius = radius.to_f
    @color  = color
  end

  def area
    (Math::PI * @radius ** 2).round(2)
  end

  def perimeter
    (2 * Math::PI * @radius).round(2)
  end

  def to_s
    "Circle(r=#{@radius}, color=#{@color})"
  end
end

c1 = Circle.new(5)
c2 = Circle.new(3, color: "blue")
puts c1
puts "面積: #{c1.area}"
puts "周長: #{c1.perimeter}"
puts c2`}
          expectedOutput={`Circle(r=5.0, color=red)
面積: 78.54
周長: 31.42
Circle(r=3.0, color=blue)`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">ファクトリメソッドパターン</h2>
          <p className="text-gray-400 text-sm">
            initialize を直接呼ぶ代わりに、クラスメソッドでインスタンスを生成する
            ファクトリメソッドパターンがよく使われます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Color
  attr_reader :r, :g, :b

  def initialize(r, g, b)
    @r, @g, @b = r, g, b
  end

  # ファクトリメソッド：HEX文字列から生成
  def self.from_hex(hex)
    hex = hex.delete_prefix("#")
    r = hex[0..1].to_i(16)
    g = hex[2..3].to_i(16)
    b = hex[4..5].to_i(16)
    new(r, g, b)
  end

  def to_s
    "rgb(#{r}, #{g}, #{b})"
  end

  def to_hex
    "#%02x%02x%02x" % [r, g, b]
  end
end

c1 = Color.new(255, 128, 0)
c2 = Color.from_hex("#1a2b3c")
puts c1
puts c1.to_hex
puts c2`}
          expectedOutput={`rgb(255, 128, 0)
#ff8000
rgb(26, 43, 60)`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
