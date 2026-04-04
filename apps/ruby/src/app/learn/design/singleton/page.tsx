import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "design")!.lessons;

export default function SingletonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">設計パターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シングルトン</h1>
        <p className="text-gray-400">Singletonモジュールを使ってクラスのインスタンスを1つに制限する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">シングルトンパターンとは</h2>
        <p className="text-gray-300 mb-3">
          シングルトンパターンはクラスのインスタンスが1つだけ生成されることを保証するデザインパターンです。
          アプリケーション全体で共有する設定・ロガー・接続プールなどに使われます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-purple-300">require &apos;singleton&apos;</code> — Singletonモジュールを読み込む</li>
          <li><code className="bg-gray-800 px-1 rounded text-purple-300">include Singleton</code> — クラスに適用する</li>
          <li><code className="bg-gray-800 px-1 rounded text-purple-300">ClassName.instance</code> — 唯一のインスタンスを取得</li>
          <li><code className="bg-gray-800 px-1 rounded text-purple-300">new</code>はprivateになり直接呼び出せない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Singletonモジュールの基本</h2>
        <RubyEditor
          defaultCode={`require 'singleton'

class AppLogger
  include Singleton

  def initialize
    @log = []
    puts "Loggerを初期化しました（1回だけ表示されるはず）"
  end

  def log(message)
    entry = "[#{Time.now.strftime('%H:%M:%S')}] #{message}"
    @log << entry
    puts entry
  end

  def history = @log
end

# instanceメソッドで取得（毎回同じオブジェクト）
logger1 = AppLogger.instance
logger2 = AppLogger.instance

logger1.log("アプリ起動")
logger2.log("ユーザーログイン")

puts logger1.equal?(logger2)  # 同一オブジェクト
puts AppLogger.instance.history.length

# newは呼べない
begin
  AppLogger.new
rescue NoMethodError => e
  puts "エラー: #{e.message}"
end`}
          expectedOutput={`Loggerを初期化しました（1回だけ表示されるはず）
[xx:xx:xx] アプリ起動
[xx:xx:xx] ユーザーログイン
true
2
エラー: private method 'new' called for class AppLogger`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 設定管理のシングルトン</h2>
        <RubyEditor
          defaultCode={`require 'singleton'

class Config
  include Singleton

  DEFAULTS = {
    host: "localhost",
    port: 3000,
    debug: false,
    max_connections: 10,
  }.freeze

  def initialize
    @settings = DEFAULTS.dup
  end

  def set(key, value)
    raise ArgumentError, "不明なキー: #{key}" unless DEFAULTS.key?(key)
    @settings[key] = value
  end

  def get(key) = @settings[key]

  def [](key)  = get(key)
  def []=(key, value) = set(key, value)

  def to_h = @settings.dup
end

config = Config.instance
puts "デフォルト設定:"
config.to_h.each { |k, v| puts "  #{k}: #{v}" }

# 設定を変更
config[:host]  = "production.example.com"
config[:port]  = 8080
config[:debug] = true

puts "\n更新後の設定:"
puts "  host: #{Config.instance[:host]}"
puts "  port: #{Config.instance[:port]}"
puts "  debug: #{Config.instance[:debug]}"`}
          expectedOutput={`デフォルト設定:
  host: localhost
  port: 3000
  debug: false
  max_connections: 10

更新後の設定:
  host: production.example.com
  port: 8080
  debug: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: クラスメソッドで実装するシングルトン</h2>
        <RubyEditor
          defaultCode={`# Singletonモジュールを使わない実装例
class DatabaseConnection
  @instance = nil
  @mutex = Mutex.new

  def self.instance
    return @instance if @instance
    @mutex.synchronize do
      @instance ||= new
    end
    @instance
  end

  private_class_method :new

  def initialize
    @connected = false
    @query_count = 0
    puts "DB接続を初期化"
  end

  def connect(url)
    @url = url
    @connected = true
    puts "#{url}に接続しました"
  end

  def query(sql)
    raise "接続されていません" unless @connected
    @query_count += 1
    puts "クエリ実行[#{@query_count}]: #{sql}"
    { rows: [], count: 0 }
  end

  def stats
    { connected: @connected, queries: @query_count, url: @url }
  end
end

db = DatabaseConnection.instance
db.connect("postgres://localhost/myapp")
db.query("SELECT * FROM users")
db.query("SELECT * FROM posts")

puts DatabaseConnection.instance.stats.inspect
puts DatabaseConnection.instance.equal?(db)`}
          expectedOutput={`DB接続を初期化
postgres://localhost/myappに接続しました
クエリ実行[1]: SELECT * FROM users
クエリ実行[2]: SELECT * FROM posts
{:connected=>true, :queries=>2, :url=>"postgres://localhost/myapp"}
true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="singleton" />
      </div>
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/design" />
    </div>
  );
}
