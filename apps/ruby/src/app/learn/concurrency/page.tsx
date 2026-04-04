import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "concurrency")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "RubyのThreadクラスでスレッドを作成するメソッドはどれですか？",
    options: ["Thread.create", "Thread.start", "Thread.new", "Thread.spawn"],
    answer: 2,
    explanation: "Thread.newにブロックを渡すと新しいスレッドが作成されます。Thread.startも同様です。",
  },
  {
    question: "Mutexの主な役割は何ですか？",
    options: ["スレッドを終了させる", "共有リソースへの同時アクセスを防ぐ", "スレッドの優先度を設定する", "スレッドをスリープさせる"],
    answer: 1,
    explanation: "Mutexはsynchronizeメソッドで排他制御を行い、データ競合を防ぎます。",
  },
  {
    question: "FiberとThreadの主な違いは何ですか？",
    options: ["Fiberは並列実行できる", "Fiberは協調的マルチタスクで明示的に切り替える", "Fiberはより高速", "Fiberはメモリを使わない"],
    answer: 1,
    explanation: "FiberはFiber.yield/resumeで明示的に制御を切り替える協調的並行処理です。",
  },
  {
    question: "Ruby 3で導入された真の並列実行を可能にする機能はどれですか？",
    options: ["Thread", "Fiber", "Ractor", "Process"],
    answer: 2,
    explanation: "RactorはGILの制約を受けずに真の並列実行が可能なRuby 3の新機能です。",
  },
];

export default function ConcurrencyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">並行・非同期処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          RubyのThread・Mutex・Fiber・Ractor・asyncによる並行・並列処理を学びます。GILの仕組みからRuby 3のRactorによる真の並列処理まで、モダンなRubyの並行プログラミングを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="concurrency" totalLessons={6} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/concurrency" color="teal" categoryId="concurrency" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">スレッドの基本を試してみよう</h2>
        <RubyEditor
          defaultCode={`# 複数スレッドの生成と結合
threads = []

3.times do |i|
  threads << Thread.new do
    # スレッドごとの処理
    result = i * 10
    result
  end
end

# 全スレッドの完了を待ち、戻り値を取得
results = threads.map(&:value)
puts results.inspect
puts "合計: #{results.sum}"`}
          expectedOutput={`[0, 10, 20]
合計: 30`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="teal" />
      </section>
    </div>
  );
}
