import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "inheritance")!;
const lessonId = "duck-typing";

export default function DuckTypingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-orange-400 text-sm font-medium mb-2">継承</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">ダックタイピング</h1>
          <p className="text-gray-400">
            「アヒルのように歩き、アヒルのように鳴くならアヒルだ」— オブジェクトのクラスではなく、
            必要なメソッドを持っているかどうかで判断するプログラミングスタイルです。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">respond_to? と send</h2>
          <p className="text-gray-400 text-sm mb-4">
            ダックタイピングでは is_a? よりも
            <code className="text-orange-400 bg-gray-800 px-1 rounded mx-1">respond_to?</code> を使って
            必要なメソッドを持っているか確認します。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>respond_to?(:method_name) — メソッドを持つか確認</li>
            <li>send(:method_name, args) — メソッドを動的に呼ぶ</li>
            <li>is_a? は避けてダックタイピングを優先する</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`# ダックタイピングの例
class FileWriter
  def write(content)
    puts "[FILE] #{content}"
  end
end

class NetworkSender
  def write(content)
    puts "[NET]  #{content}"
  end
end

class NullWriter
  def write(content)
    # 何もしない（nullオブジェクトパターン）
  end
end

def output(writer, message)
  if writer.respond_to?(:write)
    writer.write(message)
  else
    raise "writeメソッドがありません"
  end
end

[FileWriter.new, NetworkSender.new, NullWriter.new].each do |w|
  output(w, "Hello, Duck Typing!")
end`}
          expectedOutput={`[FILE] Hello, Duck Typing!
[NET]  Hello, Duck Typing!`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">暗黙の型変換インターフェース</h2>
          <p className="text-gray-400 text-sm">
            Ruby の to_s / to_i / to_a / to_str などは暗黙の変換プロトコルです。
            これらを実装することで既存のメソッドと自然に統合できます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Temperature
  attr_reader :celsius

  def initialize(celsius)
    @celsius = celsius.to_f
  end

  def to_s
    "#{celsius}°C"
  end

  def to_f
    celsius
  end

  def to_i
    celsius.to_i
  end

  def coerce(other)
    [self.class.new(other), self]
  end
end

t = Temperature.new(25.5)
puts t            # to_s が呼ばれる
puts t.to_f       # => 25.5
puts t.to_i       # => 25

# respond_to? で能力を確認
[:to_s, :to_f, :to_i, :to_str].each do |m|
  puts "#{m}: #{t.respond_to?(m)}"
end`}
          expectedOutput={`25.5°C
25.5
25
to_s: true
to_f: true
to_i: true
to_str: false`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="inheritance" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/inheritance" />
      </div>
    </div>
  );
}
