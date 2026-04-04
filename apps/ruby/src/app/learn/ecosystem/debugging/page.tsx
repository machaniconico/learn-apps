import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Rubyエコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デバッグ</h1>
        <p className="text-gray-400">debug gem、binding.break、pry、byebugを使ったデバッグ技法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyのデバッグツール</h2>
        <p className="text-gray-300 mb-3">
          Rubyにはさまざまなデバッグツールがあります。Ruby 3.1以降はdebug gemが標準搭載されています。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-green-300">binding.break</code> — debug gemのブレークポイント（Ruby 3.1+）</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">binding.pry</code> — pry gemのブレークポイント</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">byebug</code> — byebug gemのデバッガ</li>
          <li><code className="bg-gray-800 px-1 rounded text-green-300">p / pp / puts</code> — プリントデバッグ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: プリントデバッグの技法</h2>
        <RubyEditor
          defaultCode={`# 効果的なプリントデバッグ
def calculate(data)
  p data                    # オブジェクトをinspectで表示
  pp data                   # pretty_printで整形表示

  result = data.map { |x| x * 2 }
  puts "result: #{result.inspect}"

  filtered = result.select { |x| x > 5 }
  $stderr.puts "DEBUG filtered: #{filtered}"  # STDERRに出力

  filtered
end

data = [1, 2, 3, 4, 5]
output = calculate(data)
puts "最終結果: #{output.inspect}"

# tap メソッド（デバッグ用）
result = [1, 2, 3, 4, 5]
  .tap { |a| puts "元の配列: #{a.inspect}" }
  .map { |x| x * 3 }
  .tap { |a| puts "×3後: #{a.inspect}" }
  .select { |x| x > 9 }
  .tap { |a| puts "フィルタ後: #{a.inspect}" }

puts "最終: #{result.inspect}"`}
          expectedOutput={`[1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]
result: [2, 4, 6, 8, 10]
DEBUG filtered: [6, 8, 10]
最終結果: [6, 8, 10]
元の配列: [1, 2, 3, 4, 5]
×3後: [3, 6, 9, 12, 15]
フィルタ後: [12, 15]
最終: [12, 15]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: エラーの追跡とスタックトレース</h2>
        <RubyEditor
          defaultCode={`# 例外のバックトレース解析
def level3
  raise RuntimeError, "深いところでエラー発生"
end

def level2
  level3
end

def level1
  level2
end

begin
  level1
rescue => e
  puts "エラー: #{e.message}"
  puts "\nバックトレース（最初の3行）:"
  e.backtrace.first(3).each_with_index do |line, i|
    puts "  #{i}: #{line}"
  end
end

# caller で呼び出し元を確認
def who_called_me?
  puts "呼び出し元: #{caller.first}"
end

def outer
  who_called_me?
end

outer

# rescue でエラーをログ
def safe_divide(a, b)
  a / b
rescue ZeroDivisionError => e
  puts "エラーをキャッチ: #{e.class} - #{e.message}"
  nil
end

puts "\n安全な除算:"
puts safe_divide(10, 2)
puts safe_divide(10, 0).inspect`}
          expectedOutput={`エラー: 深いところでエラー発生

バックトレース（最初の3行）:
  0: main.rb:3:in 'level3'
  1: main.rb:7:in 'level2'
  2: main.rb:11:in 'level1'
呼び出し元: main.rb:24:in 'outer'

安全な除算:
5
エラーをキャッチ: ZeroDivisionError - divided by 0
nil`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="debugging" />
      </div>
      <LessonNav lessons={lessons} currentId="debugging" basePath="/learn/ecosystem" />
    </div>
  );
}
