import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "design")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "シングルトンパターンの目的はなんですか？",
    options: [
      "複数のオブジェクトを生成する",
      "クラスのインスタンスが1つだけ存在することを保証する",
      "オブジェクトの機能を拡張する",
      "オブジェクトの状態を監視する",
    ],
    answer: 1,
    explanation: "シングルトンパターンはクラスのインスタンスが1つだけ生成されることを保証するデザインパターンです。",
  },
  {
    question: "オブザーバーパターンはどの場面に適していますか？",
    options: [
      "1つのオブジェクトを複製したいとき",
      "複数のオブジェクトに状態変化を通知したいとき",
      "オブジェクトの生成を一元管理したいとき",
      "アルゴリズムを動的に切り替えたいとき",
    ],
    answer: 1,
    explanation: "オブザーバーパターンはサブジェクトの状態変化を複数のオブザーバーに自動通知します。",
  },
  {
    question: "ストラテジーパターンにおけるRubyらしい実装方法はどれですか？",
    options: [
      "継承チェーンを深くする",
      "グローバル変数でアルゴリズムを管理する",
      "Proc/Lambdaをストラテジーとして渡す",
      "クラス変数でアルゴリズムを保持する",
    ],
    answer: 2,
    explanation: "RubyではProc/Lambdaをストラテジーとして渡すことで、クラスを作らずにアルゴリズムを切り替えられます。",
  },
  {
    question: "デコレータパターンで使うRubyのクラスはどれですか？",
    options: ["Delegator", "SimpleDelegator", "Forwardable", "Proxy"],
    answer: 1,
    explanation: "SimpleDelegatorを継承することで、対象オブジェクトのすべてのメソッドを委譲しつつ機能を追加できます。",
  },
];

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">設計パターン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyでのデザインパターンを学びましょう。シングルトン・ファクトリ・オブザーバー・ストラテジー・デコレータ・テンプレートメソッドなど、
          再利用可能で保守しやすいコードを書くための設計パターンを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="design" totalLessons={6} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/design" color="purple" categoryId="design" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: シングルトンとファクトリ</h2>
        <RubyEditor
          defaultCode={`require 'singleton'

# シングルトンパターン
class AppConfig
  include Singleton

  attr_accessor :debug_mode, :log_level

  def initialize
    @debug_mode = false
    @log_level = :info
  end
end

config1 = AppConfig.instance
config2 = AppConfig.instance
config1.debug_mode = true

puts config1.equal?(config2)   # 同一オブジェクト
puts config2.debug_mode        # true (同じインスタンス)

# ファクトリパターン
class Shape
  def self.create(type)
    case type
    when :circle   then Circle.new
    when :square   then Square.new
    else raise ArgumentError, "Unknown shape: #{type}"
    end
  end
end

class Circle; def name = "Circle" end
class Square; def name = "Square" end

puts Shape.create(:circle).name
puts Shape.create(:square).name`}
          expectedOutput={`true
true
Circle
Square`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: ストラテジーとデコレータ</h2>
        <RubyEditor
          defaultCode={`require 'delegate'

# ストラテジーパターン: Proc/Lambdaで切り替え
class Sorter
  def initialize(strategy = ->(a) { a.sort })
    @strategy = strategy
  end

  def sort(data)
    @strategy.call(data)
  end
end

asc  = Sorter.new(->(a) { a.sort })
desc = Sorter.new(->(a) { a.sort.reverse })

puts asc.sort([3, 1, 2]).inspect
puts desc.sort([3, 1, 2]).inspect

# デコレータパターン: SimpleDelegator
class Coffee
  def cost = 200
  def description = "コーヒー"
end

class MilkDecorator < SimpleDelegator
  def cost = super + 50
  def description = super + " + ミルク"
end

class SugarDecorator < SimpleDelegator
  def cost = super + 30
  def description = super + " + 砂糖"
end

drink = SugarDecorator.new(MilkDecorator.new(Coffee.new))
puts drink.description
puts "#{drink.cost}円"`}
          expectedOutput={`[1, 2, 3]
[3, 2, 1]
コーヒー + ミルク + 砂糖
280円`}
        />
      </section>

      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
