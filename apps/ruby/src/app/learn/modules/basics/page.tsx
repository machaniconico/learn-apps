import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "modules")!;
const lessonId = "basics";

export default function ModulesBasicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-medium mb-2">モジュール</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">モジュールの基本</h1>
          <p className="text-gray-400">
            モジュールはメソッドや定数をまとめる仕組みです。
            クラスと違いインスタンス化できず、継承もできません。
            ミックスインや名前空間として活用します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">モジュールの特徴</h2>
          <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
            <li>module キーワードで定義する</li>
            <li>インスタンス化できない（new が使えない）</li>
            <li>継承できない</li>
            <li>他のクラス・モジュールに include / extend / prepend できる</li>
            <li>名前空間として定数・クラスをグループ化できる</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`module Greetable
  def greet
    "こんにちは！私は#{name}です。"
  end

  def farewell
    "さようなら！#{name}でした。"
  end
end

module Printable
  def print_info
    puts "=== 情報 ==="
    puts to_s
    puts "============"
  end
end

class User
  include Greetable
  include Printable

  attr_reader :name

  def initialize(name)
    @name = name
  end

  def to_s
    "User: #{name}"
  end
end

u = User.new("田中")
puts u.greet
puts u.farewell
u.print_info

# モジュールのインスタンス化は不可
begin
  Greetable.new
rescue NoMethodError => e
  puts "エラー: #{e.message}"
end`}
          expectedOutput={`こんにちは！私は田中です。
さようなら！田中でした。
=== 情報 ===
User: 田中
============
エラー: undefined method 'new' for module Greetable`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">モジュールメソッド</h2>
          <p className="text-gray-400 text-sm">
            module_function を使うとモジュールメソッドとして定義でき、
            モジュール名.メソッド名 で直接呼び出せます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`module MathUtils
  module_function

  def factorial(n)
    return 1 if n <= 1
    n * factorial(n - 1)
  end

  def fibonacci(n)
    return n if n <= 1
    fibonacci(n - 1) + fibonacci(n - 2)
  end
end

# モジュール名.メソッド名で呼び出し
puts MathUtils.factorial(5)   # => 120
puts MathUtils.fibonacci(10)  # => 55

# モジュールの定数
module Config
  VERSION = "1.0.0"
  MAX_RETRY = 3
  TIMEOUT   = 30
end

puts Config::VERSION
puts Config::MAX_RETRY`}
          expectedOutput={`120
55
1.0.0
3`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="modules" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/modules" />
      </div>
    </div>
  );
}
