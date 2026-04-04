import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "strings")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyで文字列の式展開に使う記法はどれですか？",
    options: ['${variable}', "#{variable}", "%{variable}", "@{variable}"],
    answer: 1,
    explanation: 'ダブルクォート文字列内で #{} を使うと変数や式を埋め込めます。',
  },
  {
    question: "文字列内の部分文字列を置換するメソッドはどれですか？",
    options: ["replace", "substitute", "gsub", "swap"],
    answer: 2,
    explanation: "gsub は文字列内の全てのマッチを置換します。sub は最初のマッチのみ置換します。",
  },
  {
    question: "文字列を分割するメソッドはどれですか？",
    options: ["divide", "split", "cut", "slice"],
    answer: 1,
    explanation: "split は区切り文字や正規表現で文字列を配列に分割します。",
  },
  {
    question: "freeze メソッドの効果はどれですか？",
    options: [
      "文字列をコピーする",
      "文字列をイミュータブルにする",
      "文字列を削除する",
      "文字列を大文字にする",
    ],
    answer: 1,
    explanation: "freeze を呼ぶと文字列はイミュータブルになり、変更しようとすると FrozenError が発生します。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyの文字列はミュータブルなオブジェクトです。式展開 #{}、sprintf/format によるフォーマット、split/join/gsub/sub/strip などの文字列メソッド、エンコーディング、ヒアドキュメント、freeze によるイミュータブル化まで学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="purple" categoryId="strings" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">文字列操作を試してみよう</h2>
        <RubyEditor
          defaultCode={`# 式展開
name = "Ruby"
version = 3.2
puts "#{name} #{version} is great!"

# 文字列メソッド
str = "  Hello, World!  "
puts str.strip
puts str.strip.downcase
puts str.strip.gsub("World", "Ruby")

# split と join
words = "one,two,three".split(",")
puts words.inspect
puts words.join(" - ")`}
          expectedOutput={`Ruby 3.2 is great!
Hello, World!
hello, world!
Hello, Ruby!
["one", "two", "three"]
one - two - three`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="purple" />
      </section>
    </div>
  );
}
