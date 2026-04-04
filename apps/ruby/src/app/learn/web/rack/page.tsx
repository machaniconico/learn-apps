import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "web")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Web開発基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Rack</h1>
        <p className="text-gray-400">RubyのWebサーバーインターフェースであるRackの仕組みとcallメソッドを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rackとは</h2>
        <p className="text-gray-300 mb-3">
          RackはRubyのWebサーバーとWebフレームワークの間の統一インターフェースです。Rails・Sinatraなど多くのフレームワークがRack上に構築されています。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>Rackアプリは<code className="bg-gray-800 px-1 rounded text-blue-300">call(env)</code>メソッドを持つオブジェクト</li>
          <li>戻り値は<code className="bg-gray-800 px-1 rounded text-blue-300">[status, headers, body]</code>の3要素配列</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">env</code>にはリクエスト情報が格納される</li>
          <li>ミドルウェアをスタックとして積み重ねられる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 最小のRackアプリ</h2>
        <RubyEditor
          defaultCode={`# 最小のRackアプリケーション（シミュレーション）
class HelloRack
  def call(env)
    path = env["PATH_INFO"] || "/"
    method = env["REQUEST_METHOD"] || "GET"

    body = "Hello from Rack! Path: #{path}"
    [
      200,
      { "Content-Type" => "text/plain", "Content-Length" => body.length.to_s },
      [body]
    ]
  end
end

# リクエストをシミュレート
app = HelloRack.new

requests = [
  { "PATH_INFO" => "/", "REQUEST_METHOD" => "GET" },
  { "PATH_INFO" => "/about", "REQUEST_METHOD" => "GET" },
]

requests.each do |env|
  status, headers, body = app.call(env)
  puts "#{env['REQUEST_METHOD']} #{env['PATH_INFO']}"
  puts "  Status: #{status}"
  puts "  Content-Type: #{headers['Content-Type']}"
  puts "  Body: #{body.first}"
  puts
end`}
          expectedOutput={`GET /
  Status: 200
  Content-Type: text/plain
  Body: Hello from Rack! Path: /

GET /about
  Status: 200
  Content-Type: text/plain
  Body: Hello from Rack! Path: /about`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Rackミドルウェア</h2>
        <RubyEditor
          defaultCode={`# Rackミドルウェアのスタック
class LoggingMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    puts "[LOG] #{env['REQUEST_METHOD']} #{env['PATH_INFO']}"
    status, headers, body = @app.call(env)
    puts "[LOG] Response: #{status}"
    [status, headers, body]
  end
end

class TimingMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    start = Time.now
    result = @app.call(env)
    elapsed = ((Time.now - start) * 1000).round(2)
    puts "[TIMING] #{elapsed}ms"
    result
  end
end

class App
  def call(env)
    [200, {}, ["OK"]]
  end
end

# ミドルウェアを積み重ねる
app = TimingMiddleware.new(LoggingMiddleware.new(App.new))
app.call({ "REQUEST_METHOD" => "GET", "PATH_INFO" => "/users" })`}
          expectedOutput={`[LOG] GET /users
[LOG] Response: 200
[TIMING] 0.01ms`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="web" lessonId="rack" />
      </div>
      <LessonNav lessons={lessons} currentId="rack" basePath="/learn/web" />
    </div>
  );
}
