import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "instance-variables";

export default function InstanceVariablesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">インスタンス変数</h1>
          <p className="text-gray-400">
            インスタンス変数は @ プレフィックスで始まり、特定のインスタンスに紐づいた状態を保持します。
            同じクラスでも、インスタンスごとに独立した値を持ちます。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">インスタンス変数の特徴</h2>
          <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
            <li>@ で始まる（例: @name, @age）</li>
            <li>同じクラスのインスタンス間で独立している</li>
            <li>初期化しなければ nil</li>
            <li>クラス内のすべてのインスタンスメソッドからアクセス可能</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`class BankAccount
  def initialize(owner, balance)
    @owner   = owner
    @balance = balance
  end

  def deposit(amount)
    @balance += amount
    puts "#{amount}円入金。残高: #{@balance}円"
  end

  def withdraw(amount)
    if amount <= @balance
      @balance -= amount
      puts "#{amount}円出金。残高: #{@balance}円"
    else
      puts "残高不足"
    end
  end

  def info
    puts "#{@owner}の口座: #{@balance}円"
  end
end

alice = BankAccount.new("Alice", 1000)
bob   = BankAccount.new("Bob", 500)

alice.deposit(500)
bob.withdraw(200)
alice.info
bob.info`}
          expectedOutput={`500円入金。残高: 1500円
200円出金。残高: 300円
Aliceの口座: 1500円
Bobの口座: 300円`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">インスタンス変数の確認</h2>
          <p className="text-gray-400 text-sm">
            instance_variables メソッドでオブジェクトが持つインスタンス変数の一覧を取得できます。
            instance_variable_get / set でアクセスすることもできます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Person
  def initialize(name, age)
    @name = name
    @age  = age
  end
end

p = Person.new("太郎", 25)
puts p.instance_variables.inspect
puts p.instance_variable_get(:@name)
puts p.instance_variable_get(:@age)

p.instance_variable_set(:@age, 26)
puts p.instance_variable_get(:@age)`}
          expectedOutput={`[:@name, :@age]
太郎
25
26`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
