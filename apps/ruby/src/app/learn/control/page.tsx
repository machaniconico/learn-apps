import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "control")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyで「もし〜でなければ」を表す構文はどれですか？",
    options: ["if not", "unless", "else if", "elif"],
    answer: 1,
    explanation: "unlessはifの否定版です。unless conditionはif !conditionと同等です。",
  },
  {
    question: "5回繰り返す最もRubyらしい書き方はどれですか？",
    options: ["for i in 0..4", "while i < 5", "5.times do", "repeat(5)"],
    answer: 2,
    explanation: "5.times doはRubyらしい（イディオマティックな）繰り返し方法です。",
  },
  {
    question: "ループを途中で抜けるキーワードはどれですか？",
    options: ["exit", "stop", "break", "return"],
    answer: 2,
    explanation: "breakはループを即座に終了します。nextは現在のイテレーションをスキップします。",
  },
  {
    question: "case-when文で複数の値にマッチさせるにはどう書きますか？",
    options: ["when 1, 2, 3", "when [1, 2, 3]", "when 1 || 2 || 3", "when 1 or 2 or 3"],
    answer: 0,
    explanation: "whenにはカンマ区切りで複数の値を指定できます。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyの制御構文を学びましょう。if/unless/case-whenによる条件分岐、while/until/timesによるループ、
          break/nextによるループ制御など、プログラムの流れを制御する構文を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="cyan" categoryId="control" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 条件分岐</h2>
        <RubyEditor
          defaultCode={`# if-elsif-else
score = 85

if score >= 90
  puts "優秀"
elsif score >= 70
  puts "良好"
elsif score >= 50
  puts "合格"
else
  puts "不合格"
end

# unless
logged_in = false
unless logged_in
  puts "ログインしてください"
end

# 一行if（後置if）
puts "偶数です" if score.even?`}
          expectedOutput={`良好
ログインしてください
偶数です`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: ループ</h2>
        <RubyEditor
          defaultCode={`# timesループ
3.times do |i|
  puts "ループ #{i + 1}回目"
end

# eachループ
fruits = ["apple", "banana", "cherry"]
fruits.each do |fruit|
  puts fruit
end

# whileループ
count = 0
while count < 3
  count += 1
  puts "カウント: #{count}"
end`}
          expectedOutput={`ループ 1回目
ループ 2回目
ループ 3回目
apple
banana
cherry
カウント: 1
カウント: 2
カウント: 3`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
