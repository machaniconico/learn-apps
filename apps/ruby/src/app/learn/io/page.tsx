import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "io")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "ファイルを読み込む最もシンプルなメソッドはどれですか？",
    options: ["File.load", "File.read", "File.open", "File.get"],
    answer: 1,
    explanation: "File.readはファイル内容を文字列として一度に読み込みます。",
  },
  {
    question: "ファイルに追記するモードはどれですか？",
    options: ["'w'", "'r'", "'a'", "'rw'"],
    answer: 2,
    explanation: "'a'（append）モードでファイル末尾に追記します。",
  },
  {
    question: "JSONをパースするメソッドはどれですか？",
    options: ["JSON.read", "JSON.parse", "JSON.load_string", "JSON.from_s"],
    answer: 1,
    explanation: "JSON.parse(string)でJSON文字列をRubyオブジェクトに変換します。",
  },
  {
    question: "Dir.globで全てのRubyファイルを取得する正しいパターンは？",
    options: ["Dir.glob('*.rb')", "Dir.glob('**/*')", "Dir.glob('*.ruby')", "Dir.glob('[rb]')"],
    answer: 0,
    explanation: "Dir.glob('*.rb')でカレントディレクトリの.rbファイルを取得します。",
  },
];

export default function IoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-blue-400">ファイルI/O</h1>
          <DifficultyBadge difficulty={category.difficulty} />
        </div>
        <p className="text-gray-400 text-lg">
          Rubyでのファイル操作、CSV・JSON・YAML処理、ディレクトリ操作を学びます。実用的なファイルI/Oパターンを身につけましょう。
        </p>
        <ProgressBar categoryId="io" totalLessons={category.lessons.length} color="blue" />
      </div>

      <LessonList
        lessons={category.lessons}
        basePath="/learn/io"
        color="blue"
        categoryId="io"
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">ファイルの読み書き</h2>
        <p className="text-gray-400">
          File.readで読み込み、File.writeで書き込み。ブロック形式のFile.openは自動でファイルをクローズします。
        </p>
        <RubyEditor
          defaultCode={`# ファイル読み込み（実際のファイルが必要）
# content = File.read("example.txt")
# puts content

# ブロック形式（自動クローズ）
# File.open("example.txt", "r") do |f|
#   f.each_line { |line| puts line }
# end

# 書き込み例
# File.write("output.txt", "Hello, Ruby!")

# シミュレーション
lines = ["Apple\n", "Banana\n", "Cherry\n"]
lines.each_with_index do |line, i|
  puts "#{i + 1}: #{line.chomp}"
end`}
          expectedOutput={`1: Apple
2: Banana
3: Cherry`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">JSONとYAML処理</h2>
        <RubyEditor
          defaultCode={`require 'json'

# JSONの生成
data = { name: "Ruby", version: 3.2, features: ["blocks", "modules"] }
json_str = JSON.generate(data)
puts json_str

# JSONのパース
parsed = JSON.parse(json_str)
puts parsed["name"]
puts parsed["features"].inspect

# to_json メソッド
puts [1, 2, 3].to_json`}
          expectedOutput={`{"name":"Ruby","version":3.2,"features":["blocks","modules"]}
Ruby
["blocks", "modules"]
[1,2,3]`}
        />
      </div>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
