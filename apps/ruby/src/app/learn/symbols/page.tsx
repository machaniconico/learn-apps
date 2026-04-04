import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "symbols")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyでシンボルを作成する正しい記法はどれですか？",
    options: ['"symbol"', ":symbol", "#symbol", "@symbol"],
    answer: 1,
    explanation: "シンボルはコロン(:)を前置した識別子です。:name のように記述します。",
  },
  {
    question: "同じ名前のシンボルはいくつのオブジェクトを持ちますか？",
    options: ["毎回新しいオブジェクト", "常に1つ", "2つ", "不定"],
    answer: 1,
    explanation: "同名のシンボルは常に同一のオブジェクト(同じobject_id)を持ちます。これがシンボルの重要な特性です。",
  },
  {
    question: "&:method_name パターンは何をしますか？",
    options: [
      "メソッドを定義する",
      "Symbol#to_proc でブロックを生成する",
      "シンボルを文字列に変換する",
      "メソッドを削除する",
    ],
    answer: 1,
    explanation: "&:method_name は Symbol#to_proc を呼び出し、各要素にそのメソッドを適用するブロックを生成します。",
  },
  {
    question: "# frozen_string_literal: true の効果はどれですか？",
    options: [
      "シンボルを文字列に変換する",
      "ファイル内の文字列リテラルを全てfreezeする",
      "シンボルを作成できなくする",
      "変数をfreezeする",
    ],
    answer: 1,
    explanation: "このマジックコメントにより、ファイル内の文字列リテラルが全て自動的にfreezeされ、メモリ効率が向上します。",
  },
];

export default function SymbolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">シンボル</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          シンボルはコロン付きの不変な識別子です。:symbol 構文から始まり、文字列との違い（同一性・パフォーマンス）、ハッシュキーとしての活用、&:method_name による Symbol#to_proc パターン、frozen_string_literal マジックコメントまで学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="symbols" totalLessons={5} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/symbols" color="indigo" categoryId="symbols" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">シンボルを試してみよう</h2>
        <RubyEditor
          defaultCode={`# シンボルの基本
sym = :hello
puts sym
puts sym.class
puts sym.object_id == :hello.object_id

# Symbol#to_proc
words = ["hello", "world", "ruby"]
puts words.map(&:upcase).inspect
puts words.map(&:length).inspect

# シンボルと文字列の変換
puts :ruby.to_s
puts "ruby".to_sym.inspect`}
          expectedOutput={`hello
Symbol
true
["HELLO", "WORLD", "RUBY"]
[5, 5, 4]
ruby
:ruby`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="indigo" />
      </section>
    </div>
  );
}
