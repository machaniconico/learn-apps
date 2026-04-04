import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Rubyエコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RuboCop</h1>
        <p className="text-gray-400">RuboCopのセットアップ、.rubocop.yml設定、auto-correctを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RuboCopとは</h2>
        <p className="text-gray-300 mb-3">
          RuboCopはRubyのスタイルガイドに基づいてコードを解析するLinterです。一貫したコードスタイルを維持します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-green-300">gem install rubocop</code> — インストール</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">rubocop</code> — 現在ディレクトリを解析</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">rubocop -a</code> — 自動修正</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">.rubocop.yml</code> — 設定ファイル</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: RuboCopが検出するスタイル問題</h2>
        <RubyEditor
          defaultCode={`# RuboCopが指摘するコードの例と修正
# 修正前（問題あり）
def bad_style(x,y,z)
  if x == true
    result = x + y + z
    return result
  else
    return 0
  end
end

# 修正後（RuboCop準拠）
def good_style(x, y, z)
  # Style/RedundantReturn: 最後の式が戻り値
  # Style/DoubleNegation: == true は不要
  return 0 unless x
  x + y + z
end

# メソッドの長さチェック
puts "good_style(1, 2, 3) = #{good_style(1, 2, 3)}"
puts "good_style(nil, 2, 3) = #{good_style(nil, 2, 3)}"

# Naming規則の例
MY_CONSTANT = 42        # SCREAMING_SNAKE_CASE
my_variable = "hello"  # snake_case
MyClass = Class.new    # PascalCase

puts "\n命名規則:"
puts "  定数: MY_CONSTANT = #{MY_CONSTANT}"
puts "  変数: my_variable = #{my_variable}"
puts "  クラス: MyClass = #{MyClass}"`}
          expectedOutput={`good_style(1, 2, 3) = 6
good_style(nil, 2, 3) = 0

命名規則:
  定数: MY_CONSTANT = 42
  変数: my_variable = hello
  クラス: MyClass = #<Class:0x00007f>`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: .rubocop.ymlの設定例</h2>
        <RubyEditor
          defaultCode={`# .rubocop.ymlの設定をRubyコードで解説

rubocop_config = {
  "AllCops" => {
    "NewCops" => "enable",
    "TargetRubyVersion" => 3.2,
    "Exclude" => ["db/schema.rb", "vendor/**/*"]
  },
  "Style/StringLiterals" => {
    "EnforcedStyle" => "double_quotes"
  },
  "Metrics/MethodLength" => {
    "Max" => 15
  },
  "Metrics/ClassLength" => {
    "Max" => 200
  },
  "Layout/LineLength" => {
    "Max" => 120
  }
}

puts "# .rubocop.yml 設定例"
rubocop_config.each do |cop, settings|
  puts "\n#{cop}:"
  settings.each do |key, value|
    puts "  #{key}: #{value.inspect}"
  end
end

# Copカテゴリ一覧
cops = %w[Style Layout Metrics Naming Lint Security Performance]
puts "\nRuboCopのCopカテゴリ:"
cops.each { |c| puts "  - #{c}" }`}
          expectedOutput={`# .rubocop.yml 設定例

AllCops:
  NewCops: "enable"
  TargetRubyVersion: 3.2
  Exclude: ["db/schema.rb", "vendor/**/*"]

Style/StringLiterals:
  EnforcedStyle: "double_quotes"

Metrics/MethodLength:
  Max: 15

Metrics/ClassLength:
  Max: 200

Layout/LineLength:
  Max: 120

RuboCopのCopカテゴリ:
  - Style
  - Layout
  - Metrics
  - Naming
  - Lint
  - Security
  - Performance`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="linting" />
      </div>
      <LessonNav lessons={lessons} currentId="linting" basePath="/learn/ecosystem" />
    </div>
  );
}
