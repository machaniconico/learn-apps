import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "io")!;

export default function YamlPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-400">ファイルI/O</p>
        <h1 className="text-3xl font-bold text-gray-100">YAML処理</h1>
        <p className="text-gray-400">
          RubyのYAMLライブラリを使った設定ファイルの読み書きを学びます。Rails設定ファイルなどで広く使われるYAMLフォーマットを扱えるようになりましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">YAML.safe_load と YAML.dump</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">YAML.safe_load(string)</code> でYAML文字列をRubyオブジェクトに変換します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">YAML.dump(obj)</code> でRubyオブジェクトをYAML文字列に変換します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'yaml'

yaml_str = <<~YAML
  name: MyApp
  version: "1.0.0"
  database:
    host: localhost
    port: 5432
    name: myapp_production
  features:
    - authentication
    - authorization
    - caching
  debug: false
YAML

config = YAML.safe_load(yaml_str)
puts config["name"]
puts config["version"]
puts config["database"]["host"]
puts config["features"].inspect
puts config["debug"].inspect`}
        expectedOutput={`MyApp
1.0.0
localhost
["authentication", "authorization", "caching"]
false`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">YAML.dump でRubyオブジェクトをYAML化</h2>
        <p className="text-gray-400 text-sm">
          ハッシュや配列をYAML形式の文字列に変換できます。設定の保存や構造化データの出力に便利です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'yaml'

# RubyオブジェクトをYAMLに変換
settings = {
  "app_name" => "RubyLearn",
  "locale" => "ja",
  "theme" => "dark",
  "items_per_page" => 20,
  "allowed_extensions" => ["rb", "yaml", "json"],
  "nested" => {
    "key1" => "value1",
    "key2" => 42
  }
}

yaml_output = YAML.dump(settings)
puts yaml_output

# 変換と復元のラウンドトリップ
restored = YAML.safe_load(yaml_output)
puts "復元: #{restored['app_name']}"
puts "ネスト: #{restored['nested']['key2']}"`}
        expectedOutput={`---
app_name: RubyLearn
locale: ja
theme: dark
items_per_page: 20
allowed_extensions:
- rb
- yaml
- json
nested:
  key1: value1
  key2: 42

復元: RubyLearn
ネスト: 42`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">複数ドキュメントと実用パターン</h2>
        <p className="text-gray-400 text-sm">
          YAMLは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">---</code> で複数ドキュメントを区切れます。
          Railsのdatabase.ymlのような環境別設定に使われるパターンも確認しましょう。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'yaml'

# 環境別設定のシミュレーション（database.ymlスタイル）
db_yaml = <<~YAML
  default: &default
    adapter: postgresql
    encoding: unicode
    pool: 5

  development:
    <<: *default
    database: myapp_development

  test:
    <<: *default
    database: myapp_test

  production:
    <<: *default
    database: myapp_production
    pool: 20
YAML

# symbolize_namesはYAMLには直接ないので手動変換
config = YAML.safe_load(db_yaml, aliases: true)

["development", "test", "production"].each do |env|
  db = config[env]
  puts "#{env}: #{db['database']} (pool: #{db['pool']})"
end`}
        expectedOutput={`development: myapp_development (pool: 5)
test: myapp_test (pool: 5)
production: myapp_production (pool: 20)`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="io" lessonId="yaml" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="yaml"
        basePath="/learn/io"
      />
    </div>
  );
}
