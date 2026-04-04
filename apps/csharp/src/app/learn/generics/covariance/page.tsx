import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function CovariancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">共変性・反変性</h1>
        <p className="text-gray-400">out T（共変性）と in T（反変性）による型の変性。IEnumerable&lt;out T&gt;・IComparer&lt;in T&gt; の仕組み</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">共変性と反変性とは</h2>
        <p className="text-gray-400 mb-3">
          通常、<code className="text-violet-400">IEnumerable&lt;string&gt;</code> を <code className="text-violet-400">IEnumerable&lt;object&gt;</code> として扱うことはできません。
          しかし、<code className="text-violet-400">out T</code> キーワードで共変性(covariance)を宣言すると可能になります。
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <p className="text-violet-400 font-semibold mb-2">共変性 (out T)</p>
            <ul className="text-gray-400 space-y-1">
              <li>派生型 → 基底型の変換を許可</li>
              <li>T を戻り値にのみ使用</li>
              <li>IEnumerable&lt;out T&gt; が代表例</li>
            </ul>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <p className="text-violet-400 font-semibold mb-2">反変性 (in T)</p>
            <ul className="text-gray-400 space-y-1">
              <li>基底型 → 派生型の変換を許可</li>
              <li>T を引数にのみ使用</li>
              <li>IComparer&lt;in T&gt; が代表例</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">IEnumerable の共変性</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400">IEnumerable&lt;T&gt;</code> は <code className="text-violet-400">out T</code> で共変性が宣言されているため、
          <code className="text-violet-400">IEnumerable&lt;string&gt;</code> を <code className="text-violet-400">IEnumerable&lt;object&gt;</code> として扱えます。
          これにより型変換がより自然に書けます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Animal { public string Name { get; set; } = ""; }
class Dog : Animal { }
class Cat : Animal { }

class Program
{
    static void PrintAll(IEnumerable<Animal> animals)
    {
        foreach (var a in animals)
            Console.WriteLine(a.Name);
    }

    static void Main()
    {
        // IEnumerable<Dog> を IEnumerable<Animal> として渡せる（共変性）
        var dogs = new List<Dog>
        {
            new Dog { Name = "ポチ" },
            new Dog { Name = "ハナ" }
        };

        PrintAll(dogs); // List<Dog> → IEnumerable<Animal> OK

        // IEnumerable<string> → IEnumerable<object>（共変性）
        IEnumerable<string> strings = new List<string> { "Hello", "World" };
        IEnumerable<object> objects = strings; // OK（out T による共変性）
        foreach (object o in objects)
            Console.WriteLine(o);
    }
}`}
          expectedOutput={`ポチ
ハナ
Hello
World`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">独自の共変インターフェース</h2>
        <p className="text-gray-400 mb-4">
          自分でインターフェースを定義する際に <code className="text-violet-400">out T</code> を使うことで、
          共変性を持つインターフェースを作成できます。T は戻り値・読み取り専用プロパティにしか使えません。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// out T: 共変インターフェース（T は出力のみ）
interface IProducer<out T>
{
    T Produce();
    string Description { get; }
}

class StringProducer : IProducer<string>
{
    public string Produce() => "Hello, Generic!";
    public string Description => "文字列を生成";
}

class Program
{
    static void ShowProduction(IProducer<object> producer)
    {
        Console.WriteLine(producer.Description);
        Console.WriteLine($"生成値: {producer.Produce()}");
    }

    static void Main()
    {
        IProducer<string> strProducer = new StringProducer();

        // out T の共変性: IProducer<string> → IProducer<object> に代入可能
        IProducer<object> objProducer = strProducer;

        ShowProduction(objProducer);
        ShowProduction(strProducer); // 直接渡すのも OK
    }
}`}
          expectedOutput={`文字列を生成
生成値: Hello, Generic!
文字列を生成
生成値: Hello, Generic!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="covariance" />
      </div>
      <LessonNav lessons={lessons} currentId="covariance" basePath="/learn/generics" />
    </div>
  );
}
