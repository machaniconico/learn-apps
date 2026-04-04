import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "web")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Web開発基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HTTP基本</h1>
        <p className="text-gray-400">HTTPメソッド、ステータスコード、リクエスト・レスポンスの構造を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HTTPの基礎</h2>
        <p className="text-gray-300 mb-3">
          HTTP（HyperText Transfer Protocol）はWebの通信プロトコルです。クライアントがリクエストを送り、サーバーがレスポンスを返します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">GET</code> — リソースの取得（副作用なし）</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">POST</code> — リソースの作成</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">PUT/PATCH</code> — リソースの更新</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">DELETE</code> — リソースの削除</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: HTTPステータスコード</h2>
        <RubyEditor
          defaultCode={`# HTTPステータスコードの分類
status_codes = {
  "2xx 成功" => {
    200 => "OK",
    201 => "Created",
    204 => "No Content",
  },
  "3xx リダイレクト" => {
    301 => "Moved Permanently",
    302 => "Found",
    304 => "Not Modified",
  },
  "4xx クライアントエラー" => {
    400 => "Bad Request",
    401 => "Unauthorized",
    403 => "Forbidden",
    404 => "Not Found",
    422 => "Unprocessable Entity",
  },
  "5xx サーバーエラー" => {
    500 => "Internal Server Error",
    503 => "Service Unavailable",
  }
}

status_codes.each do |category, codes|
  puts "\n#{category}:"
  codes.each { |code, desc| puts "  #{code}: #{desc}" }
end`}
          expectedOutput={`
2xx 成功:
  200: OK
  201: Created
  204: No Content

3xx リダイレクト:
  301: Moved Permanently
  302: Found
  304: Not Modified

4xx クライアントエラー:
  400: Bad Request
  401: Unauthorized
  403: Forbidden
  404: Not Found
  422: Unprocessable Entity

5xx サーバーエラー:
  500: Internal Server Error
  503: Service Unavailable`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: リクエスト・レスポンスの構造</h2>
        <RubyEditor
          defaultCode={`# HTTPリクエストとレスポンスの構造
class HttpRequest
  attr_reader :method, :path, :headers, :body

  def initialize(method, path, headers: {}, body: nil)
    @method = method
    @path = path
    @headers = headers
    @body = body
  end

  def to_s
    lines = ["#{@method} #{@path} HTTP/1.1"]
    @headers.each { |k, v| lines << "#{k}: #{v}" }
    lines << "" << @body if @body
    lines.join("\n")
  end
end

class HttpResponse
  def initialize(status, body, content_type: "application/json")
    @status = status
    @body = body
    @headers = {
      "Content-Type" => content_type,
      "Content-Length" => body.length
    }
  end

  def to_s
    lines = ["HTTP/1.1 #{@status}"]
    @headers.each { |k, v| lines << "#{k}: #{v}" }
    lines << "" << @body
    lines.join("\n")
  end
end

req = HttpRequest.new("POST", "/api/users",
  headers: { "Content-Type" => "application/json", "Accept" => "application/json" },
  body: '{"name":"Alice","email":"alice@example.com"}'
)
puts "=== リクエスト ==="
puts req

puts "\n=== レスポンス ==="
res = HttpResponse.new("201 Created", '{"id":1,"name":"Alice"}')`}
          expectedOutput={`=== リクエスト ===
POST /api/users HTTP/1.1
Content-Type: application/json
Accept: application/json

{"name":"Alice","email":"alice@example.com"}

=== レスポンス ===
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 23

{"id":1,"name":"Alice"}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="web" lessonId="http-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="http-basics" basePath="/learn/web" />
    </div>
  );
}
