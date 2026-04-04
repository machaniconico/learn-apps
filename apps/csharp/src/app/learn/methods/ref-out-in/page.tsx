import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsRefOutInPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ref・out・in</h1>
        <p className="text-gray-400">参照渡し（ref）、出力パラメータ（out）、読み取り専用参照（in）の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ref・out・in の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常のパラメータは値のコピーが渡りますが、これらのキーワードを使うと動作が変わります。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              kw: "ref",
              color: "teal",
              desc: "参照渡し。呼び出し前に初期化必須。メソッド内での変更が呼び出し元に反映される。",
            },
            {
              kw: "out",
              color: "blue",
              desc: "出力パラメータ。呼び出し前の初期化不要。メソッド内で必ず値を代入しなければならない。",
            },
            {
              kw: "in",
              color: "orange",
              desc: "読み取り専用参照。参照渡しだがメソッド内での変更は禁止。大きな構造体を効率的に渡す際に有効。",
            },
          ].map((item) => (
            <div key={item.kw} className="bg-gray-800 rounded-lg p-4">
              <code className={`text-${item.color}-400 font-bold text-sm`}>{item.kw}</code>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ref パラメータの例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // ref：参照渡し。呼び出し元の値を変更できる
    static void Swap(ref int a, ref int b)
    {
        int temp = a;
        a = b;
        b = temp;
    }

    static void Main()
    {
        int x = 10, y = 20;
        Console.WriteLine($"スワップ前: x={x}, y={y}");

        Swap(ref x, ref y);
        Console.WriteLine($"スワップ後: x={x}, y={y}");
    }
}`}
          expectedOutput={`スワップ前: x=10, y=20
スワップ後: x=20, y=10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">out パラメータの例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // out：複数の値を返したい場合に便利
    static bool TryDivide(int dividend, int divisor, out int quotient, out int remainder)
    {
        if (divisor == 0)
        {
            quotient = 0;
            remainder = 0;
            return false;
        }
        quotient = dividend / divisor;
        remainder = dividend % divisor;
        return true;
    }

    static void Main()
    {
        if (TryDivide(17, 5, out int q, out int r))
        {
            Console.WriteLine($"17 ÷ 5 = {q} 余り {r}");
        }

        if (!TryDivide(10, 0, out int q2, out int r2))
        {
            Console.WriteLine("ゼロ除算はできません");
        }

        // int.TryParse も out パラメータを使う標準的な例
        if (int.TryParse("42", out int parsed))
        {
            Console.WriteLine($"パース成功: {parsed}");
        }
    }
}`}
          expectedOutput={`17 ÷ 5 = 3 余り 2
ゼロ除算はできません
パース成功: 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="ref-out-in" />
      </div>
      <LessonNav lessons={lessons} currentId="ref-out-in" basePath="/learn/methods" />
    </div>
  );
}
