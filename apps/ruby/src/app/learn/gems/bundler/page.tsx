import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "gems")!.lessons;

export default function BundlerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Gem・Bundler レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Bundler</h1>
        <p className="text-gray-400">Bundlerを使ったGemの依存管理とGemfile.lockの役割を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Bundlerとは</h2>
        <p className="text-gray-300 mb-3">
          BundlerはRubyプロジェクトの依存Gemを管理するツールです。
          Gemfileに必要なGemを記述し、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">bundle install</code>でインストールします。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">bundle init</code> — Gemfileを新規作成</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">bundle install</code> — Gemfileのgemをインストール</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">bundle exec ruby app.rb</code> — Bundler環境でコマンド実行</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">bundle update</code> — Gemを最新バージョンに更新</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">Gemfile.lock</code> — バージョンを固定するロックファイル</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Bundlerの基本的なワークフロー</h2>
        <RubyEditor
          defaultCode={`# Bundlerを使ったプロジェクトの典型的な構成
# （コマンドラインでの操作を説明）

workflow = {
  "1. プロジェクト初期化" => [
    "mkdir my_project && cd my_project",
    "bundle init  # Gemfileを生成",
  ],
  "2. Gemfileを編集" => [
    "source 'https://rubygems.org'",
    "gem 'json'",
    "gem 'minitest', '~> 5.0'",
  ],
  "3. インストール" => [
    "bundle install  # Gemfile.lockが生成される",
  ],
  "4. 実行" => [
    "bundle exec ruby app.rb  # Bundler環境で実行",
    "bundle exec rake test    # テスト実行",
  ],
}

workflow.each do |step, commands|
  puts "\n#{step}:"
  commands.each { |cmd| puts "  $ #{cmd}" }
end`}
          expectedOutput={`
1. プロジェクト初期化:
  $ mkdir my_project && cd my_project
  $ bundle init  # Gemfileを生成

2. Gemfileを編集:
  $ source 'https://rubygems.org'
  $ gem 'json'
  $ gem 'minitest', '~> 5.0'

3. インストール:
  $ bundle install  # Gemfile.lockが生成される

4. 実行:
  $ bundle exec ruby app.rb  # Bundler環境で実行
  $ bundle exec rake test    # テスト実行`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Gemfile.lockの役割</h2>
        <RubyEditor
          defaultCode={`# Gemfile.lockの重要性を理解する例

# Gemfileは範囲指定（~> 2.0 = 2.x系）
gemfile_example = <<~GEMFILE
  source "https://rubygems.org"

  gem "rails",    "~> 7.1"
  gem "pg",       "~> 1.5"
  gem "minitest", "~> 5.0"
GEMFILE

# Gemfile.lockは実際にインストールされたバージョンを記録
lockfile_example = <<~LOCKFILE
  GEM
    remote: https://rubygems.org/
    specs:
      minitest (5.20.0)
      rails (7.1.2)
        ...

  BUNDLED WITH
     2.4.22
LOCKFILE

puts "Gemfile（範囲指定）:"
puts gemfile_example

puts "Gemfile.lock（固定バージョン）:"
puts lockfile_example.lines.first(6).join

# なぜGemfile.lockをコミットすべきか
reasons = [
  "チーム全員が同じバージョンを使える",
  "本番環境と開発環境を一致させられる",
  "依存Gemのバージョンアップによる予期しない変更を防げる",
]

puts "\nGemfile.lockをコミットする理由:"
reasons.each_with_index { |r, i| puts "  #{i + 1}. #{r}" }`}
          expectedOutput={`Gemfile（範囲指定）:
source "https://rubygems.org"

gem "rails",    "~> 7.1"
gem "pg",       "~> 1.5"
gem "minitest", "~> 5.0"

Gemfile.lock（固定バージョン）:
GEM
  remote: https://rubygems.org/
  specs:
    minitest (5.20.0)
    rails (7.1.2)
    ...

Gemfile.lockをコミットする理由:
  1. チーム全員が同じバージョンを使える
  2. 本番環境と開発環境を一致させられる
  3. 依存Gemのバージョンアップによる予期しない変更を防げる`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: bundle execの重要性</h2>
        <RubyEditor
          defaultCode={`# bundle execを使う理由
require 'rubygems'

# bundle execなしで実行するとシステムのGemが使われる
# bundle execありだとGemfile.lockのバージョンが使われる

puts "現在のRubyバージョン: #{RUBY_VERSION}"
puts "RubyGemsバージョン: #{Gem::VERSION}"

# Bundlerが提供するAPIを使った例
if defined?(Bundler)
  puts "\nBundler情報:"
  puts "Bundlerバージョン: #{Bundler::VERSION}"
  puts "bundle exec環境: #{Bundler.respond_to?(:load) ? 'Yes' : 'No'}"
else
  puts "\nbundle exec環境外で実行中"
end

# Gemの読み込み確認
gems_to_check = ['json', 'csv', 'minitest']
puts "\n読み込み可能なGem:"
gems_to_check.each do |gem_name|
  status = begin
    require gem_name
    "OK"
  rescue LoadError
    "未インストール"
  end
  puts "  #{gem_name}: #{status}"
end`}
          expectedOutput={`現在のRubyバージョン: 3.x.x
RubyGemsバージョン: 3.x.x

bundle exec環境外で実行中

読み込み可能なGem:
  json: OK
  csv: OK
  minitest: OK`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="gems" lessonId="bundler" />
      </div>
      <LessonNav lessons={lessons} currentId="bundler" basePath="/learn/gems" />
    </div>
  );
}
