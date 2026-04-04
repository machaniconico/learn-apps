import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "exceptions")!;

export default function EnsureRetryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-orange-400">例外処理</p>
        <h1 className="text-3xl font-bold text-gray-100">ensure・retry</h1>
        <p className="text-gray-400">
          ensureブロックによる確実な後処理と、retryキーワードによる処理の再試行を学びます。リソースの解放やネットワーク処理の再試行に欠かせない機能です。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">ensure: 必ず実行されるブロック</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">ensure</code> ブロックは例外の有無にかかわらず必ず実行されます。
          ファイルのクローズやDB接続の解放などのクリーンアップ処理に使います。
        </p>
      </div>

      <RubyEditor
        defaultCode={`def read_data(filename)
  file = nil
  begin
    file = "opened:#{filename}"  # File.open(filename) のシミュレーション
    puts "ファイルを開きました: #{file}"
    raise "読み込みエラー" if filename.include?("bad")
    puts "データを読み込みました"
    "data from #{filename}"
  rescue => e
    puts "エラー: #{e.message}"
    nil
  ensure
    if file
      puts "ファイルをクローズしました: #{file}"
    end
  end
end

puts read_data("good.txt").inspect
puts "---"
puts read_data("bad.txt").inspect`}
        expectedOutput={`ファイルを開きました: opened:good.txt
データを読み込みました
ファイルをクローズしました: opened:good.txt
"data from good.txt"
---
ファイルを開きました: opened:bad.txt
エラー: 読み込みエラー
ファイルをクローズしました: opened:bad.txt
`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">retry: 再試行</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">retry</code> はrescueブロック内で使い、beginブロックの先頭から処理を再実行します。
          無限ループを防ぐためにカウンターで試行回数を制限するのが一般的です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`MAX_RETRIES = 3

def fetch_data(url)
  attempts = 0
  begin
    attempts += 1
    puts "試行 #{attempts}回目: #{url} に接続中..."
    # 最初の2回は失敗をシミュレート
    raise "接続タイムアウト" if attempts < 3
    puts "接続成功！"
    "response data"
  rescue RuntimeError => e
    puts "エラー: #{e.message}"
    if attempts < MAX_RETRIES
      puts "#{MAX_RETRIES - attempts}回後に再試行します..."
      retry
    else
      puts "最大試行回数に達しました"
      nil
    end
  end
end

result = fetch_data("https://example.com/api")
puts "結果: #{result.inspect}"`}
        expectedOutput={`試行 1回目: https://example.com/api に接続中...
エラー: 接続タイムアウト
2回後に再試行します...
試行 2回目: https://example.com/api に接続中...
エラー: 接続タイムアウト
1回後に再試行します...
試行 3回目: https://example.com/api に接続中...
接続成功！
結果: "response data"`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">else節</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">else</code> 節はbeginブロックで例外が発生しなかった場合にのみ実行されます。
          ensure節より前に実行されます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`def divide(a, b)
  begin
    result = a / b
  rescue ZeroDivisionError => e
    puts "エラー: #{e.message}"
  else
    puts "計算成功: #{a} / #{b} = #{result}"
  ensure
    puts "計算処理が終了しました"
  end
end

divide(10, 2)
puts "---"
divide(10, 0)`}
        expectedOutput={`計算成功: 10 / 2 = 5
計算処理が終了しました
---
エラー: divided by 0
計算処理が終了しました`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="exceptions" lessonId="ensure-retry" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="ensure-retry"
        basePath="/learn/exceptions"
      />
    </div>
  );
}
