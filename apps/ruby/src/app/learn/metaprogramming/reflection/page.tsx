import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "metaprogramming")!.lessons;

export default function ReflectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">メタプログラミング レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リフレクション</h1>
        <p className="text-gray-400">respond_to?・send・methods・instance_variablesを使ったオブジェクト内省を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リフレクション（内省）とは</h2>
        <p className="text-gray-300 mb-3">
          リフレクションはプログラムが実行時に自分自身の構造を調べたり変更したりする能力です。
          Rubyはリフレクション機能が豊富で、オブジェクトのメソッドや変数を動的に調べることができます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">respond_to?</code> — メソッドが存在するか確認</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">send / public_send</code> — メソッド名を動的に指定して呼び出し</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">methods</code> — 利用可能なメソッド一覧</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">instance_variables</code> — インスタンス変数一覧</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: respond_to?とsend</h2>
        <RubyEditor
          defaultCode={`class Robot
  def initialize(name)
    @name = name
    @battery = 100
  end

  def walk  = puts "#{@name}が歩いています"
  def talk  = puts "#{@name}が話しています"
  def charge = puts "#{@name}を充電中... バッテリー100%"

  private
  def reboot = puts "再起動中..."
end

r = Robot.new("R2D2")

# respond_to?でメソッドの存在確認
puts r.respond_to?(:walk)     # publicメソッド
puts r.respond_to?(:reboot)   # privateメソッドはfalse
puts r.respond_to?(:reboot, true) # trueを渡すとprivateも含む

# sendで動的にメソッド呼び出し
[:walk, :talk, :charge].each do |action|
  r.send(action) if r.respond_to?(action)
end`}
          expectedOutput={`true
false
true
R2D2が歩いています
R2D2が話しています
R2D2を充電中... バッテリー100%`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: methodsとinstance_variables</h2>
        <RubyEditor
          defaultCode={`class Car
  attr_accessor :make, :model, :year

  def initialize(make, model, year)
    @make  = make
    @model = model
    @year  = year
  end

  def start  = "エンジン始動"
  def stop   = "エンジン停止"
  def honk   = "クラクション！"
end

car = Car.new("Toyota", "Prius", 2023)

# インスタンス変数の一覧
puts car.instance_variables.inspect

# 値を動的に取得
car.instance_variables.each do |var|
  val = car.instance_variable_get(var)
  puts "#{var}: #{val}"
end

# 独自メソッドのみ（falseで継承メソッドを除外）
puts car.public_methods(false).sort.inspect`}
          expectedOutput={`[:@make, :@model, :@year]
@make: Toyota
@model: Prius
@year: 2023
[:honk, :make, :make=, :model, :model=, :start, :stop, :year, :year=]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: public_sendとis_a?</h2>
        <RubyEditor
          defaultCode={`# public_sendはprivateメソッドを呼べない（安全）
class BankAccount
  def initialize(balance)
    @balance = balance
  end

  def balance = @balance
  def deposit(amount) = @balance += amount

  private
  def secret_reset = @balance = 0
end

account = BankAccount.new(1000)

# is_a? / kind_of? / instance_of?
puts account.is_a?(BankAccount)
puts account.is_a?(Object)
puts account.instance_of?(BankAccount)

# public_sendは安全
account.public_send(:deposit, 500)
puts account.public_send(:balance)

# クラス情報の取得
puts account.class
puts account.class.superclass`}
          expectedOutput={`true
true
true
1500
BankAccount
Object`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="metaprogramming" lessonId="reflection" />
      </div>
      <LessonNav lessons={lessons} currentId="reflection" basePath="/learn/metaprogramming" />
    </div>
  );
}
