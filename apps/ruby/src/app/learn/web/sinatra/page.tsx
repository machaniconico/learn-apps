import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "web")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Web開発基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Sinatra</h1>
        <p className="text-gray-400">軽量WebフレームワークSinatraのルーティング、パラメータ、テンプレートを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Sinatraとは</h2>
        <p className="text-gray-300 mb-3">
          SinatraはシンプルなDSLでWebアプリを構築できる軽量フレームワークです。Rackの上に構築されています。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">get '/path' {`{ }`}</code> — GETルートの定義</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">post '/path' {`{ }`}</code> — POSTルートの定義</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">params[:name]</code> — URLパラメータへのアクセス</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">Sinatra::Base</code> — モジュラースタイル</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Sinatraルーティングの模倣</h2>
        <RubyEditor
          defaultCode={`# Sinatraスタイルのルーティング（擬似実装）
class SinatraApp
  def initialize
    @routes = { get: {}, post: {} }
  end

  def get(path, &block)
    @routes[:get][path] = block
    puts "GET #{path} を登録"
  end

  def post(path, &block)
    @routes[:post][path] = block
    puts "POST #{path} を登録"
  end

  def dispatch(method, path, params = {})
    handler = @routes[method][path]
    if handler
      result = handler.call(params)
      puts "#{method.upcase} #{path} -> #{result}"
    else
      puts "404 Not Found: #{method.upcase} #{path}"
    end
  end
end

app = SinatraApp.new

app.get('/') { |p| "Hello, World!" }
app.get('/users/:id') { |p| "User #{p[:id]}" }
app.post('/users') { |p| "Created user: #{p[:name]}" }

puts "\nリクエスト処理:"
app.dispatch(:get, '/')
app.dispatch(:get, '/users/:id', { id: 42 })
app.dispatch(:post, '/users', { name: "Alice" })
app.dispatch(:get, '/missing')`}
          expectedOutput={`GET / を登録
GET /users/:id を登録
POST /users を登録

リクエスト処理:
GET / -> Hello, World!
GET /users/:id -> User 42
POST /users -> Created user: Alice
404 Not Found: GET /missing`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Sinatra::Baseモジュラースタイル</h2>
        <RubyEditor
          defaultCode={`# Sinatra::Baseを使ったモジュラースタイル（概念）
# require 'sinatra/base'

class MyApp
  ROUTES = {}

  def self.get(path, &block)
    ROUTES["GET:#{path}"] = block
  end

  def self.post(path, &block)
    ROUTES["POST:#{path}"] = block
  end

  def self.call(env)
    key = "#{env[:method]}:#{env[:path]}"
    handler = ROUTES[key]
    handler ? handler.call(env) : "404 Not Found"
  end

  # ルート定義
  get '/' do |env|
    "Welcome to MyApp!"
  end

  get '/hello/:name' do |env|
    "Hello, #{env[:name]}!"
  end

  post '/echo' do |env|
    "Echo: #{env[:body]}"
  end
end

# リクエストをシミュレート
puts MyApp.call({ method: "GET", path: "/" })
puts MyApp.call({ method: "GET", path: "/hello/:name", name: "Ruby" })
puts MyApp.call({ method: "POST", path: "/echo", body: "test data" })
puts MyApp.call({ method: "GET", path: "/unknown" })`}
          expectedOutput={`Welcome to MyApp!
Hello, Ruby!
Echo: test data
404 Not Found`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="web" lessonId="sinatra" />
      </div>
      <LessonNav lessons={lessons} currentId="sinatra" basePath="/learn/web" />
    </div>
  );
}
