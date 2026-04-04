import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "exceptions")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "例外をキャッチするキーワードはどれですか？",
    options: ["catch", "rescue", "except", "handle"],
    answer: 1,
    explanation: "Rubyではrescueキーワードを使って例外をキャッチします。",
  },
  {
    question: "StandardErrorを継承してカスタム例外を定義する書き方は？",
    options: [
      "class MyError extends StandardError; end",
      "class MyError < StandardError; end",
      "class MyError include StandardError; end",
      "class MyError :: StandardError; end",
    ],
    answer: 1,
    explanation: "Rubyの継承は < 演算子を使います。",
  },
  {
    question: "必ず実行されるブロックはどれですか？",
    options: ["always", "finally", "ensure", "cleanup"],
    answer: 2,
    explanation: "ensureブロックは例外の有無にかかわらず必ず実行されます。",
  },
  {
    question: "例外を再発生させるキーワードはどれですか？",
    options: ["throw", "reraise", "raise", "re"],
    answer: 2,
    explanation: "raiseキーワードで例外を発生（または再発生）させます。",
  },
];

export default function ExceptionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-orange-400">例外処理</h1>
          <DifficultyBadge difficulty={category.difficulty} />
        </div>
        <p className="text-gray-400 text-lg">
          Rubyの例外処理機構を学びます。begin/rescue/ensureを使ったエラーハンドリング、カスタム例外の定義、例外の階層構造まで体系的に理解しましょう。
        </p>
        <ProgressBar categoryId="exceptions" totalLessons={category.lessons.length} color="orange" />
      </div>

      <LessonList
        lessons={category.lessons}
        basePath="/learn/exceptions"
        color="orange"
        categoryId="exceptions"
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">例外処理の基本</h2>
        <p className="text-gray-400">
          begin/rescue/endブロックで例外をキャッチし、ensureで後処理を行います。
        </p>
        <RubyEditor
          defaultCode={`begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "エラー: #{e.message}"
ensure
  puts "処理完了"
end

# rescue StandardError で汎用的にキャッチ
begin
  Integer("abc")
rescue ArgumentError => e
  puts "変換エラー: #{e.message}"
end`}
          expectedOutput={`エラー: divided by 0
処理完了
変換エラー: invalid value for Integer(): "abc"`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">カスタム例外とretry</h2>
        <RubyEditor
          defaultCode={`class NetworkError < StandardError
  def initialize(msg = "ネットワークエラーが発生しました")
    super(msg)
  end
end

attempts = 0
begin
  attempts += 1
  raise NetworkError if attempts < 3
  puts "接続成功（#{attempts}回目）"
rescue NetworkError => e
  puts "#{e.message}（試行#{attempts}回目）"
  retry if attempts < 3
  puts "接続失敗"
end`}
          expectedOutput={`ネットワークエラーが発生しました（試行1回目）
ネットワークエラーが発生しました（試行2回目）
接続成功（3回目）`}
        />
      </div>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
