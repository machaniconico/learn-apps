import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "symbols")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">シンボル レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">よくある使い方</h1>
        <p className="text-gray-400">ハッシュキー・メソッド名の参照など実践的な使い方を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">シンボルの実践的な使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シンボルはRubyコード全体で広く使われています。ハッシュキー、attr_accessor などのアクセサ定義、send によるメソッド動的呼び出し、状態の表現など様々な場面で登場します。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>ハッシュキー: <code className="text-indigo-400">{"{ name: \"Alice\" }"}</code></li>
          <li>attr定義: <code className="text-indigo-400">attr_accessor :name, :age</code></li>
          <li>動的呼び出し: <code className="text-indigo-400">obj.send(:method_name)</code></li>
          <li>状態表現: <code className="text-indigo-400">state = :pending</code></li>
          <li>respond_to?: <code className="text-indigo-400">obj.respond_to?(:method_name)</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュキーと状態管理</h2>
        <RubyEditor
          defaultCode={`# ハッシュキーとしてのシンボル
user = { name: "Alice", role: :admin, status: :active }

# 状態によって処理を分岐
case user[:status]
when :active
  puts "#{user[:name]} is active"
when :suspended
  puts "#{user[:name]} is suspended"
end

# シンボルの比較は高速
states = [:pending, :active, :inactive, :suspended]
puts states.include?(:active)
puts states.map(&:to_s).inspect`}
          expectedOutput={`Alice is active
true
["pending", "active", "inactive", "suspended"]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">send と respond_to?</h2>
        <RubyEditor
          defaultCode={`class Dog
  def bark
    "Woof!"
  end

  def sit
    "Sitting..."
  end
end

dog = Dog.new

# send でシンボルを使ってメソッドを動的に呼び出す
[:bark, :sit].each do |action|
  puts dog.send(action)
end

# respond_to? でメソッドの存在確認
puts dog.respond_to?(:bark)
puts dog.respond_to?(:fly)`}
          expectedOutput={`Woof!
Sitting...
true
false`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="symbols" lessonId="usage" />
      </div>
      <LessonNav lessons={lessons} currentId="usage" basePath="/learn/symbols" />
    </div>
  );
}
