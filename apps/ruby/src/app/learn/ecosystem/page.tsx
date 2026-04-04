import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "ecosystem")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "RuboCopはどのような目的のツールですか？",
    options: ["Rubyのデバッガ", "コードスタイルチェッカー・Linter", "パフォーマンスプロファイラ", "テストフレームワーク"],
    answer: 1,
    explanation: "RuboCopはRubyのスタイルガイドに基づいてコードを解析するLinterです。",
  },
  {
    question: "Rubyのデバッグでbinding.breakを使うgemはどれですか？",
    options: ["pry", "byebug", "debug", "irb"],
    answer: 2,
    explanation: "Ruby 3.1+標準搭載のdebug gemではbinding.breakでブレークポイントを設置できます。",
  },
  {
    question: "Benchmarkモジュールで処理時間を計測するメソッドはどれですか？",
    options: ["Benchmark.time", "Benchmark.measure", "Benchmark.profile", "Benchmark.run"],
    answer: 1,
    explanation: "Benchmark.measureはブロックの実行時間を計測してBenchmark::Tmsobjectを返します。",
  },
  {
    question: "GitHub ActionsのRuby用の公式アクションはどれですか？",
    options: ["actions/ruby-setup", "ruby/setup-ruby", "setup-ruby-action", "actions/setup-ruby"],
    answer: 1,
    explanation: "ruby/setup-rubyはRubyコミュニティが提供する公式のGitHub Actionsです。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">Rubyエコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyの開発ツール群を学びます。irb・rubyコマンドなどの基本ツールから、RuboCopによるLinting、debuggerによるデバッグ、BenchmarkとStackprofによるパフォーマンス計測、GitHub Actionsを使ったCI/CDまで習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="green" categoryId="ecosystem" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">Benchmarkを試してみよう</h2>
        <RubyEditor
          defaultCode={`require 'benchmark'

# 処理時間の計測
result = Benchmark.measure do
  sum = 0
  100_000.times { |i| sum += i }
  sum
end

puts "実行時間: #{result.real.round(4)}秒"

# 複数処理の比較
Benchmark.bm(10) do |x|
  x.report("Array#+:") { [1,2,3] + [4,5,6] }
  x.report("Array#push:") { a = [1,2,3]; a.push(4,5,6) }
end`}
          expectedOutput={`実行時間: 0.0045秒
                user     system      total        real
Array#+:    0.000000   0.000000   0.000000 (  0.000001)
Array#push: 0.000000   0.000000   0.000000 (  0.000001)`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="green" />
      </section>
    </div>
  );
}
