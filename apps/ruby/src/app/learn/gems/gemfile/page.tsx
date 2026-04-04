import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "gems")!.lessons;

export default function GemfilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Gem・Bundler レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Gemfile詳解</h1>
        <p className="text-gray-400">Gemfileのsource・gem・group・platformsなど詳細な書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Gemfileの構成要素</h2>
        <p className="text-gray-300 mb-3">
          GemfileはBundlerがGemを解決するための設定ファイルです。
          Rubyのコードとして書かれており、柔軟な記述ができます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">source</code> — Gemの取得元URL</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">gem</code> — 依存するGemを指定</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">group</code> — 環境別にGemをグループ化</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">platforms</code> — プラットフォーム別指定</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">path / git</code> — ローカル・Git参照</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Gemfileの基本構造</h2>
        <RubyEditor
          defaultCode={`# Gemfileの典型的な構造を説明するコード
gemfile_structure = <<~GEMFILE
  # Gemの取得元を指定
  source "https://rubygems.org"

  # Rubyのバージョンを指定
  ruby "3.2.0"

  # すべての環境で使うGem
  gem "rails",     "~> 7.1"
  gem "pg",        "~> 1.5"
  gem "puma",      "~> 6.0"
  gem "bootsnap",  require: false

  # 開発・テスト環境のみ
  group :development, :test do
    gem "rspec-rails"
    gem "factory_bot_rails"
    gem "faker"
  end

  # 開発環境のみ
  group :development do
    gem "rubocop",    require: false
    gem "solargraph", require: false
  end

  # テスト環境のみ
  group :test do
    gem "simplecov",  require: false
    gem "capybara"
  end
GEMFILE

puts gemfile_structure`}
          expectedOutput={`# Gemの取得元を指定
source "https://rubygems.org"

# Rubyのバージョンを指定
ruby "3.2.0"

# すべての環境で使うGem
gem "rails",     "~> 7.1"
gem "pg",        "~> 1.5"
gem "puma",      "~> 6.0"
gem "bootsnap",  require: false

# 開発・テスト環境のみ
group :development, :test do
  gem "rspec-rails"
  gem "factory_bot_rails"
  gem "faker"
end

# 開発環境のみ
group :development do
  gem "rubocop",    require: false
  gem "solargraph", require: false
end

# テスト環境のみ
group :test do
  gem "simplecov",  require: false
  gem "capybara"
end`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: gemメソッドのオプション</h2>
        <RubyEditor
          defaultCode={`# gem メソッドの各オプション
options_examples = {
  "バージョン指定なし" => 'gem "nokogiri"',
  "完全一致" => 'gem "rails", "7.1.2"',
  "以上" => 'gem "minitest", ">= 5.0"',
  "悲観的制約" => 'gem "puma", "~> 6.0"',
  "複数条件" => 'gem "rack", ">= 2.0", "< 4.0"',
  "requireを無効化" => 'gem "rubocop", require: false',
  "別名でrequire" => 'gem "rack-timeout", require: "rack/timeout"',
  "Gitから取得" => 'gem "my_gem", git: "https://github.com/user/my_gem"',
  "ローカルパス" => 'gem "my_local_gem", path: "../my_local_gem"',
}

options_examples.each do |desc, example|
  puts "# #{desc}"
  puts example
  puts
end`}
          expectedOutput={`# バージョン指定なし
gem "nokogiri"

# 完全一致
gem "rails", "7.1.2"

# 以上
gem "minitest", ">= 5.0"

# 悲観的制約
gem "puma", "~> 6.0"

# 複数条件
gem "rack", ">= 2.0", "< 4.0"

# requireを無効化
gem "rubocop", require: false

# 別名でrequire
gem "rack-timeout", require: "rack/timeout"

# Gitから取得
gem "my_gem", git: "https://github.com/user/my_gem"

# ローカルパス
gem "my_local_gem", path: "../my_local_gem"`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Gemfileのグループとrequire: false</h2>
        <RubyEditor
          defaultCode={`# require: falseを使う理由と手動requireのパターン
require 'json'

# require: falseはBundlerに読み込みを任せず
# 必要なときだけ手動でrequireする
# → 起動時間の短縮に役立つ

# 例: RuboCopは開発ツールなので通常require: false
# gem "rubocop", require: false
# → bundle exec rubocop でCLIから呼ぶので自動requireは不要

# グループのインストールを除外する例
# bundle install --without production
# → 本番のみのGemをCIや開発環境でスキップ

group_benefits = {
  development: ["デバッグツール", "コードジェネレータ", "ホットリロード"],
  test: ["テストフレームワーク", "モックライブラリ", "カバレッジツール"],
  production: ["パフォーマンスモニタリング", "エラートラッキング"],
}

group_benefits.each do |env, tools|
  puts "#{env}グループ:"
  tools.each { |t| puts "  - #{t}" }
end`}
          expectedOutput={`developmentグループ:
  - デバッグツール
  - コードジェネレータ
  - ホットリロード
testグループ:
  - テストフレームワーク
  - モックライブラリ
  - カバレッジツール
productionグループ:
  - パフォーマンスモニタリング
  - エラートラッキング`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="gems" lessonId="gemfile" />
      </div>
      <LessonNav lessons={lessons} currentId="gemfile" basePath="/learn/gems" />
    </div>
  );
}
