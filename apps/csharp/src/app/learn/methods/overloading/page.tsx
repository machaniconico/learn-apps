import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsOverloadingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オーバーロード</h1>
        <p className="text-gray-400">同じ名前で異なるシグネチャを持つメソッドを複数定義する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドオーバーロードとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">オーバーロード</strong>とは、同じクラス内で同じメソッド名を持つが、
          引数の型・数・順序が異なる複数のメソッドを定義することです。
          コンパイラは呼び出し時の引数に基づいて、適切なメソッドを自動的に選択します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          注意：<strong className="text-white">戻り値の型だけ</strong>が異なる場合はオーバーロードになりません。
          引数リスト（型・数・順序）が異なる必要があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Print メソッドのオーバーロード</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // int を受け取る
    static void Print(int value)
    {
        Console.WriteLine($"整数: {value}");
    }

    // double を受け取る
    static void Print(double value)
    {
        Console.WriteLine($"小数: {value}");
    }

    // string を受け取る
    static void Print(string value)
    {
        Console.WriteLine($"文字列: {value}");
    }

    // 複数引数
    static void Print(string label, int value)
    {
        Console.WriteLine($"{label} = {value}");
    }

    static void Main()
    {
        Print(42);
        Print(3.14);
        Print("Hello");
        Print("スコア", 100);
    }
}`}
          expectedOutput={`整数: 42
小数: 3.14
文字列: Hello
スコア = 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Add メソッドのオーバーロード（実用例）</h2>
        <CSharpEditor
          defaultCode={`using System;

class MathHelper
{
    // 2つの int を加算
    public static int Add(int a, int b)
        => a + b;

    // 3つの int を加算
    public static int Add(int a, int b, int c)
        => a + b + c;

    // double の加算
    public static double Add(double a, double b)
        => a + b;

    // string の結合（文字列の「加算」）
    public static string Add(string a, string b)
        => a + b;
}

class Program
{
    static void Main()
    {
        Console.WriteLine(MathHelper.Add(1, 2));
        Console.WriteLine(MathHelper.Add(1, 2, 3));
        Console.WriteLine(MathHelper.Add(1.5, 2.5));
        Console.WriteLine(MathHelper.Add("Hello, ", "World!"));
    }
}`}
          expectedOutput={`3
6
4
Hello, World!`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オーバーロードのまとめ</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span>同じ名前・異なる引数リストで複数のメソッドを定義できる</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span>コンパイラが引数の型から正しいメソッドを選ぶ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span>戻り値の型だけでオーバーロードすることは不可</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span>Console.WriteLine 自体も多くのオーバーロードを持つ標準的な例</span>
          </li>
        </ul>
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="overloading" />
      </div>
      <LessonNav lessons={lessons} currentId="overloading" basePath="/learn/methods" />
    </div>
  );
}
