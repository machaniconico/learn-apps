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
        <span className="text-red-400 text-sm font-semibold">ハッシュ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ハッシュの基本</h1>
        <p className="text-gray-400">キーと値のペアを格納するハッシュの基礎を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ハッシュはキーと値のペアを格納する連想配列です。キーで高速に値を検索できます。Ruby 1.9以降はハッシュの挿入順序が保持されます。キーにはシンボル・文字列・数値など任意のオブジェクトを使えます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>作成: <code className="text-red-400">{"{ key => value }"}</code> または <code className="text-red-400">{"{ key: value }"}</code></li>
          <li>アクセス: <code className="text-red-400">hash[key]</code></li>
          <li>存在確認: <code className="text-red-400">hash.key?(key)</code></li>
          <li>キー一覧: <code className="text-red-400">hash.keys</code></li>
          <li>値一覧: <code className="text-red-400">hash.values</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュの作成とアクセス</h2>
        <RubyEditor
          defaultCode={`# ハッシュの作成
person = { "name" => "Alice", "age" => 30 }
puts person["name"]
puts person["age"]

# シンボルキー（新記法）
config = { host: "localhost", port: 3000, debug: true }
puts config[:host]
puts config[:port]

# キーと値の一覧
puts config.keys.inspect
puts config.values.inspect`}
          expectedOutput={`Alice
30
localhost
3000
[:host, :port, :debug]
["localhost", 3000, true]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">キーの存在確認と取得</h2>
        <RubyEditor
          defaultCode={`scores = { math: 90, english: 85, science: 92 }

# 存在確認
puts scores.key?(:math)
puts scores.key?(:history)

# fetch: キーがない場合のデフォルト値
puts scores.fetch(:math)
puts scores.fetch(:history, 0)

# dig: ネストしたアクセス
data = { user: { name: "Bob", age: 25 } }
puts data.dig(:user, :name)`}
          expectedOutput={`true
false
90
0
Bob`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="hashes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/hashes" />
    </div>
  );
}
