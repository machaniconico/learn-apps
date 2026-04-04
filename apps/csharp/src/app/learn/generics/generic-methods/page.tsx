import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリックメソッド</h1>
        <p className="text-gray-400">メソッドレベルの型パラメータ定義、型推論による自動型解決、ジェネリックメソッドの実用パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックメソッドとは</h2>
        <p className="text-gray-400 mb-3">
          クラス全体をジェネリックにしなくても、特定のメソッドだけに型パラメータを持たせることができます。
          戻り値型の前に <code className="text-violet-400">&lt;T&gt;</code> を付けて宣言します。
        </p>
        <p className="text-gray-400">
          C# のコンパイラは多くの場合、引数の型から型パラメータを自動推論します（型推論）。
          そのため <code className="text-violet-400">Method(value)</code> と書くだけで <code className="text-violet-400">Method&lt;int&gt;(value)</code> と同じ効果になります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">基本的なジェネリックメソッド</h2>
        <p className="text-gray-400 mb-4">
          配列のユーティリティメソッドはジェネリックメソッドの典型的な使い方です。
          同じロジックを int・string・double など任意の型に対して使えます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class ArrayUtils
{
    // ジェネリックメソッド
    public static T[] Filter<T>(T[] array, Func<T, bool> predicate)
    {
        int count = 0;
        foreach (T item in array)
            if (predicate(item)) count++;

        T[] result = new T[count];
        int idx = 0;
        foreach (T item in array)
            if (predicate(item)) result[idx++] = item;

        return result;
    }

    public static void Print<T>(T[] array)
    {
        Console.WriteLine("[" + string.Join(", ", array) + "]");
    }
}

class Program
{
    static void Main()
    {
        int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int[] evens = ArrayUtils.Filter(numbers, n => n % 2 == 0);
        ArrayUtils.Print(evens);

        string[] words = { "apple", "banana", "cherry", "date", "elderberry" };
        string[] longWords = ArrayUtils.Filter(words, w => w.Length > 5);
        ArrayUtils.Print(longWords);
    }
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[banana, cherry, elderberry]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">型推論とデフォルト値</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400">default(T)</code> は型パラメータのデフォルト値を返します。
          参照型なら null、値型なら 0・false などの既定値です。
          型推論により呼び出しが簡潔になる例も確認しましょう。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class GenericMethods
{
    // default キーワードで T のデフォルト値を取得
    public static T GetDefaultValue<T>()
    {
        return default(T)!;
    }

    // 型推論を活用した例
    public static (T Min, T Max) GetRange<T>(T[] array)
        where T : IComparable<T>
    {
        T min = array[0];
        T max = array[0];
        foreach (T item in array)
        {
            if (item.CompareTo(min) < 0) min = item;
            if (item.CompareTo(max) > 0) max = item;
        }
        return (min, max);
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine($"int のデフォルト: {GenericMethods.GetDefaultValue<int>()}");
        Console.WriteLine($"bool のデフォルト: {GenericMethods.GetDefaultValue<bool>()}");
        Console.WriteLine($"string のデフォルト: '{GenericMethods.GetDefaultValue<string>()}'");

        int[] nums = { 5, 2, 8, 1, 9, 3 };
        var (min, max) = GenericMethods.GetRange(nums); // 型推論: T = int
        Console.WriteLine($"最小: {min}, 最大: {max}");
    }
}`}
          expectedOutput={`int のデフォルト: 0
bool のデフォルト: False
string のデフォルト: ''
最小: 1, 最大: 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="generic-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-methods" basePath="/learn/generics" />
    </div>
  );
}
