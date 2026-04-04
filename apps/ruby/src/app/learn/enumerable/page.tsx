import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "配列の各要素を2倍にするメソッドはどれですか？",
    options: ["select", "map", "reduce", "each"],
    answer: 1,
    explanation: "mapは各要素を変換した新しい配列を返します。",
  },
  {
    question: "配列の合計を求めるreduceの正しい使い方は？",
    options: [
      "[1,2,3].reduce(:sum)",
      "[1,2,3].reduce { |s, n| s + n }",
      "[1,2,3].reduce(:add)",
      "[1,2,3].reduce { |n| n + 1 }",
    ],
    answer: 1,
    explanation: "reduceはアキュムレータと現在の要素を受け取るブロックで集約します。",
  },
  {
    question: "条件を満たす要素だけを取り出すメソッドはどれですか？",
    options: ["map", "reject", "select", "find"],
    answer: 2,
    explanation: "selectはブロックがtrueを返す要素だけを集めた配列を返します。",
  },
  {
    question: "group_byで[1,2,3,4,5]を奇数・偶数に分けた結果は？",
    options: [
      "{odd: [1,3,5], even: [2,4]}",
      "{true=>[1,3,5], false=>[2,4]}",
      "{1=>[1,3,5], 0=>[2,4]}",
      "[[1,3,5],[2,4]]",
    ],
    answer: 1,
    explanation: "group_byはブロックの戻り値をキーにしてハッシュを作ります。odd?はtrue/falseを返します。",
  },
];

export default function EnumerablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-teal-400">Enumerable</h1>
          <DifficultyBadge difficulty={category.difficulty} />
        </div>
        <p className="text-gray-400 text-lg">
          RubyのEnumerableモジュールは強力なコレクション操作メソッドを提供します。map・select・reduce・group_byなど実用的なメソッドを習得しましょう。
        </p>
        <ProgressBar categoryId="enumerable" totalLessons={category.lessons.length} color="teal" />
      </div>

      <LessonList
        lessons={category.lessons}
        basePath="/learn/enumerable"
        color="teal"
        categoryId="enumerable"
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">変換・フィルタリング</h2>
        <p className="text-gray-400">
          map・select・rejectはEnumerableの基本メソッドです。
        </p>
        <RubyEditor
          defaultCode={`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: 各要素を変換
squares = numbers.map { |n| n ** 2 }
puts squares.inspect

# select: 条件を満たす要素
evens = numbers.select(&:even?)
puts evens.inspect

# reject: 条件を満たさない要素
odds = numbers.reject(&:even?)
puts odds.inspect

# チェーン
result = numbers.select { |n| n > 3 }.map { |n| n * 10 }
puts result.inspect`}
          expectedOutput={`[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[2, 4, 6, 8, 10]
[1, 3, 5, 7, 9]
[40, 50, 60, 70, 80, 90, 100]`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">集約・グルーピング</h2>
        <RubyEditor
          defaultCode={`words = ["apple", "banana", "cherry", "avocado", "blueberry", "apricot"]

# group_by: 先頭文字でグループ化
grouped = words.group_by { |w| w[0] }
grouped.each { |k, v| puts "#{k}: #{v.inspect}" }

puts "---"

# sort_by: 文字列長でソート
sorted = words.sort_by(&:length)
puts sorted.inspect

# reduce: 最長の単語を求める
longest = words.reduce { |a, b| a.length >= b.length ? a : b }
puts "最長: #{longest}"

# sum (Ruby 2.4+)
total_length = words.sum(&:length)
puts "文字数合計: #{total_length}"`}
          expectedOutput={`a: ["apple", "avocado", "apricot"]
b: ["banana", "blueberry"]
c: ["cherry"]
---
["apple", "banana", "cherry", "avocado", "apricot", "blueberry"]
最長: blueberry
文字数合計: 43`}
        />
      </div>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
