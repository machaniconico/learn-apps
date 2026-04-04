import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "design")!.lessons;

export default function ObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">設計パターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オブザーバー</h1>
        <p className="text-gray-400">状態変化を複数のオブジェクトに通知するオブザーバーパターンをRubyで実装する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オブザーバーパターンとは</h2>
        <p className="text-gray-300 mb-3">
          オブザーバーパターンはサブジェクト（通知元）の状態変化を、登録されたオブザーバー（通知先）に
          自動的に通知するパターンです。疎結合なイベント駆動設計を実現します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>Rubyには標準で<code className="bg-gray-800 px-1 rounded text-purple-300">Observable</code>モジュールがある</li>
          <li><code className="bg-gray-800 px-1 rounded text-purple-300">add_observer</code>でオブザーバーを登録</li>
          <li><code className="bg-gray-800 px-1 rounded text-purple-300">changed; notify_observers</code>で通知</li>
          <li>オブザーバーは<code className="bg-gray-800 px-1 rounded text-purple-300">update</code>メソッドを実装する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Observableモジュールの基本</h2>
        <RubyEditor
          defaultCode={`require 'observer'

# サブジェクト: 監視対象
class StockPrice
  include Observable

  attr_reader :symbol, :price

  def initialize(symbol, price)
    @symbol = symbol
    @price  = price
  end

  def update_price(new_price)
    old_price = @price
    @price = new_price
    changed  # 変更フラグをセット
    notify_observers(@symbol, old_price, new_price)  # 全オブザーバーに通知
  end
end

# オブザーバー: updateメソッドを実装
class PriceAlertObserver
  def update(symbol, old_price, new_price)
    change = new_price - old_price
    direction = change > 0 ? "上昇" : "下落"
    puts "[アラート] #{symbol}: #{old_price}円 → #{new_price}円 (#{direction} #{change.abs}円)"
  end
end

class PriceLogObserver
  def update(symbol, old_price, new_price)
    puts "[ログ] #{symbol}の価格が更新されました: #{new_price}円"
  end
end

# セットアップ
stock = StockPrice.new("RUBY", 1000)
stock.add_observer(PriceAlertObserver.new)
stock.add_observer(PriceLogObserver.new)

# 価格更新 → 全オブザーバーに通知
stock.update_price(1050)
puts "---"
stock.update_price(980)`}
          expectedOutput={`[アラート] RUBY: 1000円 → 1050円 (上昇 50円)
[ログ] RUBYの価格が更新されました: 1050円
---
[アラート] RUBY: 1050円 → 980円 (下落 70円)
[ログ] RUBYの価格が更新されました: 980円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カスタムオブザーバー実装</h2>
        <RubyEditor
          defaultCode={`# Observableモジュールを使わない独自実装
module EventEmitter
  def self.included(base)
    base.instance_variable_set(:@listeners, Hash.new { |h, k| h[k] = [] })
    base.extend(ClassMethods)
  end

  module ClassMethods
    def on(event, &handler)
      @listeners[event] << handler
    end

    def listeners = @listeners
  end

  def emit(event, *args)
    self.class.listeners[event].each { |handler| handler.call(*args) }
  end
end

class OrderSystem
  include EventEmitter

  on(:order_placed)    { |order| puts "メール送信: 注文確認 ##{order[:id]}" }
  on(:order_placed)    { |order| puts "在庫更新: #{order[:item]}を1個減らす" }
  on(:order_shipped)   { |order| puts "配送通知: ##{order[:id]}を発送しました" }
  on(:order_cancelled) { |order| puts "キャンセル処理: ##{order[:id]}を返金" }

  def place_order(item)
    order = { id: rand(1000..9999), item: item }
    puts "\n注文受付: #{item}"
    emit(:order_placed, order)
    order
  end

  def ship_order(order)
    emit(:order_shipped, order)
  end
end

system = OrderSystem.new
order = system.place_order("Ruby本")
system.ship_order(order)`}
          expectedOutput={`
注文受付: Ruby本
メール送信: 注文確認 #xxxx
在庫更新: Ruby本を1個減らす
配送通知: #xxxxを発送しました`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ブロックを使ったシンプルなオブザーバー</h2>
        <RubyEditor
          defaultCode={`class Button
  def initialize(label)
    @label = label
    @click_handlers = []
    @hover_handlers = []
  end

  def on_click(&block)
    @click_handlers << block
    self
  end

  def on_hover(&block)
    @hover_handlers << block
    self
  end

  def click
    puts "#{@label}がクリックされました"
    @click_handlers.each { |h| h.call(@label) }
  end

  def hover
    @hover_handlers.each { |h| h.call(@label) }
  end
end

submit = Button.new("送信")

submit
  .on_click { |label| puts "  フォームを検証中..." }
  .on_click { |label| puts "  データを送信中..." }
  .on_click { |label| puts "  完了メッセージを表示" }
  .on_hover { |label| puts "  ツールチップ: #{label}ボタン" }

submit.hover
submit.click`}
          expectedOutput={`  ツールチップ: 送信ボタン
送信がクリックされました
  フォームを検証中...
  データを送信中...
  完了メッセージを表示`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/design" />
    </div>
  );
}
