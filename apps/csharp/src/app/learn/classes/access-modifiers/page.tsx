import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function AccessModifiersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アクセス修飾子</h1>
        <p className="text-gray-400">public・private・protected・internal・protected internal・private protected の使い分け</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アクセス修飾子の種類</h2>
        <p className="text-gray-400 mb-4">
          アクセス修飾子は、クラス・メソッド・プロパティ・フィールドへのアクセス範囲を制御します。
          適切なアクセス制御がカプセル化の核心です。
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <code className="text-green-400">public</code>
            <span className="text-gray-400 ml-3">— どこからでもアクセス可能</span>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-green-400">private</code>
            <span className="text-gray-400 ml-3">— 同じクラス内のみ（デフォルト）</span>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-green-400">protected</code>
            <span className="text-gray-400 ml-3">— 同じクラスと派生クラス</span>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-green-400">internal</code>
            <span className="text-gray-400 ml-3">— 同じアセンブリ内のみ</span>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-green-400">protected internal</code>
            <span className="text-gray-400 ml-3">— 同じアセンブリ、または派生クラス</span>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-green-400">private protected</code>
            <span className="text-gray-400 ml-3">— 同じアセンブリ内の派生クラスのみ</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">private によるカプセル化</h2>
        <p className="text-gray-400 mb-4">
          フィールドは private にし、プロパティ経由でアクセスを制御するのがベストプラクティスです。
          内部実装を隠蔽することで、クラス利用者は詳細を意識せずに使えます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class BankAccount
{
    // private フィールド（外から直接変更できない）
    private decimal _balance;
    private readonly string _owner;

    public string Owner => _owner; // 読み取り専用プロパティ

    public decimal Balance => _balance; // 読み取り専用

    public BankAccount(string owner, decimal initialBalance)
    {
        _owner = owner;
        _balance = initialBalance;
    }

    // public メソッド: 検証付きで残高を変更
    public bool Withdraw(decimal amount)
    {
        if (amount <= 0 || amount > _balance)
        {
            Console.WriteLine("引き出し失敗");
            return false;
        }
        _balance -= amount;
        Console.WriteLine($"{amount}円引き出し完了");
        return true;
    }
}

class Program
{
    static void Main()
    {
        var acc = new BankAccount("田中", 10000);
        Console.WriteLine($"残高: {acc.Balance}円");
        acc.Withdraw(3000);
        Console.WriteLine($"残高: {acc.Balance}円");
        acc.Withdraw(20000); // 失敗
    }
}`}
          expectedOutput={`残高: 10000円
3000円引き出し完了
残高: 7000円
引き出し失敗`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">protected と継承</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400">protected</code> メンバーは派生クラスからアクセス可能です。
          基底クラスの内部実装を派生クラスが利用できるようにしつつ、外部からは隠蔽できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Animal
{
    public string Name { get; }

    // protected: 派生クラスからアクセス可能
    protected int Energy { get; set; } = 100;

    public Animal(string name)
    {
        Name = name;
    }

    // private: このクラス内のみ
    private void ConsumeEnergy(int amount)
    {
        Energy -= amount;
    }

    public void Eat()
    {
        Energy += 30;
        Console.WriteLine($"{Name}が食事。エネルギー: {Energy}");
    }

    protected void Move()
    {
        ConsumeEnergy(10);
        Console.WriteLine($"{Name}が移動。エネルギー: {Energy}");
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public void Run()
    {
        Move(); // protected にアクセス可能
        Console.WriteLine($"{Name}が走った！");
    }
}

class Program
{
    static void Main()
    {
        var dog = new Dog("ポチ");
        dog.Eat();
        dog.Run();
    }
}`}
          expectedOutput={`ポチが食事。エネルギー: 130
ポチが移動。エネルギー: 120
ポチが走った！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="access-modifiers" />
      </div>
      <LessonNav lessons={lessons} currentId="access-modifiers" basePath="/learn/classes" />
    </div>
  );
}
