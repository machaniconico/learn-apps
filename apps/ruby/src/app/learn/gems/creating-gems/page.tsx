import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "gems")!.lessons;

export default function CreatingGemsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Gem・Bundler レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Gem作成</h1>
        <p className="text-gray-400">bundle gem コマンドで自分のGemを作成し、gemspecを定義する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Gem作成の流れ</h2>
        <p className="text-gray-300 mb-3">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">bundle gem</code>コマンドでGemの雛形を生成し、
          gemspecファイルにメタデータを定義してRubyGemsに公開できます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">bundle gem my_gem</code> — Gemの雛形を生成</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">my_gem.gemspec</code> — Gemのメタデータを定義</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">gem build my_gem.gemspec</code> — .gemファイルを作成</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">gem push my_gem-1.0.0.gem</code> — RubyGemsに公開</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Gemのディレクトリ構造</h2>
        <RubyEditor
          defaultCode={`# bundle gem my_awesome_gem で生成されるディレクトリ構造
structure = {
  "my_awesome_gem/" => {
    "lib/" => {
      "my_awesome_gem/" => {
        "version.rb" => "バージョン定数を定義"
      },
      "my_awesome_gem.rb" => "Gemのエントリーポイント"
    },
    "test/" => {
      "test_helper.rb" => "テスト設定",
      "my_awesome_gem_test.rb" => "テストファイル"
    },
    "my_awesome_gem.gemspec" => "Gemのメタデータ",
    "Gemfile" => "依存Gem（gemspecを参照）",
    "Rakefile" => "Rakeタスク定義",
    "README.md" => "ドキュメント",
    ".gitignore" => "Git除外設定",
    "CHANGELOG.md" => "変更履歴",
  }
}

def print_tree(node, indent = 0)
  node.each do |name, content|
    prefix = "  " * indent
    if content.is_a?(Hash)
      puts "#{prefix}#{name}"
      print_tree(content, indent + 1)
    else
      puts "#{prefix}#{name}  # #{content}"
    end
  end
end

print_tree(structure)`}
          expectedOutput={`my_awesome_gem/
  lib/
    my_awesome_gem/
      version.rb  # バージョン定数を定義
    my_awesome_gem.rb  # Gemのエントリーポイント
  test/
    test_helper.rb  # テスト設定
    my_awesome_gem_test.rb  # テストファイル
  my_awesome_gem.gemspec  # Gemのメタデータ
  Gemfile  # 依存Gem（gemspecを参照）
  Rakefile  # Rakeタスク定義
  README.md  # ドキュメント
  .gitignore  # Git除外設定
  CHANGELOG.md  # 変更履歴`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: gemspecファイルの書き方</h2>
        <RubyEditor
          defaultCode={`# my_awesome_gem.gemspec の例
gemspec_content = <<~GEMSPEC
  require_relative "lib/my_awesome_gem/version"

  Gem::Specification.new do |spec|
    spec.name    = "my_awesome_gem"
    spec.version = MyAwesomeGem::VERSION  # "1.0.0"
    spec.authors = ["Your Name"]
    spec.email   = ["your@email.com"]

    spec.summary     = "素晴らしいGemの概要"
    spec.description = "このGemは素晴らしい機能を提供します"
    spec.homepage    = "https://github.com/yourname/my_awesome_gem"
    spec.license     = "MIT"

    spec.required_ruby_version = ">= 3.0.0"

    spec.metadata["homepage_uri"]    = spec.homepage
    spec.metadata["source_code_uri"] = spec.homepage
    spec.metadata["changelog_uri"]   = "#{spec.homepage}/blob/main/CHANGELOG.md"

    # libディレクトリのファイルをGemに含める
    spec.files = Dir["lib/**/*", "LICENSE.txt", "README.md"]
    spec.require_paths = ["lib"]

    # 実行ファイル（CLIツールの場合）
    # spec.executables = ["my_awesome_gem"]

    # 依存Gem
    spec.add_dependency "json", "~> 2.0"

    # 開発用依存（gemspecの慣例ではなくGemfileのgroupを使う）
  end
GEMSPEC

puts gemspec_content`}
          expectedOutput={`require_relative "lib/my_awesome_gem/version"

Gem::Specification.new do |spec|
  spec.name    = "my_awesome_gem"
  spec.version = MyAwesomeGem::VERSION  # "1.0.0"
  spec.authors = ["Your Name"]
  spec.email   = ["your@email.com"]

  spec.summary     = "素晴らしいGemの概要"
  spec.description = "このGemは素晴らしい機能を提供します"
  spec.homepage    = "https://github.com/yourname/my_awesome_gem"
  spec.license     = "MIT"

  spec.required_ruby_version = ">= 3.0.0"
  ...`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: シンプルなGemの実装例</h2>
        <RubyEditor
          defaultCode={`# lib/string_utils/version.rb に相当
module StringUtils
  VERSION = "1.0.0"

  # lib/string_utils.rb に相当
  module_function

  def truncate(str, length: 50, omission: "...")
    return str if str.length <= length
    str[0, length - omission.length] + omission
  end

  def slugify(str)
    str.downcase
       .gsub(/[^\w\s-]/, '')
       .gsub(/\s+/, '-')
       .gsub(/-+/, '-')
       .strip
  end

  def word_wrap(str, width: 80)
    str.gsub(/(.{1,#{width}})(\s+|$)/, "\\1\n").strip
  end
end

# 使用例
puts StringUtils::VERSION

long_text = "これは非常に長い文字列です。テスト用のサンプルテキストとして使用します。"
puts StringUtils.truncate(long_text, length: 20)

title = "Hello World! Ruby Programming"
puts StringUtils.slugify(title)

text = "Ruby is a dynamic, open source programming language with a focus on simplicity."
puts StringUtils.word_wrap(text, width: 40)`}
          expectedOutput={`1.0.0
これは非常に長い文字列...
hello-world-ruby-programming
Ruby is a dynamic, open source
programming language with a focus on
simplicity.`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="gems" lessonId="creating-gems" />
      </div>
      <LessonNav lessons={lessons} currentId="creating-gems" basePath="/learn/gems" />
    </div>
  );
}
