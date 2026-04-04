import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "gems")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Gemfileで特定バージョン以上・次のメジャーバージョン未満を指定する演算子はどれですか？",
    options: [">=", "<=", "~>", "=="],
    answer: 2,
    explanation: "~>（悲観的バージョン制約）は例えば~> 2.1なら2.1以上3.0未満を意味します。",
  },
  {
    question: "bundle installの役割として正しいものはどれですか？",
    options: [
      "Gemを削除する",
      "Gemfileに記載されたGemをインストールしGemfile.lockを生成する",
      "新しいGemfileを作成する",
      "インストール済みGemを一覧表示する",
    ],
    answer: 1,
    explanation: "bundle installはGemfileを読んで依存Gemをインストールし、バージョンをGemfile.lockに固定します。",
  },
  {
    question: "bundle execの目的はなんですか？",
    options: [
      "新しいGemを作成する",
      "Gemをアンインストールする",
      "Gemfile.lockに記載されたGemのバージョンでコマンドを実行する",
      "Gemのソースを表示する",
    ],
    answer: 2,
    explanation: "bundle execを使うとGemfile.lockで固定されたバージョンのGemを使ってコマンドを実行できます。",
  },
  {
    question: "gemspecファイルの役割はなんですか？",
    options: [
      "テストを実行するファイル",
      "Gemのメタデータ（名前・バージョン・依存関係など）を定義するファイル",
      "Gemのドキュメントファイル",
      "Gemのインストール設定ファイル",
    ],
    answer: 1,
    explanation: "gemspecはGemの名前・バージョン・作者・説明・依存関係などのメタデータを定義します。",
  },
];

export default function GemsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">Gem・Bundler</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          RubyのパッケージマネージャーGemとBundlerの使い方を学びましょう。
          Gemのインストール・Gemfileの書き方・自作Gemの作成まで、Rubyエコシステムを活用するスキルを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="gems" totalLessons={5} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/gems" color="red" categoryId="gems" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: GemとBundlerの基本</h2>
        <RubyEditor
          defaultCode={`# Gemの基本操作（コマンドライン）
# gem install json
# gem list
# gem env

# requireでGemを読み込む
require 'json'
require 'date'

# JSONを使った例
data = { name: "Ruby", version: "3.2", awesome: true }
json_str = JSON.generate(data)
puts json_str

parsed = JSON.parse(json_str)
puts parsed["name"]
puts parsed["version"]

# Dateを使った例
today = Date.today
puts today.class`}
          expectedOutput={`{"name":"Ruby","version":"3.2","awesome":true}
Ruby
3.2
Date`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: セマンティックバージョニング</h2>
        <RubyEditor
          defaultCode={`# セマンティックバージョニング: MAJOR.MINOR.PATCH
# 1.2.3
#   1 = MAJOR: 後方互換性のない変更
#   2 = MINOR: 後方互換性のある新機能
#   3 = PATCH: バグ修正

# Gemfileのバージョン指定
version_examples = {
  "== 1.2.3"  => "バージョン1.2.3のみ",
  ">= 1.2.0"  => "1.2.0以上すべて",
  "~> 1.2"    => "1.2以上2.0未満（1.x系）",
  "~> 1.2.3"  => "1.2.3以上1.3.0未満",
  ">= 1.0, < 2.0" => "1.0以上2.0未満",
}

version_examples.each do |spec, desc|
  puts "#{spec.ljust(18)} => #{desc}"
end`}
          expectedOutput={`== 1.2.3           => バージョン1.2.3のみ
>= 1.2.0           => 1.2.0以上すべて
~> 1.2             => 1.2以上2.0未満（1.x系）
~> 1.2.3           => 1.2.3以上1.3.0未満
>= 1.0, < 2.0      => 1.0以上2.0未満`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
