import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "web")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Web開発基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">WebSocket</h1>
        <p className="text-gray-400">faye-websocketとAction Cableによるリアルタイム通信の基礎を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">WebSocketとは</h2>
        <p className="text-gray-300 mb-3">
          WebSocketはHTTPと異なり、クライアントとサーバー間で持続的な双方向通信を可能にするプロトコルです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>HTTPのハンドシェイクからアップグレード</li>
          <li>全二重通信（同時に送受信可能）</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">faye-websocket</code> — RubyのWebSocketライブラリ</li>
          <li><code className="bg-gray-800 px-1 rounded text-blue-300">Action Cable</code> — RailsのWebSocket統合</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: WebSocketのイベント駆動モデル</h2>
        <RubyEditor
          defaultCode={`# WebSocketのイベント駆動（擬似実装）
class WebSocketConnection
  attr_reader :id, :messages

  def initialize(id)
    @id = id
    @messages = []
    @handlers = {}
    @open = false
  end

  def on(event, &block)
    @handlers[event] = block
  end

  def emit(event, data = nil)
    handler = @handlers[event]
    handler&.call(data)
  end

  def send(message)
    @messages << message
    puts "[WS #{@id}] 送信: #{message}"
  end

  def simulate_connect
    @open = true
    emit(:open)
  end

  def simulate_message(data)
    emit(:message, data)
  end

  def simulate_close
    @open = false
    emit(:close)
  end
end

# WebSocketハンドラーの設定
ws = WebSocketConnection.new("conn-001")

ws.on(:open) do
  puts "接続確立"
  ws.send("Welcome!")
end

ws.on(:message) do |data|
  puts "受信: #{data}"
  ws.send("Echo: #{data}")
end

ws.on(:close) do
  puts "接続終了"
end

# イベントをシミュレート
ws.simulate_connect
ws.simulate_message("Hello, Server!")
ws.simulate_message("How are you?")
ws.simulate_close`}
          expectedOutput={`接続確立
[WS conn-001] 送信: Welcome!
受信: Hello, Server!
[WS conn-001] 送信: Echo: Hello, Server!
受信: How are you?
[WS conn-001] 送信: Echo: How are you?
接続終了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Action Cableのチャンネル概念</h2>
        <RubyEditor
          defaultCode={`# Action Cableのチャンネル（擬似実装）
class ChatChannel
  @@subscribers = []

  def initialize(user)
    @user = user
    @@subscribers << self
    puts "#{@user} がチャットに参加"
  end

  def self.broadcast(message)
    @@subscribers.each do |sub|
      sub.receive(message)
    end
  end

  def speak(message)
    data = { user: @user, message: message, at: "12:00" }
    puts "#{@user}: #{message}"
    ChatChannel.broadcast(data)
  end

  def receive(data)
    puts "  [受信] #{data[:user]}: #{data[:message]}"
  end

  def self.subscribers_count
    @@subscribers.length
  end
end

alice = ChatChannel.new("Alice")
bob = ChatChannel.new("Bob")
carol = ChatChannel.new("Carol")

puts "\n参加者数: #{ChatChannel.subscribers_count}"
puts "\n--- チャット開始 ---"
alice.speak("こんにちは！")`}
          expectedOutput={`Alice がチャットに参加
Bob がチャットに参加
Carol がチャットに参加

参加者数: 3

--- チャット開始 ---
Alice: こんにちは！
  [受信] Alice: こんにちは！
  [受信] Alice: こんにちは！
  [受信] Alice: こんにちは！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="web" lessonId="websocket" />
      </div>
      <LessonNav lessons={lessons} currentId="websocket" basePath="/learn/web" />
    </div>
  );
}
