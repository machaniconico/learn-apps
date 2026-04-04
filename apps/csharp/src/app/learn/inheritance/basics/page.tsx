import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承の基本</h1>
        <p className="text-gray-400">class 子クラス : 親クラス 構文、base キーワード、コンストラクタの継承方法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">継承とは</h2>
        <p className="text-gray-400 mb-3">
          継承(Inheritance)は親クラスの機能を子クラスに引き継ぐ仕組みです。
          C# ではコロン <code className="text-indigo-400">:</code> を使って継承を宣言します。
        </p>
        <p className="text-gray-400">
          <code className="text-indigo-400">base</code> キーワードを使うと、親クラスのメソッドやコンストラクタを呼び出せます。
          C# は単一継承のみサポートし、1つの親クラスしか持てません（複数インターフェースは可）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">基本的な継承</h2>
        <p className="text-gray-400 mb-4">
          子クラスは親クラスのすべての public・protected メンバーを引き継ぎます。
          子クラス独自のフィールドやメソッドを追加して機能を拡張できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Vehicle
{
    public string Brand { get; }
    public int Speed { get; protected set; }

    public Vehicle(string brand)
    {
        Brand = brand;
        Speed = 0;
    }

    public void Accelerate(int amount)
    {
        Speed += amount;
        Console.WriteLine($"{Brand}: 加速 → {Speed}km/h");
    }
}

class Car : Vehicle
{
    public int Doors { get; }

    // base() で親コンストラクタを呼び出す
    public Car(string brand, int doors) : base(brand)
    {
        Doors = doors;
    }

    public void Honk()
    {
        Console.WriteLine($"{Brand}: プップー！");
    }
}

class Program
{
    static void Main()
    {
        var car = new Car("トヨタ", 4);
        car.Accelerate(60); // 親クラスのメソッド
        car.Accelerate(40);
        car.Honk();          // 子クラスのメソッド
        Console.WriteLine($"ドア数: {car.Doors}");
    }
}`}
          expectedOutput={`トヨタ: 加速 → 60km/h
トヨタ: 加速 → 100km/h
トヨタ: プップー！
ドア数: 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">base によるメソッド呼び出し</h2>
        <p className="text-gray-400 mb-4">
          子クラスで親クラスのメソッドを呼び出す際は <code className="text-indigo-400">base.メソッド名()</code> を使います。
          親の処理を実行した上で、子クラス独自の処理を追加するパターンです。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Person
{
    public string Name { get; }
    public int Age { get; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public virtual string GetInfo()
    {
        return $"{Name}（{Age}歳）";
    }
}

class Employee : Person
{
    public string Department { get; }

    public Employee(string name, int age, string dept)
        : base(name, age) // 親コンストラクタを呼ぶ
    {
        Department = dept;
    }

    public override string GetInfo()
    {
        // base で親の実装を呼び出して拡張
        string baseInfo = base.GetInfo();
        return $"{baseInfo} [{Department}部門]";
    }
}

class Program
{
    static void Main()
    {
        var person = new Person("山田", 35);
        var emp = new Employee("鈴木", 30, "開発");

        Console.WriteLine(person.GetInfo());
        Console.WriteLine(emp.GetInfo());
    }
}`}
          expectedOutput={`山田（35歳）
鈴木（30歳） [開発部門]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/inheritance" />
    </div>
  );
}
