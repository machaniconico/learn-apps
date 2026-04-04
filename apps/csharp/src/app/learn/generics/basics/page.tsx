import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクスの基本</h1>
        <p className="text-gray-400">型パラメータ T を使ったジェネリッククラスの定義と、型安全なコードの再利用</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜジェネリクスが必要か</h2>
        <p className="text-gray-400 mb-3">
          ジェネリクスがない場合、異なる型に対して同じロジックを実装するには
          <code className="text-violet-400"> object</code> 型を使うか、型ごとにクラスを作るしかありませんでした。
          <code className="text-violet-400"> object</code> を使うと型安全性がなくなり、ボックス化によるパフォーマンス低下も生じます。
        </p>
        <p className="text-gray-400">
          ジェネリクスを使うと型パラメータ <code className="text-violet-400">T</code> を使って
          「任意の型に対して動作するコード」を一度だけ書け、型安全性も保たれます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ジェネリッククラスの定義</h2>
        <p className="text-gray-400 mb-4">
          クラス名の後に <code className="text-violet-400">&lt;T&gt;</code> を付けて型パラメータを宣言します。
          T はメソッドの引数・戻り値・フィールドの型として使えます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Stack<T>
{
    private T[] _items = new T[100];
    private int _top = 0;

    public void Push(T item)
    {
        _items[_top++] = item;
        Console.WriteLine($"プッシュ: {item}");
    }

    public T Pop()
    {
        if (_top == 0)
            throw new InvalidOperationException("スタックが空です");
        T item = _items[--_top];
        Console.WriteLine($"ポップ: {item}");
        return item;
    }

    public int Count => _top;
}

class Program
{
    static void Main()
    {
        var intStack = new Stack<int>();
        intStack.Push(1);
        intStack.Push(2);
        intStack.Push(3);
        intStack.Pop();
        Console.WriteLine($"残り: {intStack.Count}個\n");

        var strStack = new Stack<string>();
        strStack.Push("C#");
        strStack.Push("Java");
        strStack.Pop();
    }
}`}
          expectedOutput={`プッシュ: 1
プッシュ: 2
プッシュ: 3
ポップ: 3
残り: 2個

プッシュ: C#
プッシュ: Java
ポップ: Java`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">複数の型パラメータ</h2>
        <p className="text-gray-400 mb-4">
          複数の型パラメータを使うと、2つ以上の異なる型を扱うジェネリッククラスが作れます。
          <code className="text-violet-400">Dictionary&lt;TKey, TValue&gt;</code> や <code className="text-violet-400">Tuple&lt;T1, T2&gt;</code> が代表例です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Pair<T1, T2>
{
    public T1 First { get; }
    public T2 Second { get; }

    public Pair(T1 first, T2 second)
    {
        First = first;
        Second = second;
    }

    public void Display()
    {
        Console.WriteLine($"({First}, {Second})");
    }

    // 順序を入れ替えた新しいペアを返す
    public Pair<T2, T1> Swap() => new Pair<T2, T1>(Second, First);
}

class Program
{
    static void Main()
    {
        var pair1 = new Pair<string, int>("田中", 28);
        pair1.Display();

        var swapped = pair1.Swap();
        swapped.Display();

        var pair2 = new Pair<double, bool>(3.14, true);
        pair2.Display();
    }
}`}
          expectedOutput={`(田中, 28)
(28, 田中)
(3.14, True)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/generics" />
    </div>
  );
}
