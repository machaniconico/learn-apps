import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">Rubyの定数の定義・命名規則・スコープを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">定数とは</h2>
        <p className="text-gray-300 mb-4">
          定数は大文字で始まる識別子です。慣例として全て大文字のスネークケース（UPPER_SNAKE_CASE）を使います。
          Rubyの定数は変更可能ですが、再代入すると警告が出ます。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">MAX_SIZE = 100</code> — 慣例的な定数</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Pi = 3.14159</code> — 大文字始まりも定数</li>
          <li>クラス名・モジュール名も定数（<code className="bg-gray-800 px-1 rounded">String</code>, <code className="bg-gray-800 px-1 rounded">Array</code> など）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 定数の定義と使用</h2>
        <RubyEditor
          defaultCode={`# 定数の定義
MAX_USERS = 100
APP_NAME = "MyRubyApp"
VERSION = "1.0.0"
PI = 3.14159265

puts APP_NAME   # MyRubyApp
puts VERSION    # 1.0.0
puts PI         # 3.14159265
puts MAX_USERS  # 100

# 定数を使った計算
radius = 5
area = PI * radius ** 2
puts "面積: #{area.round(2)}"  # 面積: 78.54`}
          expectedOutput={`MyRubyApp
1.0.0
3.14159265
100
面積: 78.54`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: クラス内の定数</h2>
        <RubyEditor
          defaultCode={`class Circle
  PI = Math::PI  # Mathモジュールの定数を使用

  def initialize(radius)
    @radius = radius
  end

  def area
    PI * @radius ** 2
  end

  def circumference
    2 * PI * @radius
  end
end

c = Circle.new(7)
puts c.area.round(2)           # 153.94
puts c.circumference.round(2)  # 43.98

# クラス定数への外部アクセス
puts Circle::PI.round(5)       # 3.14159`}
          expectedOutput={`153.94
43.98
3.14159`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 組み込み定数</h2>
        <RubyEditor
          defaultCode={`# Rubyの組み込み定数
puts Math::PI    # 3.141592653589793
puts Math::E     # 2.718281828459045
puts Float::INFINITY  # Infinity
puts Integer::GCD    rescue puts "Ruby 3.1+"

# RUBY_VERSIONなどの特殊定数
puts RUBY_VERSION    # Rubyのバージョン
puts RUBY_PLATFORM   # プラットフォーム情報`}
          expectedOutput={`3.141592653589793
2.718281828459045
Infinity
3.x.x
x86_64-linux`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
