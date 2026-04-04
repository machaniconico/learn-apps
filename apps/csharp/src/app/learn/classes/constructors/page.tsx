import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ConstructorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンストラクタ</h1>
        <p className="text-gray-400">引数なし・引数ありコンストラクタの定義、this() によるコンストラクタチェーン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタとは</h2>
        <p className="text-gray-400 mb-3">
          コンストラクタはオブジェクトが生成される際に自動的に呼び出される特殊なメソッドです。
          クラスと同じ名前を持ち、戻り値の型は宣言しません。
        </p>
        <p className="text-gray-400">
          コンストラクタを定義しない場合、C# は自動的に引数なしのデフォルトコンストラクタを生成します。
          1つ以上のコンストラクタを定義すると、デフォルトコンストラクタは生成されなくなります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">引数ありコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          引数ありコンストラクタを使うと、オブジェクト生成時に必須の値を強制できます。
          これにより不完全な状態のオブジェクトが生成されるのを防ぎます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class BankAccount
{
    public string Owner { get; }
    public decimal Balance { get; private set; }

    // 引数ありコンストラクタ
    public BankAccount(string owner, decimal initialBalance)
    {
        if (string.IsNullOrEmpty(owner))
            throw new ArgumentException("オーナー名は必須です");
        if (initialBalance < 0)
            throw new ArgumentException("初期残高は0以上が必要です");

        Owner = owner;
        Balance = initialBalance;
    }

    public void Deposit(decimal amount)
    {
        Balance += amount;
        Console.WriteLine($"{amount}円を入金。残高: {Balance}円");
    }
}

class Program
{
    static void Main()
    {
        var account = new BankAccount("田中太郎", 10000);
        Console.WriteLine($"{account.Owner}の口座: {account.Balance}円");
        account.Deposit(5000);
    }
}`}
          expectedOutput={`田中太郎の口座: 10000円
5000円を入金。残高: 15000円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">コンストラクタチェーン（this）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400">this()</code> を使って別のコンストラクタを呼び出せます（コンストラクタチェーン）。
          コードの重複を避け、初期化ロジックを一か所にまとめられます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Rectangle
{
    public double Width { get; }
    public double Height { get; }

    // メインコンストラクタ
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
        Console.WriteLine($"矩形作成: {width} x {height}");
    }

    // 正方形用（this でメインを呼び出す）
    public Rectangle(double side) : this(side, side)
    {
    }

    // デフォルト（1x1）
    public Rectangle() : this(1.0, 1.0)
    {
    }

    public double Area => Width * Height;
}

class Program
{
    static void Main()
    {
        var r1 = new Rectangle(3, 5);
        Console.WriteLine($"面積: {r1.Area}");

        var r2 = new Rectangle(4); // 正方形
        Console.WriteLine($"面積: {r2.Area}");

        var r3 = new Rectangle(); // デフォルト
        Console.WriteLine($"面積: {r3.Area}");
    }
}`}
          expectedOutput={`矩形作成: 3 x 5
面積: 15
矩形作成: 4 x 4
面積: 16
矩形作成: 1 x 1
面積: 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="constructors" />
      </div>
      <LessonNav lessons={lessons} currentId="constructors" basePath="/learn/classes" />
    </div>
  );
}
