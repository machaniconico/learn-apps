import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "regex")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyで正規表現リテラルを表す記法はどれですか？",
    options: ["re'pattern'", "/pattern/", "r'pattern'", "regex(pattern)"],
    answer: 1,
    explanation: "Rubyの正規表現リテラルはスラッシュで囲みます: /pattern/",
  },
  {
    question: "文字列が正規表現にマッチするか確認するメソッドはどれですか？",
    options: ["=~", "===", "match?", "両方 =~ と match? が使える"],
    answer: 3,
    explanation: "=~はマッチ位置を返し、match?はtrue/falseを返します。どちらもマッチ確認に使えます。",
  },
  {
    question: "全てのマッチを配列で返すメソッドはどれですか？",
    options: ["match", "scan", "grep", "find_all"],
    answer: 1,
    explanation: "scanは全マッチを配列で返します。キャプチャがある場合は配列の配列になります。",
  },
  {
    question: "名前付きキャプチャの構文はどれですか？",
    options: ["(?=name>pattern)", "(?<name>pattern)", "(?:name:pattern)", "(name=>pattern)"],
    answer: 1,
    explanation: "(?<name>pattern) で名前付きキャプチャグループを定義します。",
  },
];

export default function RegexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-pink-400">正規表現</h1>
          <DifficultyBadge difficulty={category.difficulty} />
        </div>
        <p className="text-gray-400 text-lg">
          Rubyの正規表現はテキスト処理の強力なツールです。パターンマッチング、キャプチャ、置換、名前付きキャプチャを学び、実践的な文字列操作を習得しましょう。
        </p>
        <ProgressBar categoryId="regex" totalLessons={category.lessons.length} color="pink" />
      </div>

      <LessonList
        lessons={category.lessons}
        basePath="/learn/regex"
        color="pink"
        categoryId="regex"
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">正規表現の基本</h2>
        <p className="text-gray-400">
          /pattern/リテラルとRegexp.newでパターンを定義し、=~やmatch?でマッチングします。
        </p>
        <RubyEditor
          defaultCode={`# 基本的なマッチング
str = "Hello, Ruby 3.2!"

# =~ 演算子（マッチ位置を返す）
pos = str =~ /Ruby/
puts "Rubyの位置: #{pos}"

# match? (Ruby 2.4+)
puts str.match?(/\d+\.\d+/)

# match メソッド（MatchDataを返す）
m = str.match(/(\w+) (\d+\.\d+)/)
if m
  puts "全体: #{m[0]}"
  puts "言語: #{m[1]}"
  puts "バージョン: #{m[2]}"
end`}
          expectedOutput={`Rubyの位置: 7
true
全体: Ruby 3.2
言語: Ruby
バージョン: 3.2`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">置換とscan</h2>
        <RubyEditor
          defaultCode={`text = "The price is $100 and $200 for two items."

# gsub: 全マッチを置換
replaced = text.gsub(/\$\d+/) { |m| m.sub("$", "¥") }
puts replaced

# scan: 全マッチを配列で返す
prices = text.scan(/\$(\d+)/)
puts prices.inspect

# 名前付きキャプチャ
date = "2024-01-15"
m = date.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/)
if m
  puts "年: #{m[:year]}, 月: #{m[:month]}, 日: #{m[:day]}"
end`}
          expectedOutput={`The price is ¥100 and ¥200 for two items.
[["100"], ["200"]]
年: 2024, 月: 01, 日: 15`}
        />
      </div>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
