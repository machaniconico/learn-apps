import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行・非同期処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">async gem</h1>
        <p className="text-gray-400">asyncジェムを使った非同期処理、Async{`{ }`}ブロック、タスクとリアクターを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">async gemとは</h2>
        <p className="text-gray-300 mb-3">
          async gemはFiberベースの非同期処理ライブラリです。イベントループとタスクで効率的なI/O並行処理を実現します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Async {`{ }`}</code> — 非同期コンテキストの作成</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Async::Task</code> — 非同期タスク</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">task.wait</code> — タスクの完了を待つ</li>
          <li>I/O待ちを効率化するイベント駆動モデル</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: asyncスタイルの非同期処理（Fiberで擬似実装）</h2>
        <RubyEditor
          defaultCode={`# asyncスタイルの非同期処理（Fiberで概念実装）
class AsyncTask
  attr_reader :result, :completed

  def initialize(name, delay_steps, &block)
    @name = name
    @delay_steps = delay_steps
    @completed = false
    @fiber = Fiber.new do
      @delay_steps.times do |i|
        Fiber.yield "#{@name}: 処理中... (#{i + 1}/#{@delay_steps})"
      end
      @result = block.call
      @completed = true
      "#{@name}: 完了 -> #{@result}"
    end
  end

  def step
    @fiber.resume if @fiber.alive?
  end
end

# 複数の非同期タスクを並行実行
tasks = [
  AsyncTask.new("API呼び出し", 2) { { status: 200, data: "users list" } },
  AsyncTask.new("DB クエリ",  3) { [1, 2, 3, 4, 5] },
  AsyncTask.new("ファイル読込", 1) { "config data" },
]

# イベントループで全タスクを進める
until tasks.all?(&:completed)
  tasks.each do |task|
    result = task.step
    puts result if result
  end
end

puts "\n全タスク完了"
tasks.each { |t| puts "  #{t.result.inspect}" }`}
          expectedOutput={`API呼び出し: 処理中... (1/2)
DB クエリ: 処理中... (1/3)
ファイル読込: 処理中... (1/1)
API呼び出し: 処理中... (2/2)
DB クエリ: 処理中... (2/3)
ファイル読込: 完了 -> config data
API呼び出し: 完了 -> {:status=>200, :data=>"users list"}
DB クエリ: 処理中... (3/3)
DB クエリ: 完了 -> [1, 2, 3, 4, 5]

全タスク完了
  {:status=>200, :data=>"users list"}
  [1, 2, 3, 4, 5]
  "config data"`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 非同期パターンとエラーハンドリング</h2>
        <RubyEditor
          defaultCode={`# 非同期タスクのエラーハンドリングパターン
class AsyncResult
  def initialize
    @value = nil
    @error = nil
    @done = false
  end

  def resolve(value)
    @value = value
    @done = true
    self
  end

  def reject(error)
    @error = error
    @done = true
    self
  end

  def then(&block)
    return self if @error
    block.call(@value) if @done && block
    self
  end

  def catch(&block)
    block.call(@error) if @error && block
    self
  end

  def await
    [@value, @error]
  end
end

def fetch_user(id)
  result = AsyncResult.new
  if id > 0
    result.resolve({ id: id, name: "User #{id}" })
  else
    result.reject("Invalid ID: #{id}")
  end
  result
end

# 正常ケース
fetch_user(1)
  .then { |user| puts "取得成功: #{user[:name]}" }
  .catch { |err| puts "エラー: #{err}" }

# エラーケース
fetch_user(-1)
  .then { |user| puts "取得成功: #{user[:name]}" }
  .catch { |err| puts "エラー: #{err}" }`}
          expectedOutput={`取得成功: User 1
エラー: Invalid ID: -1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="async" />
      </div>
      <LessonNav lessons={lessons} currentId="async" basePath="/learn/concurrency" />
    </div>
  );
}
