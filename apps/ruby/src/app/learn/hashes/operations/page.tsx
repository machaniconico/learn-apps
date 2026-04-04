import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "hashes")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ハッシュ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">操作</h1>
        <p className="text-gray-400">ハッシュへの要素の追加・取得・削除・結合を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">基本操作メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ハッシュの操作は直感的です。代入で追加・更新、delete で削除、merge で結合します。破壊的メソッド（!付き）は元のハッシュを変更します。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>追加・更新: <code className="text-red-400">hash[key] = value</code></li>
          <li>削除: <code className="text-red-400">hash.delete(key)</code></li>
          <li>結合: <code className="text-red-400">hash.merge(other)</code></li>
          <li>破壊的結合: <code className="text-red-400">hash.merge!(other)</code></li>
          <li>サイズ: <code className="text-red-400">hash.size</code> / <code className="text-red-400">hash.length</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">追加・削除・更新</h2>
        <RubyEditor
          defaultCode={`inventory = { apple: 10, banana: 5, cherry: 20 }

# 追加
inventory[:grape] = 15
puts inventory.inspect

# 更新
inventory[:apple] = 25
puts inventory[:apple]

# 削除
removed = inventory.delete(:banana)
puts "Removed: #{removed}"
puts inventory.keys.inspect

# 空確認
puts inventory.empty?
puts inventory.size`}
          expectedOutput={`{apple: 25, banana: 5, cherry: 20, grape: 15}
25
Removed: 5
[:apple, :cherry, :grape]
false
3`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">merge と変換</h2>
        <RubyEditor
          defaultCode={`defaults = { color: "blue", size: "M", quantity: 1 }
custom = { color: "red", quantity: 3 }

# merge: カスタムが優先
result = defaults.merge(custom)
puts result.inspect

# transform_values
prices = { apple: 100, banana: 80, cherry: 200 }
discounted = prices.transform_values { |v| (v * 0.9).to_i }
puts discounted.inspect

# transform_keys
puts prices.transform_keys { |k| k.to_s }.inspect`}
          expectedOutput={`{color: "red", size: "M", quantity: 3}
{apple: 90, banana: 72, cherry: 180}
{"apple"=>100, "banana"=>80, "cherry"=>200}`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="hashes" lessonId="operations" />
      </div>
      <LessonNav lessons={lessons} currentId="operations" basePath="/learn/hashes" />
    </div>
  );
}
