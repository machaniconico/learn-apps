import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "inheritance")!;
const lessonId = "overriding";

export default function OverridingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-orange-400 text-sm font-medium mb-2">継承</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">メソッドオーバーライド</h1>
          <p className="text-gray-400">
            子クラスで同名のメソッドを定義することで、親クラスのメソッドをオーバーライド（上書き）できます。
            これがポリモーフィズムの基礎です。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">オーバーライドの仕組み</h2>
          <p className="text-gray-400 text-sm mb-4">
            Ruby はメソッドを探すとき、まずレシーバのクラスを探し、
            見つからなければ継承チェーンを順番にさかのぼります。
            子クラスで定義したメソッドが優先されます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Notification
  def send_to(user)
    puts "通知: #{message} → #{user}"
  end

  def message
    "一般通知"
  end
end

class EmailNotification < Notification
  def message
    "メール通知"
  end

  def send_to(user)
    puts "📧 メール送信: #{user}"
    super
  end
end

class PushNotification < Notification
  def message
    "プッシュ通知"
  end
end

notifications = [
  Notification.new,
  EmailNotification.new,
  PushNotification.new,
]

notifications.each do |n|
  n.send_to("田中さん")
end`}
          expectedOutput={`通知: 一般通知 → 田中さん
📧 メール送信: 田中さん
通知: メール通知 → 田中さん
通知: プッシュ通知 → 田中さん`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">to_s と inspect のオーバーライド</h2>
          <p className="text-gray-400 text-sm">
            to_s と inspect をオーバーライドするとデバッグや puts での表示をカスタマイズできます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Money
  attr_reader :amount, :currency

  def initialize(amount, currency = "JPY")
    @amount   = amount.to_f
    @currency = currency
  end

  def to_s
    case currency
    when "JPY" then "¥#{amount.to_i}"
    when "USD" then "$#{"%.2f" % amount}"
    else "#{amount} #{currency}"
    end
  end

  def inspect
    "#<Money amount=#{amount} currency=#{currency}>"
  end

  def +(other)
    raise "通貨が一致しません" unless currency == other.currency
    Money.new(amount + other.amount, currency)
  end
end

price = Money.new(1500)
tax   = Money.new(150)
total = price + tax

puts price          # to_s が呼ばれる
puts total
p     price         # inspect が呼ばれる`}
          expectedOutput={`¥1500
¥1650
#<Money amount=1500.0 currency=JPY>`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="inheritance" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/inheritance" />
      </div>
    </div>
  );
}
