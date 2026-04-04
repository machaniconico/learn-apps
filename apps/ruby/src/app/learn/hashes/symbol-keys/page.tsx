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
        <span className="text-red-400 text-sm font-semibold">ハッシュ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シンボルキー</h1>
        <p className="text-gray-400">シンボルをキーとして使う方法と利点を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">シンボルキーの利点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シンボルは同名なら常に同一オブジェクトなので、ハッシュキーとして使うと文字列キーよりメモリ効率が良く、比較が高速です。Ruby 1.9以降のシンタックスシュガー <code className="text-red-400">key: value</code> で簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>旧記法: <code className="text-red-400">{":name => value"}</code></li>
          <li>新記法: <code className="text-red-400">{"name: value"}</code>（Ruby 1.9+）</li>
          <li>アクセス: <code className="text-red-400">hash[:name]</code></li>
          <li>文字列キーとシンボルキーは別物: <code className="text-red-400">h["a"] != h[:a]</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">シンボルキーの記法</h2>
        <RubyEditor
          defaultCode={`# 旧記法（hashrocket）
old_style = { :name => "Alice", :age => 30 }
puts old_style[:name]

# 新記法（コロン後置）
new_style = { name: "Alice", age: 30 }
puts new_style[:name]

# 両者は同じハッシュ
puts old_style == new_style

# 文字列キーとシンボルキーは別
mixed = { "key" => "string", key: "symbol" }
puts mixed["key"]
puts mixed[:key]`}
          expectedOutput={`Alice
Alice
true
string
symbol`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">キーの変換</h2>
        <RubyEditor
          defaultCode={`# 文字列キーをシンボルに変換
str_hash = { "name" => "Bob", "age" => 25 }
sym_hash = str_hash.transform_keys(&:to_sym)
puts sym_hash.inspect
puts sym_hash[:name]

# シンボルキーを文字列に変換
back = sym_hash.transform_keys(&:to_s)
puts back.inspect

# JSONから来たデータのような変換
json_like = { "user" => { "id" => 1, "name" => "Alice" } }
puts json_like.dig("user", "name")`}
          expectedOutput={`{name: "Bob", age: 25}
Bob
{"name"=>"Bob", "age"=>25}
Alice`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="hashes" lessonId="symbol-keys" />
      </div>
      <LessonNav lessons={lessons} currentId="symbol-keys" basePath="/learn/hashes" />
    </div>
  );
}
