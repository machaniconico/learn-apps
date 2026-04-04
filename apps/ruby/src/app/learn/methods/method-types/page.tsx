import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function MethodTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドの種類</h1>
        <p className="text-gray-400">インスタンスメソッド・クラスメソッド・特異メソッドの違いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの種類</h2>
        <p className="text-gray-300 mb-4">
          Rubyにはメソッドを定義する場所によっていくつかの種類があります。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">インスタンスメソッド</code> — クラス内で定義。インスタンスに対して呼ぶ。</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">クラスメソッド</code> — <code className="bg-gray-800 px-1 rounded">self.メソッド名</code>で定義。クラス自体に対して呼ぶ。</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">特異メソッド</code> — 特定のオブジェクト1つだけに定義されるメソッド。</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">トップレベルメソッド</code> — クラス外で定義。Objectのprivateメソッド。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: インスタンスメソッドとクラスメソッド</h2>
        <RubyEditor
          defaultCode={`class Temperature
  def initialize(celsius)
    @celsius = celsius
  end

  # インスタンスメソッド
  def to_fahrenheit
    @celsius * 9.0 / 5 + 32
  end

  def to_s
    "#{@celsius}°C"
  end

  # クラスメソッド
  def self.from_fahrenheit(f)
    new((f - 32) * 5.0 / 9)
  end

  def self.freezing
    new(0)
  end
end

t1 = Temperature.new(100)
puts t1               # 100°C
puts t1.to_fahrenheit # 212.0

t2 = Temperature.from_fahrenheit(98.6)
puts t2               # 37°C

puts Temperature.freezing  # 0°C`}
          expectedOutput={`100°C
212.0
37.0°C
0°C`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 特異メソッド</h2>
        <RubyEditor
          defaultCode={`# 特定オブジェクトだけにメソッドを追加
alice = "Alice"
bob = "Bob"

def alice.greet
  "こんにちは！私は#{self}です。"
end

puts alice.greet  # Aliceだけが使える

begin
  bob.greet  # エラー
rescue NoMethodError => e
  puts "エラー: #{e.message}"
end

# 特異クラス構文
obj = Object.new
class << obj
  def hello
    "hello from singleton!"
  end

  def info
    "特異メソッドを持つオブジェクト"
  end
end

puts obj.hello
puts obj.info`}
          expectedOutput={`こんにちは！私はAliceです。
エラー: undefined method 'greet' for an instance of String
hello from singleton!
特異メソッドを持つオブジェクト`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: アクセス制御（public・private・protected）</h2>
        <RubyEditor
          defaultCode={`class BankAccount
  def initialize(balance)
    @balance = balance
  end

  # publicメソッド (デフォルト)
  def deposit(amount)
    validate_amount!(amount)
    @balance += amount
    puts "#{amount}円を入金。残高: #{@balance}円"
  end

  def balance
    @balance
  end

  private

  # privateメソッド: クラス外から呼べない
  def validate_amount!(amount)
    raise ArgumentError, "金額は正の数である必要があります" if amount <= 0
  end
end

account = BankAccount.new(1000)
account.deposit(500)   # OK
puts account.balance   # OK

begin
  account.validate_amount!(100)  # エラー
rescue NoMethodError => e
  puts "エラー: privateメソッドは外から呼べません"
end`}
          expectedOutput={`500円を入金。残高: 1500円
1500
エラー: privateメソッドは外から呼べません`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="method-types" />
      </div>
      <LessonNav lessons={lessons} currentId="method-types" basePath="/learn/methods" />
    </div>
  );
}
