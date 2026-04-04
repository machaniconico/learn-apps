import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "modules")!;
const lessonId = "include-extend";

export default function IncludeExtendPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-medium mb-2">モジュール</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">include・extend・prepend</h1>
          <p className="text-gray-400">
            モジュールを取り込む3つの方法があります。
            include はインスタンスメソッド、extend はクラスメソッド、
            prepend はメソッド探索チェーンの先頭に追加します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">3つの取り込み方の違い</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <code className="text-cyan-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">include</code>
              <span>モジュールのメソッドをインスタンスメソッドとして追加。継承チェーンのクラスの後に挿入。</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-cyan-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">extend</code>
              <span>モジュールのメソッドをクラスメソッドとして追加。特異クラスに追加される。</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="text-cyan-400 bg-gray-800 px-2 py-0.5 rounded shrink-0">prepend</code>
              <span>モジュールを継承チェーンのクラスの前に挿入。既存メソッドをラップするのに使う。</span>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`module Greetable
  def hello = "こんにちは（インスタンス）"
end

module ClassGreetable
  def hello = "こんにちは（クラス）"
end

class Person
  include Greetable      # インスタンスメソッドとして
  extend  ClassGreetable # クラスメソッドとして
end

puts Person.new.hello   # インスタンスメソッド
puts Person.hello       # クラスメソッド

# prependでメソッドをラップ
module Logging
  def greet
    puts "greet呼び出し前"
    result = super   # 元のgreetを呼ぶ
    puts "greet呼び出し後"
    result
  end
end

class Greeter
  prepend Logging

  def greet
    puts "Hello!"
  end
end

Greeter.new.greet
puts Greeter.ancestors.inspect`}
          expectedOutput={`こんにちは（インスタンス）
こんにちは（クラス）
greet呼び出し前
Hello!
greet呼び出し後
[Logging, Greeter, Object, Kernel, BasicObject]`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">included フックと extended フック</h2>
          <p className="text-gray-400 text-sm">
            モジュールが取り込まれたときに自動で呼ばれるフックメソッドがあります。
            ActiveSupport::Concern はこれを活用した便利な仕組みです。
          </p>
        </div>

        <RubyEditor
          defaultCode={`module Trackable
  def self.included(base)
    puts "#{name} が #{base} に include されました"
    base.extend(ClassMethods)
  end

  module ClassMethods
    def tracked_classes
      @tracked_classes ||= []
    end

    def track!
      tracked_classes << self
    end
  end

  def tracking_info
    "#{self.class} はトラッキング対象"
  end
end

class Order
  include Trackable
  track!
end

class User
  include Trackable
end

puts Order.new.tracking_info
puts Trackable::ClassMethods.instance_methods(false).inspect`}
          expectedOutput={`Trackable が Order に include されました
Trackable が User に include されました
Order はトラッキング対象
[:tracked_classes, :track!]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="modules" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/modules" />
      </div>
    </div>
  );
}
