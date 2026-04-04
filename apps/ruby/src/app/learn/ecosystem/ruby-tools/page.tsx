import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Rubyエコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Rubyツール</h1>
        <p className="text-gray-400">irb、rubyコマンド、gem、ri、rdocなどRuby開発の基本ツールを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyの基本ツール</h2>
        <p className="text-gray-300 mb-3">
          Rubyには開発を支援する豊富なコマンドラインツールが付属しています。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-green-300">irb</code> — Interactive Ruby Shell（REPLプロンプト）</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">ruby -e "..."</code> — 1行のRubyコードを実行</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">gem install/list/uninstall</code> — gem管理</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">ri Array#map</code> — ターミナルでドキュメント参照</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: rubyコマンドのオプション</h2>
        <RubyEditor
          defaultCode={`# ruby -e: 1行スクリプト
# ruby -e "puts 'Hello'"

# ruby -n: 各行を処理（awkのように）
# echo -e "1\n2\n3" | ruby -ne "puts $_.to_i * 2"

# ruby --version: バージョン確認
# ruby --version  -> ruby 3.2.x

# Rubyのビルトイン定数
puts "Rubyバージョン: #{RUBY_VERSION}"
puts "プラットフォーム: #{RUBY_PLATFORM}"
puts "リリース日: #{RUBY_RELEASE_DATE}"
puts "エンジン: #{RUBY_ENGINE}"

# $LOAD_PATH: ライブラリ検索パス
puts "\nLoad Pathの例:"
$LOAD_PATH.first(3).each { |p| puts "  #{p}" }

# __FILE__ と __LINE__
puts "\n現在のファイル: #{__FILE__}"
puts "現在の行: #{__LINE__}"`}
          expectedOutput={`Rubyバージョン: 3.2.0
プラットフォーム: x86_64-linux
リリース日: 2022-12-25
エンジン: ruby

Load Pathの例:
  /usr/local/lib/ruby/gems/3.2.0/gems
  /usr/local/lib/ruby/3.2.0/x86_64-linux
  /usr/local/lib/ruby/3.2.0

現在のファイル: main.rb
現在の行: 20`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: gem情報とObjectSpaceの活用</h2>
        <RubyEditor
          defaultCode={`require 'rbconfig'

# Rubyのインストール情報
puts "Rubyのインストール情報:"
puts "  bindir: #{RbConfig::CONFIG['bindir']}"
puts "  rubylibdir: #{RbConfig::CONFIG['rubylibdir']}"
puts "  arch: #{RbConfig::CONFIG['arch']}"

# ObjectSpace: オブジェクトの統計
puts "\nObjectSpaceの統計:"
counts = {}
ObjectSpace.each_object do |obj|
  key = obj.class.name || "Anonymous"
  counts[key] = (counts[key] || 0) + 1
end

# 上位5クラスを表示
top5 = counts.sort_by { |_, v| -v }.first(5)
top5.each do |klass, count|
  puts "  #{klass.ljust(15)}: #{count}個"
end

# GCの情報
puts "\nGCの統計:"
gc_stat = GC.stat
puts "  ヒープ数: #{gc_stat[:heap_available_slots]}"
puts "  GC回数: #{gc_stat[:count]}"`}
          expectedOutput={`Rubyのインストール情報:
  bindir: /usr/local/bin
  rubylibdir: /usr/local/lib/ruby/3.2.0
  arch: x86_64-linux

ObjectSpaceの統計:
  String         : 15234個
  Array          : 3421個
  Hash           : 1205個
  Symbol         : 876個
  Proc           : 543個

GCの統計:
  ヒープ数: 16384
  GC回数: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="ruby-tools" />
      </div>
      <LessonNav lessons={lessons} currentId="ruby-tools" basePath="/learn/ecosystem" />
    </div>
  );
}
