import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "gems")!.lessons;

export default function GemBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Gem・Bundler レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Gemの基本</h1>
        <p className="text-gray-400">RubyGemsの仕組みとgemコマンドの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RubyGemsとは</h2>
        <p className="text-gray-300 mb-3">
          RubyGemsはRubyの標準パッケージ管理システムです。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">gem</code>コマンドでパッケージのインストール・管理・公開ができます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">gem install &lt;name&gt;</code> — Gemをインストール</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">gem list</code> — インストール済みGemを一覧表示</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">gem uninstall &lt;name&gt;</code> — Gemを削除</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">gem env</code> — Gem環境情報を表示</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">require &apos;&lt;name&gt;&apos;</code> — コードでGemを読み込む</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 標準ライブラリのrequire</h2>
        <RubyEditor
          defaultCode={`# Ruby標準ライブラリ（gem不要）
require 'json'
require 'date'
require 'set'

# JSON: データのシリアライズ
data = { language: "Ruby", year: 1995, awesome: true }
json = JSON.generate(data)
puts json

back = JSON.parse(json)
puts back["language"]
puts back["year"]

# Date: 日付操作
today = Date.new(2024, 1, 15)
puts today.strftime("%Y年%m月%d日")
puts today + 30   # 30日後

# Set: 重複なしコレクション
nums = Set.new([1, 2, 3, 2, 1])
puts nums.to_a.sort.inspect`}
          expectedOutput={`{"language":"Ruby","year":1995,"awesome":true}
Ruby
1995
2024年01月15日
2024-02-14
[1, 2, 3]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: よく使われる標準Gem</h2>
        <RubyEditor
          defaultCode={`require 'csv'
require 'tempfile'

# CSV: 表形式データの処理
csv_data = <<~CSV
  name,age,city
  Alice,30,Tokyo
  Bob,25,Osaka
  Carol,35,Kyoto
CSV

rows = CSV.parse(csv_data, headers: true)
rows.each do |row|
  puts "#{row['name']}（#{row['age']}歳）は#{row['city']}在住"
end

# Tempfile: 一時ファイル
Tempfile.create('test') do |f|
  f.write("一時データ")
  f.rewind
  puts f.read
  puts "ファイルパス: #{f.path}"
end`}
          expectedOutput={`Alice（30歳）はTokyo在住
Bob（25歳）はOsaka在住
Carol（35歳）はKyoto在住
一時データ
ファイルパス: /tmp/test...`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: gemコマンドのシミュレーション</h2>
        <RubyEditor
          defaultCode={`# Gemの情報を取得するコード例
require 'rubygems'

# インストール済みGemの情報を取得
gems_info = Gem::Specification.each.first(5).map do |spec|
  { name: spec.name, version: spec.version.to_s }
end

puts "インストール済みGem（最初の5件）:"
gems_info.each do |gem|
  puts "  #{gem[:name]} (#{gem[:version]})"
end

# Gemのパスを取得
puts "\nGemのホームディレクトリ:"
puts Gem.dir

puts "\nGemのパスリスト:"
Gem.path.first(2).each { |p| puts "  #{p}" }`}
          expectedOutput={`インストール済みGem（最初の5件）:
  minitest (5.x.x)
  rake (13.x.x)
  ...（環境により異なります）

Gemのホームディレクトリ:
/usr/local/lib/ruby/gems/...

Gemのパスリスト:
  /usr/local/lib/ruby/gems/...`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="gems" lessonId="gem-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="gem-basics" basePath="/learn/gems" />
    </div>
  );
}
