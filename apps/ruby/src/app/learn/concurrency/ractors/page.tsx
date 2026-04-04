import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行・非同期処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Ractor</h1>
        <p className="text-gray-400">Ruby 3のアクターモデルRactorによる真の並列実行を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Ractorとは</h2>
        <p className="text-gray-300 mb-3">
          RactorはRuby 3で導入された並列実行の仕組みです。各RactorはGILの制約を受けずに真の並列実行が可能です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Ractor.new {`{ }`}</code> — 新しいRactorを作成</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">ractor.send(obj)</code> — Ractorにメッセージを送信</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Ractor.receive</code> — メッセージを受信</li>
          <li>オブジェクトはfrozenまたはshareable_constantでなければならない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Ractorの基本（擬似コード）</h2>
        <RubyEditor
          defaultCode={`# Ractorのメッセージパッシング概念（Threadで擬似実装）
require 'thread'

class Actor
  def initialize(name, &block)
    @name = name
    @queue = Queue.new
    @thread = Thread.new do
      loop do
        msg = @queue.pop
        break if msg == :stop
        result = block.call(msg)
        puts "#{@name}: #{msg} -> #{result}"
      end
    end
  end

  def send_msg(msg)
    @queue << msg
  end

  def stop
    @queue << :stop
    @thread.join
  end
end

# 計算アクター
calculator = Actor.new("Calculator") do |msg|
  op, a, b = msg
  case op
  when :add then a + b
  when :mul then a * b
  when :pow then a ** b
  end
end

calculator.send_msg([:add, 10, 20])
calculator.send_msg([:mul, 6, 7])
calculator.send_msg([:pow, 2, 10])
sleep 0.01
calculator.stop
puts "全Ractor完了"`}
          expectedOutput={`Calculator: [:add, 10, 20] -> 30
Calculator: [:mul, 6, 7] -> 42
Calculator: [:pow, 2, 10] -> 1024
全Ractor完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Ractorの共有可能オブジェクト</h2>
        <RubyEditor
          defaultCode={`# Ractorで共有可能なオブジェクトの種類
# immutable（frozen）なオブジェクトは共有可能

# 1. 数値・シンボル・nilは常に共有可能
puts "数値の共有: #{42.frozen?}"
puts "シンボルの共有: #{:hello.frozen?}"
puts "nilの共有: #{nil.frozen?}"

# 2. frozen文字列は共有可能
frozen_str = "hello".freeze
puts "frozen文字列: #{frozen_str.frozen?}"

# 3. frozenハッシュ・配列は共有可能
config = { host: "localhost", port: 3000 }.freeze
puts "frozenハッシュ: #{config.frozen?}"

# 4. Ractor.make_shareableで共有可能に
data = { values: [1, 2, 3] }
shareable = Ractor.make_shareable(data)
puts "make_shareable後: #{shareable.frozen?}"
puts "ネストも全てfrozen: #{shareable[:values].frozen?}"

puts "\n共有可能なデータ例:"
puts "  config[:host] = #{config[:host]}"
puts "  config[:port] = #{config[:port]}"`}
          expectedOutput={`数値の共有: true
シンボルの共有: true
nilの共有: true
frozen文字列: true
frozenハッシュ: true
make_shareable後: true
ネストも全てfrozen: true

共有可能なデータ例:
  config[:host] = localhost
  config[:port] = 3000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="ractors" />
      </div>
      <LessonNav lessons={lessons} currentId="ractors" basePath="/learn/concurrency" />
    </div>
  );
}
