import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "web")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Web開発基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSON処理</h1>
        <p className="text-gray-400">JSON.parse、JSON.generate、to_json、カスタムシリアライゼーションを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RubyのJSON処理</h2>
        <p className="text-gray-300 mb-3">
          Rubyの標準ライブラリ<code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">json</code>はJSON文字列とRubyオブジェクトの相互変換を提供します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">JSON.parse(str)</code> — JSON文字列をRubyオブジェクトに変換</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">JSON.generate(obj)</code> — RubyオブジェクトをJSON文字列に変換</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">obj.to_json</code> — オブジェクトのJSON変換メソッド</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">symbolize_names: true</code> — キーをシンボルで取得</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: JSON.parseとJSON.generate</h2>
        <RubyEditor
          defaultCode={`require 'json'

# JSON文字列をRubyオブジェクトに変換
json_str = '{"name":"Ruby","version":3.2,"features":["fast","elegant"]}'
parsed = JSON.parse(json_str)

puts "クラス: #{parsed.class}"
puts "名前: #{parsed['name']}"
puts "バージョン: #{parsed['version']}"
puts "機能: #{parsed['features'].join(', ')}"

# シンボルキーで取得
parsed_sym = JSON.parse(json_str, symbolize_names: true)
puts "\nシンボルキー: #{parsed_sym[:name]}"

# RubyオブジェクトをJSONに変換
data = {
  language: "Ruby",
  created: 1995,
  typed: false,
  paradigms: ["OOP", "functional", "imperative"]
}
puts "\n生成JSON:"
puts JSON.generate(data)
puts "\n整形JSON:"
puts JSON.pretty_generate(data)`}
          expectedOutput={`クラス: Hash
名前: Ruby
バージョン: 3.2
機能: fast, elegant

シンボルキー: Ruby

生成JSON:
{"language":"Ruby","created":1995,"typed":false,"paradigms":["OOP","functional","imperative"]}

整形JSON:
{
  "language": "Ruby",
  "created": 1995,
  "typed": false,
  "paradigms": [
    "OOP",
    "functional",
    "imperative"
  ]
}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カスタムシリアライゼーション</h2>
        <RubyEditor
          defaultCode={`require 'json'

# カスタムto_jsonの実装
class User
  attr_accessor :id, :name, :email, :password

  def initialize(id, name, email, password)
    @id = id
    @name = name
    @email = email
    @password = password
  end

  # パスワードを除外したシリアライゼーション
  def to_json(*args)
    {
      id: @id,
      name: @name,
      email: @email
      # passwordは含めない
    }.to_json(*args)
  end

  def as_admin_json
    { id: @id, name: @name, email: @email, has_password: !@password.nil? }.to_json
  end
end

user = User.new(1, "Alice", "alice@example.com", "secret123")

puts "通常のJSON（パスワード除外）:"
puts user.to_json

puts "\n管理者向けJSON:"
puts user.as_admin_json

# ネストしたオブジェクト
users = [
  User.new(1, "Alice", "alice@example.com", "pass1"),
  User.new(2, "Bob", "bob@example.com", "pass2"),
]
puts "\nユーザーリスト:"
puts JSON.generate(users.map { |u| JSON.parse(u.to_json) })`}
          expectedOutput={`通常のJSON（パスワード除外）:
{"id":1,"name":"Alice","email":"alice@example.com"}

管理者向けJSON:
{"id":1,"name":"Alice","email":"alice@example.com","has_password":true}

ユーザーリスト:
[{"id":1,"name":"Alice","email":"alice@example.com"},{"id":2,"name":"Bob","email":"bob@example.com"}]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="web" lessonId="json-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="json-handling" basePath="/learn/web" />
    </div>
  );
}
