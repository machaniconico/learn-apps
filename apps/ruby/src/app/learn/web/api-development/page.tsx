import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "web")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Web開発基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">API開発</h1>
        <p className="text-gray-400">RESTful JSON APIの設計原則とRubyによる実装パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">REST APIの原則</h2>
        <p className="text-gray-300 mb-3">
          REST（Representational State Transfer）はWebサービス設計のアーキテクチャスタイルです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>リソースをURLで表現する（<code className="bg-gray-800 px-1 rounded text-blue-300">/users/1</code>）</li>
          <li>HTTPメソッドで操作を表す（GET/POST/PUT/DELETE）</li>
          <li>ステートレス（各リクエストは独立している）</li>
          <li>バージョニング（<code className="bg-gray-800 px-1 rounded text-blue-300">/api/v1/users</code>）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: REST APIの設計</h2>
        <RubyEditor
          defaultCode={`require 'json'

# シンプルなREST APIの実装（擬似コード）
class UsersAPI
  def initialize
    @users = [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob",   email: "bob@example.com" },
    ]
    @next_id = 3
  end

  # GET /api/v1/users
  def index
    { status: 200, body: @users }
  end

  # GET /api/v1/users/:id
  def show(id)
    user = @users.find { |u| u[:id] == id }
    user ? { status: 200, body: user } : { status: 404, body: { error: "Not Found" } }
  end

  # POST /api/v1/users
  def create(params)
    user = { id: @next_id, name: params[:name], email: params[:email] }
    @users << user
    @next_id += 1
    { status: 201, body: user }
  end
end

api = UsersAPI.new

# GET /api/v1/users
res = api.index
puts "GET /users -> #{res[:status]}"
puts JSON.generate(res[:body])

# GET /api/v1/users/1
res = api.show(1)
puts "\nGET /users/1 -> #{res[:status]}"
puts JSON.generate(res[:body])

# POST /api/v1/users
res = api.create(name: "Charlie", email: "charlie@example.com")
puts "\nPOST /users -> #{res[:status]}"
puts JSON.generate(res[:body])`}
          expectedOutput={`GET /users -> 200
[{"id":1,"name":"Alice","email":"alice@example.com"},{"id":2,"name":"Bob","email":"bob@example.com"}]

GET /users/1 -> 200
{"id":1,"name":"Alice","email":"alice@example.com"}

POST /users -> 201
{"id":3,"name":"Charlie","email":"charlie@example.com"}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: APIバージョニングとエラーハンドリング</h2>
        <RubyEditor
          defaultCode={`require 'json'

# APIレスポンスヘルパー
module ApiHelper
  def success(data, status: 200)
    puts "HTTP #{status}"
    puts JSON.generate({ data: data, status: "success" })
  end

  def error(message, status: 400)
    puts "HTTP #{status}"
    puts JSON.generate({ error: message, status: "error" })
  end
end

class ApiV1Controller
  include ApiHelper

  def get_user(id)
    if id > 0
      success({ id: id, name: "User #{id}", version: "v1" })
    else
      error("Invalid user ID", status: 422)
    end
  end
end

class ApiV2Controller
  include ApiHelper

  def get_user(id)
    if id > 0
      # v2では追加フィールドを返す
      success({ id: id, name: "User #{id}", version: "v2", created_at: "2024-01-01" })
    else
      error("User not found", status: 404)
    end
  end
end

puts "=== API v1 ==="
ApiV1Controller.new.get_user(1)

puts "\n=== API v2 ==="
ApiV2Controller.new.get_user(1)

puts "\n=== エラーケース ==="
ApiV1Controller.new.get_user(-1)`}
          expectedOutput={`=== API v1 ===
HTTP 200
{"data":{"id":1,"name":"User 1","version":"v1"},"status":"success"}

=== API v2 ===
HTTP 200
{"data":{"id":1,"name":"User 1","version":"v2","created_at":"2024-01-01"},"status":"success"}

=== エラーケース ===
HTTP 422
{"error":"Invalid user ID","status":"error"}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="web" lessonId="api-development" />
      </div>
      <LessonNav lessons={lessons} currentId="api-development" basePath="/learn/web" />
    </div>
  );
}
