import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "exceptions")!;

export default function RaiseErrorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-orange-400">例外処理</p>
        <h1 className="text-3xl font-bold text-gray-100">raise</h1>
        <p className="text-gray-400">
          raiseキーワードを使って意図的に例外を発生させる方法を学びます。バリデーションエラーや不正な状態を通知するための重要なテクニックです。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">raiseの基本的な使い方</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">raise "メッセージ"</code> でRuntimeErrorを、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">raise TypeError, "メッセージ"</code> で特定の例外クラスを発生させます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 文字列メッセージでRuntimeErrorを発生
begin
  raise "何かがおかしい"
rescue RuntimeError => e
  puts "RuntimeError: #{e.message}"
end

# 例外クラスを指定して発生
begin
  raise TypeError, "整数が必要です"
rescue TypeError => e
  puts "TypeError: #{e.message}"
end

# 例外クラスのみ（デフォルトメッセージ）
begin
  raise ArgumentError
rescue ArgumentError => e
  puts "ArgumentError: #{e.class}"
end`}
        expectedOutput={`RuntimeError: 何かがおかしい
TypeError: 整数が必要です
ArgumentError: ArgumentError`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">バリデーションでのraise活用</h2>
        <p className="text-gray-400 text-sm">
          引数の検証やビジネスロジックの不正状態を検出したときにraiseを使ってエラーを伝えます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`def set_age(age)
  raise ArgumentError, "年齢は整数でなければなりません" unless age.is_a?(Integer)
  raise ArgumentError, "年齢は0以上でなければなりません" if age < 0
  raise ArgumentError, "年齢は150以下でなければなりません" if age > 150
  @age = age
  puts "年齢を#{age}歳に設定しました"
end

begin
  set_age(25)
  set_age(-5)
rescue ArgumentError => e
  puts "エラー: #{e.message}"
end

begin
  set_age("thirty")
rescue ArgumentError => e
  puts "エラー: #{e.message}"
end`}
        expectedOutput={`年齢を25歳に設定しました
エラー: 年齢は0以上でなければなりません
エラー: 年齢は整数でなければなりません`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">raiseの再発生</h2>
        <p className="text-gray-400 text-sm">
          rescueブロック内で引数なしの <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">raise</code> を呼ぶと、
          現在の例外を再発生させます。ログ記録後に上位へ伝播させたい場合に使います。
        </p>
      </div>

      <RubyEditor
        defaultCode={`def risky_operation
  begin
    raise RuntimeError, "内部エラー"
  rescue RuntimeError => e
    puts "ログ: #{e.message}を記録しました"
    raise  # 再発生
  end
end

begin
  risky_operation
rescue RuntimeError => e
  puts "上位でキャッチ: #{e.message}"
end`}
        expectedOutput={`ログ: 内部エラーを記録しました
上位でキャッチ: 内部エラー`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="exceptions" lessonId="raise-errors" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="raise-errors"
        basePath="/learn/exceptions"
      />
    </div>
  );
}
