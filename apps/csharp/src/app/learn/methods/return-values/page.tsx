import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">return 文、戻り値の型、早期リターンパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドは処理した結果を呼び出し元に返すことができます。
          これを<strong className="text-white">戻り値</strong>といいます。
          メソッドの戻り値の型を宣言し、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">return</code> 文で値を返します。
          戻り値がない場合は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">void</code> を使います。
        </p>
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
          <p className="text-green-400">{"// 戻り値あり"}</p>
          <p className="text-gray-300">
            <span className="text-yellow-400">static</span>{" "}
            <span className="text-blue-400">int</span> Square(
            <span className="text-blue-400">int</span> x){" "}
            {"{"} <span className="text-orange-400">return</span> x * x; {"}"}
          </p>
          <p className="text-green-400 mt-2">{"// 戻り値なし"}</p>
          <p className="text-gray-300">
            <span className="text-yellow-400">static</span>{" "}
            <span className="text-blue-400">void</span> Print(
            <span className="text-blue-400">string</span> msg){" "}
            {"{"} Console.WriteLine(msg); {"}"}
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々な戻り値の型</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static int Multiply(int a, int b)
    {
        return a * b;
    }

    static double CircleArea(double radius)
    {
        return Math.PI * radius * radius;
    }

    static bool IsEven(int n)
    {
        return n % 2 == 0;
    }

    static string Repeat(string s, int times)
    {
        string result = "";
        for (int i = 0; i < times; i++)
            result += s;
        return result;
    }

    static void Main()
    {
        Console.WriteLine($"3 × 7 = {Multiply(3, 7)}");
        Console.WriteLine($"半径5の円の面積: {CircleArea(5):F2}");
        Console.WriteLine($"8は偶数？ {IsEven(8)}");
        Console.WriteLine($"\"C#\" を3回: {Repeat("C#", 3)}");
    }
}`}
          expectedOutput={`3 × 7 = 21
半径5の円の面積: 78.54
8は偶数？ True
"C#" を3回: C#C#C#`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">早期リターンパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件が満たされない場合に早めに <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">return</code> することを
          「早期リターン」または「ガード節」と呼びます。
          深いネストを避け、コードをフラットで読みやすくする重要なテクニックです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">早期リターンの例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // 早期リターンなし（ネストが深い）
    static string CheckAgeNested(int age)
    {
        if (age >= 0)
        {
            if (age < 18)
                return "未成年";
            else
                return "成人";
        }
        else
        {
            return "無効な年齢";
        }
    }

    // 早期リターンあり（フラットで読みやすい）
    static string CheckAge(int age)
    {
        if (age < 0) return "無効な年齢";
        if (age < 18) return "未成年";
        return "成人";
    }

    static void Main()
    {
        Console.WriteLine(CheckAge(-1));
        Console.WriteLine(CheckAge(15));
        Console.WriteLine(CheckAge(20));
    }
}`}
          expectedOutput={`無効な年齢
未成年
成人`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/methods" />
    </div>
  );
}
