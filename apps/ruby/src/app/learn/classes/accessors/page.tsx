import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "accessors";

export default function AccessorsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">アクセサ</h1>
          <p className="text-gray-400">
            attr_reader、attr_writer、attr_accessor はインスタンス変数へのゲッター・セッターを
            自動生成するマクロです。手書きのコードを大幅に削減できます。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">3種類のアクセサ</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">attr_reader</code>
              <span>読み取り専用ゲッターを生成（@変数 を返すメソッド）</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">attr_writer</code>
              <span>書き込み専用セッターを生成（@変数= メソッド）</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">attr_accessor</code>
              <span>読み取り・書き込み両方を生成（attr_reader + attr_writer）</span>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`class Product
  attr_reader   :id           # 読み取りのみ
  attr_writer   :stock        # 書き込みのみ
  attr_accessor :name, :price # 読み書き両方

  def initialize(id, name, price, stock)
    @id    = id
    @name  = name
    @price = price
    @stock = stock
  end

  def info
    "#{@name}: #{@price}円 (在庫: #{@stock})"
  end
end

p = Product.new(1, "Ruby本", 3000, 10)
puts p.id
puts p.name
p.name  = "Ruby入門"
p.price = 2800
p.stock = 15
puts p.info`}
          expectedOutput={`1
Ruby本
Ruby入門: 2800円 (在庫: 15)`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">アクセサの内部動作</h2>
          <p className="text-gray-400 text-sm mb-3">
            attr_accessor :name は以下と同等のコードを自動生成します。
            カスタムバリデーションが必要な場合は手書きします。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Temperature
  # attr_accessor :celsius と同等の手書き実装
  def celsius
    @celsius
  end

  def celsius=(value)
    raise ArgumentError, "絶対零度以下は不可" if value < -273.15
    @celsius = value.to_f
  end

  def fahrenheit
    @celsius * 9.0 / 5.0 + 32
  end

  def initialize(celsius)
    self.celsius = celsius  # セッター経由でバリデーション
  end
end

t = Temperature.new(100)
puts "#{t.celsius}°C = #{t.fahrenheit}°F"
t.celsius = 0
puts "#{t.celsius}°C = #{t.fahrenheit}°F"

begin
  t.celsius = -300
rescue ArgumentError => e
  puts e.message
end`}
          expectedOutput={`100.0°C = 212.0°F
0.0°C = 32.0°F
絶対零度以下は不可`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
