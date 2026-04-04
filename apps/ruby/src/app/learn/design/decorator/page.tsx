import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "design")!.lessons;

export default function DecoratorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">設計パターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デコレータ</h1>
        <p className="text-gray-400">SimpleDelegatorを使ってオブジェクトに機能を動的に追加するデコレータパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デコレータパターンとは</h2>
        <p className="text-gray-300 mb-3">
          デコレータパターンはオブジェクトを別のオブジェクトでラップして機能を動的に追加するパターンです。
          継承を使わずに機能を組み合わせることができます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-purple-300">SimpleDelegator</code>を継承してラッパーを作る</li>
          <li>元のオブジェクトの全メソッドが委譲される</li>
          <li>複数のデコレータを重ねてチェーンできる</li>
          <li>継承と違い実行時に組み合わせを変えられる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: SimpleDelegatorによるデコレータ</h2>
        <RubyEditor
          defaultCode={`require 'delegate'

class Coffee
  def cost        = 200
  def description = "コーヒー"
  def calories    = 5
end

class MilkDecorator < SimpleDelegator
  def cost        = super + 50
  def description = super + " + ミルク"
  def calories    = super + 30
end

class SugarDecorator < SimpleDelegator
  def cost        = super + 20
  def description = super + " + 砂糖"
  def calories    = super + 25
end

class WhipDecorator < SimpleDelegator
  def cost        = super + 80
  def description = super + " + ホイップ"
  def calories    = super + 100
end

# デコレータをチェーン
plain  = Coffee.new
latte  = MilkDecorator.new(Coffee.new)
fancy  = WhipDecorator.new(SugarDecorator.new(MilkDecorator.new(Coffee.new)))

[plain, latte, fancy].each do |drink|
  puts "#{drink.description}"
  puts "  価格: #{drink.cost}円 / カロリー: #{drink.calories}kcal"
end`}
          expectedOutput={`コーヒー
  価格: 200円 / カロリー: 5kcal
コーヒー + ミルク
  価格: 250円 / カロリー: 35kcal
コーヒー + ミルク + 砂糖 + ホイップ
  価格: 350円 / カロリー: 160kcal`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ログ・キャッシュ・認証のデコレータ</h2>
        <RubyEditor
          defaultCode={`require 'delegate'

class UserRepository
  def find(id)
    puts "  DBからユーザー#{id}を取得"
    { id: id, name: "User#{id}", email: "user#{id}@example.com" }
  end

  def save(user)
    puts "  DBにユーザーを保存: #{user[:name]}"
    true
  end
end

class LoggingDecorator < SimpleDelegator
  def find(id)
    puts "[LOG] find(#{id}) 開始"
    result = super
    puts "[LOG] find(#{id}) 完了"
    result
  end

  def save(user)
    puts "[LOG] save(#{user[:name]}) 開始"
    result = super
    puts "[LOG] save(#{user[:name]}) #{result ? '成功' : '失敗'}"
    result
  end
end

class CachingDecorator < SimpleDelegator
  def initialize(component)
    super
    @cache = {}
  end

  def find(id)
    return @cache[id].tap { puts "[CACHE] ヒット: #{id}" } if @cache.key?(id)
    @cache[id] = super
  end
end

# デコレータを積み重ねる
repo = CachingDecorator.new(LoggingDecorator.new(UserRepository.new))

puts "1回目:"
repo.find(1)
puts "\n2回目（キャッシュ）:"
repo.find(1)`}
          expectedOutput={`1回目:
[LOG] find(1) 開始
  DBからユーザー1を取得
[LOG] find(1) 完了

2回目（キャッシュ）:
[CACHE] ヒット: 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Forwardableモジュールによる委譲</h2>
        <RubyEditor
          defaultCode={`require 'forwardable'

# Forwardableは特定メソッドだけを委譲したいときに便利
class Printer
  def print_line(text)  = puts "印刷: #{text}"
  def print_bold(text)  = puts "太字印刷: **#{text}**"
  def status            = "プリンター: 準備完了"
end

class DocumentEditor
  extend Forwardable

  # printerの特定メソッドだけをEditorに委譲
  def_delegators :@printer, :print_line, :print_bold, :status
  def_delegator  :@printer, :print_line, :print  # 別名でも委譲可能

  def initialize
    @printer = Printer.new
    @document = []
  end

  def write(text)
    @document << text
    self
  end

  def publish
    puts "ドキュメントを発行:"
    @document.each { |line| print_line(line) }
  end
end

editor = DocumentEditor.new
puts editor.status

editor.write("Rubyによるデザインパターン")
      .write("第5章: デコレータパターン")
editor.publish

editor.print_bold("重要なポイント")`}
          expectedOutput={`プリンター: 準備完了
ドキュメントを発行:
印刷: Rubyによるデザインパターン
印刷: 第5章: デコレータパターン
太字印刷: **重要なポイント**`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="decorator" />
      </div>
      <LessonNav lessons={lessons} currentId="decorator" basePath="/learn/design" />
    </div>
  );
}
