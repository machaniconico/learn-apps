import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "io")!;

export default function DirOperationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-400">ファイルI/O</p>
        <h1 className="text-3xl font-bold text-gray-100">ディレクトリ操作</h1>
        <p className="text-gray-400">
          Dir.glob、Dir.mkdir、FileUtilsを使ったディレクトリとファイルの操作を学びます。スクリプトでのファイル管理タスクに必須の知識です。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">Dir.glob でファイルを検索</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Dir.glob(pattern)</code> はグロブパターンにマッチするファイル一覧を返します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">**</code> は再帰的なディレクトリ探索を意味します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# Dir.glob のシミュレーション
files = [
  "src/main.rb",
  "src/utils.rb",
  "src/models/user.rb",
  "src/models/post.rb",
  "test/main_test.rb",
  "config/database.yml",
  "config/settings.yml",
  "README.md",
  "Gemfile",
]

# パターンマッチのシミュレーション
def glob_match(files, pattern)
  regex = Regexp.new(
    "^" + pattern.gsub("**", ".+").gsub("*", "[^/]+").gsub(".", "\\.") + "$"
  )
  files.select { |f| f.match?(regex) }
end

puts "=== *.rb ==="
puts glob_match(files, "src/*.rb").inspect

puts "\n=== src/**/*.rb ==="
puts glob_match(files, "src/.+\\.rb").inspect  # ** シミュレーション

puts "\n=== 全YAMLファイル ==="
yaml_files = files.select { |f| f.end_with?(".yml") }
puts yaml_files.inspect`}
        expectedOutput={`=== *.rb ===
["src/main.rb", "src/utils.rb"]

=== src/**/*.rb ===
["src/main.rb", "src/utils.rb", "src/models/user.rb", "src/models/post.rb"]

=== 全YAMLファイル ===
["config/database.yml", "config/settings.yml"]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">Dir のその他のメソッド</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Dir.pwd</code> でカレントディレクトリ、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Dir.exist?</code> でディレクトリの存在確認、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Dir.mkdir</code> でディレクトリを作成します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# Dirのメソッドを確認
puts "現在のディレクトリ: #{Dir.pwd}"

# File クラスのメソッド
path = "/usr/local/bin/ruby"
puts File.dirname(path)
puts File.basename(path)
puts File.extname("config.yml")
puts File.join("src", "models", "user.rb")

# ファイル情報
puts File.exist?("/usr/local/bin/ruby")
puts File.directory?("/usr/local/bin")

# パス操作
puts File.expand_path("~/ruby-app")
puts File.absolute_path("../config", "/home/user/app")`}
        expectedOutput={`現在のディレクトリ: /Users/user/ruby-learn-app
/usr/local/bin
ruby
.yml
src/models/user.rb
true
true
/Users/user/ruby-app
/home/user/config`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">FileUtils でファイル操作</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">require &apos;fileutils&apos;</code> でFileUtilsを読み込みます。
          cp、mv、rm_rf、mkdir_pなどのシェルコマンドに相当するメソッドを提供します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'fileutils'

# FileUtils のメソッド一覧を確認
file_utils_methods = FileUtils.public_methods(false).sort
puts "FileUtils のメソッド数: #{file_utils_methods.length}"
puts file_utils_methods.first(10).inspect

# よく使うメソッドの説明
operations = {
  "cp(src, dest)" => "ファイルをコピー",
  "cp_r(src, dest)" => "ディレクトリを再帰的にコピー",
  "mv(src, dest)" => "ファイルを移動/リネーム",
  "rm(path)" => "ファイルを削除",
  "rm_rf(path)" => "ディレクトリを再帰的に削除",
  "mkdir_p(path)" => "ディレクトリを再帰的に作成",
  "touch(path)" => "ファイルのタイムスタンプを更新",
}

puts "\n=== よく使うメソッド ==="
operations.each do |method, desc|
  puts "FileUtils.#{method} - #{desc}"
end`}
        expectedOutput={`FileUtils のメソッド数: 34
[:cd, :chdir, :chmod, :chmod_R, :chown, :chown_R, :cmp, :compare_file, :compare_stream, :copy]
=== よく使うメソッド ===
FileUtils.cp(src, dest) - ファイルをコピー
FileUtils.cp_r(src, dest) - ディレクトリを再帰的にコピー
FileUtils.mv(src, dest) - ファイルを移動/リネーム
FileUtils.rm(path) - ファイルを削除
FileUtils.rm_rf(path) - ディレクトリを再帰的に削除
FileUtils.mkdir_p(path) - ディレクトリを再帰的に作成
FileUtils.touch(path) - ファイルのタイムスタンプを更新`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="io" lessonId="dir-operations" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="dir-operations"
        basePath="/learn/io"
      />
    </div>
  );
}
