import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "io")!;

export default function JsonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-400">ファイルI/O</p>
        <h1 className="text-3xl font-bold text-gray-100">JSON処理</h1>
        <p className="text-gray-400">
          RubyのJSONライブラリを使ったJSON文字列のパースと生成を学びます。APIレスポンスの処理や設定ファイルの読み書きに必須のスキルです。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">JSON.parse と JSON.generate</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">JSON.parse(string)</code> でJSON文字列をRubyオブジェクトに変換。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">JSON.generate(obj)</code> でRubyオブジェクトをJSON文字列に変換します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'json'

# JSON文字列をパース
json_str = '{"name":"Ruby","version":3.2,"features":["blocks","modules","gems"]}'
data = JSON.parse(json_str)

puts data["name"]
puts data["version"]
puts data["features"].inspect
puts data["features"].length

# Rubyオブジェクトを生成
config = {
  host: "localhost",
  port: 3000,
  debug: true,
  allowed_ips: ["127.0.0.1", "192.168.1.0/24"]
}

puts JSON.generate(config)
puts JSON.pretty_generate(config)`}
        expectedOutput={`Ruby
3.2
["blocks", "modules", "gems"]
3
{"host":"localhost","port":3000,"debug":true,"allowed_ips":["127.0.0.1","192.168.1.0/24"]}
{
  "host": "localhost",
  "port": 3000,
  "debug": true,
  "allowed_ips": [
    "127.0.0.1",
    "192.168.1.0/24"
  ]
}`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">to_json と symbolize_names</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">obj.to_json</code> でオブジェクトをJSON変換できます。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">symbolize_names: true</code> でキーをシンボルとしてパースします。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'json'

# to_json
puts [1, 2, 3].to_json
puts({ a: 1, b: "hello" }.to_json)

# symbolize_names: true
json = '{"id":1,"name":"Alice","active":true}'
with_strings = JSON.parse(json)
with_symbols = JSON.parse(json, symbolize_names: true)

puts "文字列キー: #{with_strings["name"]}"
puts "シンボルキー: #{with_symbols[:name]}"
puts "シンボルキー一覧: #{with_symbols.keys.inspect}"`}
        expectedOutput={`[1,2,3]
{"a":1,"b":"hello"}
文字列キー: Alice
シンボルキー: Alice
シンボルキー一覧: [:id, :name, :active]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">JSONファイルの読み書き</h2>
        <p className="text-gray-400 text-sm">
          実際のアプリケーションではFile.readとJSON.parseを組み合わせてJSONファイルを処理します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'json'

# 設定ファイルの読み込みシミュレーション
config_json = <<~JSON
  {
    "database": {
      "host": "localhost",
      "port": 5432,
      "name": "myapp_db"
    },
    "cache": {
      "ttl": 3600,
      "max_size": 1000
    }
  }
JSON

config = JSON.parse(config_json, symbolize_names: true)

puts "DB Host: #{config[:database][:host]}"
puts "DB Port: #{config[:database][:port]}"
puts "Cache TTL: #{config[:cache][:ttl]}秒"

# 設定を更新してJSON出力
config[:cache][:ttl] = 7200
puts "\n更新後の設定:"
puts JSON.pretty_generate(config)`}
        expectedOutput={`DB Host: localhost
DB Port: 5432
Cache TTL: 3600秒

更新後の設定:
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp_db"
  },
  "cache": {
    "ttl": 7200,
    "max_size": 1000
  }
}`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="io" lessonId="json" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="json"
        basePath="/learn/io"
      />
    </div>
  );
}
