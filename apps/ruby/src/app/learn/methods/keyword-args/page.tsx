import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function KeywordArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">キーワード引数</h1>
        <p className="text-gray-400">名前付きで引数を渡すキーワード引数の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">キーワード引数とは</h2>
        <p className="text-gray-300 mb-4">
          キーワード引数を使うと、引数を名前付きで渡せるため、コードが読みやすくなります。
          引数の順序を気にする必要がなく、どの値がどの引数に対応するか明確です。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(name:)</code> — 必須キーワード引数</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(name: "Alice")</code> — デフォルト付きキーワード引数</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(**opts)</code> — 任意キーワード引数（ハッシュ）</li>
          <li>呼び出し時: <code className="bg-gray-800 px-1.5 py-0.5 rounded">f(name: "Bob")</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なキーワード引数</h2>
        <RubyEditor
          defaultCode={`# キーワード引数の定義
def create_user(name:, age:, role: "user")
  "#{name}(#{age}歳) [#{role}]"
end

# 名前で渡すため順序は自由
puts create_user(name: "Alice", age: 30)
puts create_user(age: 25, name: "Bob")
puts create_user(name: "Carol", age: 35, role: "admin")

# 必須キーワード引数を省略するとエラー
begin
  create_user(name: "Dave")
rescue ArgumentError => e
  puts "エラー: #{e.message}"
end`}
          expectedOutput={`Alice(30歳) [user]
Bob(25歳) [user]
Carol(35歳) [admin]
エラー: missing keyword: :age`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: **kwargsで任意キーワード引数</h2>
        <RubyEditor
          defaultCode={`# **kwargs で任意のキーワードを受け取る
def configure(**options)
  defaults = { debug: false, timeout: 30, retries: 3 }
  config = defaults.merge(options)
  config.each do |key, val|
    puts "  #{key}: #{val}"
  end
end

puts "デフォルト設定:"
configure

puts "カスタム設定:"
configure(debug: true, timeout: 60)

# 通常引数とキーワード引数の混合
def log(message, level: :info, **meta)
  prefix = case level
           when :info  then "[INFO]"
           when :warn  then "[WARN]"
           when :error then "[ERROR]"
           end
  puts "#{prefix} #{message}"
  meta.each { |k, v| puts "  #{k}: #{v}" } unless meta.empty?
end

log("起動しました")
log("ディスク容量低下", level: :warn, disk: "85%", host: "server1")`}
          expectedOutput={`デフォルト設定:
  debug: false
  timeout: 30
  retries: 3
カスタム設定:
  debug: true
  timeout: 60
  retries: 3
[INFO] 起動しました
[WARN] ディスク容量低下
  disk: 85%
  host: server1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ハッシュとキーワード引数</h2>
        <RubyEditor
          defaultCode={`# ハッシュを**で展開してキーワード引数に渡す
def draw_rect(x:, y:, width:, height:, color: "black")
  "#{color}の矩形: (#{x},#{y}) #{width}x#{height}"
end

params = { x: 10, y: 20, width: 100, height: 50 }
puts draw_rect(**params)
puts draw_rect(**params, color: "red")

# 位置引数とキーワード引数の混合
def connect(host, port, ssl: false, timeout: 10)
  protocol = ssl ? "https" : "http"
  "#{protocol}://#{host}:#{port} (timeout: #{timeout}s)"
end

puts connect("example.com", 443, ssl: true)
puts connect("localhost", 3000)`}
          expectedOutput={`blackの矩形: (10,20) 100x50
redの矩形: (10,20) 100x50
https://example.com:443 (timeout: 10s)
http://localhost:3000 (timeout: 10s)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="keyword-args" />
      </div>
      <LessonNav lessons={lessons} currentId="keyword-args" basePath="/learn/methods" />
    </div>
  );
}
