import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "modules")!;
const lessonId = "comparable";

export default function ComparablePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-medium mb-2">モジュール</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">Comparable</h1>
          <p className="text-gray-400">
            Comparable モジュールは &lt;=&gt; 演算子さえ実装すれば、
            &lt;、&gt;、&lt;=、&gt;=、between?、clamp などを自動的に提供します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">{"<=>"} 演算子（宇宙船演算子）</h2>
          <p className="text-gray-400 text-sm mb-4">
            <code className="text-cyan-400 bg-gray-800 px-1 rounded">{"a <=> b"}</code> は
            a が b より小さければ -1、等しければ 0、大きければ 1 を返します。
            比較できない場合は nil を返します。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>include Comparable でモジュールを取り込む</li>
            <li>{"<=>"} を実装するだけで比較演算子一式が使える</li>
            <li>sort、min、max も自動で動作する</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`class Version
  include Comparable

  attr_reader :major, :minor, :patch

  def initialize(version_string)
    parts = version_string.split(".").map(&:to_i)
    @major = parts[0] || 0
    @minor = parts[1] || 0
    @patch = parts[2] || 0
  end

  def <=>(other)
    return major <=> other.major unless major == other.major
    return minor <=> other.minor unless minor == other.minor
    patch <=> other.patch
  end

  def to_s = "#{major}.#{minor}.#{patch}"
end

v1 = Version.new("1.2.3")
v2 = Version.new("1.2.4")
v3 = Version.new("2.0.0")
v4 = Version.new("1.2.3")

puts v1 < v2          # => true
puts v1 > v3          # => false
puts v1 == v4         # => true
puts v1.between?(v1, v3)  # => true

versions = [v3, v1, v2, v4]
puts versions.sort.map(&:to_s).inspect
puts versions.min
puts versions.max`}
          expectedOutput={`true
false
true
true
["1.2.3", "1.2.3", "1.2.4", "2.0.0"]
1.2.3
2.0.0`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">clamp メソッド</h2>
          <p className="text-gray-400 text-sm">
            Comparable を include すると clamp メソッドも使えます。
            値を最小値と最大値の範囲内に収めます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Score
  include Comparable

  attr_reader :value

  def initialize(value)
    @value = value.clamp(0, 100)
  end

  def <=>(other)
    value <=> other.value
  end

  def grade
    case value
    when 90..100 then "A"
    when 80..89  then "B"
    when 70..79  then "C"
    when 60..69  then "D"
    else              "F"
    end
  end

  def to_s = "#{value}点(#{grade})"
end

scores = [Score.new(85), Score.new(62), Score.new(95), Score.new(70)]
puts scores.sort.map(&:to_s).inspect
puts scores.max
puts scores.min

# clampで範囲内に収める
v = Version.new("1.5.0") rescue nil
puts Score.new(150).value  # 100にクランプされる`}
          expectedOutput={`["62点(D)", "70点(C)", "85点(B)", "95点(A)"]
95点(A)
62点(D)
100`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="modules" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/modules" />
      </div>
    </div>
  );
}
