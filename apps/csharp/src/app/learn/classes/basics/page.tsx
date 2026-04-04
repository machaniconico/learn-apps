import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスの基本</h1>
        <p className="text-gray-400">class キーワード、フィールドの定義、new によるインスタンス生成の基礎</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クラスとは何か</h2>
        <p className="text-gray-400 mb-3">
          クラスはオブジェクトの設計図（テンプレート）です。
          <code className="text-green-400"> class</code> キーワードで定義し、
          <code className="text-green-400"> new</code> キーワードでインスタンス（実体）を生成します。
        </p>
        <p className="text-gray-400">
          クラスには <strong className="text-white">フィールド</strong>（データを格納する変数）と
          <strong className="text-white">メソッド</strong>（動作を定義する関数）を持ちます。
          同じクラスから複数の独立したインスタンスを作成できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">クラスの定義とインスタンス生成</h2>
        <p className="text-gray-400 mb-4">
          クラス名は PascalCase（先頭大文字）が C# の慣習です。
          フィールドは直接アクセスできますが、後のレッスンで学ぶプロパティを使うのが推奨です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Dog
{
    // フィールド（クラスが持つデータ）
    public string Name;
    public string Breed;
    public int Age;

    // メソッド（クラスが持つ動作）
    public void Bark()
    {
        Console.WriteLine($"{Name}: ワン！");
    }

    public string GetInfo()
    {
        return $"{Name}（{Breed}、{Age}歳）";
    }
}

class Program
{
    static void Main()
    {
        // new でインスタンス生成
        Dog dog1 = new Dog();
        dog1.Name = "ポチ";
        dog1.Breed = "柴犬";
        dog1.Age = 3;

        Dog dog2 = new Dog();
        dog2.Name = "ハナ";
        dog2.Breed = "トイプードル";
        dog2.Age = 2;

        dog1.Bark();
        Console.WriteLine(dog1.GetInfo());
        Console.WriteLine(dog2.GetInfo());
    }
}`}
          expectedOutput={`ポチ: ワン！
ポチ（柴犬、3歳）
ハナ（トイプードル、2歳）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">オブジェクト初期化子</h2>
        <p className="text-gray-400 mb-4">
          C# では <code className="text-green-400">new クラス名 {"{ プロパティ = 値 }"}</code> の形で
          オブジェクト初期化子を使えます。コンストラクタを定義しなくても簡潔にインスタンスを初期化できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Car
{
    public string Make;
    public string Model;
    public int Year;
    public string Color;

    public void Display()
    {
        Console.WriteLine($"{Year}年式 {Make} {Model} ({Color})");
    }
}

class Program
{
    static void Main()
    {
        // オブジェクト初期化子
        var car1 = new Car
        {
            Make = "トヨタ",
            Model = "プリウス",
            Year = 2024,
            Color = "白"
        };

        var car2 = new Car
        {
            Make = "ホンダ",
            Model = "シビック",
            Year = 2023,
            Color = "赤"
        };

        car1.Display();
        car2.Display();
    }
}`}
          expectedOutput={`2024年式 トヨタ プリウス (白)
2023年式 ホンダ シビック (赤)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}
