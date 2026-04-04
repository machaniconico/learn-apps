import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "gems")!.lessons;

export default function VersionManagementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Gem・Bundler レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バージョン管理</h1>
        <p className="text-gray-400">セマンティックバージョニングと~&gt;演算子を使ったバージョン制約の書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">セマンティックバージョニング</h2>
        <p className="text-gray-300 mb-3">
          セマンティックバージョニング（SemVer）はバージョン番号に意味を持たせる規約です。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">MAJOR.MINOR.PATCH</code>の形式で表します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><strong className="text-white">MAJOR</strong> — 後方互換性のない変更（破壊的変更）</li>
          <li><strong className="text-white">MINOR</strong> — 後方互換性のある新機能追加</li>
          <li><strong className="text-white">PATCH</strong> — 後方互換性のあるバグ修正</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">~&gt;</code> — 悲観的バージョン制約（pessimistic operator）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: バージョン制約の種類</h2>
        <RubyEditor
          defaultCode={`require 'rubygems'

# Gem::Versionを使ったバージョン比較
v1 = Gem::Version.new("2.1.0")
v2 = Gem::Version.new("2.3.5")
v3 = Gem::Version.new("3.0.0")

puts v1 < v2   # true
puts v2 < v3   # true
puts v1 == Gem::Version.new("2.1.0")  # true

# Gem::Requirementを使ったバージョン制約
constraints = {
  "~> 2.1"   => ["2.1.0", "2.2.0", "2.9.9", "3.0.0"],
  "~> 2.1.0" => ["2.1.0", "2.1.9", "2.2.0", "3.0.0"],
  ">= 2.0"   => ["2.0.0", "2.5.0", "3.0.0", "1.9.9"],
  "< 3.0"    => ["2.9.9", "3.0.0", "1.0.0"],
}

constraints.each do |constraint, versions|
  req = Gem::Requirement.new(constraint)
  puts "\n#{constraint}:"
  versions.each do |v|
    match = req.satisfied_by?(Gem::Version.new(v))
    puts "  #{v}: #{match ? 'OK' : 'NG'}"
  end
end`}
          expectedOutput={`true
true
true

~> 2.1:
  2.1.0: OK
  2.2.0: OK
  2.9.9: OK
  3.0.0: NG

~> 2.1.0:
  2.1.0: OK
  2.1.9: OK
  2.2.0: NG
  3.0.0: NG

>= 2.0:
  2.0.0: OK
  2.5.0: OK
  3.0.0: OK
  1.9.9: NG

< 3.0:
  2.9.9: OK
  3.0.0: NG
  1.0.0: OK`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ~&gt;（悲観的制約）の意味</h2>
        <RubyEditor
          defaultCode={`require 'rubygems'

# ~> X.Y は X.Y 以上、(X+1).0 未満
# ~> X.Y.Z は X.Y.Z 以上、X.(Y+1).0 未満

pessimistic_examples = [
  { constraint: "~> 1",     min: "1.0",   max: "2.0",   desc: "1以上2未満" },
  { constraint: "~> 1.2",   min: "1.2",   max: "2.0",   desc: "1.2以上2.0未満" },
  { constraint: "~> 1.2.3", min: "1.2.3", max: "1.3.0", desc: "1.2.3以上1.3.0未満" },
  { constraint: "~> 2.0",   min: "2.0",   max: "3.0",   desc: "2.0以上3.0未満" },
]

puts "悲観的バージョン制約（~>）の意味:"
puts "-" * 55
pessimistic_examples.each do |ex|
  puts "#{ex[:constraint].ljust(12)} => #{ex[:min]}以上 #{ex[:max]}未満 (#{ex[:desc]})"
end

puts "\n実際のGemfileでの使い方:"
gemfile_examples = [
  'gem "rails",    "~> 7.1"     # Rails 7.1.x系を使う',
  'gem "puma",     "~> 6.0"     # Puma 6.x系を使う',
  'gem "minitest", "~> 5.20"    # Minitest 5.20.x系を使う',
  'gem "nokogiri", "~> 1.15.4"  # Nokogiri 1.15.4.x系を使う',
]
gemfile_examples.each { |ex| puts ex }`}
          expectedOutput={`悲観的バージョン制約（~>）の意味:
-------------------------------------------------------
~> 1         => 1.0以上 2.0未満 (1以上2未満)
~> 1.2       => 1.2以上 2.0未満 (1.2以上2.0未満)
~> 1.2.3     => 1.2.3以上 1.3.0未満 (1.2.3以上1.3.0未満)
~> 2.0       => 2.0以上 3.0未満 (2.0以上3.0未満)

実際のGemfileでの使い方:
gem "rails",    "~> 7.1"     # Rails 7.1.x系を使う
gem "puma",     "~> 6.0"     # Puma 6.x系を使う
gem "minitest", "~> 5.20"    # Minitest 5.20.x系を使う
gem "nokogiri", "~> 1.15.4"  # Nokogiri 1.15.4.x系を使う`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: バージョン番号の比較と操作</h2>
        <RubyEditor
          defaultCode={`require 'rubygems'

# バージョン番号の操作
class VersionBumper
  def initialize(version_str)
    @parts = version_str.split('.').map(&:to_i)
    while @parts.length < 3
      @parts << 0
    end
  end

  def major = "#{@parts[0] + 1}.0.0"
  def minor = "#{@parts[0]}.#{@parts[1] + 1}.0"
  def patch = "#{@parts[0]}.#{@parts[1]}.#{@parts[2] + 1}"
  def current = @parts.join('.')
end

current = "2.3.7"
bumper = VersionBumper.new(current)

puts "現在のバージョン: #{bumper.current}"
puts "MAJORバンプ: #{bumper.major}  (後方互換性なし)"
puts "MINORバンプ: #{bumper.minor}  (新機能追加)"
puts "PATCHバンプ: #{bumper.patch}  (バグ修正)"

# プレリリースバージョン
pre_releases = ["1.0.0.alpha", "1.0.0.beta.1", "1.0.0.rc.1", "1.0.0"]
puts "\nリリースサイクル:"
pre_releases.each_with_index do |v, i|
  puts "  #{i + 1}. #{v}"
end`}
          expectedOutput={`現在のバージョン: 2.3.7
MAJORバンプ: 3.0.0  (後方互換性なし)
MINORバンプ: 2.4.0  (新機能追加)
PATCHバンプ: 2.3.8  (バグ修正)

リリースサイクル:
  1. 1.0.0.alpha
  2. 1.0.0.beta.1
  3. 1.0.0.rc.1
  4. 1.0.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="gems" lessonId="version-management" />
      </div>
      <LessonNav lessons={lessons} currentId="version-management" basePath="/learn/gems" />
    </div>
  );
}
